import React from 'react';
import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { connect } from 'react-redux';

import {
  ScreenTemplate,
  Button,
  PersonalizedRecipesListItem,
  PerfumeCard,
  DashboardFooter,
} from 'app/Components';
import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import RecipesActions from 'app/State/RecipesRedux';
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from '../../Theme';
import metrics from 'app/Theme/Metrics';
import { translate } from 'app/translations/translationHelpers';
import { ScaledSheet } from "react-native-size-matters";
import { RootState } from '../App';
import SelectStoryType from '../SelectStoryType/SelectStoryType';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

interface Props {
  user: types.User;
  token: string;
  recipes: types.Recipe[];
  recipesFetching: boolean;
  getRecipes: ({ token }: any) => void;
  navigation: types.NavigationProp<Route.Dashboard, types.NavigationParams[Route.Dashboard]>;
}

class Dashboard extends React.PureComponent<Props, null> {
  
  componentDidMount() {
    const { token, getRecipes } = this.props;
    this.requestTrackingPermisson();
    getRecipes({ token });
  }

  requestTrackingPermisson = async () => {
    try {
      await requestTrackingPermission();
    } catch (e) {
      Alert.alert(translate('error'), e?.toString?.() ?? e);
    }
  };

  handleNavigateSelections = () => this.props.navigation.navigate(Route.Selections);

  handleNavigateFavorites = () => this.props.navigation.navigate(Route.MyCollection);

  handleChooseSelection = (recipe: any) =>
    this.props.navigation.navigate(Route.PersonalizedRecipeNoteSelection, {
      recipe,
    });

  handleChooseFavorite = (selectedPerfume: types.Perfume) =>
    this.props.navigation.navigate(Route.PerfumeDetails, { selectedPerfume });

  handleRenderFavoritesItem = ({ item }: any) => {
    const { pk, name, image, brand } = item;
    return (
      <PerfumeCard
        favorite
        id={pk}
        name={name}
        brand={brand}
        image={image}
        match={item.fetch_accuracy}
        onSelect={() => this.handleChooseFavorite(item)}
      />
    );
  };

  render() {
    const { user, navigation, recipes, recipesFetching } = this.props;
    const isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    return (
      <ScreenTemplate
        headerProps={{
          title: translate('dashboardTitle') + ' ' + user?.first_name + '!',
          showRightIcon: false,
          avatar: user?.image,
        }}
        contentContainerStyle={styles.backgroundColor}
        footer={!recipesFetching && recipes?.length > 0 && <DashboardFooter navigation={navigation} />}
        safeAreaEdges={['top', 'left', 'right']}
        isLoading={recipesFetching}
      >
        <View style={[styles.containerPresonalizedRecipes, styles.backgroundColor]}>
          {recipes?.length === 0 ? (
            <SelectStoryType asComponent navigation={navigation as any} />
          ) : (
            <>
              <View style={styles.row}>
                <Text style={styles.personalizedRecipesTitle}>{translate('personalizedRecipes')}</Text>
                <Button
                  text={translate('seeAll')}
                  iconRight
                  transparent
                  onPress={this.handleNavigateSelections}
                  style={styles.button}
                />
              </View>
              {recipes?.slice(0, 3).map((recipe) => (
                <PersonalizedRecipesListItem
                  item={recipe}
                  onSelect={this.handleChooseSelection}
                  key={recipe.id}
                />
              ))}
              {!!user?.wish_perfumes?.length && (
                <View style={styles.containerFavourites}>
                  <View style={styles.row}>
                    <Text style={styles.personalizedRecipesTitle}>{translate('favorites')}</Text>
                    <Button
                      text={translate('seeAll')}
                      iconRight
                      transparent
                      onPress={this.handleNavigateFavorites}
                      style={styles.button}
                    />
                  </View>
                  <FlatList
                    extraData={user?.wish_perfumes.slice(0, 5)}
                    data={user?.wish_perfumes.slice(0, 5)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.handleRenderFavoritesItem}
                    keyExtractor={(item) => item.pk.toString()}
                    style={styles.favoritePerfumeList}
                    horizontal
                  />
                </View>
              )}
            </>
          )}
        </View>
      </ScreenTemplate>
    );
  }
}
const regularStyles = StyleSheet.create({
  backgroundColor: { backgroundColor: Colors.backgroundSecondary, paddingTop: metrics.mediumMargin },
  containerPresonalizedRecipes: {
    paddingHorizontal: Metrics.mediumMargin,
  },
  personalizedRecipesTitle: {
    color: Colors.greyScaleSix,
    ...Fonts.style.h3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Metrics.largeMargin,
  },
  button: { position: 'absolute', right: 0, marginTop: -Metrics.tinyMargin },
  containerFavourites: {
    marginBottom: 22,
    paddingTop: Metrics.favouritesPaddingTop,
  },
  favoritePerfumeList: {
    marginEnd: -Metrics.mediumMargin,
  },
});
const scaledStyles = ScaledSheet.create({
  backgroundColor: { backgroundColor: Colors.backgroundSecondary, paddingTop: metrics.mediumMargin },
  containerPresonalizedRecipes: {
    paddingHorizontal: Metricstablet.mediumMargin,
  },
  personalizedRecipesTitle: {
    color: Colors.greyScaleSix,
    ...FontsTablet.style.h3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Metricstablet.largeMargin,
  },
  button: { position: 'absolute', right: 0, marginTop: -Metrics.tinyMargin },
  containerFavourites: {
    marginBottom: "22@ms",
    paddingTop: Metrics.favouritesPaddingTop,
  },
  favoritePerfumeList: {
    marginEnd: -Metrics.mediumMargin,
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  token: state.token.token,
  recipes: state.recipes.recipes,
  recipesFetching: state.recipes.fetching,
});

const mapDispatchToProps = {
  getRecipes: RecipesActions.recipesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard as any);
