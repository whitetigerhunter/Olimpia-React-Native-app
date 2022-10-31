import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { ScreenTemplate, PerfumeCard } from 'app/Components';
import * as types from 'app/Constants/types';
import { RootState } from 'app/Containers/App';
import { Route } from 'app/Navigators';
import API from 'app/Services/Api';
import UserActions from 'app/State/UserRedux';
import { Metrics } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  user: types.User;
  fetching: boolean;
  token: string;
  updateUser: (data: types.User) => void;
  navigation: types.NavigationProp<Route.MyCollection, types.NavigationParams[Route.MyCollection]>;
}

class MyCollection extends React.PureComponent<Props, null> {
  componentDidMount() {
    this.getPerfumes();
  }

  getPerfumes = () => {
    const { user } = this.props;
    this.setState({ perfumes: user?.wish_perfumes });
  };

  onSelect = (id: number) => {
    const selectedPerfume = this.props.user.wish_perfumes.find((el: { pk: any }) => el.pk === id);
    this.props.navigation.navigate('PerfumeDetails', { selectedPerfume });
  };

  updateCollection = async (type: string, id: number) => {
    const { token } = this.props;
    const api = API.create();
    await api.updateCollection(type, id, token);
    const newUser: any = await API.create().getUser(token);
    this.props.updateUser(newUser.data);
  };

  render() {
    const { user } = this.props;

    return (
      <ScreenTemplate
        headerProps={{
          title: translate('favorites'),
          leftIconName: 'chevron-left',
          showRightIcon: false,
          onPressLeftIcon: () => this.props.navigation.goBack(),
        }}
      >
        <View style={styles.container}>
          {user?.wish_perfumes.map((item: types.Perfume) => (
            <PerfumeCard
              key={item.pk}
              id={item.pk}
              name={item.name}
              brand={item.brand}
              image={item.image}
              onSelect={this.onSelect}
              match={item.fetch_accuracy}
              favorite={user?.wish_perfumes?.find((e) => e.pk === item.pk)}
              addToFavorite={async (type: any, id: any, cb: () => void) => {
                await this.updateCollection(type, id);
                cb();
              }}
              small
              fixedWidth
            />
          ))}
        </View>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.mediumMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: Metrics.mediumMargin,
  },
});

const mapStateToProps = (state: RootState) => ({
  perfumes: state.user.perfumes,
  user: state.user.user,
  fetching: state.user.fetching,
  token: state.token.token,
});

const mapDispatchToProps = {
  updateUser: UserActions.userSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCollection as any);
