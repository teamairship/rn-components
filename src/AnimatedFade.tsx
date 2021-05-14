import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import useCurrent from './hooks/useCurrent';

type Props = {
  /**
   * auto-trigger fade-in?
   */
  triggerFade?: boolean;

  /**
   * starting opacity value (0 - 1.00)
   */
  opacityStart?: number;

  /**
   * ending opacity value (0 - 1.00)
   */
  opacityEnd?: number;

  /**
   * animation duration (in ms)
   */
  duration?: number;

  /**
   * delay before animation start (in ms)
   */
  delay?: number;
  style?: ViewStyle;

  /**
   * callback function called once fadeIn animation completes
   */
  onEnd?: () => void;

  /**
   * should this animation repeat?
   */
  loop?: boolean;
};

const AnimatedFade: React.FC<Props> = ({
  triggerFade = true,
  opacityStart = 0,
  opacityEnd = 1,
  duration = 800,
  delay = 0,
  loop = false,
  onEnd,
  style,
  children,
}) => {
  const opacity = useRef(new Animated.Value(opacityStart));

  const _onEnd = useCurrent(onEnd);
  const handleEnd = useCallback(() => {
    if (_onEnd.current) _onEnd.current();
  }, [_onEnd]);

  const fadeIn = () => {
    Animated.timing(opacity.current, {
      toValue: opacityEnd,
      duration,
      delay,
      useNativeDriver: true,
    }).start((status) => {
      if (status.finished) {
        handleEnd();
        if (loop) fadeOut();
      }
    });
  };

  const fadeOut = () => {
    Animated.timing(opacity.current, {
      toValue: opacityStart,
      duration,
      delay,
      useNativeDriver: true,
    }).start((status) => {
      if (status.finished) {
        handleEnd();
        if (loop) fadeIn();
      }
    });
  };

  const _fadeIn = useCurrent(fadeIn);

  useEffect(() => {
    if (triggerFade) {
      _fadeIn.current();
    }
  }, [triggerFade, _fadeIn]);

  return (
    <Animated.View style={{ opacity: opacity.current, ...style }}>
      {children}
    </Animated.View>
  );
};

export default AnimatedFade;

const Test = () => {
  return <AnimatedFade></AnimatedFade>;
};
