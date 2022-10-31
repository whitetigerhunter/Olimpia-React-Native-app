import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Onboarding from 'app/Containers/Onboarding/Onboarding';

import Loading from '../Containers/Loading/Loading';
import Login from '../Containers/Login/Login';
import Register from '../Containers/Login/Register';
import Cgu from '../Containers/Login/cgu';
import ResetPassword from '../Containers/ResetPassword/ResetPassword';
import HomeStack from './HomeStack';

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    MainScreen: Onboarding,
    Login,
    ResetPassword,
    Register,
    Cgu,
    Loading,
    HomeStack,
    Onboarding,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'Loading',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  },
);

export default createAppContainer(StackNavigator);
