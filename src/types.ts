import { ViewStyle } from 'react-native';

export type AnimatedMoveProps = {
  moveOnMount?: boolean;
  triggerMove?: boolean;
  tension?: number;
  friction?: number;
  toX?: number;
  toY?: number;
  startX?: number;
  startY?: number;
  delay?: number; // ms
  style?: ViewStyle;
  onEnd?: () => void;
};
