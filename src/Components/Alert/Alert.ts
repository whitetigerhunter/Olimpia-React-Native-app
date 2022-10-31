import { Alert } from 'react-native';

import { translate } from 'app/translations/translationHelpers';

interface Props {
  title: string;
  description: string;
  options?: {
    cancelable?: boolean;
    onDismiss?: () => void;
  };
}

const alert = ({ title, description, options }: Props) =>
  Alert.alert(title, description, [{ text: translate('ok'), onPress: () => null }], {
    cancelable: true,
    ...options,
  });

alert.defaultProps = {
  title: '',
  description: '',
};

export default alert;
