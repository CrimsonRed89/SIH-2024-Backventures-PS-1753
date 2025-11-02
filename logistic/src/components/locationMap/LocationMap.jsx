import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './locationMap.scss'
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
Geocode.setLocationType("ROOFTOP");

const LocationMap = ({locationArray}) => {
    return (
        <div className='mapContainer'>
            <MapContainer center={[38.35547335, -104.1913469]} zoom={2} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    {
                        locationArray.map((location) => (
                        <Marker
                            key={location.latitude.toString()}
                            position={[location.latitude, location.longitude]}
                        >
                        
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    )
}

export default LocationMap