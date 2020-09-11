import { Graphics } from 'pixi.js'
import { PixiComponent } from '@inlet/react-pixi'

export default PixiComponent('Rectangle', {
  create: props => {
    return new Graphics();
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    const { fill, x, y, width, height, opacity } = newProps
    instance.clear()
    instance.beginFill(fill)
    if(opacity) instance.alpha = opacity
    instance.drawRect(x, y, width, height)
    instance.endFill();
  },
})