import { useEffect, useState } from 'react';
import AppLayout from "../components/Layouts/AppLayout";
import Head from "next/head";
import { useAuth } from "../hooks/auth";
import SearchInput from "../components/SearchInput";
import Checkbox from '../components/Form/Checkbox'
import axios from "../lib/axios";
import { CheckCircleIcon, CreditCardIcon, SaveIcon, TrashIcon } from "@heroicons/react/solid";
import { Icon } from "@iconify/react";
import timesCircleLine from '@iconify/icons-clarity/times-circle-line';
import DropdownLink, { DropdownButton } from "../components/DropdownLink";
import Dropdown from "../components/Dropdown";
import Swal from 'sweetalert2'
import DashboardLayout from '../components/Layouts/DashboardLayout';
import CardTableDashboard from '../components/Cards/CardTableDashboard';

export default function Favourites() {
    const [favourites, setFavourites] = useState([])
    const { user } = useAuth();

    useEffect(()=>{
        fetchFavourites() 
    })

    const fetchFavourites = async () => {
        await axios.get(`/api/v1/favourites`).then(({data})=>{
            setFavourites(data.data)
        })
    }

    const deleteFavourite = async (id) => {
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

          await axios.delete(`/api/v1/favourites/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchfavourites()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
        <>
            <Head>
                <title>Colony - Favourites</title>
            </Head>

            <DashboardLayout>  
                <div className="pt-6 px-4">                        
                    <div className="">
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
                            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">

                                <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Your favourites</h3>

                                <div className="block w-full overflow-x-auto">
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead className=''>
                                            <tr>
                                                <th className="thead">Property name</th>
                                                <th className="thead min-w-140-px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-primary">
                                            {
                                                favourites.length > 0 && (
                                                    favourites.map((favourite, key) => (
                                                    <tr key={key} className="text-gray-500">
                                                        <th className="tbody text-left">{favourite.relationships.property.attribute.title}</th>
                                                        <td className="tbody text-gray-900 whitespace-nowrap p-4 flex justify-center items-center gap-2">
                                                            <div>
                                                                <a href="#" className="font-medium text-secondary dark:text-primary hover:underline flex justify-center items-center flex-grow">
                                                                    <SaveIcon className="w-6 h-6"/> Add to Booking
                                                                </a>
                                                            </div>
                                                            <div>
                                                                    
                                                                <div onClick={() => deleteBooking(favourite.id)} className="font-medium text-secondary dark:text-primary hover:underline">
                                                                    <TrashIcon className="w-6 h-6"/>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )
                                                ))
                                            }
                                        
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