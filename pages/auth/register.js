import ApplicationLogo from '../../components/ApplicationLogo'
import AuthCard from '../../components/AuthCard'
import AuthSessionStatus from '../../components/AuthSessionStatus'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import GuestLayout from '../../components/Layouts/GuestLayout'

import Image from 'next/image'
import React from 'react'
import Button from '../../components/Form/Button'
import Checkbox from '../../components/Form/Checkbox'
import Input from '../../components/Form/Input'
import Label from '../../components/Form/Label'
import Link from 'next/link'
import { useAuth } from '../../hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
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
                <div className="flex content-center items-center justify-center">
                        <div className="w-full lg:w-5/12 px-4">
                            <AuthValidationErrors
                                className="mb-2"
                                errors={errors}
                            />
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-200 border-0">
                                <div className="rounded-t mb-0 px-6 py-6">
                                    <div className="text-center mb-3">
                                        <h6 className="text-secondary text-sm font-bold">
                                            Sign up with
                                        </h6>
                                    </div>
                                    <div className="btn-wrapper text-center">
                                        <button
                                            className="bg-white active:bg-blue-50 text-blue-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                            type="button">
                                            <Image
                                                alt="..."
                                                className="w-5 mr-1"
                                                src="/img/github.svg"
                                                width="30px"
                                                height="30px"
                                            />
                                            Github
                                        </button>
                                        <button
                                            className="bg-white active:bg-blue-50 text-blue-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                            type="button">
                                            <Image
                                                alt="..."
                                                className="w-5 mr-1"
                                                src="/img/google.svg"
                                                width="30px"
                                                height="30px"
                                            />
                                            Google
                                        </button>
                                    </div>
                                    <hr className="mt-6 border-b-1 border-primary" />
                                </div>
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <div className="text-blue-400 text-center mb-3 font-bold">
                                        <small>
                                            Or sign up with credentials
                                        </small>
                                    </div>
                                    <form onSubmit={submitForm}>
                                        <div className="relative w-full mb-3">
                                            <Label htmlFor="grid-password">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={name}
                                                placeholder="Name"
                                                onChange={event =>
                                                    setName(event.target.value)
                                                }
                                                required
                                                autoFocus
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <Label htmlFor="grid-password">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={event =>
                                                    setEmail(event.target.value)
                                                }
                                                required
                                                placeholder="Email"
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <Label htmlFor="grid-password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={password}
                                                onChange={event =>
                                                    setPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                required
                                                autoComplete="new-password"
                                                placeholder="Password"
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <Label htmlFor="grid-password">
                                                Confirm Password
                                            </Label>
                                            <Input
                                                id="passwordConfirmation"
                                                type="password"
                                                value={passwordConfirmation}
                                                onChange={event =>
                                                    setPasswordConfirmation(
                                                        event.target.value,
                                                    )
                                                }
                                                required
                                                placeholder="Confirm password"
                                            />
                                        </div>

                                        <div className="text-center mt-6">
                                            <Button type="submit">
                                                Create Account
                                            </Button>
                                        </div>

                                        <div className="flex flex-wrap mt-6 relative justify-end items-center">
                                                <Link
                                                    href="/auth/login"
                                                    passHref
                                                    className="text-primary cursor-pointer"
                                                >
                                                    <small className="text-primary cursor-pointer">
                                                        Already have an Account? Sign In
                                                    </small>
                                                </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </AuthCard>
        </GuestLayout>
    )
}
