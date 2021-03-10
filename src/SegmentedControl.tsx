/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type Props = {
  tabs: string[];
  onChange: (index: number) => void;
  currentIndex: number;
  activeSegmentBackgroundColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextColor?: string;
  activeContainerStyles?: ViewStyle;
};

const width = Dimensions.get('screen').width - 32;

const SegmentedControl: FC<Props> = ({
  tabs = [],
  onChange,
  currentIndex,
  activeSegmentBackgroundColor,
  containerStyle,
  textStyle,
  activeTextColor,
  activeContainerStyles,
}) => {
  const translateValue = (width - 4) / tabs?.length;
  const [tabTranslate] = React.useState(new Animated.Value(0));

  const memoizedTabPressCallback = React.useCallback(
    (index) => {
      onChange(index);
    },
    [onChange],
  );

  useEffect(() => {
    Animated.spring(tabTranslate, {
      toValue: currentIndex * translateValue,
      stiffness: 180,
      damping: 20,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, tabTranslate, translateValue]);

  return (
    <Animated.View style={[styles.segmentedControlWrapper, containerStyle]}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFill,
            position: 'absolute',
            width: (width - 4) / tabs?.length,
            top: 0,
            marginVertical: 2,
            marginHorizontal: 2,
            backgroundColor: activeSegmentBackgroundColor,
            borderRadius: 10,
          },
          {
            transform: [
              {
                translateX: tabTranslate,
              },
            ],
          },
          activeContainerStyles,
        ]}
      />
      {tabs.map((tab: string, index: number) => {
        const isCurrentIndex = currentIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.textWrapper]}
            onPress={() => memoizedTabPressCallback(index)}
            activeOpacity={0.7}>
            <Text
              numberOfLines={1}
              style={[
                styles.textStyles,
                textStyle,
                {
                  color: isCurrentIndex
                    ? activeTextColor
                      ? activeTextColor
                      : textStyle?.color
                    : textStyle?.color,
                },
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  segmentedControlWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: width,
    marginBottom: 10,
    backgroundColor: '#ebeff5',
    paddingVertical: 12,
  },
  textWrapper: {
    flex: 1,
    elevation: 9,
    paddingHorizontal: 5,
  },
  textStyles: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#20242B',
  },
});

export default SegmentedControl;
