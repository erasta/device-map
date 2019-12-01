import {
    InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, IconButton, Switch
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Icon from '@material-ui/core/Icon';
import React, { useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import { Map as LeafletMap, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
// import './App.css';
import useStateWithCallback from 'use-state-with-callback';
import { Curve } from 'react-leaflet-curve';

console.log(new Date());

const position = [32.081128, 34.779729];
const theDevices = [
    {
        "type": "wind",
        "items": [
            { "name": "Device 1", "position": [32.08, 34.77] },
            { "name": "Device 2" },
            { "name": "Device 3", "position": [32.07, 34.78] },
            { "name": "Device 4" }]
    },
    {
        "type": "water",
        "items": [
            { "name": "Device 5" },
            { "name": "Device 6", "position": [32.080320121040344, 34.78262901306153] },
            { "name": "Device 7" },
            { "name": "Device 8", "position": [32.0678106134499, 34.768552780151374] }
        ]
    }
];

const DeviceRow = ({ dev, isSelected, onClick, onDisableLocation }) => (
    <ListItem
        key={dev.name}
        button
        selected={isSelected}
        onClick={onClick}
    >
        <ListItemText primary={dev.name} />
        {!dev.position ? null :
            <IconButton aria-label="Disable location" size="small"
                onClick={onDisableLocation}
            >
                <LocationOnIcon />
            </IconButton>
        }
    </ListItem>
)

const DeviceMarker = ({ device, isSelected, isTypeSelected }) =>
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

const lerp = (from, to, t) => {
    return [from[0] * (1 - t) + to[0] * t, from[1] * (1 - t) + to[1] * t];
};

const resampleLine = (from, to, num) => {
    let ret = new Array(num);
    ret[0] = from;
    for (let i = 1; i < num - 1; ++i) {
        ret[i] = lerp(from, to, i / (num - 1));
    }
    ret[num - 1] = to;
    return ret;
}

let lastIndex;

const App = () => {
    let hoverPoint;
    const mapElement = useRef(null);
    const currPolyline = useRef(null);

    const [selection, setSelection] = React.useState([]);
    const [selectedType, setSelectedType] = React.useState(theDevices[0].type);
    const [devices, setDevices] = React.useState(theDevices);
    const [showAll, setShowAll] = React.useState(false);
    const [shape, setShape] = React.useState("Point");
    const [startPoint, setStartPoint] = React.useState(undefined);

    const changeLocations = (type, indices, newLocations) => {
        let tempDevices = devices.slice();
        let typeDevices = tempDevices.find(d => d.type === type).items;
        for (let i = 0; i < indices.length; ++i) {
            typeDevices[indices[i]].position = newLocations[Math.min(i, newLocations.length - 1)];
        }
        return tempDevices;
    };

    const handleSelectionClick = (index, doRange) => {
        let sel = [];
        if (!doRange) {
            if (selection.includes(index)) {
                sel = selection.filter(s => s !== index);
            } else {
                sel = selection.concat([index]);
            }
        } else if (lastIndex !== undefined) {
            const low = Math.min(index, lastIndex), high = Math.max(index, lastIndex);
            sel = selection.filter(s => s < low);
            for (let i = low; i <= high; ++i) {
                sel.push(i);
            }
            sel.concat(selection.filter(s => s > high));
        }
        setSelection(sel.sort());
        lastIndex = index;
    }

    const handleMapClick = e => {
        if (selection.length < 1) return;
        if (shape === 'Point') {
            changeLocations(selectedType, selection, [[e.latlng.lat, e.latlng.lng]]);
            setSelection([]);
        } else {
            if (!startPoint) {
                setStartPoint([e.latlng.lat, e.latlng.lng]);
            } else {
                let positions;
                if (shape === 'Line') {
                    positions = resampleLine(startPoint, [e.latlng.lat, e.latlng.lng], selection.length);
                } else if (shape === 'Curve') {
                }
                let tempDevices = changeLocations(selectedType, selection, positions);
                setDevices(tempDevices);
                setStartPoint(undefined);
                setSelection([]);
            }
        }
    };

    const handleMouseMove = e => {
        hoverPoint = e.latlng;
        if (startPoint) {
            if (shape === 'Line') {
                currPolyline.current.leafletElement.setLatLngs([hoverPoint, startPoint]);
            } else if (shape === 'Curve') {

            }
        }
    };

    return (
        <div className="App">
            <LeafletMap center={position} zoom={14}
                ref={mapElement}
                style={{ width: '100%', height: '100vh' }}
                onClick={handleMapClick}
                onMouseMove={handleMouseMove}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    devices.map(devType => {
                        if (showAll || (devType.type === selectedType)) {
                            return devType.items.map((dev, index) => {
                                if (dev.position) {
                                    return <DeviceMarker key={dev.name} device={dev}
                                        isSelected={selection.includes(index)}
                                        isTypeSelected={devType.type === selectedType}
                                    />
                                } else {
                                    return null;
                                }
                            });
                        } else {
                            return null;
                        }
                    })
                }

                {
                    (() => {
                        if (startPoint) {
                            if (shape === 'Line') {
                                return <Polyline positions={[startPoint, startPoint]} ref={currPolyline} />
                            } else if (shape === 'Curve') {
                            }
                        }
                    })()
                }

            </LeafletMap>
            <Paper
                style={{ position: 'absolute', top: 50, width: '30%', right: 50, bottom: 50, justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
            >
                <div
                    style={{ margin: 10 }}
                >
                    <ToggleButtonGroup
                        style={{ margin: 5 }}
                        size="small"
                        value={shape}
                        exclusive
                        onChange={(e, newShape) => setShape(newShape)}
                    >
                        <ToggleButton value="Point">
                            Point
                        </ToggleButton>
                        <ToggleButton value="Line">
                            Line
                        </ToggleButton>
                        <ToggleButton value="Curve">
                            Curve
                        </ToggleButton>
                        <ToggleButton value="Rectangle" disabled>
                            Rect
                        </ToggleButton>
                        <ToggleButton value="Polyline" disabled>
                            Poly
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'inline-block', verticalAlign: 'text-top', margin: 5 }}>
                            <InputLabel id="show-all-types" style={{ fontSize: 10 }}>Show all</InputLabel>
                            <Switch id="show-all-types" color="primary" inputProps={{ 'aria-label': 'primary checkbox' }}
                                value={showAll}
                                onChange={e => setShowAll(e.target.checked)}
                            />
                        </div>
                        <div style={{ display: 'inline-block', verticalAlign: 'text-top', margin: 5 }}>
                            <InputLabel id="select-type" style={{ fontSize: 10 }}>Device Type</InputLabel>
                            <Select
                                id="select-type"
                                value={selectedType}
                                onChange={e => {
                                    setSelection([]);
                                    setSelectedType(e.target.value);
                                }}
                            >
                                {
                                    devices.map(dev => (
                                        <MenuItem key={dev.type} value={dev.type}>
                                            {dev.type}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>

                    <List>
                        {
                            devices.find(d => d.type === selectedType).items.map((dev, index) =>
                                <DeviceRow
                                    key={dev.name}
                                    dev={dev}
                                    isSelected={selection.includes(index)}
                                    onClick={e => handleSelectionClick(index, e.shiftKey)}
                                    onDisableLocation={e => changeLocations(selectedType, [index], [undefined])}
                                />
                            )
                        }
                    </List >
                </div>
                <TextField
                    id="outlined-multiline-static"
                    label="Json"
                    multiline
                    rows="10"
                    variant={"outlined"}
                    style={{ position: 'absolute', bottom: 10, right: 10, left: 10, justifyContent: 'center' }}
                    inputProps={{ style: { fontSize: 10, lineHeight: 1 } }}
                    value={JSON.stringify(devices, null, 2)}
                    onChange={e => setDevices(JSON.parse(e.target.value))}
                />
            </Paper>
        </div>
    )
}

export default App;
