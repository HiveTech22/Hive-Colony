import { createContext, useContext, useEffect, useReducer } from 'react'

const Store = createContext()

const SET_BOOKING = 'SET_BOOKING'

const initialState = {
    total_items: 0,
    total_unique_items: 0,
    line_items: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_BOOKING:
            return { ...state, ...action.payload }
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

export const useStore = () => useContext(Store)

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getBooking()
    }, [])

    // console.log(setBookings)

    const setBookings = payload => dispatch({ type: SET_BOOKING, payload })

    const getBooking = async () => {
        try {
            const Bookings = async () => {
                await axios.get(`/api/v1/bookings`)
            }
            setBookings(Bookings)
        } catch (error) {}
    }

    return (
        <Store.Provider value={[state, setBookings]}>{children}</Store.Provider>
    )
}
``