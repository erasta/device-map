import React from 'react';
import { deviceTypes, deviceForType } from './DataContents';
import { DeviceEditor } from './DeviceEditor/DeviceEditor';
import { CircularProgress } from '@material-ui/core';
import { sortDevices, findDevicesChanged } from './DeviceEditor/DeviceUtils';

console.log(new Date());

const newdev = sortDevices(deviceTypes.map((type, i) => {
    type.items = deviceForType[i];
    return type;
}));

export const App = () => {
    const [devices, setDevices] = React.useState(newdev);

    console.log('appdev', devices)

    const goodDevices = devices.filter(d => d.items && d.name);

    if (goodDevices.length === 0 || devices.length !== goodDevices.length) {
        return <CircularProgress style={{ marginLeft: '50%', marginTop: '40vh' }} />;
    } else {
        console.log('goodDevices', goodDevices)
        return (
            <DeviceEditor
                devices={devices}
                setDevices={(newDevices) => {
                    findDevicesChanged(devices, newDevices).forEach(changed => {
                        const { dev } = changed;
                        console.log('change', dev);
                    });
                    console.log('newDevices', newDevices)
                    setDevices(JSON.parse(JSON.stringify(newDevices)));
                }}
            >
            </DeviceEditor>
        );
    }
}