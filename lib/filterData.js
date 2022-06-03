export const filterData = [
    {
        items: [
            { name: 'Buy', value: 'for-sale' },
            { name: 'Rent', value: 'for-rent' },
        ],
        placeholder: 'Purpose',
        queryName: 'purpose',
    },
    {
        items: [
            { name: 'Monthly', value: 'monthly' },
            { name: 'Yearly', value: 'yearly' },
        ],
        placeholder: 'Rent Frequency',
        queryName: 'frequency',
    },
    {
        items: [
            { name: '30,000', value: '30000' },
            { name: '40,000', value: '40000' },
            { name: '50,000', value: '50000' },
            { name: '60,000', value: '60000' },
            { name: '85,000', value: '85000' },
        ],
        placeholder: 'Min Price(NG)',
        queryName: 'minPrice',
    },
    {
        items: [
            { name: '50,000', value: '50000' },
            { name: '60,000', value: '60000' },
            { name: '85,000', value: '85000' },
            { name: '110,000', value: '110000' },
            { name: '135,000', value: '135000' },
            { name: '160,000', value: '160000' },
            { name: '185,000', value: '185000' },
            { name: '200,000', value: '200000' },
            { name: '300,000', value: '300000' },
            { name: '400,000', value: '400000' },
            { name: '500,000', value: '500000' },
            { name: '600,000', value: '600000' },
            { name: '700,000', value: '700000' },
            { name: '800,000', value: '800000' },
            { name: '900,000', value: '900000' },
            { name: '1000,000', value: '1000000' },
        ],
        placeholder: 'Max Price(NG)',
        queryName: 'maxPrice',
    },
    {
        items: [
            { name: 'Lowest Price', value: 'price-asc' },
            { name: 'Highest Price', value: 'price-des' },
            { name: 'Newest', value: 'asc' },
            { name: 'Oldest', value: 'desc' },
        ],
        placeholder: 'Sort',
        queryName: 'sort',
    },
    {
        items: [
            { name: '1', value: '1' },
            { name: '2', value: '2' },
            { name: '3', value: '3' },
            { name: '4', value: '4' },
            { name: '5', value: '5' },
            { name: '6', value: '6' },
            { name: '7', value: '7' },
            { name: '8', value: '8' },
            { name: '9', value: '9' },
            { name: '10', value: '10' },
        ],
        placeholder: 'Rooms',
        queryName: 'roomsMin',
    },
    {
        items: [
            { name: '1', value: '1' },
            { name: '2', value: '2' },
            { name: '3', value: '3' },
            { name: '4', value: '4' },
            { name: '5', value: '5' },
            { name: '6', value: '6' },
            { name: '7', value: '7' },
            { name: '8', value: '8' },
            { name: '9', value: '9' },
            { name: '10', value: '10' },
        ],
        placeholder: 'Baths',
        queryName: 'bathsMin',
    },
    {
        items: [
            { name: 'Apartment', value: '1' },
            { name: 'Townhouses', value: '2' },
            { name: 'Villas', value: '3' },
            { name: 'Penthouses', value: '4' },
            { name: 'Hotel Apartments', value: '5' },
            { name: 'Residential Plot', value: '6' },
            { name: 'Residential Floor', value: '7' },
            { name: 'Residential Building', value: '8' },
            { name: 'Office Space', value: '9' },
            { name: 'Shop Space', value: '10' },
        ],
        placeholder: 'Category',
        queryName: 'categoryExternalID',
    },
]

export const getFilterValues = filterValues => {
    const {
        purpose,
        frequency,
        categoryExternalID,
        minPrice,
        maxPrice,
        roomsMin,
        bathsMin,
        sort,
        locationExternalIDs,
    } = filterValues

    const values = [
        {
            name: 'purpose',
            value: purpose,
        },
        {
            name: 'frequency',
            value: frequency,
        },
        {
            name: 'minPrice',
            value: minPrice,
        },
        {
            name: 'maxPrice',
            value: maxPrice,
        },
        {
            name: 'roomsMin',
            value: roomsMin,
        },
        {
            name: 'bathsMin',
            value: bathsMin,
        },
        {
            name: 'sort',
            value: sort,
        },
        {
            name: 'locationExternalIDs',
            value: locationExternalIDs,
        },
        {
            name: 'categoryExternalID',
            value: categoryExternalID,
        },
    ]

    return values
}
