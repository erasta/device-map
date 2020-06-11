import React from 'react';
import { theDevices, deviceTypes, deviceForType1 } from './DataContents';
import { DeviceEditor } from './DeviceEditor/DeviceEditor';
import { CircularProgress } from '@material-ui/core';

console.log(new Date());

// export const App = () => {
//     const [devices, setDevices] = React.useState([]);
//     // console.log(deviceTypes);
//     // console.log(deviceForType1);
//     setTimeout(() => {
//         deviceTypes.forEach(element => {
//             element.type = element.name;
//         });
//         setDevices(deviceTypes);
//         console.log('types');
//         setTimeout(() => {
//             deviceTypes[0].items = deviceForType1;
//             setDevices(deviceTypes);
//             console.log('device');
//         }, 3000);
//     }, 3000);
//     return (
//         <div className="App">
//             {
//             if (devices.filter(d => d.items).length === 0) return null;
//              : {
//                 console.log('a');
//                 return(<DeviceEditor devices={devices} setDevices={setDevices}>
//             </DeviceEditor>)}
//         }
//         </div >
//     )
// }

export class App extends React.Component {
    state = {
        devices: []
    };
    componentDidMount() {
        const devices = []
        setTimeout(() => {
            deviceTypes.forEach(type => {
                console.log('Got types');
                type.type = type.name;
                devices.push(type);
            });
            setTimeout(() => {
                console.log('Got device1');
                devices[0].items = deviceForType1;
                this.setState(() => ({ devices }));
            }, 500);
        }, 500);
    }
    render() {
        const goodDevices = this.state.devices.filter(d => d.items && d.type);
        if (goodDevices.length === 0 || this.state.devices.length !== goodDevices.length) {
            return <CircularProgress style={{ marginLeft: '50%', marginTop: '40vh' }} />;
        } else {
            return (
                <DeviceEditor
                    devices={this.state.devices}
                    setDevices={(newDevices) => {
                        newDevices.forEach(newDevType => {
                            const oldDevType = this.state.devices.find(ty => ty.type === newDevType.type);
                            if (oldDevType && oldDevType.items && newDevType.items) {
                                newDevType.items.forEach(newDev => {
                                    const oldDev = oldDevType.items.find(d => d.key === newDev.key);
                                    if (oldDev && JSON.stringify(oldDev) !== JSON.stringify(newDev)) {
                                        console.log('change', newDev);
                                    }
                                })
                            }
                        });
                        this.setState(() => ({ devices: newDevices }));
                    }}
                >
                </DeviceEditor>
            );
        }
    }
}