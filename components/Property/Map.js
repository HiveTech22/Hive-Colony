import { getCenter } from 'geolib'
import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

function Map({ properties }) {
    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = properties.map(result => ({
        longitude: result.attribute.longitude,
        latitude: result.attribute.latitude,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph"
            mapboxAccessToken={process.env.MAPBOXGL_KEY}
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}>
            {properties.map(result => (
                <div key={result.id}>
                    <Marker
                        longitude={result.attribute.longitude}
                        latitude={result.attribute.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}>
                        <p
                            role="img"
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin">
                            here
                        </p>
                    </Marker>

                    {/* popup */}
                    {selectedLocation.lng === result.attribute.longitude ? (
                        <Popup
                            longitude={result.lng}
                            latitude={result.lat}
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}>
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
