import React from 'react';
import { List } from '@material-ui/core';
import { DeviceRow } from './DeviceRow';
import { setDeviceLocation, getDeviceLocation } from './DeviceUtils';

let lastIndex;

export const DeviceList = ({ devices, selection, setSelection }) => {

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

    return (
        <div style={{ overflow: 'scroll', height: 'inherit', display: 'block' }}
        // inputProps={{ style: { overflow: 'scroll' } }}
        >
            <List>
                {
                    devices.map(devType =>
                        devType.items.map((dev, index) =>
                            <DeviceRow
                                key={dev.key}
                                dev={dev}
                                devLocation={getDeviceLocation(dev, devType)}
                                isSelected={selection.includes(index)}
                                onClick={e => handleSelectionClick(index, e.shiftKey)}
                                onDisableLocation={e => setDeviceLocation(dev, devType, undefined)}
                            />
                        )
                    )
                }
            </List >
        </div >
    )
}