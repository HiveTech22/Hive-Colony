import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const [processing, setProcessing] = useState(false)

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/v1/user', () =>
        axios
            .get('/api/v1/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        let toastId
        toastId = toast.loading('Redirecting...')
        setProcessing(true)
        await csrf()

        setErrors([])
        try {
            axios
                .post('/register', props)
                .then(() => mutate())
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors(Object.values(error.response.data.errors).flat())
                })
            toast.success('Welcome to Colony! It a  pleasure having you here', {
                id: toastId,
            })
        } catch (e) {
            console.log(e)
            toast.error('Unable to register', { id: toastId })
            setProcessing(false)
        }
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        let toastId
        toastId = toast.loading('Redirecting...')
        setProcessing(true)
        await csrf()

        setErrors([])
        setStatus(null)
        try {
            axios
                .post('/login', props)
                .then(() => mutate())
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors(Object.values(error.response.data.errors).flat())
                })
            toast.success('Welcome back!', { id: toastId })
        } catch (e) {
            console.log(e)
            toast.error('Unable to login', { id: toastId })
            setProcessing(false)
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        let toastId
        toastId = toast.loading('Redirecting...')
        setProcessing(true)
        await csrf()

        setErrors([])
        setStatus(null)
        try {
            axios
                .post('/forgot-password', { email })
                .then(response => setStatus(response.data.status))
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors(Object.values(error.response.data.errors).flat())
                    toast.error(
                        Object.values(error.response.data.errors).flat(),
                        {
                            id: toastId,
                        },
                    )
                })
        } catch (e) {
            console.log(e)
            toast.error(Object.values(e.response.data.errors).flat(), {
                id: toastId,
            })
            setProcessing(false)
        }
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/auth/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        let toastId
        toastId = toast.loading('Logging you out...')
        setProcessing(true)

        if (!error) {
            try {
                await axios.post('/logout').then(() => mutate())
                toast.success(
                    'Logged out successful! We wish to see you back soon',
                    { id: toastId },
                )
            } catch (e) {
                console.log(e)
                toast.error('Unable to logout of account', { id: toastId })
                setProcessing(false)
            }
        }

        window.location.pathname = '/auth/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
