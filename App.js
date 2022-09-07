import React, {useEffect} from 'react';

import MainNav from './src/navigation/mainNav';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persister} from './src/redux/store';
import {SafeAreaView} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {LogBox} from 'react-native';
export default App = () => {
  useEffect(() => {
    if (__DEV__) {
      const ignoreWarns = [
        'EventEmitter.removeListener',
        '[fuego-swr-keys-from-collection-path]',
        'Setting a timer for a long period of time',
        'ViewPropTypes will be removed from React Native',
        'AsyncStorage has been extracted from react-native',
        "exported from 'deprecated-react-native-prop-types'.",
        'Non-serializable values were found in the navigation state.',
        'VirtualizedLists should never be nested inside plain ScrollViews',
      ];

      const warn = console.warn;
      console.warn = (...arg) => {
        for (const warning of ignoreWarns) {
          if (arg[0].startsWith(warning)) {
            return;
          }
        }
        warn(...arg);
      };

      LogBox.ignoreLogs(ignoreWarns);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <SafeAreaView style={{flex: 1}}>
          <ToastProvider>
            <MainNav />
          </ToastProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};
