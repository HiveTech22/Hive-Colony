import Head from 'next/head'
import Link from 'next/link'
import GuestLayout from '../components/Layouts/GuestLayout'
import { useAuth } from '../hooks/auth'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from 'next-share'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Colony</title>
            </Head>

            <Navbar />

            <section className="relative  bg-blueGray-50">
                    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                        <div className="absolute top-0 w-full h-full bg-center bg-cover hero">
                            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
                        </div>
                        <div className="container relative mx-auto">
                            <div className="items-center flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12">
                                    <h1 className="text-white font-semibold text-5xl">
                                    Your story starts with us.
                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200">
                                    This is a simple example of a Landing Page you can build using
                                    Notus JS. It features multiple CSS components based on the
                                    Tailwind CSS design system.
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px gogo">
                            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </div>
                    <section className="pb-10  -mt-24">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap">
                                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                            <i className="fas fa-award"></i>
                                        </div>
                                        <h6 className="text-xl font-semibold">Awarded Agency</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Divide details about your product or agency work into parts.
                                            A paragraph describing a feature will be enough.
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                                            <i className="fas fa-retweet"></i>
                                        </div>
                                        <h6 className="text-xl font-semibold">Free Revisions</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Keep you user engaged by providing meaningful information.
                                            Remember that by this time, the user is curious.
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                            <i className="fas fa-fingerprint"></i>
                                        </div>
                                        <h6 className="text-xl font-semibold">Verified Company</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Write a few lines about each one. A paragraph describing a
                                            feature will be enough. Keep you user engaged!
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </section>

            <GuestLayout>
                <main className="max-w-6xl mx-auto sm:px-6 lg:px-8 bg-white">
                    <div className="flex flex-col justify-center items-center flex-wrap">
                        <div className="mb-8 text-center">
                            <h6 className="text-xl font-semibold">Certified Agencts</h6>
                            <p className="mt-2 mb-4 text-blueGray-500">
                                Divide details about your product or agency work into parts.
                                A paragraph describing a feature will be enough.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-4">
                            <div className="relative w-80 h-auto bg-gray-900 rounded-md pt-24 pb-8 px-4 shadow-md hover:shadow-lg transition flex flex-col items-center">
                                <div className="absolute rounded-full bg-gray-100 w-28 h-28 p-2 z-10 -top-8 shadow-lg hover:shadow-xl transition">
                                    <div className="rounded-full bg-black w-full h-full overflow-auto">
                                        {/* <img src="https://rairaksa.github.io/assets/img/rai.jpg"> */}
                                    </div>
                                </div>
                                <label className="font-bold text-primary text-lg">
                                    Rai Raksa Muhamad
                                </label>
                                <p className="text-center text-primary mt-2 leading-relaxed">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                </p>
                                <ul className="flex flex-row gap-2 mt-4">
                                        <a href="https://instagram.com/raydeon" target="_blank">
                                            <WhatsappIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                        <a href="https://www.linkedin.com/in/rairaksa" target="_blank">
                                            <LinkedinIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                        <a href="https://github.com/rairaksa" target="_blank">
                                            <FacebookIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                </ul>
                            </div>

                            <div className="relative w-80 h-auto bg-gray-900 rounded-md pt-24 pb-8 px-4 shadow-md hover:shadow-lg transition flex flex-col items-center">
                                <div className="absolute rounded-full bg-gray-100 w-28 h-28 p-2 z-10 -top-8 shadow-lg hover:shadow-xl transition">
                                    <div className="rounded-full bg-black w-full h-full overflow-auto">
                                        {/* <img src="https://rairaksa.github.io/assets/img/rai.jpg"> */}
                                    </div>
                                </div>
                                <label className="font-bold text-primary text-lg">
                                    Rai Raksa Muhamad
                                </label>
                                <p className="text-center text-primary mt-2 leading-relaxed">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                </p>
                                <ul className="flex flex-row gap-2 mt-4">
                                        <a href="https://instagram.com/raydeon" target="_blank">
                                            <WhatsappIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                        <a href="https://www.linkedin.com/in/rairaksa" target="_blank">
                                            <LinkedinIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                        <a href="https://github.com/rairaksa" target="_blank">
                                            <FacebookIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                </ul>
                            </div>

                            <div className="relative w-80 h-auto bg-gray-900 rounded-md pt-24 pb-8 px-4 shadow-md hover:shadow-lg transition flex flex-col items-center">
                                <div className="absolute rounded-full bg-gray-100 w-28 h-28 p-2 z-10 -top-8 shadow-lg hover:shadow-xl transition">
                                    <div className="rounded-full bg-black w-full h-full overflow-auto">
                                        {/* <img src="https://rairaksa.github.io/assets/img/rai.jpg"> */}
                                    </div>
                                </div>
                                <label className="font-bold text-primary text-lg">
                                    Rai Raksa Muhamad
                                </label>
                                <p className="text-center text-primary mt-2 leading-relaxed">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                </p>
                                <ul className="flex flex-row gap-2 mt-4">
                                        <a href="https://instagram.com/raydeon" target="_blank">
                                            <WhatsappIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                        <a href="https://www.linkedin.com/in/rairaksa" target="_blank">
                                            <LinkedinIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                        <a href="https://github.com/rairaksa" target="_blank">
                                            <FacebookIcon className="w-12 h-12 rounded-full"/>
                                        </a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </GuestLayout>

            <Footer />

        </>
    )
}
