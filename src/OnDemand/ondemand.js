import { Lightning } from 'wpe-lightning-sdk'

export default class OnDemand extends Lightning.Component {
  static _template() {
    return {}
  }
  _construct() {}

  _init() {
    this.patch({
      Txt: { x: 600, y: 520, text: { text: this.argument.description, fontSize: 30 } }
    })
  }

  _handleBack() {
    this.signal('select', { item: { label: 'OnDemand', target: 'Menu' } })
  }
}
