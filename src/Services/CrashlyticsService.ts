import crashlytics from '@react-native-firebase/crashlytics';

export class CrashlyticsService {
  static setCurrentUser = (user: any | null) => {
    if (user) {
      crashlytics().setUserId(user.id);
      crashlytics().setAttributes({
        name: user.name || '',
        email: user.email || '',
      });
    } else {
      crashlytics().setUserId('');
      crashlytics().setAttributes({
        name: '',
        email: '',
      });
    }
  };

  static logError = (error: Error, errorName?: string) => {
    crashlytics().recordError(error, errorName);
  };
}
