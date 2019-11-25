import { InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, IconButton, Switch } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
// import './App.css';
import useStateWithCallback from 'use-state-with-callback';


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

const DevicesOfType = ({ devices, onSelectedChange, onDisableLocation }) => {
    const [selectedIndex, setSelectedIndex] = useStateWithCallback(0, selectedIndex => {
        (onSelectedChange || (() => { }))(selectedIndex)
    });
    return (
        <List>
            {
                devices.map((dev, index) =>
                    <ListItem
                        key={dev.name}
                        button
                        selected={selectedIndex === index}
                        onClick={e => setSelectedIndex(index)}
                    >
                        <ListItemText primary={dev.name} />
                        {!dev.position ? null :
                            <IconButton aria-label="Disable location" size="small"
                                onClick={e => onDisableLocation(index)}
                            >
                                <LocationOnIcon />
                            </IconButton>
                        }
                    </ListItem>
                )
            }
        </List >
    )
}

// const iconMarkup = ;
// const customMarkerIcon = ;

const DeviceMarker = ({ device, isSelected, isTypeSelected }) =>
    (
        <Marker position={device.position} key={device.name}
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
                <span>
                    {device.name + '\n' + device.position}
                </span>
            </Popup>
        </Marker >
    )

const App = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedType, setSelectedType] = React.useState(theDevices[0].type);
    const [devices, setDevices] = React.useState(theDevices);
    const [showAll, setShowAll] = React.useState(false);

    return (
        <div className="App">
            <LeafletMap center={position} zoom={14}
                style={{ width: '100%', height: '100vh' }}
                onClick={e => {
                    let tempDevices = devices.slice();
                    tempDevices.find(d => d.type === selectedType).items[selectedIndex].position = [e.latlng.lat, e.latlng.lng];
                    setDevices(tempDevices);
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    devices.find(d => d.type === selectedType).items.map((dev, index) =>
                        (!dev.position ? null :
                            <DeviceMarker key={dev.name} device={dev} isSelected={index === selectedIndex} isTypeSelected={true} />
                        )
                    )
                }
                {
                    showAll ?
                        devices.find(d => d.type !== selectedType).items.map((dev, index) =>
                            (!dev.position ? null :
                                <DeviceMarker key={dev.name} device={dev} isSelected={false} isTypeSelected={false} />
                            )
                        )
                        : null
                }
            </LeafletMap>
            <Paper
                style={{ position: 'absolute', top: 50, width: '30%', right: 50, bottom: 50, justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
            >
                <div
                    style={{ margin: 10 }}
                >
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'inline-block', verticalAlign: 'text-top', margin: 5 }}>
                            <InputLabel id="show-all-types">Show all</InputLabel>
                            <Switch id="show-all-types" color="primary" inputProps={{ 'aria-label': 'primary checkbox' }}
                                value={showAll}
                                onChange={e => setShowAll(e.target.checked)}
                            />
                        </div>
                        <div style={{ display: 'inline-block', verticalAlign: 'text-top', margin: 5 }}>
                            <InputLabel id="select-type">Device Type</InputLabel>
                            <Select
                                id="select-type"
                                value={selectedType}
                                onChange={e => {
                                    setSelectedType(e.target.value);
                                }}
                            >
                                {
                                    devices.map(dev => <MenuItem key={dev.type} value={dev.type}>{dev.type}</MenuItem>)
                                }
                            </Select>
                        </div>
                    </div>
                    <DevicesOfType
                        devices={devices.find(d => d.type === selectedType).items}
                        onSelectedChange={(index) => setSelectedIndex(index)}
                        onDisableLocation={(index) => {
                            let tempDevices = devices.slice();
                            tempDevices.find(d => d.type === selectedType).items[index].position = undefined;
                            setDevices(tempDevices);
                        }}
                    />
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
