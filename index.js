import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/Containers/App';

GoogleSignin.configure({
  webClientId: '849077470765-bd5lhubgqmkcp9avtbdem8vf6mpbrdes.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
