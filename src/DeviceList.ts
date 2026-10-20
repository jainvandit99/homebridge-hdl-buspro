/* eslint-disable @typescript-eslint/no-explicit-any */

import { ABCDevice, ABCListener } from './ABC.js';
import { RelayLightbulb, RelayListener } from './RelayLightbulb.js';
import { RelayDimmableLightbulb } from './RelayDimmableLightbulb.js';
import { Sensor8in1, SensorListener } from './Sensor8in1.js';
import { RelayLock } from './RelayLock.js';
import { LeakSensor } from './LeakSensor.js';
import { SmokeSensor } from './SmokeSensor.js';
import { OccupancySensor } from './OccupancySensor.js';
import { ContactSensor, DryListener } from './ContactSensor.js';
import { RelayCurtains, RelayCurtainListener } from './RelayCurtains.js';
import { RelayCurtainValve } from './RelayCurtainValve.js';
import { RelayFan } from './RelayFan.js';
import { RelayRGB } from './RelayRGB.js';
import { RelayHeater } from './RelayHeater.js';

export interface DeviceType<T extends ABCDevice, U extends ABCListener> {
  deviceClass: new (...args: any[]) => T;
  listener: new (...args: any[]) => U;
  uniqueArgs: (config: Record<string, any>) => any[];
  idEnding: (config: Record<string, any>) => string;
}


export const deviceTypeMap: {[key: string]: DeviceType<any, any>} = {
  'relaylightbulb': {
    deviceClass: RelayLightbulb,
    listener: RelayListener,
    uniqueArgs: (config) => [config.channel],
    idEnding: (config) => `${config.channel}`,
  },
  'relaydimmablelightbulb': {
    deviceClass: RelayDimmableLightbulb,
    listener: RelayListener,
    uniqueArgs: (config) => [config.channel],
    idEnding: (config) => `${config.channel}`,
  },
  // Fan support
  'relayfan': {
    deviceClass: RelayFan,
    listener: RelayListener,
    uniqueArgs: (config) => [config.channel],
    idEnding: (config) => `${config.channel}`,
  },
  // RGB support (handled by a dedicated code path in HDLPlatform)
  'relayrgb': {
    deviceClass: RelayRGB,
    listener: RelayListener,
    uniqueArgs: (config) => [config.red_channel, config.green_channel, config.blue_channel],
    idEnding: (config) => `${config.red_channel}-${config.green_channel}-${config.blue_channel}`,
  },
  // Heater support
  'relayheater': {
    deviceClass: RelayHeater,
    listener: RelayListener,
    uniqueArgs: (config) => [config.channel],
    idEnding: (config) => `${config.channel}`,
  },
  'sensor8in1': {
    deviceClass: Sensor8in1,
    listener: SensorListener,
    uniqueArgs: () => [],
    idEnding: () => '',
  },
  'relaylock': {
    deviceClass: RelayLock,
    listener: RelayListener,
    uniqueArgs: (config) => [config.channel, config.nc, config.lock_timeout],
    idEnding: (config) => `${config.channel}`,
  },
  'relaycurtains': {
    deviceClass: RelayCurtains,
    listener: RelayCurtainListener,
    uniqueArgs: (config) => [config.channel, config.nc, config.duration, config.curtains_precision],
    idEnding: (config) => `${config.channel}`,
  },
  'relaycurtainvalve': {
    deviceClass: RelayCurtainValve,
    listener: RelayCurtainListener,
    uniqueArgs: (config) => [config.channel, config.nc, config.valve_type],
    idEnding: (config) => `${config.channel}`,
  },
  'contactsensor': {
    deviceClass: ContactSensor,
    listener: DryListener,
    uniqueArgs: (config) => [config.area, config.channel, config.nc],
    idEnding: (config) => `${config.area}.${config.channel}`,
  },
  'leaksensor': {
    deviceClass: LeakSensor,
    listener: DryListener,
    uniqueArgs: (config) => [config.area, config.channel, config.nc],
    idEnding: (config) => `${config.area}.${config.channel}`,
  },
  'smokesensor': {
    deviceClass: SmokeSensor,
    listener: DryListener,
    uniqueArgs: (config) => [config.area, config.channel, config.nc],
    idEnding: (config) => `${config.area}.${config.channel}`,
  },
  'occupancysensor': {
    deviceClass: OccupancySensor,
    listener: DryListener,
    uniqueArgs: (config) => [config.area, config.channel, config.nc],
    idEnding: (config) => `${config.area}.${config.channel}`,
  },
};
