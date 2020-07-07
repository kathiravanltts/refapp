import { Lightning } from 'wpe-lightning-sdk'
import Pop from '../pop/pop.js'
import Config from './config.js'

export default class notification extends Lightning.Component {
  static _template() {
    return {}
  }

  _construct() {}
  _init() {}

  _active() {
    this.patch({
      Pop: {
        type: Pop,
        x: Config.POP_X,
        y: Config.POP_Y,
        signals: { select: true },
        argument: { evt: this.argument.evt }
      }
    })
    this._setState('Pop')
  }

  _handleBack() {}

  static _states() {
    return [
      class Pop extends this {
        $enter() {
          this.tag('Pop').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Pop').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Pop')
        }
        select({ item }) {
          this.signal('select', { item: { label: 'OnDemand', evt: item.evt } })
        }
      }
    ]
  }
}
