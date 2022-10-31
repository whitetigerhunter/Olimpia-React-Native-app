import React from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { PersonalizedRecipesListItem, ScreenTemplate } from 'app/Components';
import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import RecipesActions from 'app/State/RecipesRedux';
import { Colors, Metrics, Fonts } from 'app/Theme';
import metrics from 'app/Theme/Metrics';
import { translate } from 'app/translations/translationHelpers';
import { useCallback } from 'react';
import { RootState } from '../App';

interface Props {
  token: string;
  recipesFetching: boolean;
  recipes: types.Recipe[];
  getRecipes: (token: string) => void;
  navigation: types.NavigationProp<Route.Selections, types.NavigationParams[Route.Selections]>;
}

export class Selections extends React.Component<Props, null> {
  componentDidMount() {
    this.refreshRecipes()
  }

  refreshRecipes = () => {
      const { token, getRecipes } = this.props;
      getRecipes({ token } as unknown as string);
  }

  deleteItemById = (item: types.Recipe) => {
      const { recipes } = this.props;
      const arr = [...recipes];
      arr.splice(index, 1);
      // set state for recipes
      console.log('deleteItemById', index);
  }

  handleChooseSelection = (recipe: any) =>
    this.props.navigation.navigate(Route.PersonalizedRecipeNoteSelection, {
      recipe,
    });

  render() {
    const { recipesFetching, recipes } = this.props;
    return (
      <ScreenTemplate
        headerProps={{
          title: translate('personalizedRecipes'),
          leftIconName: 'chevron-left',
          showRightIcon: false,
          onPressLeftIcon: () => this.props.navigation.goBack(),
        }}
        isLoading={recipesFetching}
        contentContainerStyle={styles.backgroundColor}
        noScroll
      >
        <View style={[styles.containerPresonalizedRecipes, styles.backgroundColor]}>
          <FlatList
            data={recipes}
            renderItem={({item, index}) => <PersonalizedRecipesListItem
              item={item}
              onSelect={this.handleChooseSelection}
              onPress={() => deleteItemById(index)}
              key={item.id} />
            }
            keyExtractor={(item: types.Recipe) => item.id.toString()}
            extraData={this.props}
          />
        </View>
      </ScreenTemplate>
    );
  }
}
const styles = StyleSheet.create({
  backgroundColor: { backgroundColor: Colors.backgroundSecondary, paddingTop: metrics.tinyMargin },
  containerPresonalizedRecipes: {
    paddingHorizontal: Metrics.mediumMargin,
  },
});

const mapStateToProps = (state: RootState) => ({
  token: state.token.token,
  recipes: state.recipes.recipes,
  recipesFetching: state.recipes.fetching,
});

const mapDispatchToProps = {
  getRecipes: RecipesActions.recipesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Selections as any);
