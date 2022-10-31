import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { withNavigation } from 'react-navigation';

import { Metrics } from '../../Theme';

function UserCard({ item, navigation, userId }: any) {
  const { id, last_name, first_name, gender, country, image } = item;
  console.log(country, '<-------item');

  const countryFlagUri = `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country}.svg`;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(id, 'user');
        navigation.navigate('Profile', { userId: id, oldUser: userId ? userId : null });
      }}
      style={{
        borderRadius: 150,
        //    backgroundColor:'red',
        width: Metrics.screenWidth * 0.9,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flexBasis: '25%',
          borderRadius: 50,
          width: 100,
          height: 80,
          //  textAlign: 'center',
          // justifyContent: 'center',
          //alignItems: 'center',
          //alignSelf: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Image
          style={{
            // borderRadius: 30,
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
          source={image ? { uri: image } : require('../../Assets/Images/perfume.png')}
        />
      </View>
      <View style={{ flexBasis: '50%' }}>
        <Text>{last_name + ' ' + first_name}</Text>
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          paddingRight: 5,
          flexDirection: 'column',
          flexBasis: '25%',
        }}
      >
        <Text>{gender}</Text>
        <View style={{ width: 30, height: 30 }}>
          <SvgUri
            width="100%"
            height="100%"
            uri={
              country && country.length === 2
                ? countryFlagUri
                : 'https://catamphetamine.gitlab.io/country-flag-icons/3x2/FR.svg'
            }
          />
        </View>
      </View>
    </TouchableOpacity>

    /* <Card
            key={id}
            title={last_name + ' ' + first_name}
            //        iconName="home"
            iconComponent={
                <View
                    key={id}
                    style={{
                        borderRadius: 50,
                        width: 68,
                        height: 80,
                        left: 25,
                        top: 40,
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'transparent',
                    }}>
                    <Image
                        style={{
                            borderRadius: 80,
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}

                        source={image ? {uri: image} : require('../../Assets/Images/perfume.png')}
                    />
                </View>
            }
            //iconBackgroundColor={'transparent'}
            //     defaultTitle="foulen benfoulen"
            //      iconType="Entypo"
            // defaultContent=""
            onPress={() => {
                console.log(id, 'user')
                navigation.navigate('Profile', {userId: id})
            }}
            topRightText={interested_in}
            bottomRightText={country}
            content={gender}
        />*/
  );
}

export default withNavigation(UserCard);
