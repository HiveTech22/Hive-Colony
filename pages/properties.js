import Map from '../components/Property/Map'
import axios from '../lib/axios'
import Head from 'next/head'
import GuestLayout from '../components/Layouts/GuestLayout'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Grid from '../components/Property/Grid'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SearchCircleIcon } from '@heroicons/react/solid'
import SearchComponent from '../components/SearchComponent'

const Properties = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState()
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Colony - Properties</title>
            </Head>

            <Navbar />

            <GuestLayout>
                <main className="flex max-w-7xl">
                    <section className="flex-grow pt-2 px-6">
                        <div
                            className="flex justify-center items-center mb-6 p-1 cursor-pointer gap-2 bg-primary text-white rounded-full"
                            onClick={() =>
                                setSearchFilters(prevFilters => !prevFilters)
                            }>
                            <h1 className="font-bold text-xl text-center">
                                Search properties
                            </h1>
                            <SearchCircleIcon className="w-6 h-6" />
                        </div>

                        {searchFilters && <SearchComponent />}

                        {/* <div className="hidden lg:inline-flex mb-5 space-x-3 whitespace-nowrap text-gray-800">
                            <p className="button">Cancellation Flexibility</p>
                            <p className="button">Type of Place</p>
                            <p className="button">Price</p>
                            <p className="button">Rooms and Beds</p>
                            <p className="button">More filters</p>
                        </div> */}

                        <div className="flex flex-col">
                            <Grid properties={properties} />
                        </div>
                    </section>

                    {/* <section className="hidden xl:inline-flex xl-min-w-[600px]">
                        <Map properties={properties} />
                    </section> */}
                </main>
            </GuestLayout>

            <Footer />
        </>
    )
}

export default Properties

export async function getServerSideProps({ query }) {
    const page = query.per_page || 5
    const purpose = query.purpose || 'for-rent'
    const frequency = query.frequency || 'yearly'
    const sort = query.sort || 'desc'
    const bathroom = query.bathroom || '0'
    const bedroom = query.bedroom || '0'
    const minPrice = query.minPrice || 0
    const maxPrice = query.maxPrice || 100000

    const response = await axios.get(
        `/api/v1/properties?purpose=${purpose}&frequency=${frequency}&sort=${sort}&bathroom=${bathroom}&bedroom=${bedroom}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`,
    )
    const properties = response.data.data

    return {
        props: {
            properties,
        },
    }
}
