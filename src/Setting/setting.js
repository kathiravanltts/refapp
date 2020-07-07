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
  _focus() {}
  _unfocus() {}
  _active() {
    this._setState('Error')
  }
  _handleBack() {
    this.signal('select', { item: { label: 'Setting', target: 'Menu' } })
  }

  _handleEnter() {
    // this.signal('select', {
    //     item: {
    //         label: 'Setting',
    //         type: 'Notification',
    //         event: {
    //             'errorMsg': 'Setting Under development',
    //             'Rertuntarget': 'Menu',
    //             'target': 'Pop'
    //         }
    //     }
    // });
  }

  static _states() {
    return [
      class Error extends this {
        $enter() {
          this.signal('select', {
            item: {
              label: 'Setting',
              type: 'Notification',
              event: {
                errorMsg: 'Setting Under development',
                Rertuntarget: 'Menu',
                target: 'Pop'
              }
            }
          })
        }
        $exit() {}
        _getFocused() {}
        select({ item }) {}
      },
      class Normal extends this {
        $enter() {}
        $exit() {}
        _getFocused() {}
        select({ item }) {}
      }
    ]
  }
}
