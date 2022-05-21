import Head from 'next/head'

const GuestLayout = ({ children }) => {
    return (
        <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
        </div>
    )
}

export default GuestLayout
