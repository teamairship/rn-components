"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const AnimatedMove = ({ moveOnMount = true, triggerMove = false, tension = 18, friction = 4, toX = 0, toY = 0, startX = 0, startY = 0, delay = 0, onEnd, style, children, }) => {
    const position = react_1.useRef(new react_native_1.Animated.ValueXY({ x: startX, y: startY }))
        .current;
    const move = () => {
        react_native_1.Animated.spring(position, {
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
    react_1.useEffect(() => {
        if (moveOnMount || triggerMove) {
            move();
        }
    }, [triggerMove, moveOnMount]);
    return (<react_native_1.Animated.View style={{
        transform: [{ translateX: position.x }, { translateY: position.y }],
        ...style,
    }}>
      {children}
    </react_native_1.Animated.View>);
};
exports.default = AnimatedMove;
