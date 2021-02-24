import React from 'react';
import { ViewStyle } from 'react-native';
declare type AnimatedMoveProps = {
    moveOnMount?: boolean;
    triggerMove?: boolean;
    tension?: number;
    friction?: number;
    toX?: number;
    toY?: number;
    startX?: number;
    startY?: number;
    delay?: number;
    style?: ViewStyle;
    onEnd?: () => void;
};
export declare const AnimatedMove: React.FC<AnimatedMoveProps>;
export {};
