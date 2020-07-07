import { Lightning, Utils } from 'wpe-lightning-sdk'
import Menu from './mainMenu/menu.js'
import OnDemand from './OnDemand/ondemand.js'
import Setting from './Setting/setting.js'
import ChannelBar_ from './channelBar/channelbar.js'
import Movie from './movie/movie.js'
import { setPlayerEndpoint, startPlayback } from './player/player.js'
import Model from './AppModel.js'
import jsonconfig from './config.json'

export default class App extends Lightning.Component {
  static getFonts() {
    return []
  }

  static _template() {
    return {
      Menu: { type: Menu, alpha: 0, signals: { select: true } },
      App: {
        type: OnDemand,
        alpha: 0,
        signals: { select: true },
        argument: { description: 'App Page Under Construction. Please Press Enter key.' }
      },
      Movie: {
        type: Movie,
        alpha: 0,
        signals: { select: true },
        argument: {}
      },
      Setting: {
        type: Setting,
        alpha: 0,
        signals: { select: true },
        argument: { description: 'Setting Page Under Construction. Please Press Back key to Menu.' }
      }
    }
  }

  _setup() {
    this._setState('Menu')
  }

  _construct() {
    this.model = new Model()
    this.model.data = {}
  }

  modelUpdate(data) {
    this.model.data = data
    setPlayerEndpoint(data)
    this.patch({
      ChannelBar: {
        type: ChannelBar_,
        alpha: 0,
        signals: { select: true },
        argument:
          'Please Press Up/Down arrow key for channel navigation.Press Enter ,The main menu will appear'
      }
    })
  }

  _init() {
    if (window.location.protocol != 'file:') {
      this.model.getAppModel().then(data => {
        this.modelUpdate(data)
      })
    } else {
      this.modelUpdate(jsonconfig)
    }
  }

  _captureKey(evt) {
    if ((evt.code === 'ArrowDown' || evt.code === 'ArrowUp') && this._stateIndex === 1) {
      this._setState('ChannelBar')
    }
    return false
  }
  _active() {
    if (this.argument.evt != null) {
      this._setState(this.argument.evt.event.Rertuntarget)
    }
  }

  static _states() {
    return [
      class Menu extends this {
        $enter() {
          this.tag('Menu').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Menu').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Menu')
        }
        select({ item }) {
          console.log(this)
          this._setState(item.target)
        }
      },
      class App extends this {
        $enter() {
          this.tag('App').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('App').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('App')
        }
        select({ item }) {
          this._setState(item.target)
        }
      },
      class Movie extends this {
        $enter() {
          this.tag('Movie').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Movie').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Movie')
        }
        select({ item }) {
          this._setState(item.target)
        }
      },
      class Setting extends this {
        $enter() {
          this.tag('Setting')._setState('Normal')
          this.tag('Setting').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Setting').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Setting')
        }
        select({ item }) {
          if (item.type == 'Notification') {
            this.signal('select', { item })
          } else {
            this._setState(item.target)
          }
        }
      },
      class ChannelBar extends this {
        $enter() {
          this.tag('ChannelBar').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('ChannelBar').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('ChannelBar')
        }
        select({ item }) {
          this._setState(item.target)
        }
      }
    ]
  }
}
