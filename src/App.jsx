import React from 'react';
// import './App.css';
import useStateWithCallback from 'use-state-with-callback';

import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import Paper from '@material-ui/core/Paper';
import { List, ListItem, ListItemText, InputLabel, Select, MenuItem } from '@material-ui/core';

const position = [32.081128, 34.779729];
const theDevices = [
    {
        type: "wind", items: [
            { name: "Device 1", position: [32.08, 34.77] },
            { name: "Device 2" },
            { name: "Device 3", position: [32.07, 34.78] },
            { name: "Device 4" }]
    },
    {
        type: "water", items: [
            { name: "Device 5", position: [31.9, 34.77] },
            { name: "Device 6" },
            { name: "Device 7", position: [31.99, 34.78] },
            { name: "Device 8" }]
    }
];

const DevicesOfType = ({ devices, onDeviceChange }) => {
    const [selectedIndex, setSelectedIndex] = useStateWithCallback(0, selectedIndex => {
        if (onDeviceChange) onDeviceChange(selectedIndex)
    });
    return (
        <List>
            {
                devices.map((dev, index) =>
                    <ListItem
                        key={dev.name}
                        button
                        selected={selectedIndex === index}
                        onClick={event => setSelectedIndex(index)}
                    >
                        <ListItemText primary={dev.name} />
                    </ListItem>
                )
            }
        </List>
    )
}

const App = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedType, setSelectedType] = React.useState(theDevices[0].type);
    const [devices, setDevices] = React.useState(theDevices);

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
                    devices.find(d => d.type === selectedType).items.map((dev, index) => (
                        (!dev.position) ?
                            null :
                            <Marker position={dev.position} key={dev.name}>
                                <Popup>
                                    <span>
                                        {dev.name}
                                    </span>
                                </Popup>
                            </Marker>
                    ))
                }
            </LeafletMap>
            <Paper
                style={{ position: 'absolute', top: 50, width: '30%', right: 50, bottom: 50, justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
            >
                <div
                    style={{ margin: 10 }}
                >
                    <InputLabel id="select-type">Device Type</InputLabel>
                    <Select
                        labelId="select-type"
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
                    <DevicesOfType devices={devices.find(d => d.type === selectedType).items} onDeviceChange={(index) => setSelectedIndex(index)} />
                </div>
            </Paper>
        </div>
    )
}

export default App;
