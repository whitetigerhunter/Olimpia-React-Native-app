import AppNavigation from '../Navigators/AppNavigator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from './../Containers/App';

export const reducer = (state: RootState, action: any) => {
  const newState = AppNavigation.router.getStateForAction(action, state);
  return newState || state;
};
