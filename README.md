# @airship/rn-components

This is a component library created and used by Airship for quickly building out **consistent** and **high quality** React Native apps! It will be made up of basic inputs to animated wrapper components. This library will be included in all [Airfoil](https://github.com/teamairship/airfoil) templates by default.

## Features
- ✨ Easy to use, configurable components
- 📱 Animations that use the UI thread for a consistent 60fps
- ⏳ Saves you from building basic components from scratch every project


## Getting Started

To add to your project, run the command
```
yarn add @airship/rn-components
```


## Examples

🛠 <i>Coming Soon</i>

## API Reference

### AnimatedMove
An animated <b>View</b> that can wrap any React Native component to move its position.
| Prop | Type | Required | Default | Description |
| --- | :--: | :--: | :--: | --- |
| <b>moveOnMount</b> | <i>boolean</i> | no | true | AnimatedMove is set to start animating on render. Setting this to <i>false</i> in conjunction with <b>triggerMove</b> will allow you to control when the animation occurs. |
| <b>triggerMove</b> | <i>boolean</i> | no | false | You are able to use JavaScript to control when the animation will occur. |
| <b>tension</b> | <i>number</i> | no | 18 | Controls the speed. [Reference](https://reactnative.dev/docs/animated#spring) |
| <b>friction</b> | <i>number</i> | no | 4 | Controls "bounciness"/overshoot. [Reference](https://reactnative.dev/docs/animated#spring) |
| <b>toX</b> | <i>number</i> | no | 0 | Move your component to a new <b>X</b> position. |
| <b>toY</b> | <i>number</i> | no | 0 | Move your component to a new <b>Y</b> position. |
| <b>startX</b> | <i>number</i> | no | 0 | Move your component to its <b>X</b> origin position (ex. setting to -10 will have the component move from the <b>left</b> to its position you have in your styles). |
| <b>startY</b> | <i>number</i> | no | 0 | Move your component to its <b>Y</b> origin position (ex. setting to -10 will have the component move from the <b>top</b> to its position you have in your styles). |
| <b>delay</b> | <i>number</i> | no | 0 | Specify in <i>ms</i> how long to wait until the animation occurs. |
| <b>style</b> | <i>ViewStyle</i> | no | undefined | Pass React Native <b>View</b> styles to AnimatedMove. |
| <b>onEnd</b> | <i>() => void</i> | no | undefined | When the animation finishes and this function exists, the <b>onEnd</b> function will be called. |