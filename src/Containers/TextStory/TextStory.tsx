import React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { Button, BlueHeaderScreenTemplate } from 'app/Components';
import { types } from 'app/Constants';
import { Route } from 'app/Navigators';
import { getPreferredLocale } from 'app/translations';
import { translate } from 'app/translations/translationHelpers';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';
import { Metrics, Metricstablet } from 'app/Theme';

import Input from '../../Components/Input/Input';
import { RootState } from '../App';

interface Props {
  user: types.User;
  notes: types.Note[];
  token: string;
  isLoading: boolean;
  suggestionId: number;
  uploadStory: (form: FormData, token: string) => any;
  navigation: types.NavigationProp<Route.TextStory, types.NavigationParams[Route.TextStory]>;
}

interface State {
  story: string;
}

export class TextStoryScreen extends React.PureComponent<Props, State> {
  state = {
    story: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props?.notes[0]?.pk !== prevProps?.notes[0]?.pk) {
      this.props.navigation.navigate(Route.NoteSelection, { isTextStory: true });
    } else if (this.props?.suggestionId !== prevProps.suggestionId) {
      this.props.navigation.navigate(Route.NoteSelection, { isTextStory: true });
    }
  }

  submit = async () => {
    const { story } = this.state;
    if (this.props.isLoading) {
      return;
    }

    const form = new FormData();
    form.append('type', 'text');
    form.append('language', getPreferredLocale());
    form.append('original_generated_text', story);
    form.append('about', story);
    form.append('description', story);
    form.append('memoires', story);

    this.props.navigation.navigate(Route.NoteSelection, { textStory: form });
  };

  render() {
    const isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    return (
      <>
        <BlueHeaderScreenTemplate
          screenTitle={translate('storyTime')}
          statusBarType="light-content"
          isLoading={this.props.isLoading}
          footer={
            this.props.isLoading ? undefined : (
              <Button
                disabled={!this.state.story}
                onPress={this.submit}
                secondary
                style={styles.button}
                text={translate('next')}
              />
            )
          }
        >
          <Input
            numberOfLines={6}
            multiline
            value={this.state.story}
            onChangeText={(story) => this.setState({ story })}
            inputContainerStyle={styles.input}
            textStyle={styles.inputText}
            onSubmitEditing={Keyboard.dismiss}
          />
        </BlueHeaderScreenTemplate>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  isLoading: state.uploadStory.fetching,
  notes: state.user.notes?.resultat || [],
  suggestionId: state.user.notes?.id || 0,
});

export default withNavigation(connect(mapStateToProps)(TextStoryScreen));

const regularStyles = StyleSheet.create({
  button: {
    height: 48,
  },
  input: { height: 120, paddingVertical: Metrics.margin, marginHorizontal: Metrics.mediumMargin },
  inputText: { textAlignVertical: 'top' },
});
const scaledStyles = ScaledSheet.create({
  button: {
    height: "48@ms",
  },
  input: { height: "120@vs", paddingVertical: Metricstablet.margin, marginHorizontal: Metricstablet.mediumMargin },
  inputText: { textAlignVertical: 'top' },
});
