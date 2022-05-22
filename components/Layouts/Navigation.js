import ApplicationLogo from "../../components/ApplicationLogo";
import Dropdown from "../../components/Dropdown";
import Link from "next/link";
import NavLink from "../../components/NavLink";
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from "../../components/ResponsiveNavLink";
import DropdownLink, { DropdownButton } from "../../components/DropdownLink";
import { useAuth } from "../../hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from 'next/image'
import { HeartIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/solid";

const Navigation = ({ user }) => {
    const router = useRouter();

    const { logout } = useAuth();

    const [open, setOpen] = useState(false);
    const [searchInput, setSearcInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [noOfGuest, setNoOfGuest] = useState(1)

    const orig = 'http://localhost:8000/storage'

    const search = ({placeholder, children = null}) => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuest: noOfGuest,
            },
        })
    }

    const resetInput = () => {
        setSearcInput('')
    }


    return (
        <nav className="bg-white border-b border-gray-100">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <a>
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-primary" />
                                </a>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                           
                            <NavLink
                                href="/"
                                active={router.pathname === "/"}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                href="/dashboard"
                                active={router.pathname === "/dashboard"}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href="/properties"
                                active={router.pathname === "/properties"}
                            >
                                Properties
                            </NavLink>

                            <NavLink
                                href="/shop"
                                active={router.pathname === "/shop"}
                            >
                                Shop
                            </NavLink>
                        </div>
                        
                        {/* <div className="flex-shrink-0 flex ml-4 my-3 items-center border-2 border-primary rounded-full py-2 px-2 md:shadow-sm md:border-2">
                            <input
                                value={searchInput}
                                onChange={e => setSearcInput(e.target.value)}
                                type="search"
                                placeholder={'Start your search...'}
                                className="max-w-xs  text-center bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400"
                            />
                            <SearchIcon className="mx-auto md:mx-2 md:inline-flex h-8 bg-primary text-white rounded-full p-2 cursor-pointer" onClick={search}/>
                        </div> */}
                    </div>

                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        {user ? 
                            <div className="flex justify-center items-center gap-6">
                                <Dropdown
                                    align="right"
                                    width="48"
                                    trigger={
                                        <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                            <div className="flex items-center px-4">
                                                <div className="flex-shrink-0">

                                                    <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                                                            {user?.image ? (
                                                                <Image
                                                                    src={orig + '/' + user?.image}
                                                                    alt={user?.name || 'Avatar'}
                                                                    layout="fill"
                                                                />
                                                            ) : (
                                                                <svg
                                                                    className="h-10 w-10 fill-current text-gray-400"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                    />
                                                                </svg>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-1">
                                                <svg
                                                    className="fill-current h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    }
                                >
                                    {/* Authentication */}
                                    <DropdownLink href="/favourites">
                                        Favourites
                                    </DropdownLink>
                                    <DropdownLink href="/bookings">
                                        Bookings
                                    </DropdownLink>
                                    <DropdownButton onClick={logout}>
                                        Logout
                                    </DropdownButton>
                                </Dropdown>

                                <div className="flex gap-2">
                                    <Link href="/carts" passHref>
                                        <ShoppingCartIcon  className="w-4 h-4 text-primary cursor-pointer"/>
                                    </Link>

                                    <Link href="/favourites" passHref>
                                        <HeartIcon  className="w-4 h-4 text-red-500 cursor-pointer"/>
                                    </Link>
                                </div>
                            </div>
                         : 
                            <>
                                <NavLink
                                href={'/auth/login'}
                                className="inline-block py-2 px-4 text-secondary bg-white hover:bg-gray-100 rounded-lg"
                                >
                                    Sign In
                                </NavLink>

                                <NavLink
                                    href={'/auth/register'}
                                    className="inline-block py-2 px-4 text-primary bg-white hover:bg-gray-100 rounded-lg"
                                    >
                                    Sign Up
                                </NavLink>
                            </>
                         }
                        
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen((open) => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/"
                            active={router.pathname === "/"}
                        >
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={router.pathname === "/dashboard"}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/properties"
                            active={router.pathname === "/properties"}
                        >
                            Properties
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/shoop"
                            active={router.pathname === "/shop"}
                        >
                            Shop
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">

                        {user ? 
                            <>
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                    <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                                            {user?.image ? (
                                                <Image
                                                    src={orig + '/' + user?.image}
                                                    alt={user?.name || 'Avatar'}
                                                    layout="fill"
                                                />
                                            ) : (
                                                <svg
                                                    className="h-10 w-10 fill-current text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ml-3">
                                        <div className="font-medium text-base text-gray-800">
                                            {user?.name}
                                        </div>
                                        <div className="font-medium text-sm text-gray-500">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    {/* Authentication */}
                                    <ResponsiveNavLink href="/bookings" >
                                        Bookings
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href="/favourites" >
                                        Favourites
                                    </ResponsiveNavLink>
                                    <ResponsiveNavButton onClick={logout}>
                                        Logout
                                    </ResponsiveNavButton>
                                </div>
                            </>
                        :
                            <>
                                <NavLink
                                href={'/auth/login'}
                                className="inline-block py-2 px-4 text-secondary bg-white hover:bg-gray-100 rounded-lg"
                                >
                                    Sign In
                                </NavLink>

                                <NavLink
                                    href={'/auth/register'}
                                    className="inline-block py-2 px-4 text-primary bg-white hover:bg-gray-100 rounded-lg"
                                    >
                                    Sign Up
                                </NavLink>
                            </>
                        }
                        

                       
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
