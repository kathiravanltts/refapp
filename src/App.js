import { Lightning, Utils } from 'wpe-lightning-sdk'
import Notification from './Notification/notification.js'
import Model from './AppModel.js'
import Appllication from './Appllication.js'

export default class App extends Lightning.Component {
  static getFonts() {
    return []
  }

  static _template() {
    return {
      Notification: {
        type: Notification,
        alpha: 0,
        signals: { select: true },
        argument: {}
      },
      Appllication: {
        color: 0xffff4512,
        type: Appllication,
        alpha: 1,
        signals: { select: true },
        argument: {}
      }
    }
  }

  _setup() {
    this._setState('Appllication')
  }

  _construct() {
    this.model = new Model()
    this.model.data = {}
  }

  _init() {}

  _captureKey(evt) {
    return false
  }

  static _states() {
    return [
      class Notification extends this {
        $enter() {
          this.tag('Notification').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Notification').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Notification')
        }
        select({ item }) {
          this.tag('Appllication').argument['evt'] = item.evt
          this._setState('Appllication')
        }
      },
      class Appllication extends this {
        $enter() {}
        $exit() {}
        _getFocused() {
          return this.tag('Appllication')
        }
        select({ item }) {
          this.tag('Notification').argument['evt'] = item
          this._setState(item.type)
        }
      }
    ]
  }
}
