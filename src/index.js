
import { AppRegistry } from 'react-native';
import {message} from './Char';

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}

AppRegistry.registerComponent('b', () => (message));