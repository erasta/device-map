import { Button, List, Paper } from '@material-ui/core';
import React, { useRef } from 'react';
import { Map as LeafletMap, Polyline, TileLayer } from "react-leaflet";
import { theDevices } from './DataContents';
import { DeviceMarker } from './DeviceMarker';
import { DeviceRow } from './DeviceRow';
import { JsonStreamer } from './JsonStreamer';
import { ShapeChooser } from './ShapeChooser';
import { TypeChooser } from './TypeChooser';
import { arcCurveFromPoints, resamplePolyline, splineCurve } from './Utils';

console.log(new Date());

const position = [32.081128, 34.779729];

let lastIndex;
let markedPoints;

export const App = () => {
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
        // if (selection.length < 1) return;
        if (shape === 'Point') {
            changeLocations(selectedType, selection, [[e.latlng.lat, e.latlng.lng]]);
            setSelection([]);
        } else {
            if (!startPoint) {
                setStartPoint([e.latlng.lat, e.latlng.lng]);
                markedPoints = [];
            } else {
                markedPoints.push([e.latlng.lat, e.latlng.lng]);
            }
        }
    };

    const handlePutDevices = () => {
        let positions = [startPoint].concat(markedPoints);
        if (shape === 'Poly') {
            positions = resamplePolyline(positions, selection.length);
        } else if (shape === 'Curve') {
            positions = resamplePolyline(splineCurve(positions, 100), selection.length);
        } else if (shape === 'Arc') {
            positions = resamplePolyline(arcCurveFromPoints(positions, 400), selection.length);
        }
        let tempDevices = changeLocations(selectedType, selection, positions);
        setDevices(tempDevices);
        setStartPoint(undefined);
        setSelection([]);
    };

    const shapeOptions = [
        {
            name: 'Point',
            toLine: points => []
        },
        {
            name: 'Poly',
            toLine: points => points
        },
        {
            name: 'Curve',
            toLine: points => splineCurve(points, 100)
        },
        {
            name: 'Arc',
            toLine: points => {
                if (points.length === 2) return points;
                return [points[0]].concat(arcCurveFromPoints(points, 400));
            }
        },
        {
            name: 'Rect', disabled: true
        }
    ];

    const shapeData = () => shapeOptions.find(s => s.name === shape);

    const renderShape = (hoverPoint) => {
        if (startPoint) {
            let points = [startPoint].concat(markedPoints);
            if (hoverPoint) {
                points.push(hoverPoint);
            }
            currPolyline.current.leafletElement.setLatLngs(shapeData().toLine(points));
        }
    };

    const handleMouseMove = e => {
        renderShape([e.latlng.lat, e.latlng.lng]);
    };

    const handleMouseOut = () => {
        renderShape();
    };

    return (
        <div className="App">
            <LeafletMap center={position} zoom={14}
                ref={mapElement}
                style={{ width: '100%', height: '100vh' }}
                onClick={handleMapClick}
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseOut}
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
                    !startPoint ? null :
                        <Polyline positions={[startPoint, startPoint]} ref={currPolyline} />
                }

            </LeafletMap>
            <Paper
                style={{
                    position: 'absolute', height: '80%', maxHeight: '75%', overflow: 'auto',
                    top: 50, width: '30%', right: 50, bottom: 50,
                    justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}
            >
                <div
                    style={{ margin: 10 }}
                >
                    <ShapeChooser
                        shape={shape}
                        onChange={(val) => setShape(val)}
                        shapeOptions={shapeOptions}
                    />
                    <Button variant="contained" color="primary"
                        disabled={shape === 'Point'}
                        style={{ margin: 5 }}
                        onClick={handlePutDevices}
                    >
                        Put devices
                    </Button>
                    <TypeChooser
                        selectedType={selectedType}
                        onChange={newType => {
                            setSelection([]);
                            setSelectedType(newType);
                        }}
                        showAll={showAll}
                        setShowAll={val => setShowAll(val)}
                        typeOptions={devices.map(dev => { return { name: dev.type } })}
                    />

                    <div style={{ overflow: 'scroll', height: 'inherit', display: 'block' }}
                    // inputProps={{ style: { overflow: 'scroll' } }}
                    >
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
                    </div >
                </div>
            </Paper>
            <JsonStreamer
                json={devices}
                onChange={(val) => setDevices(val)}
            />
        </div>
    )
}
