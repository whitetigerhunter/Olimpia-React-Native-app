import React, { useCallback, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { RoundedImage } from 'app/Components';
import * as types from 'app/Constants/types';
import { Colors, Metrics, Metricstablet, Fonts, FontsTablet } from '../../Theme';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

const SCREEN_WIDTH = Dimensions.get('window').width;
const QUANTITY_INGREDIENTS = 5;

// interface Props {
//   item: any;
//   onSelect: (item: any) => void;
//   onDelete?: (item: any) => void;
//   handleDelete?: (item: any) => void;
// }

const PersonalizedRecipesListItem = (props) => {
    
    console.log("ONSELECTED", Object.keys(props), Object.keys(props.item), '666');
    const isTablet = DeviceInfo.isTablet();
    const styles = isTablet ? scaledStyles : regularStyles;
    const {selected_notes, recipe_name} = props.item;
    const handlePress = useCallback(() => props.onSelect(props.item), [props.onSelect, props.item]);
    const handleRemove = useCallback(() => props.onPress(props.item), [props.onPress, props.item]);

    const notes = selected_notes.slice(0, QUANTITY_INGREDIENTS);

    const rightSwipe = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [-85, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity onPress={handleRemove} activeOpacity={0.6}>
                <View style={styles.deleteBox}>
                    <Animated.Text style={{transform: [{scale: scale}], ...styles.deleteBoxText}}>
                        Delete
                    </Animated.Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            renderRightActions={rightSwipe}
            style={styles.swipeContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={handlePress}>
                <View style={styles.rowReversed}>
                    {notes.map((item: types.Note) => (
                        <RoundedImage key={item.pk} uri={item.featured_image.image} style={[styles.image]}/>
                    ))}
                </View>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {recipe_name}
                    </Text>
                    <View style={[styles.row, styles.wrap]}>
                        {notes.map((item: types.RecipeBestMatch, index: number) => (
                            <Text key={item.pk} style={styles.subtitle}>
                                {item.name} {index !== selected_notes.length - 1 && ', '}
                                {index === QUANTITY_INGREDIENTS - 1 && selected_notes.length > QUANTITY_INGREDIENTS && '...'}
                            </Text>
                        ))}
                    </View>
                </View>
                <Icon name={'chevron-right'} style={styles.arrowRight} size={isTablet?35:20} />
            </TouchableOpacity>
        </Swipeable>
    );
};

const regularStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.greyScaleOne,
        borderRadius: Metrics.smallBorderRadius,
        marginBottom: Metrics.margin,
        paddingLeft: 26,
        alignItems: 'center',
        height: Metrics.recipeListItemHeight,
    },
    textContainer: {
        flex: 0.9,
        paddingLeft: Metrics.margin,
    },
    row: {flexDirection: 'row'},
    rowReversed: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        flexWrap: 'wrap',
        flex: 0.2,
    },
    image: {marginLeft: -26, borderColor: Colors.greyScaleOne},
    title: {
        ...Fonts.style.normal,
        color: Colors.greyScaleSix,
    },
    subtitle: {
        ...Fonts.style.helper,
        color: Colors.greyScaleFour,
    },
    wrap: {flexWrap: 'wrap'},
    arrowRight: {flex: 0.1, marginRight: Metrics.margin},
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 83,
        borderRadius: Metrics.smallBorderRadius,
    },
    deleteBoxText: {
        color: 'white',
        fontSize: 16,
    },
    swipeContainer: {
        height: 80,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 16,
        backgroundColor: Colors.greyScaleOne,
        borderRadius: Metrics.smallBorderRadius,
        marginBottom: Metrics.margin,
        paddingLeft: 26,
    },
});
const scaledStyles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.greyScaleOne,
        borderRadius: Metricstablet.smallBorderRadius,
        marginBottom: Metricstablet.margin,
        paddingLeft: "26@ms",
        alignItems: 'center',
        height: Metricstablet.recipeListItemHeight,
    },
    textContainer: {
        flex: 0.9,
        paddingLeft: Metricstablet.margin,
    },
    row: {flexDirection: 'row'},
    rowReversed: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        flexWrap: 'wrap',
        flex: 0.2,
    },
    image: {marginLeft: "-26@ms", borderColor: Colors.greyScaleOne},
    title: {
        ...FontsTablet.style.normal,
        color: Colors.greyScaleSix,
    },
    subtitle: {
        ...FontsTablet.style.helper,
        color: Colors.greyScaleFour,
    },
    wrap: {flexWrap: 'wrap'},
    arrowRight: {flex: 0.1, marginRight: Metricstablet.margin},
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: "85@ms",
        height: "83@ms",
        borderRadius: Metricstablet.smallBorderRadius,
    },
    deleteBoxText: {
        color: 'white',
        fontSize: "16@ms",
    },
    swipeContainer: {
        height: "80@ms",
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: "16@ms",
        backgroundColor: Colors.greyScaleOne,
        borderRadius: Metricstablet.smallBorderRadius,
        marginBottom: Metricstablet.margin,
        paddingLeft: "26@ms",
    },
});
 export default memo(PersonalizedRecipesListItem);
