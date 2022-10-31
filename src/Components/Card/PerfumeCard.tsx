import React, { useState, useCallback, memo } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { PerfumeCardAccuracyMatch, PerfumeCardHeart, Image } from 'app/Components';
import * as types from 'app/Constants/types';
import { Colors, Fonts, FontsTablet, Metrics, Metricstablet, Typography, TypographyTablet } from 'app/Theme';
import { ScaledSheet } from "react-native-size-matters";
import DeviceInfo from 'react-native-device-info';

interface Props {
  id: number;
  name: string;
  collecionName: any;
  onSelect: (id: number) => void;
  favorite: boolean | types.Perfume | undefined;
  brand?: any;
  match?: number;
  image?: string;
  small?: boolean;
  fixedWidth?: boolean;
  addToFavorite?: (type: string, id: number, cb: () => void) => void;
}

const PerfumeCard: React.FC<Props> = ({
  id,
  name,
  collecionName,
  brand,
  match,
  image,
  onSelect,
  favorite,
  small,
  addToFavorite,
  fixedWidth,
}: Props) => {
  // Together Shay (75ml)

  if (id == 4143) {
      console.log('========================================');
      console.log('Perfume card small id      ', id);
      console.log('Perfume card small name    ', name);
      console.log('Perfume card small heart   ', !!small);
      console.log('Perfume card small favorite', !!favorite);
      console.log('========================================');
  }

  const [fav, setFav] = useState(!!favorite);

  const [loading, setLoading] = useState(false);

  const handlePress = useCallback(() => onSelect(id), [id, onSelect]);

  const handleHeartPressAction = useCallback(() => {
    if (small) {
      setLoading(true);
      addToFavorite &&
        addToFavorite(fav ? 'remove' : 'add', id, () => {
          setFav(!fav);
          setLoading(false);
        });
    }
    return;
  }, [addToFavorite, id, fav, small]);
  const isTablet = DeviceInfo.isTablet();
  const styles = isTablet ? scaledStyles : regularStyles;
  return (
    <View style={[styles.card, small && styles.smallCard, fixedWidth && styles.cardFixedWidth]}>
      

      <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={styles.touchable}>
        
        {collecionName&&
          <View style={[small ? styles.smallTextContainer : styles.collectionContainer]}>
            {!loading && <PerfumeCardHeart small={small} fav={fav} collecionName={collecionName} onPressAction={handleHeartPressAction} />}
            <Text style={styles.collectionText}>
              {collecionName}
            </Text>
          </View>
        }
        <View style={styles.imageContainer}>
        {match && <PerfumeCardAccuracyMatch match={match} />}
      {!loading && !collecionName&&<PerfumeCardHeart small={small} fav={fav} onPressAction={handleHeartPressAction} />}
          <Image
            style={styles.image}
            resizeMode="cover"
            source={image ? { uri: image } : require('../../Assets/Images/perfume.png')}
          />
        </View>
        <View style={[small ? styles.smallTextContainer : styles.textContainer]}>
          <Text numberOfLines={1} style={[small ? styles.smallTitle : styles.title]}>
            {name}
          </Text>
          <Text numberOfLines={1} style={[small ? styles.smallBrand : styles.brand]}>
            {brand}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const regularStyles = StyleSheet.create({
  card: {
    width: Metrics.perfumeCardWidth,
    aspectRatio: 218 / 210,
    borderRadius: Metrics.smallBorderRadius,
    backgroundColor: Colors.greyScaleOne,
    marginEnd: 12,
    justifyContent: 'space-between',
  },
  smallCard: {
    width: undefined,
    aspectRatio: undefined,
    height: Metrics.perfumeSmallCardHeight,
    marginBottom: Metrics.margin,
    marginEnd: 0,
  },
  cardFixedWidth: {
    width: Metrics.perfumeSmallCardWidth,
  },
  touchable: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 8,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    width: Metrics.perfumeCardWidth,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: Metrics.smallBorderRadius,
    borderBottomRightRadius: Metrics.smallBorderRadius,
    backgroundColor: Colors.lightBlue,
  },
  collectionContainer: {
    width: Metrics.perfumeCardWidth,
    height: 30,
    backgroundColor: Colors.white,
    fontFamily: Fonts.fontTypes.semiBold,
  },
  collectionText: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 8,
    fontFamily: Fonts.fontTypes.semiBold,
    fontSize: Fonts.size.small,
  },
  smallTextContainer: {
    marginTop: -8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: Metrics.smallBorderRadius,
    borderBottomRightRadius: Metrics.smallBorderRadius,
  },
  title: {
    color: Colors.greyScaleOne,
    ...Fonts.style.favouritePerfumeName,
    lineHeight: Typography.smallerLineHeight,
    marginBottom: 2,
  },
  smallTitle: {
    color: Colors.greyScaleSix,
    ...Fonts.style.smallMedium,
    lineHeight: Typography.smallerLineHeight,
    marginBottom: 1,
  },
  brand: {
    ...Fonts.style.helper,
    color: Colors.greyScaleOne,
  },
  smallBrand: {
    ...Fonts.style.xsmallBase,
    color: Colors.greyScaleSix,
  },
});
const scaledStyles = ScaledSheet.create({
  card: {
    width: Metricstablet.perfumeCardWidth,
    aspectRatio: 218 / 210,
    borderRadius: Metricstablet.smallBorderRadius,
    backgroundColor: Colors.greyScaleOne,
    marginEnd: "12@ms",
    justifyContent: 'space-between',
  },
  smallCard: {
    width: undefined,
    aspectRatio: undefined,
    height: Metricstablet.perfumeSmallCardHeight,
    marginBottom: Metricstablet.margin,
    marginEnd: 0,
  },
  cardFixedWidth: {
    width: Metricstablet.perfumeSmallCardWidth,
  },
  touchable: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 8,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    width: Metricstablet.perfumeCardWidth,
    paddingVertical: "8@vs",
    paddingHorizontal: "10@ms",
    borderBottomLeftRadius: Metricstablet.smallBorderRadius,
    borderBottomRightRadius: Metricstablet.smallBorderRadius,
    backgroundColor: Colors.lightBlue,
  },
  collectionContainer: {
    width: Metricstablet.perfumeCardWidth,
    height: "30@ms",
    backgroundColor: Colors.white,
    fontFamily: FontsTablet.fontTypesTablet.semiBold,
  },
  collectionText: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "8@ms",
    fontFamily: FontsTablet.fontTypesTablet.semiBold,
    fontSize: FontsTablet.sizeTablet.small,
  },
  smallTextContainer: {
    marginTop: "-8@vs",
    paddingVertical: "8@vs",
    paddingHorizontal: "10@ms",
    borderBottomLeftRadius: Metricstablet.smallBorderRadius,
    borderBottomRightRadius: Metricstablet.smallBorderRadius,
  },
  title: {
    color: Colors.greyScaleOne,
    ...FontsTablet.style.favouritePerfumeName,
    lineHeight: TypographyTablet.smallerLineHeight,
    marginBottom: "2@ms",
  },
  smallTitle: {
    color: Colors.greyScaleSix,
    ...FontsTablet.style.smallMedium,
    lineHeight: TypographyTablet.smallerLineHeight,
    marginBottom: 1,
  },
  brand: {
    ...FontsTablet.style.helper,
    color: Colors.greyScaleOne,
  },
  smallBrand: {
    ...FontsTablet.style.xsmallBase,
    color: Colors.greyScaleSix,
  },
});

export default memo(PerfumeCard);
