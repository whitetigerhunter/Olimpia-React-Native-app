import AsyncStorage from '@react-native-community/async-storage';

import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const persistConfig = {
  active: true,
  reducerVersion: '1.0',
  storage: AsyncStorage,
  key: 'primary',
  whitelist: ['user', 'token'],
  transforms: [immutablePersistenceTransform],
};

export default persistConfig;
