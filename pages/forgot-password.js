import ApplicationLogo from '../components/ApplicationLogo'
import AuthCard from '../components/AuthCard'
import AuthSessionStatus from '../components/AuthSessionStatus'
import AuthValidationErrors from '../components/AuthValidationErrors'
import Button from '../components/Form/Button'
import GuestLayout from '../components/Layouts/GuestLayout'
import Input from '../components/Form/Input'
import Label from '../components/Form/Label'
import Link from 'next/link'
import { useAuth } from '../hooks/auth'
import { useState } from 'react'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-primary" />
                        </a>
                    </Link>
                }>
                <div className="container mx-auto px-4 h-screen">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <AuthSessionStatus
                                className="mb-4"
                                status={status}
                            />

                            <AuthValidationErrors
                                className="mb-4"
                                errors={errors}
                            />
                            <div className="mb-4 text-sm text-gray-600">
                                Forgot your password? No problem. Just let us
                                know your email address and we will email you a
                                password reset link that will allow you to
                                choose a new one.
                            </div>
                            <form onSubmit={submitForm}>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        className="block mt-1 w-full"
                                        onChange={event =>
                                            setEmail(event.target.value)
                                        }
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button>Email Password Reset Link</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default ForgotPassword
