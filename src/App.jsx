import React, { useState } from 'react';
// import './App.css';

import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import Paper from '@material-ui/core/Paper';
import { List, ListItem, ListItemText } from '@material-ui/core';

const position = [32.081128, 34.779729];
const devices = [
    {name: "Device 1"},
    {name: "Device 2"},
    {name: "Device 3"},
    {name: "Device 4"},
];

const App = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    return (
        <div className="App">
            <LeafletMap center={position} zoom={14} style={{ width: '100%', height: '100vh' }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <span>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </span>
                    </Popup>
                </Marker>
            </LeafletMap>
            <Paper style={{ position: 'absolute', top: 50, width: 300, right: 50, bottom: 50, justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <List>
                    {
                        devices.map((dev, index) => <ListItem
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
            </Paper>
        </div>
    )
}

export default App;
