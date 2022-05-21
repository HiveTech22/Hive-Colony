import { useEffect, useState } from 'react';
import AppLayout from "../components/Layouts/AppLayout";
import Head from "next/head";
import { useAuth } from "../hooks/auth";
import SearchInput from "../components/SearchInput";
import Checkbox from '../components/Form/Checkbox'
import axios from "../lib/axios";
import { CheckCircleIcon, CreditCardIcon, TrashIcon } from "@heroicons/react/solid";
import { Icon } from "@iconify/react";
import timesCircleLine from '@iconify/icons-clarity/times-circle-line';
import DropdownLink, { DropdownButton } from "../components/DropdownLink";
import Dropdown from "../components/Dropdown";
import Swal from 'sweetalert2'

export default function Bookings() {
    const [bookings, setBookings] = useState([])
    const { user } = useAuth();

    useEffect(()=>{
        fetchBookings() 
    })

    const fetchBookings = async () => {
        await axios.get(`/api/v1/bookings`).then(({data})=>{
            setBookings(data.data)
        })
    }

    const deleteBooking = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`/api/v1/bookings/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchBookings()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
        <>
            <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bookings
                </h2>
            }
        >
            <Head>
                <title>Colony - Bookings</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                                <div className="p-4 flex justify-between items-center">
                                    <SearchInput type="text" id="table-search" placeholder="Search for items"/>
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
                                        <DropdownLink href="/favourites">
                                            Favourites
                                        </DropdownLink>
                                    </Dropdown>
                                </div>


                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                            <tr>
                                                <th scope="col" className="p-4">
                                                    <div className="flex items-center">
                                                        <Checkbox></Checkbox>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Property name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Agent
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Payment Status
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Created At
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    <span className="sr-only">Action</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bookings.length > 0 && (
                                                    bookings.map((booking, key) => (
                                                       
                                                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                                        <td className="w-4 p-4">
                                                            <div className="flex items-center">
                                                                <Checkbox></Checkbox>
                                                            </div>
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                            {booking.relationships.property.attribute.title}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {booking.relationships.property.relationships.agent.name}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {booking.attribute.verification === true ? 
                                                                    <div className="flex items-center justify-center">
                                                                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2"/> Active
                                                                    </div>
                                                                    : 
                                                                    <div className="flex justify-center items-center">
                                                                        <Icon icon={timesCircleLine} className="text-red-500 mr-2"/> Unactive
                                                                    </div>
                                                                }
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {booking.attribute.payment === true ? 
                                                                <div className="flex items-center justify-center">
                                                                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2"/> Paid
                                                                </div>
                                                                : 
                                                                <div className="flex justify-center items-center">
                                                                    <Icon icon={timesCircleLine} className="text-red-500 mr-2"/> Unpaid
                                                                </div>
                                                            }
                                                            
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {booking.attribute.created_at}
                                                        </td>
                                                        <td className="px-6 py-4 flex justify-center items-center space-x-2">
                                                            {booking.attribute.verification === true && booking.attribute.payment === false 
                                                                ? 
                                                                    <a href="#" className="font-medium text-secondary dark:text-primary hover:underline flex justify-center items-center flex-grow">
                                                                        <CreditCardIcon className="w-6 h-6"/> Pay
                                                                    </a>
                                                                :

                                                                ''
                                                            }
                                                            
                                                            {booking.attribute.verification === false || booking.attribute.payment === false &&
                                                                
                                                                <div onClick={() => deleteBooking(booking.id)} className="font-medium text-secondary dark:text-primary hover:underline">
                                                                    <TrashIcon className="w-6 h-6"/>
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                            
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
        </>
    )
}