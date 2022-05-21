import Card from './Card'

const Grid = ({ properties }) => {
    const isEmpty = properties.length === 0

    const toggleFavorite = async id => {
        // TODO: Add/remove home from the authenticated user's favorites
    }

    return isEmpty ? (
        <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
            <span>Unfortunately, there is nothing to display yet.</span>
        </p>
    ) : (
        <div className="">
            {properties.map(property => (
                <Card
                    key={property.id}
                    property={property}
                    onClickFavorite={toggleFavorite}
                />
            ))}
        </div>
    )
}

export default Grid
