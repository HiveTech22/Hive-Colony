import Map from '../components/Property/Map'
import axios from '../lib/axios'
import Head from 'next/head'
import GuestLayout from '../components/Layouts/GuestLayout'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Grid from '../components/Property/Grid'

const Properties = ({ properties }) => {
   
    return (
        <>
            <Head>
                <title>Colony - Properties</title>
            </Head>
            
            <Navbar />

            <GuestLayout>
                <main className="flex max-w-7xl">
                    <section className="flex-grow pt-14 px-6">
                        <h1 className="text-3xl font-semibold mt-3 mb-6">
                            Related search results for: 
                            <span className="border-b border-primary">
                                location
                            </span>
                        </h1>

                        <div className="hidden lg:inline-flex mb-5 space-x-3 whitespace-nowrap text-gray-800">
                            <p className="button">Cancellation Flexibility</p>
                            <p className="button">Type of Place</p>
                            <p className="button">Price</p>
                            <p className="button">Rooms and Beds</p>
                            <p className="button">More filters</p>
                        </div>

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

export default Properties;

export async function getStaticProps() {
    const response = await axios.get(`/api/v1/properties`)
    const properties = response.data.data

    return {
        props: {
            properties,
        },
    }
}

