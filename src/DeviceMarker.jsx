import React from 'react';
import { Marker, Popup } from "react-leaflet";
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

export const DeviceMarker = ({ device, isSelected, isTypeSelected }) =>
    (
        <Marker key={device.name}
            position={device.position}
            title={device.name}
            icon={divIcon({
                iconSize: [20, 20],
                html: renderToStaticMarkup(
                    <i className=" fa fa-map-marker-alt fa-2x"
                        style={{ color: (isTypeSelected ? (isSelected ? '#297A31' : '#1B2C6F') : '#888888') }}
                    />
                )
            })}
        >
            <Popup>
                {device.name + ' at (' + device.position + ')'}
            </Popup>
        </Marker >
    )
