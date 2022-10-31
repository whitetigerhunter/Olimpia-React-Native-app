import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import * as types from '../../Constants/types';
import { Image } from '../Image/Image';
import styles from './Style/NoteCardStyle';
import FlipCard from 'react-native-flip-card'
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet, Typography, TypographyTablet } from '../../Theme';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';


interface Props {
  note: types.Note;
  selected?: boolean | undefined;
  disabled?: boolean;
  onPress?: (note: types.Note) => void;
  onDetailsPress?: (note: types.Note) => void;
  detailsSelected?: boolean | undefined;
}

const NoteCard = ({ note, selected, disabled, onPress, onDetailsPress, detailsSelected }: Props) => {
  const isTablet = DeviceInfo.isTablet();
  const scaledStyles = ScaledSheet.create({
    text: {
        ...FontsTablet.style.smallMedium,
        color: Colors.greyScaleSix,
        lineHeight: TypographyTablet.smallLineHeight,
        textAlign: 'center',
        minHeight: "60@ms", 
        marginTop: "70@ms"
    },
    threeDots: {
        fontSize: "22@ms",
        fontWeight: 'bold',
        color: 'white',
        height: "20@ms",
        textAlign: 'center',
        lineHeight: "17@ms",
        backgroundColor: Colors.blue
    },
    threeDotsBack: {
        marginTop: "1@ms",
        fontSize: "12@ms",
        height: "20@ms",
        lineHeight: "18@ms",
        fontWeight: 'normal',
        backgroundColor: Colors.blue,
        textAlign: 'center',
        color: Colors.white,
    },
    threeDotsWrapper: {
        // borderTopWidth: 1,
        // borderTopColor: '#ccc',
        height: "20@ms",
        marginTop: "-20@ms",
        // borderBottomWidth: 1,
        borderBottomLeftRadius: "8@ms",
        borderBottomRightRadius: "8@ms",
        overflow: 'hidden'
    },
    cardDescription: {
        color: Colors.greyScaleSix,
        textAlign: 'center',
        height: "110@ms",
        width: Metricstablet.noteCardWidth,
        justifyContent: 'center',
        borderRadius: Metricstablet.mediumBorderRadius,
    },
    cardDescriptionText: {
        ...FontsTablet.style.helper,
        lineHeight: "18@ms",
        textAlign: 'center'
    },
  });
  const handlePress = () => onPress && onPress(note);
  const handleDetailsPress = () => onDetailsPress && onDetailsPress(note);
  const detailsButton = () => {
    return (
        isTablet?
        <TouchableOpacity style={scaledStyles.threeDotsWrapper} onPress={handleDetailsPress} >
            {
                !detailsSelected ?
                    ( <Text style={[ scaledStyles.threeDots ]} numberOfLines={1}>...</Text> ) :
                    ( <Text style={[ scaledStyles.threeDotsBack ]} numberOfLines={1}>← back</Text> )
            }
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.threeDotsWrapper} onPress={handleDetailsPress} >
            {
                !detailsSelected ?
                    ( <Text style={[ styles.threeDots ]} numberOfLines={1}>...</Text> ) :
                    ( <Text style={[ styles.threeDotsBack ]} numberOfLines={1}>← back</Text> )
            }
        </TouchableOpacity>
        
    )
  }

  const cardWithImageAndName = (note) => {
      return (
          <View style={[{height: 70, ...styles.face }]}>

              <Image
                  style={[styles.image]}
                  source={
                      note?.image
                      ? { uri: note.image }
                      : note?.featured_image?.image
                      ? { uri: note.featured_image.image }
                      : require('../../Assets/Images/perfume.png')
                  }
              />

              <View style={ styles.textContainer }>
                {isTablet? 
                    <Text style={scaledStyles.text} numberOfLines={2}>
                        {note.name}
                    </Text>
                    :
                    <Text style={styles.text, {minHeight: 60, marginTop: 70}} numberOfLines={2}>
                        {note.name}
                    </Text>
                }
                  
              </View>

          </View>
      )
  }
  const cardWithDescription = (note) => {
      return (
        isTablet?
          <View style={scaledStyles.cardDescription}>
              <Text style={scaledStyles.cardDescriptionText}>
                  {
                      note.description
                          .split(/[ ,]+/)
                          .splice(0,3)
                          .map(line => line.replace('.', ''))
                          .join('\n')
                  }
                  { !note.description.length ? 'No description' : ''}
              </Text>
          </View>
        :
            <View style={styles.cardDescription}>
              <Text style={styles.cardDescriptionText}>
                  {
                      note.description
                          .split(/[ ,]+/)
                          .splice(0,3)
                          .map(line => line.replace('.', ''))
                          .join('\n')
                  }
                  { !note.description.length ? 'No description' : ''}
              </Text>
            </View>
      )
  }

  return (

    <View style={styles.cardWrapper}>
        <TouchableOpacity
            style={[styles.card, selected && styles.selectedCard]}
            onPress={handlePress}
            activeOpacity={disabled ? 1.0 : 0.2}
        >

            <FlipCard flipVertical={true} clickable={false} flip={detailsSelected}>

                { cardWithImageAndName(note) }
                { cardWithDescription(note) }

            </FlipCard>

        </TouchableOpacity>

        { detailsButton() }

    </View>

  );
  
}
export default NoteCard;
