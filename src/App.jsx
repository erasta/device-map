import React from 'react';
import { deviceTypes, deviceForType } from './DataContents';
import { DeviceEditor } from './DeviceEditor/DeviceEditor';
import { CircularProgress } from '@material-ui/core';

console.log(new Date());

const newdev = deviceTypes.map((type, i) => {
    type.type = type.name;
    type.items = deviceForType[i];
    return type;
});

export const App = () => {
    const [devices, setDevices] = React.useState(newdev);

    console.log('appdev', devices)

    const goodDevices = devices.filter(d => d.items && d.type);

    if (goodDevices.length === 0 || devices.length !== goodDevices.length) {
        return <CircularProgress style={{ marginLeft: '50%', marginTop: '40vh' }} />;
    } else {
        console.log('goodDevices', goodDevices)
        return (
            <DeviceEditor
                devices={devices}
                setDevices={(newDevices) => {
                    newDevices.forEach(newDevType => {
                        const oldDevType = devices.find(ty => ty.type === newDevType.type);
                        if (oldDevType && oldDevType.items && newDevType.items) {
                            newDevType.items.forEach(newDev => {
                                const oldDev = oldDevType.items.find(d => d.key === newDev.key);
                                if (oldDev && JSON.stringify(oldDev) !== JSON.stringify(newDev)) {
                                    console.log('change', newDev);
                                }
                            })
                        }
                    });
                    console.log('newDevices', newDevices)
                    setDevices(JSON.parse(JSON.stringify(newDevices)));
                }}
            >
            </DeviceEditor>
        );
    }
}