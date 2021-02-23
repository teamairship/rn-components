import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { AnimatedMoveProps } from './types';

export const AnimatedMove: React.FC<AnimatedMoveProps> = ({
  moveOnMount = true,
  triggerMove = false,
  tension = 18,
  friction = 4,
  toX = 0,
  toY = 0,
  startX = 0,
  startY = 0,
  delay = 0,
  onEnd,
  style,
  children,
}) => {
  const position = useRef(new Animated.ValueXY({ x: startX, y: startY }))
    .current;

  const move = () => {
    Animated.spring(position, {
      toValue: {
        x: toX,
        y: toY,
      },
      tension,
      friction,
      useNativeDriver: true,
      delay,
    }).start((status) => {
      if (status.finished && onEnd) {
        onEnd();
      }
    });
  };

  useEffect(() => {
    if (moveOnMount || triggerMove) {
      move();
    }
  }, [triggerMove, moveOnMount]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: position.x }, { translateY: position.y }],
        ...style,
      }}>
      {children}
    </Animated.View>
  );
};
