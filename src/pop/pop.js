import { Lightning } from 'wpe-lightning-sdk'
import Config from './config.js'

export default class OnDemand extends Lightning.Component {
  static _template() {
    return {}
  }
  _construct() {}
  _init() {
    this.patch({
      Border: {
        rect: true,
        x: Config.BORDER_X,
        y: Config.BORDER_Y,
        w: Config.BORDER_WIDTH,
        h: Config.BORDER_HEIGHT,
        color: Config.BORDER_COLOR
      },
      Errorbox: {
        rect: true,
        x: Config.POP_X,
        y: Config.POP_Y,
        w: Config.POP_WIDTH,
        h: Config.POP_HEIGHT,
        color: Config.POP_COLOR,
        Ch: {
          x: Config.ERROR_TXT_X,
          y: Config.ERROR_TXT_Y,
          text: { text: this.argument.evt.event.errorMsg, fontSize: Config.DEFAULT_FONT_SIZE }
        }
      }
    })
  }
  _handleEnter() {
    this.signal('select', { item: { label: 'POP', evt: this.argument.evt } })
  }
  _handleBack() {}
}
