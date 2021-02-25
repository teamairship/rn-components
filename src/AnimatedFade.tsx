import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

type Props = {
  fadeOnMount?: boolean;
  triggerFade?: boolean;
  startingOpacity?: number; // 0 - 1.00
  endingOpacity?: number; // 0 - 1.00
  duration?: number; // ms
  delay?: number; // ms
  style?: ViewStyle;
  onEnd?: () => void;
};

const AnimatedFade: React.FC<Props> = ({
  fadeOnMount = true,
  triggerFade = false,
  startingOpacity = 0,
  endingOpacity = 1,
  duration = 800,
  delay = 0,
  onEnd,
  style,
  children,
}) => {
  const opacity = useRef(new Animated.Value(startingOpacity)).current;

  const fade = () => {
    Animated.timing(opacity, {
      toValue: endingOpacity,
      duration,
      delay,
      useNativeDriver: true,
    }).start((status) => {
      if (status.finished && onEnd) {
        onEnd();
      }
    });
  };

  useEffect(() => {
    if (fadeOnMount || triggerFade) {
      fade();
    }
  }, [triggerFade, fadeOnMount]);

  return (
    <Animated.View style={{ opacity, ...style }}>{children}</Animated.View>
  );
};

export default AnimatedFade;
