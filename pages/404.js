import { HomeIcon } from "@heroicons/react/solid"
import Link from "next/link"
import Button from "../components/Form/Button"

const NotFoundPage = () => (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                <div className="px-4 text-lg text-primary border-r border-primary tracking-wider">
                    404
                </div>

                <div className="ml-4 text-lg text-primary uppercase tracking-wider">
                    Not Found 
                </div>
            </div>

            <Link href="/" passHref>
                <Button className="flex items-center justify-center p-2 mt-2"><HomeIcon className="w-6 h-6 mr-2"/> Go Back Home</Button>
            </Link>
        </div>
    </div>
)

export default NotFoundPage
