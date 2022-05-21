import ApplicationLogo from "../../components/ApplicationLogo";
import AuthCard from "../../components/AuthCard";
import AuthSessionStatus from "../../components/AuthSessionStatus";
import AuthValidationErrors from "../../components/AuthValidationErrors";
import GuestLayout from "../../components/Layouts/GuestLayout";
import React from "react";
import Image from "next/image";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import Checkbox from "../../components/Form/Checkbox";
import Button from "../../components/Form/Button";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();

    const { login } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard",
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset));
        } else {
            setStatus(null);
        }
    });

    const submitForm = async (event) => {
        event.preventDefault();

        login({ email, password, setErrors, setStatus });
    };

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-primary" />
                        </a>
                    </Link>
                }
            >
                    <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                {/* Session Status */}
                                <AuthSessionStatus className="mb-4" status={status} />

                                {/* Validation Errors */}
                                <AuthValidationErrors className="mb-4" errors={errors} />
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-200 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-secondary text-sm font-bold">
                                                Sign in with
                                            </h6>
                                        </div>
                                        <div className="btn-wrapper text-center">
                                            <button
                                                className="bg-white active:bg-blue-50 text-blue-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                                type="button"
                                            >
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
                                                className="bg-white active:bg-blue-50 text-blue-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                                type="button"
                                            >
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
                                                Or sign in with credentials
                                            </small>
                                        </div>
                                        <form onSubmit={submitForm}>
                                            <div className="relative w-full mb-3">
                                                <Label htmlFor="grid-password">
                                                    Email
                                                </Label>

                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    placeholder="Email"
                                                    onChange={(event) =>
                                                        setEmail(
                                                            event.target.value
                                                        )
                                                    }
                                                    required
                                                    autoFocus
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
                                                    placeholder="Password"
                                                    onChange={(event) =>
                                                        setPassword(
                                                            event.target.value
                                                        )
                                                    }
                                                    required
                                                    autoComplete="current-password"
                                                />
                                            </div>
                                            <div>
                                                <Checkbox id="customCheckLogin">
                                                    Remember Me
                                                </Checkbox>
                                            </div>

                                            <div className="text-center mt-6">
                                                <Button
                                                    className=""
                                                    type="submit"
                                                >
                                                    Sign In
                                                </Button>
                                            </div>

                                            <div className="flex flex-wrap mt-6 relative justify-between items-center">
                                                <div className="">
                                                    <a
                                                        href="/forgot-password"
                                                        className="text-secondary cursor-pointer" 
                                                    >
                                                        <small>
                                                            Forgot password?
                                                        </small>
                                                    </a>
                                                </div>
                                                <div className=" text-right">
                                                    <Link
                                                        href="/auth/register"
                                                        passHref
                                                        className="text-primary"
                                                    >
                                                        <small className="text-primary cursor-pointer">
                                                            Create Account
                                                        </small>
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
            </AuthCard>
        </GuestLayout>
    );
};

export default Login;
