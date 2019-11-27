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


const DevicesOfType = ({ devices, onSelectionChange, onDisableLocation }) => {
    const [selection, setSelection] = useStateWithCallback([], selection => {
        (onSelectionChange || (() => { }))(selection)
    });
    return (
        <List>
            {
                devices.map((dev, index) =>
                    <DeviceRow
                        key={dev.name}
                        dev={dev}
                        isSelected={selection.includes(index)}
                        onClick={
                            e => {
                                if (selection.includes(index)) {
                                    setSelection(selection.filter(s => s !== index));
                                } else {
                                    setSelection(selection.concat([index]).sort());
                                }
                            }
                        }
                        onDisableLocation={e => onDisableLocation(index)}
                    />
                )
            }
        </List >
    )
}

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
                {device.name + ' at (' + device.position + ')'}
            </Popup>
        </Marker >
    )

const App = () => {
    const [selection, setSelection] = React.useState([]);
    const [selectedType, setSelectedType] = React.useState(theDevices[0].type);
    const [devices, setDevices] = React.useState(theDevices);
    const [showAll, setShowAll] = React.useState(false);

    return (
        <div className="App">
            <LeafletMap center={position} zoom={14}
                style={{ width: '100%', height: '100vh' }}
                onClick={e => {
                    let tempDevices = devices.slice();
                    let tempDevicesOfType = tempDevices.find(d => d.type === selectedType).items;
                    selection.forEach(s => tempDevicesOfType[s].position = [e.latlng.lat, e.latlng.lng]);
                    setDevices(tempDevices);
                }}
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
                                    devices.map(dev => (
                                        <MenuItem key={dev.type} value={dev.type}>{dev.type}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                    <DevicesOfType
                        devices={devices.find(d => d.type === selectedType).items}
                        onSelectionChange={(selection) => setSelection(selection)}
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
