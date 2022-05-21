import React from 'react'
import Image from 'next/image'
import Router from 'next/router'
import { CalendarIcon, HeartIcon, MenuIcon, SparklesIcon, StarIcon, UserIcon } from '@heroicons/react/solid'
import millify from 'millify'

const Card = ({ property, favorite = false, onClickFavorite = () => null }) => {
    const orig = 'http://localhost:8000/storage'
    
    return (
        <>
            <div className="flex py-7 px-2 border-b first:border-t cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out pr-4">
                <div
                    onClick={() =>
                        Router.push('/property/[id]', `/property/${property.id}`)
                    }
                    className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                    {property.attribute.image ? (
                        <Image
                            src={orig + '/' + property.attribute.image}
                            alt={property.attribute.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-2xl"
                        />
                    ) : null}
                </div>

                <div className="flex flex-col flex-grow pl-5">
                    <div className="flex lg:justify-between space-x-32 items-center">
                        <div className="flex space-x-1 rounded-full text-sm font-bold text-[#000] capitalize">
                            <p className="button flex justify-between items-center">
                                <CalendarIcon className="w-6 h-6 mr-4" />
                                {property.attribute.purpose}
                            </p>
                            <p className="button bg-secondary flex justify-between items-center">
                                <UserIcon className="w-6 h-6 mr-4"/>
                                {property.relationships.agent.name}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={e => {
                                e.preventDefault()
                                if (typeof onClickFavorite === 'function') {
                                    onClickFavorite(property.id)
                                }
                            }}>
                            <HeartIcon
                                className={`favourite ${
                                    favorite ? 'text-danger-500' : 'text-gray'
                                }`}
                            />
                        </button>
                    </div>

                    <h1
                        onClick={() =>
                            Router.push(
                                '/property/[id]',
                                `/property/${property.id}`,
                            )
                        }
                        className="text-2xl font-bold hover:text-primary">
                        {property.attribute.title}
                    </h1>
                    <div className="border-b w-70 pt-2">
                        <p className="pt-2 text-sm text-gray-500 flex-grow">
                            {property.attribute.excerpt}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="mt-14 mb-4  flex items-center justify-center">
                            <p className="text-lg font-bold pb-2 lg:text-2xl">
                                <span className="text-xs">NGN</span>
                                {millify(property.attribute.price)}{' '}
                                <span className="text-xs text-gray-500">
                                    {property.attribute.frequency &&
                                        `/${property.attribute.frequency}`}
                                </span>
                            </p>
                        </div>
                        <div className="mt-14 mb-4 flex items-center justify-between">
                            <div className="mr-1 flex flex-1 items-center justify-center font-bold">
                                <CalendarIcon className="w-6 h-6 mr-1 text-secondary" />

                                {property.attribute.built}
                            </div>
                            <div className="mr-1 flex flex-1 items-center justify-center font-bold">
                                <SparklesIcon className="w-6 h-6 mr-1 text-secondary"/>
                                {property.attribute.frequency}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
