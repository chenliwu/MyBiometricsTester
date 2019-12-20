/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import IOSTouchIdExample from './src/IOSTouchIdExample';
import BiometricsExample from './src/BiometricsExample';

AppRegistry.registerComponent(appName, () => BiometricsExample);
