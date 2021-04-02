import React, { useState } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = {
  style?: ViewStyle;
  toScaleValue?: number;
  friction?: number;
  tension?: number;
  colorTransitionDuration?: number;
  colorStart?: string;
  colorEnd?: string;
  isPressed?: boolean;
  callFunctionOnPressIn?: boolean;
  onPress?: () => void;
  renderComponent?: (
    colorInterpolation: Animated.AnimatedInterpolation,
  ) => React.ReactElement;
};

const AnimatedPressable: React.FC<Props> = ({
  style,
  toScaleValue = 0.5,
  friction = 3,
  tension = 80,
  colorTransitionDuration = 300,
  colorStart,
  colorEnd,
  isPressed,
  onPress,
  renderComponent,
  callFunctionOnPressIn = false,
}) => {
  const [pressed, setPressed] = useState(isPressed ? isPressed : false);
  const pressedAnimatedValue = new Animated.Value(0);
  const scale = new Animated.Value(1);

  const outPutColor =
    colorStart && colorEnd
      ? !pressed
        ? [colorStart, colorEnd]
        : [colorEnd, colorStart]
      : null;

  const colorInterpolation =
    colorStart && colorEnd && outPutColor
      ? pressedAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: outPutColor,
        })
      : null;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: toScaleValue,
      useNativeDriver: true,
    }).start((status) => {
      if (status.finished && onPress && callFunctionOnPressIn) {
        onPress();
      }
    });
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction,
      tension,
      useNativeDriver: true,
    }).start((status) => {
      if (!colorStart && !colorEnd && !outPutColor && status.finished) {
        if (onPress && !callFunctionOnPressIn) {
          onPress();
        }
      }
    });
    if (colorStart && colorEnd && outPutColor) {
      Animated.timing(pressedAnimatedValue, {
        toValue: 1,
        duration: colorTransitionDuration,
        useNativeDriver: true,
      }).start((status) => {
        if (status.finished) {
          setPressed((prev) => !prev);
          if (onPress) {
            onPress();
          }
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[
          {
            transform: [{ scale }],
          },
          style,
        ]}>
        {renderComponent &&
          //@ts-ignore
          renderComponent(colorInterpolation ? colorInterpolation : null)}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedPressable;
