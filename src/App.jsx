import React from 'react';
import logo from './logo.svg';
// import './App.css';

import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import Paper from '@material-ui/core/Paper';

const position = [32.081128, 34.779729]

const App = () => (
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

        </Paper>
        {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and sfsdfsdfsave to reload.
        </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
        </a>
        </header> */}
    </div>
)

export default App;
