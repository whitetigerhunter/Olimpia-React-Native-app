import React, { PureComponent } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import { Panel, ScreenTemplate, NoteCard, PanelFooter, Loader, Input } from 'app/Components';

import * as enums from '../../Constants/enums';
import * as types from '../../Constants/types';
import { Route } from '../../Navigators';
import API from '../../Services/Api';
import { Colors, Metrics } from '../../Theme';
import { translate } from '../../translations/translationHelpers';
import { RootState } from '../App';

interface Props {
  token: string;
  addNewNote: (newNote: any) => void;
  navigation: types.NavigationProp<Route.AddNote, types.NavigationParams[Route.AddNote]>;
}

interface State {
  data: types.Note[];
  loading: boolean;
  selectedNotes: types.Note[];
  descriptionSelectedNotes: types.Note[];
}

class PersonalizedRecipeAddNote extends PureComponent<Props, State> {
  state: State = {
    data: [],
    loading: false,
    selectedNotes: [],
    descriptionSelectedNotes: []
  };

  componentDidMount() {
    this.getNotes();
  }

  getNotes = async () => {
    this.setState({ loading: true });
    try {
      const data: any = await API.create().getAllNotes(this.props.token);

      this.setState({
        data: [...data.results],
        loading: false,
      });
    } catch (e) {
      this.setState({
        data: [],
        loading: false,
      });
    }
  };

  searchNotes = async (text: string) => {
    if (text) {
      const updatedData = this.state.data.filter((e) =>
        e.name.toLowerCase().trim().includes(text.toString().toLowerCase().trim()),
      );
      this.setState({ data: updatedData });
    } else {
      this.getNotes();
    }
  };

  handlePressNoteCard = (item: types.Note) => {
    if (!this.state.selectedNotes.includes(item)) {
      const { notes } = this.props.navigation.state.params as any;
      console.log('Item', item);
      if (notes.find((note: types.Note) => note.pk === item.pk)) {
        Alert.alert(translate('noteAlreadyExists'));
      } else {
        this.setState({ selectedNotes: [...this.state.selectedNotes, item] });
      }
    } else {
      const { pk } = item;
      const newSelectedNotes = this.state.selectedNotes.filter((item) => item.pk !== pk);
      this.setState({ selectedNotes: newSelectedNotes });
    }
  };

  handleDetailsPressNoteCard = (note: types.Note) => {
    if (!this.state.descriptionSelectedNotes.includes(note)) {
      return this.setState({
        descriptionSelectedNotes: [...this.state.descriptionSelectedNotes, note],
      });
    } else {
      return this.setState({
        descriptionSelectedNotes: this.state.descriptionSelectedNotes.filter((n) => n.name !== note.name),
      });
    }
  };

  handlePressLeftButton = () => this.props.navigation.goBack();

  handlePressRightButton = () =>
    this.props.navigation.navigate(this.props.navigation.getParam('route'), {
      selectedNotes: this.state.selectedNotes,
    });

  renderItem = ({ item }: { item: types.Note }) => (
    <NoteCard
      note={item}
      selected={this.state.selectedNotes.includes(item)}
      detailsSelected={this.state.descriptionSelectedNotes.includes(item)}
      onPress={this.handlePressNoteCard}
      onDetailsPress={this.handleDetailsPressNoteCard}
    />
  );

  render() {
    const { selectedNotes, data, loading } = this.state;
    return (
      <>
        <ScreenTemplate
          headerBlueProps={{
            title: translate('findPersonalizedRecipe'),
          }}
          containerStyle={styles.screenTemplateBackgroundColor}
          statusBarType="light-content"
          noScroll
        >
          <Panel isLoading={loading}>
            <View style={styles.container}>
              <Input
                placeholder={translate('searchNote')}
                autoCapitalize="none"
                onChangeText={this.searchNotes}
                onChange={() => console.log('change')}
                containerStyle={styles.inputContainer}
                accessibilityLabel="search input"
              />
              <View style={styles.listContainer}>
                <FlatList
                  numColumns={3}
                  data={data}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => item.id + index.toString()}
                />
              </View>
            </View>
          </Panel>
        </ScreenTemplate>
        <PanelFooter
          disableRight={selectedNotes.length < enums.MinSelectedNotesLength.AddNote}
          next
          back
          onPressLeftButton={this.handlePressLeftButton}
          onPressRightButton={this.handlePressRightButton}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  container: { paddingHorizontal: Metrics.mediumMargin },
  inputContainer: { paddingBottom: 14 },
  listContainer: { paddingTop: 50, paddingBottom: 230, marginHorizontal: -Metrics.smallMargin },
});

const mapStateToProps = (state: RootState) => ({
  token: state.token.token,
});

export default connect(mapStateToProps, null)(PersonalizedRecipeAddNote);
