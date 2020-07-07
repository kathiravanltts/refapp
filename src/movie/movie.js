import { Lightning, Utils } from 'wpe-lightning-sdk'
import { VodListItem } from './../core/list.js'
import Model from './model.js'
import { getBackground, getMainList, getRecommendedList } from './view.js'
import { startPlayback } from './../player/player.js'
import Config from './config.js'
import moviesdata from '../cache/demo/movies.json'
import info from '../info/info.js'

export default class Movie extends Lightning.Component {
  static _template() {
    return {
      x: 0,
      y: 0,
      MainList: getMainList(),
      RecommendedList: getRecommendedList(),
      Txt: {
        x: Config.LIST_ALL_MOVIES_X,
        y: Config.LIST_ALL_MOVIES_Y,
        text: { text: Config.LIST_ALL_MOVIES, fontSize: Config.DEFAULT_FONT_SIZE }
      },
      RecommendedTxt: {
        x: Config.LABEL_RECOMMENDED_X,
        y: Config.LABEL_RECOMMENDED_Y,
        text: { text: Config.LABEL_RECOMMENDED, fontSize: Config.DEFAULT_FONT_SIZE }
      },
      Info: {
        type: info,
        alpha: 0,
        signals: { select: true },
        argument: { description: 'Info Page Under Construction.' }
      }
    }
  }

  _construct(cont) {
    this.model = new Model()
    this.model.data = {}
  }

  modelUpdateRecommend(data) {
    let recommended_data = data.slice(0, 3)
    this.tag('RecommendedList').ListItemsComponend = VodListItem
    this.tag('RecommendedList').items = recommended_data.map(i => ({ label: i.title, data: i }))
  }

  modelUpdateMovie(data) {
    this.model.data = data
    this.tag('MainList').ListItemsComponend = VodListItem
    this.tag('MainList').items = this.model.data.map(i => ({ label: i.title, data: i }))
    this._setState('MainList')
  }

  _init() {
    if (window.location.protocol != 'file:') {
      this.model.getRecommend().then(data => {
        this.modelUpdateRecommend(data)
      })
      this.model.getMovie().then(data => {
        this.modelUpdateMovie(data)
      })
    } else {
      this.modelUpdateRecommend(moviesdata)
      this.modelUpdateMovie(moviesdata)
    }
  }

  _handleUp() {
    this._setState('RecommendedList')
  }
  _handleDown() {
    this._setState('MainList')
  }
  _handleBack() {
    this.signal('select', { item: { label: 'OnDemand', target: 'Menu' } })
  }

  static _states() {
    return [
      class MainList extends this {
        $enter() {
          this.tag('MainList').setSmooth('alpha', 1)
          this.tag('RecommendedList').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('MainList').setSmooth('alpha', 0)
          this.tag('RecommendedList').setSmooth('alpha', 0)
        }

        _getFocused() {
          return this.tag('MainList')
        }
        select(item) {
          var body = {
            openRequest: {
              type: 'main',
              locator: item.item.data.locator,
              refId: item.item.data.refId
            }
          }
          this.tag('Info').argument.moviename = 'Movie Name :' + item.item.data.title
          this.tag('Info').argument.rating = 'Rating :' + item.item.data.starRating
          this.tag('Info').argument.description = 'Description :' + item.item.data.mediumSynopsis
          this.tag('Info').argument.item = item.item
          this._setState('Info')
        }
      },
      class RecommendedList extends this {
        $enter() {
          this.tag('MainList').setSmooth('alpha', 1)
          this.tag('RecommendedList').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('MainList').setSmooth('alpha', 0)
          this.tag('RecommendedList').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('RecommendedList')
        }
        select(item) {
          var body = {
            openRequest: {
              type: 'main',
              locator: item.item.data.locator,
              refId: item.item.data.refId
            }
          }
          this.tag('Info').argument.moviename = 'Movie Name :' + item.item.data.title
          this.tag('Info').argument.rating = 'Rating :' + item.item.data.starRating
          this.tag('Info').argument.description = 'Description :' + item.item.data.mediumSynopsis
          this.tag('Info').argument.item = item.item
          this._setState('Info')
        }
      },
      class Info extends this {
        $enter() {
          this.tag('Info').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Info').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Info')
        }

        select(item) {
          var body = {
            openRequest: {
              type: 'main',
              locator: item.item.data.locator,
              refId: item.item.data.refId
            }
          }
          console.log('Movie..')
          //startPlayback(body)
        }
      }
    ]
  }
}
