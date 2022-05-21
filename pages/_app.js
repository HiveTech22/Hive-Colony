import '../styles/globals.css'
import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import Loader from '../components/Loader'

const progress = new ProgressBar({
    size: 4,
    color: '#F9A01B',
    className: 'z-50',
    delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false)
    Router.events.on('routeChangeStart', url => {
        setLoading(true)
    })
    Router.events.on('routeChangeComplete', url => {
        setLoading(false)
    })
    return (
        <>
            {loading && <Loader />}
            <Component {...pageProps} />
            <Toaster />
        </>
    )
}

export default MyApp
