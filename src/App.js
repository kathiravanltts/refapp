import { Lightning, Utils } from 'wpe-lightning-sdk'
import Menu from './mainMenu/menu.js'
import OnDemand from './OnDemand/ondemand.js'
import ChannelBar_ from './channelBar/channelbar.js'
import Movie from './movie/movie.js'
import { setPlayerEndpoint, startPlayback } from './player/player.js'
import Model from './AppModel.js'
import TrickMode from './trickMode/trickmode.js'

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
        argument: 'App Page Under Construction. Please Press Back key.'
      },
      Movie: {
        type: Movie,
        alpha: 0,
        signals: { select: true },
        argument: 'Movie Page Under Construction. Please Press Back key.'
      },
      Setting: {
        type: OnDemand,
        alpha: 0,
        signals: { select: true },
        argument: 'Setting Under Construction. Please Press Back key.'
      },
      TrickMode: {
        type: TrickMode,
        alpha: 0,
        signals: { select: true },
        argument: 'TrickMode Under Construction. Please Press Back key.'
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

  _init() {
    this.model.getAppModel().then(data => {
      this.model.data = data
      setPlayerEndpoint(data)
      this.patch({
        ChannelBar: {
          type: ChannelBar_,
          alpha: 0,
          signals: { select: true },
          argument: ''
        }
      })
    })
  }

  _captureKey(evt) {
    if ((evt.code === 'ArrowDown' || evt.code === 'ArrowUp') && this._stateIndex === 1) {
      this._setState('ChannelBar')
    }
    return false
  }

  static _states() {
    return [
      class Menu extends this {
        $enter() {
          this.tag(this._state.name).setSmooth('alpha', 1)
        }
        $exit() {
          this.tag(this._state.name).setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag(this._state.name)
        }
        select({ item }) {
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
          this.tag(this._state.name).setSmooth('alpha', 1)
        }
        $exit() {
          this.tag(this._state.name).setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag(this._state.name)
        }
        select({ item }) {
          this._setState(item.target)
        }
      },
      class Setting extends this {
        $enter() {
          this.tag(this._state.name).setSmooth('alpha', 1)
        }
        $exit() {
          this.tag(this._state.name).setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag(this._state.name)
        }
        select({ item }) {
          this._setState(item.target)
        }
      },
      class ChannelBar extends this {
        $enter() {
          this.tag(this._state.name).setSmooth('alpha', 1)
        }
        $exit() {
          this.tag(this._state.name).setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag(this._state.name)
        }
        select({ item }) {
          this._setState(item.target)
        }
      },
      class TrickMode extends this {
        $enter() {
          this.tag(this._state.name).setSmooth('alpha', 1)
        }
        $exit() {
          this.tag(this._state.name).setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag(this._state.name)
        }
        select({ item }) {
          this._setState(item.target)
        }
      }
    ]
  }
}
