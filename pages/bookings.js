import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useAuth } from '../hooks/auth'
import SearchInput from '../components/SearchInput'
import Checkbox from '../components/Form/Checkbox'
import axios from '../lib/axios'
import {
    CheckCircleIcon,
    CreditCardIcon,
    TrashIcon,
} from '@heroicons/react/solid'
import { Icon } from '@iconify/react'
import timesCircleLine from '@iconify/icons-clarity/times-circle-line'
import DropdownLink, { DropdownButton } from '../components/DropdownLink'
import Dropdown from '../components/Dropdown'
import Swal from 'sweetalert2'
import DashboardLayout from '../components/Layouts/DashboardLayout'
import Router from 'next/router'
import Image from 'next/image'

export default function Bookings() {
    const orig = 'http://localhost:8000/storage'

    const [bookings, setBookings] = useState([])
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        fetchBookings()
    })

    const fetchBookings = async () => {
        await axios.get(`/api/v1/bookings`).then(({ data }) => {
            setBookings(data.data)
        })
    }

    const deleteBooking = async id => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            return result.isConfirmed
        })

        if (!isConfirm) {
            return
        }

        await axios
            .delete(`/api/v1/bookings/${id}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: 'success',
                    text: data.message,
                })
                fetchBookings()
            })
            .catch(({ response: { data } }) => {
                Swal.fire({
                    text: data.message,
                    icon: 'error',
                })
            })
    }

    return (
        <>
            <Head>
                <title>Colony - Bookings</title>
            </Head>

            <DashboardLayout>
                <div className="pt-6 px-4">
                    <div className="">
                        <div className="p-4 flex justify-between items-center">
                            <SearchInput
                                type="text"
                                id="table-search"
                                placeholder="Search for items"
                            />
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                        <div className="flex items-center px-4">
                                            <div className="flex-shrink-0">
                                                Action
                                            </div>
                                        </div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                <DropdownLink href="/favourites">
                                    Favourites
                                </DropdownLink>
                            </Dropdown>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                                Your Bookings
                            </h3>

                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead className="">
                                        <tr>
                                            <th className="thead">
                                                Property Image
                                            </th>
                                            <th className="thead">
                                                Property name
                                            </th>
                                            <th className="thead">Agent</th>
                                            <th className="thead">Status</th>
                                            <th className="thead">Payment</th>
                                            <th className="thead">
                                                Created At
                                            </th>
                                            <th className="thead min-w-140-px">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary">
                                        {bookings.length > 0 &&
                                            bookings.map((booking, key) => (
                                                <tr
                                                    key={key}
                                                    className="text-gray-500">
                                                    <th className="tbody text-left">
                                                        <Image
                                                            src={
                                                                orig +
                                                                '/' +
                                                                booking
                                                                    .relationships
                                                                    .property
                                                                    .attribute
                                                                    .image
                                                            }
                                                            alt={
                                                                booking
                                                                    .relationships
                                                                    .property
                                                                    .attribute
                                                                    .title
                                                            }
                                                            width={50}
                                                            height={50}
                                                            className="rounded-full"
                                                        />
                                                    </th>
                                                    <th className="tbody text-left">
                                                        <span
                                                            onClick={() =>
                                                                Router.push(
                                                                    '/property/[id]',
                                                                    `/property/${booking.relationships.property.id}`,
                                                                )
                                                            }>
                                                            {
                                                                booking
                                                                    .relationships
                                                                    .property
                                                                    .attribute
                                                                    .title
                                                            }
                                                        </span>
                                                    </th>
                                                    <td className="tbody text-gray-900 whitespace-nowrap p-4">
                                                        {
                                                            booking
                                                                .relationships
                                                                .property
                                                                .relationships
                                                                .agent.name
                                                        }
                                                    </td>
                                                    <td className="tbody p-4">
                                                        {booking.attribute
                                                            .verification ===
                                                        true ? (
                                                            <div className="flex items-center">
                                                                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />{' '}
                                                                Active
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center">
                                                                <Icon
                                                                    icon={
                                                                        timesCircleLine
                                                                    }
                                                                    className="text-red-500 mr-2"
                                                                />{' '}
                                                                Unactive
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="tbody text-gray-900 whitespace-nowrap p-4">
                                                        {booking.attribute
                                                            .payment ===
                                                        true ? (
                                                            <div className="flex items-center">
                                                                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />{' '}
                                                                Paid
                                                            </div>
                                                        ) : (
                                                            <div className="flex  items-center">
                                                                <Icon
                                                                    icon={
                                                                        timesCircleLine
                                                                    }
                                                                    className="text-red-500 mr-2"
                                                                />{' '}
                                                                Unpaid
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="tbody text-gray-900 whitespace-nowrap p-4">
                                                        {
                                                            booking.attribute
                                                                .created_at
                                                        }
                                                    </td>
                                                    <td className="tbody text-gray-900 whitespace-nowrap p-4 flex justify-center items-center gap-2">
                                                        <div>
                                                            {booking.attribute
                                                                .verification ===
                                                                true &&
                                                            booking.attribute
                                                                .payment ===
                                                                false ? (
                                                                <a
                                                                    href="#"
                                                                    className="font-medium text-secondary dark:text-primary hover:underline flex justify-center items-center flex-grow">
                                                                    <CreditCardIcon className="w-6 h-6" />{' '}
                                                                    Pay
                                                                </a>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </div>
                                                        <div>
                                                            {booking.attribute
                                                                .verification ===
                                                                false ||
                                                                (booking
                                                                    .attribute
                                                                    .payment ===
                                                                    false && (
                                                                    <div
                                                                        onClick={() =>
                                                                            deleteBooking(
                                                                                booking.id,
                                                                            )
                                                                        }
                                                                        className="font-medium text-secondary dark:text-primary hover:underline">
                                                                        <TrashIcon className="w-6 h-6" />
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}
