import { Lightning, Utils } from 'wpe-lightning-sdk'
import { ListItem, ImageListItem } from './../core/list.js'
import Model from './model.js'
import { getBackground, getMainList } from './view.js'
import menudata from '../cache/menu.json'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      x: 0,
      y: 0,
      BackGround: getBackground(),
      MainList: getMainList()
    }
  }

  _construct() {
    this.model = new Model()
    this.model.data = {}
  }

  modelUpdate(data) {
    this.model.data = data
    this.tag('MainList').ListItemsComponend = ListItem
    this.tag('MainList').items = data.map(i => ({ label: i.title }))
    this._setState('MainList')
  }

  _init() {
    if (window.location.protocol != 'file:') {
      this.model.getMenu().then(data => {
        this.modelUpdate(data)
      })
    } else {
      this.modelUpdate(menudata)
    }
  }

  _handleUp() {
    this._setState('MainList')
  }

  _handleDown() {}

  _handleBack() {}

  static _states() {
    return [
      class MainList extends this {
        _getFocused() {
          return this.tag('MainList')
        }
        select({ item }) {
          this.signal('select', { item: { label: 'menu', target: item.label } })
        }
      }
    ]
  }
}
