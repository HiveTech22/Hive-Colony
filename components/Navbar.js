import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import {
    SearchIcon,
    GlobeAltIcon,
    UsersIcon,
    HeartIcon,
    HomeIcon,
    LogoutIcon,
    PlusIcon,
    SparklesIcon,
    UserIcon,
    ShoppingCartIcon,
} from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import Router, { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useAuth } from '../hooks/auth'
import Navigation from './Layouts/Navigation'

function Navbar({ placeholder, children = null }) {
    const orig = 'http://localhost:8000/storage'
    const [searchInput, setSearcInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [noOfGuest, setNoOfGuest] = useState(1)
    const { user, logout } = useAuth()


    const router = useRouter()

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const handleSelect = ranges => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const search = () => {
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

    const menuItems = [
        {
            label: 'Dashboard',
            icon: HomeIcon,
            href: '/dashboard',
        },
        {
            label: 'Favorites',
            icon: HeartIcon,
            href: '/favourite',
        },
        {
            label: 'Bookings',
            icon:   ShoppingCartIcon,
            href: '/bookings',
        },
    ]
    

    return (
        <>
            <Navigation user={user} />
        </>
    )
}

export default Navbar
