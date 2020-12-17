/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Liberty Global B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import TVChannelScreenItem from './TVChannelScreenItem'
import ItemWrapper from '@/components/List/ItemWrapper'
import List from '@/components/List'
import constants from '../../constants'

export default class TVChannelScreenList extends List {
  static _template() {
    return {
      Label: {
        text: {
          fontSize: constants.LIST_LABEL_FONTSIZE
        }
      },
      Items: {
        y:0
      }
    }
  }

  set items(value) {
    console.log('value');
    console.log(value)
    this._itemsData = value
    this._itemSize = this._itemSize ? this._itemSize : { w: constants.LIST_ITEM_DEFAULT_WIDTH, h: constants.LIST_ITEM_DEFAULT_HEIGHT }
    this.tag('Items').children = value.map((item, index) => {
      console.log(index * (this._itemSize.h + 20))
      return {
        type: ItemWrapper,
        construct: TVChannelScreenItem,
        y: index * (this._itemSize.h + 20),
        size: this._itemSize,
        item: item
      }
    })
  }

  get items() {
    return this.tag('Items').children
  }

  _handleUp() {
    console.log("_handleUp List")
    if (this._index > 0) {
      this.setIndex(this._index - 1)
    }
  }

  _handleDown() {
    console.log("_handleDown List")
console.log(this.items);
console.log(this._index);
    if (this._index < this.items.length - 1) {
      this.setIndex(this._index + 1)
    }
  }

  _getVisibleItemsHeightOnScreen() {
    return Math.floor(1550 / (this._itemSize.h + 50))
  }

  setIndex(index) {
    const prevIndex = this._index
    this._index = index
    const visibleItemsOnScreen = this._getVisibleItemsHeightOnScreen()
    if (index > prevIndex) {
      if (this._indexCount < visibleItemsOnScreen) {
        this._indexCount++
      }
      if (this._indexCount === visibleItemsOnScreen) {
        this.tag('Items').setSmooth('y', (index - this._indexCount) * -1 * (this._itemSize.h + 20))
      }
    } else if (index < prevIndex) {
      if (this._indexCount > 0) {
        this._indexCount--
      }
      if (this._indexCount === 0) {
        this.tag('Items').setSmooth('y', index * -1 * (this._itemSize.h + 20))
      }
    }

  }

}
