import Head from 'next/head'
import Image from 'next/image'
import Footer from '../../components/Footer'
import GuestLayout from '../../components/Layouts/GuestLayout'
import Navbar from '../../Components/Navbar'
import axios from '../../lib/axios'
import millify from 'millify'
import {
    CheckCircleIcon,
    SaveIcon,
    SparklesIcon,
    StarIcon,
    TrashIcon,
} from '@heroicons/react/solid'
import { Icon } from '@iconify/react'
import timesCircleLine from '@iconify/icons-clarity/times-circle-line'
import { useState } from 'react'
import Swal from 'sweetalert2'
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'next-share'
import ReactStars from 'react-stars'
import Review from '../../components/Review'
import { useAuth } from '../../hooks/auth'
import Button from '../../components/Buttons/Button'
import Input from '../../components/Form/Input'
import toast from 'react-hot-toast'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import Loader from '../../components/Loader'

const SingleProperty = ({ property }) => {
    const orig = 'http://localhost:8000/storage'
    const favorite = false
    const [ratingRate, setRatingRate] = useState('')
    const [ratingMessage, setRatingMessage] = useState('')
    const [errors, setErrors] = useState([])
    const [showReview, setShowReview] = useState(false)
    const [showAdvanceFeature, setShowAdvanceFeature] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user } = useAuth({ middleware: 'auth' })

    const propertyFavorite = async id => {
        const isConfirm = await Swal.fire({
            title: 'Hello dear user?',
            text: 'Do you want to add this property to your favourite?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#F9A01B',
            confirmButtonText: 'Yes, i want to!',
        }).then(result => {
            return result.isConfirmed
        })
    }

    const showReviews = () => {
        setShowReview((showReview = !showReview))
    }

    const showAdvanceFeatures = () => {
        setShowAdvanceFeature((showAdvanceFeature = !showAdvanceFeature))
    }

    const ratingChanged = newRating => {
        setRatingRate(newRating)
    }

    const submitRating = async event => {
        event.preventDefault()
        let toastId
        toastId = toast.loading('Submiting...')
        setErrors([])

        try {
            axios
                .post('/api/v1/reviews', {
                    rating: ratingRate,
                    message: ratingMessage,
                    property_id: property.id,
                })
                .then(
                    setRatingMessage(''),
                    toast.success(
                        'Your review has been successfully submitted!',
                        {
                            id: toastId,
                        },
                    ),
                )
                .catch(error => {
                    if (error.response.status !== 422) throw error
                    setErrors(Object.values(error.response.data.errors).flat())
                    toast.error('unable to submit review', { id: toastId })
                })
        } catch (e) {
            console.log(e)
            toast.error('unable to submit review', { id: toastId })
        }
    }

    const bookProperty = async id => {

        setLoading(true)

        const isConfirm = await Swal.fire({
            title: 'Hello, please confirm!',
            text: 'Are you sure you want to book this property?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#F9A01B',
            confirmButtonText: 'Yes, i want to!',
        }).then(result => {
            return result.isConfirmed
        })

        if (!isConfirm) {
            return
        }

        await axios
            .post(`/api/v1/bookings`, {
                property_id: id,
            })
            .then((response ) => {
                if(response.data.status === 'success'){
                    Swal.fire({
                        icon: 'success',
                        text: 'You have successfully booked this property!',
                    })
                    setTimeout(window.location.href = '/bookings',40000)
                }
                setLoading(false)
            })
            .catch(( error ) => {
                Swal.fire({
                    text: error.response.data.error,
                    icon: 'error',
                })
                setLoading(false)
            })
    }

    return (
        <>
            <Head>
                <title> Colony - {property.attribute.title} </title>
            </Head>

            <Navbar />

            <GuestLayout>
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container px-5 py-2 mx-auto">
                        <div className=" mx-auto flex flex-wrap">
                            <Image
                                src={orig + '/' + property.attribute.image}
                                alt={property.attribute.title}
                                width="500px"
                                height="500px"
                                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    PROPERTY NAME
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    {property.attribute.title}
                                </h1>

                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            color2={'#ffd700'}
                                        />
                                        <span className="text-gray-600 ml-3">
                                            4 Reviews
                                        </span>
                                    </span>

                                    <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                        <FacebookShareButton
                                            url={'http://localhost:3000'}
                                            title={
                                                'next-share is a social share buttons for your next React apps.'
                                            }>
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <PinterestShareButton
                                            url={'http://localhost:3000'}
                                            title={
                                                'next-share is a social share buttons for your next React apps.'
                                            }>
                                            <PinterestIcon size={32} round />
                                        </PinterestShareButton>
                                        <RedditShareButton
                                            url={'http://localhost:3000'}
                                            title={
                                                'next-share is a social share buttons for your next React apps.'
                                            }>
                                            <RedditIcon size={32} round />
                                        </RedditShareButton>
                                        <WhatsappShareButton
                                            url={'http://localhost:3000'}
                                            title={
                                                'next-share is a social share buttons for your next React apps.'
                                            }>
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                        <LinkedinShareButton
                                            url={'http://localhost:3000'}
                                            title={
                                                'next-share is a social share buttons for your next React apps.'
                                            }>
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                    </div>
                                </div>

                                <p className="leading-relaxed">
                                    {property.attribute.description}
                                </p>

                                <div className="flex mt-6 items-center justify-start space-x-4 mb-5">
                                    <p>
                                        <bold className="font-bold font-sans text-secondary">
                                            Bedroom
                                        </bold>
                                        : {property.attribute.bedroom}
                                    </p>
                                    <p>
                                        <bold className="font-bold font-sans text-secondary">
                                            Bathroom
                                        </bold>
                                        : {property.attribute.bathroom}
                                    </p>
                                    <p className="border-2 font-semibold italic rounded-full bg-primary text-white border-secondary p-2">
                                        {property.attribute.frequency}
                                    </p>
                                    <p className="border-2 font-semibold italic rounded-full bg-primary text-white border-secondary p-2">
                                        {property.attribute.purpose}
                                    </p>
                                </div>

                                <div className="flex mt-6 items-center pt-5 border-t-2 border-gray-200">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        <span className="text-xs">NGN</span>{' '}
                                        {millify(property.attribute.price)}
                                    </span>
                                    <button
                                        className="button2"
                                        onClick={() =>
                                            bookProperty(property.id)
                                        }>
                                        
                                        {
                                            loading ? 
                                            <div div className='flex justify-center items-center gap-2'>
                                                <Image src="/bs.svg" alt='submitting...' width={25} height={25}/>
                                                Submitting...
                                            </div>
                                            : 
                                            <>
                                                <SaveIcon className="w-6 h-6" />
                                                Book Property
                                            </>
                                        }
                                        
                                    </button>
                                    <button
                                        className={`favourite ${
                                            favorite
                                                ? 'text-danger-500'
                                                : 'text-gray'
                                        }`}
                                        onClick={() =>
                                            propertyFavorite(property.id)
                                        }>
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3  mt-8">
                            <div className="">
                                <div className="flex justify-center items-center gap-8">
                                    <Button onClick={showAdvanceFeatures}>
                                        {showAdvanceFeature === true
                                            ? 'Hide'
                                            : 'Show'}{' '}
                                        {''}
                                        Advance Features
                                    </Button>

                                    <Button onClick={showReviews}>
                                        {showReview === true ? 'Hide' : 'Show'}{' '}
                                        {''}
                                        Reviews
                                    </Button>
                                </div>

                                <div>
                                    {showAdvanceFeature && (
                                        <div className="grid lg:grid-cols-3 md:grid-cols-2 m-auto p-2 space-y-2">
                                            <p className="flex items-center space-x-2">
                                                <bold className="font-bold font-sans text-secondary">
                                                    Fenced
                                                </bold>
                                                :
                                                {property.attribute.fence ===
                                                true ? (
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Icon
                                                        icon={timesCircleLine}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <bold className="font-bold font-sans text-secondary">
                                                    Swiming Pool
                                                </bold>
                                                :
                                                {property.attribute.pool ===
                                                true ? (
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Icon
                                                        icon={timesCircleLine}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <bold className="font-bold font-sans text-secondary">
                                                    Air Conditioning
                                                </bold>
                                                :
                                                {property.attribute
                                                    .conditioning === true ? (
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Icon
                                                        icon={timesCircleLine}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <bold className="font-bold font-sans text-secondary">
                                                    Laundry Room:{' '}
                                                </bold>
                                                {property.attribute.laundry ===
                                                true ? (
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Icon
                                                        icon={timesCircleLine}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <bold className="font-bold font-sans text-secondary">
                                                    Furnished:{' '}
                                                </bold>
                                                {property.attribute.furnish ===
                                                true ? (
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Icon
                                                        icon={timesCircleLine}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <bold className="font-bold font-sans text-secondary">
                                                    Car Park:{' '}
                                                </bold>
                                                {property.attribute.park ===
                                                true ? (
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Icon
                                                        icon={timesCircleLine}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <bold className="font-bold font-sans text-secondary">
                                                    Wifi:{' '}
                                                </bold>
                                                {property.attribute.wifi ===
                                                true ? (
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Icon
                                                        icon={timesCircleLine}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    {showReview && (
                                        <div>
                                            <Review
                                                name="Shittu Oluwaseun"
                                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
                                            />
                                            <Review
                                                name="Shittu Oluwaseun"
                                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
                                            />
                                            <Review
                                                name="Shittu Oluwaseun"
                                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="">
                                <div className="mt-6 border-2 border-secondary p-4 rounded-xl">
                                    <form onSubmit={submitRating}>
                                        <h5 className="font-bold text-primary mb-2  text-center">
                                            Leave a review on this property
                                        </h5>

                                        <AuthValidationErrors
                                            className="mb-2"
                                            errors={errors}
                                        />

                                        <div className="flex items-center justify-center">
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                color2={'#ffd700'}
                                                onChange={ratingChanged}
                                            />
                                        </div>

                                        <Input
                                            id="message"
                                            type="text"
                                            value={ratingMessage}
                                            placeholder="How do you feel about this product?"
                                            onChange={event =>
                                                setRatingMessage(
                                                    event.target.value,
                                                )
                                            }
                                            required
                                        />

                                        <div className="mt-2">
                                            <Button>Submit Review</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </GuestLayout>
            <Footer />
        </>
    )
}

export default SingleProperty

export async function getStaticPaths() {
    const response = await axios.get('/api/v1/properties')
    return {
        fallback: false,
        paths: response.data.data.map(property => ({
            params: { id: property.id },
        })),
    }
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/properties/${params.id}`)
    const property = response.data.properties

    return {
        props: {
            property,
        },
    }
}
