import { Lightning, Utils } from 'wpe-lightning-sdk'
import { ListItem, ImageListItem } from './../core/list.js'
import Model from './model.js'
import { getBackground, getMainList, getSubMenuList } from './view.js'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      x: 0,
      y: 0,
      BackGround: getBackground(),
      MainList: getMainList(),
      SubMenuList: getSubMenuList()
    }
  }

  _construct() {
    this.model = new Model()
    this.model.data = {}
  }

  _init() {
    this.model.getMenu().then(data => {
      this.model.data = data
      this.tag('MainList').ListItemsComponend = ListItem
      this.tag('SubMenuList').ListItemsComponend = ImageListItem
      this.tag('MainList').items = data.map(i => ({ label: i.title }))
      this.tag('SubMenuList').items = data[0].submenu.map(i => ({ label: i }))
      this._setState('MainList')
    })
  }

  _handleUp() {
    this._setState('MainList')
  }

  _handleDown() {
    this._setState('SubMenuList')
  }

  _handleBack() {}

  static _states() {
    return [
      class SubMenuList extends this {
        _getFocused() {
          return this.tag('SubMenuList')
        }
        select({ item }) {}
      },
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