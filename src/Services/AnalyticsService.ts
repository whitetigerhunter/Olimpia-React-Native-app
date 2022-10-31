import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from 'react-native-fbsdk-next';

export enum AnalyticsEvent {
  UserChooseStoryType = 'user_choose_story_type',
  UserSelectIngredients = 'user_select_ingredients',
  UserGetPerfumesRecommendation = 'user_get_perfumes_recommendation',
  UserAccessShop = 'user_access_shop',
}

export class AnalyticsService {
  static logEvent = (event: AnalyticsEvent, params?: any) => {
    analytics().logEvent(event, params);
    AppEventsLogger.logEvent(event, params);
  };
}
