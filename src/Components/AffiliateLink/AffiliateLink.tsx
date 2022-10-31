import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View, Image, Linking, StyleSheet } from 'react-native';

import { Link } from 'app/Components';
import { AnalyticsService, AnalyticsEvent } from 'app/Services';

import * as types from '../../Constants/types';
import { Metrics, Colors, Fonts, Typography } from '../../Theme';

interface Props {
  affiliateLinks: types.AffiliateLinks[];
}

const AffiliateLink = ({ affiliateLinks }: Props) => {
  const handlePress = useCallback(async (link: string) => {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
      AnalyticsService.logEvent(AnalyticsEvent.UserAccessShop);
    } else {
      console.log('AFFILATE_LINK_ERROR');
    }
  }, []);

  return (
    <View style={styles.container}>
      {affiliateLinks?.map(({ link, image, name }: types.AffiliateLinks) => (
        <View key={name} style={styles.itemContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={() => handlePress(link)}>
            <Image style={styles.logo} source={{ uri: image }} />
          </TouchableOpacity>
          <Link style={styles.linkStyle} textStyle={styles.text} onPress={() => handlePress(link)}>
            {name}
          </Link>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginBottom: Metrics.margin,
    width: Metrics.affiliateLinkWidth,
    alignItems: 'center',
  },
  item: {
    width: Metrics.affiliateLink,
    height: Metrics.affiliateLink,
    borderRadius: Metrics.smallBorderRadius,
  },
  logo: {
    width: Metrics.affiliateLink,
    height: Metrics.affiliateLink,
    borderRadius: Metrics.smallBorderRadius,
  },
  text: {
    marginTop: Metrics.margin,
    ...Fonts.style.xsmallBase,
    color: Colors.greyScaleSix,
    lineHeight: Typography.smallLineHeight,
  },
  linkStyle: { paddingRight: 0, marginVertical: 0, alignItems: 'center' },
});

export default memo(AffiliateLink);
