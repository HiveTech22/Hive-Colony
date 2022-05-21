import Head from 'next/head'
import Link from 'next/link'
import GuestLayout from '../components/Layouts/GuestLayout'
import { useAuth } from '../hooks/auth'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Colony</title>
            </Head>

            <Navbar />

            <GuestLayout>
                <main className="max-w-6xl mx-auto sm:px-6 lg:px-8 bg-white">
                        index
                </main>
            </GuestLayout>

            <Footer />

        </>
    )
}
