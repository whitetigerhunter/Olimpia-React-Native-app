import * as Sentry from '@sentry/react-native';
import React, { Component } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import * as RNLocalize from 'react-native-localize';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor, store } from 'app/State';
import { getPreferredLocale, setI18nConfig } from 'app/translations';

import RootScreen from './Root/RootScreen';

Sentry.init({
  dsn: 'https://9b0696d045024293893e189a7d0fd82a@o433370.ingest.sentry.io/5388321',
  enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  sessionTrackingIntervalMillis: 10000,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

class App extends Component {
  constructor(props: any) {
    super(props);
    setI18nConfig(); // set initial config
  }

  async componentDidMount() {
    RNBootSplash.hide();
    const selectedLanguage: string = getPreferredLocale();
    this.rehydrateLanguage(selectedLanguage);
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  rehydrateLanguage = (selectedLanguage: string) => {
    setI18nConfig(selectedLanguage);
    this.forceUpdate();
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
