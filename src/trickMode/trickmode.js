import { Lightning } from 'wpe-lightning-sdk'

export default class trickMode extends Lightning.Component {
  static _template() {
    return {}
  }

  _construct() {}

  _init() {
    this.patch({
      Txt: { x: 600, y: 520, text: { text: this.argument, fontSize: 30 } }
    })
  }

  _handleUp() {}
  _handleBack() {
    this.signal('select', { item: { label: 'trickMode', target: 'Movie' } })
  }

  _handleEnter() {}
}
