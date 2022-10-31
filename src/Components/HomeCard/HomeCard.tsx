/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

import { Metrics } from '../../Theme';

interface Props {
  image: string;
  userImage: string;
  userName: string;
  follows: number;
  likes: number;
  title: string;
  perfum: any;
  navigation: NavigationStackProp;
}

function HomeCard({ image, userImage, userName, follows, likes, title, perfum, navigation }: Props) {
  return (
    <View
      key={perfum.pk}
      style={{
        width: Metrics.screenWidth * 0.95,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,

        margin: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log('test');
          navigation.navigate('PerfumeDetails', { selectedPerfume: perfum });
        }}
        style={{
          position: 'relative',
          height: 140,
        }}
      >
        <Image
          style={{
            width: '100%',
            borderBottomRightRadius: 30,
            // position: 'absolute',
            height: 190,
            resizeMode: 'contain',
            //objectPosition: 'center'
          }}
          source={image ? { uri: image } : require('../../Assets/Images/perfume.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'black',
          opacity: 0.8,
          //  alignItems: 'flex-end',
          borderBottomRightRadius: 30,

          justifyContent: 'space-between',
          paddingRight: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingTop: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            style={{
              backgroundColor: 'red',
              borderRadius: 50 / 2,
              borderBottomRightRadius: 50 / 2,
              width: 50,
              height: 50,
              resizeMode: 'cover',
            }}
            source={userImage ? { uri: userImage } : require('../../Assets/Images/perfume.png')}
          />
          <View>
            <Text style={{ color: 'white' }}> {userName}</Text>
            <Text style={{ color: 'white' }}> {follows} follows</Text>
          </View>
        </View>
        <View>
          <Text style={{ color: 'white' }}>{title}</Text>
          <Text style={{ position: 'absolute', right: 0, bottom: 0, color: 'white' }}> {likes} likes</Text>
        </View>
      </View>
    </View>
  );
}
export default withNavigation(HomeCard);
