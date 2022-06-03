import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { filterData, getFilterValues } from '../lib/filterData'
import Button from '../components/Buttons/Button'
import Input from './Form/Input'
import Image from 'next/image'
import axios from '../lib/axios'

const SearchComponent = () => {
    const [filters, setFilters] = useState(filterData)
    const [searchTerm, setSearchTerm] = useState('')
    const [locationData, setLocationData] = useState()
    const [showLocations, setShowLocations] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const searchProperties = filterValues => {
        const path = router.pathname
        const { query } = router

        const values = getFilterValues(filterValues)

        values.forEach(item => {
            if (item.value && filterValues?.[item.name]) {
                query[item.name] = item.value
            }
        })

        router.push({ pathname: path, query: query })
    }

    // useEffect(() => {
    //     if (searchTerm !== '') {
    //         const fetchData = async () => {
    //             setLoading(true)
    //             const data = await axios.get(
    //                 `/api/v1/properties?search=${searchTerm}`,
    //             )
    //             console.log(data.data)
    //             setLoading(false)
    //             setLocationData(data.data?.hits)
    //         }

    //         fetchData()
    //     }
    // }, [searchTerm])
    return (
        <>
            <div className="p-2 bg-gray-100">
                <div className="flex flex-wrap">
                    {filters.map(filter => (
                        <div key={filter.queryName}>
                            <select
                                onChange={e =>
                                    searchProperties({
                                        [filter.queryName]: e.target.value,
                                    })
                                }
                                className="p-2 mx-2 my-1">
                                <option>{filter.placeholder}</option>
                                {filter?.items?.map(item => (
                                    <option value={item.value} key={item.value}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="flex justifyw-center items-center mt-2">
                    <Button
                        className="p-1"
                        onClick={() => setShowLocations(!showLocations)}>
                        Search Location
                    </Button>

                    {showLocations && (
                        <div className="flex flex-column     pt-2">
                            <Input
                                placeholder="Type Here"
                                value={searchTerm}
                                type="search"
                                onChange={e => setSearchTerm(e.target.value)}
                            />

                            {showLocations && (
                                <div className="h-300 overflow-auto">
                                    {locationData?.map(location => (
                                        <div
                                            key={location.id}
                                            onClick={() => {
                                                searchProperties({
                                                    locationExternalIDs:
                                                        location.externalID,
                                                })
                                                setShowLocations(false)
                                                setSearchTerm(location.title)
                                            }}>
                                            <h5 className="cursor-pointer p-2 bg-gray-200 border-primary border-b-1">
                                                {location.title}
                                            </h5>
                                        </div>
                                    ))}
                                    {!loading && !locationData?.length && (
                                        <div className="flex justify-center items-center flex-column mt-5 mb-5">
                                            <Image
                                                src="/noresult.svg"
                                                alt="no result"
                                                width={60}
                                                height={30}
                                            />
                                            <p className="text-xl mt-3"></p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchComponent
