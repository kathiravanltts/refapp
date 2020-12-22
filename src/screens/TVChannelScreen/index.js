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
import { Lightning, Utils } from '@lightningjs/sdk'
import theme from '@/themes/default'
import * as player  from '@/services/player/'
import commonConstants from '@/constants/default'
import constants from './constants'
import { channelsServiceInit, getChannel } from '@/services/ChannelsService'
import TVChannelScreenList from './components/TVChannelScreenList'
import BaseScreen from '../BaseScreen'
import { getActiveScreen, navigateForward, navigateBackward, navigate } from './../../lib/Router'

export default class TVChannelScreen extends BaseScreen {
  static _template() {
    return {
      ChannelListContainer: {
        rect: true,
        w: constants.CHLIST_CONTAINER_WIDTH,
        h: commonConstants.screen.height,
        color: constants.CHLIST_CONTAINER_COLOR,
        alpha: 0.8
      },
      Lists: {
        x: 0,
        y: 60
      },
      ChannelListTitleBg: {
        rect: true,
        color: constants.CHLIST_CONTAINER_COLOR,
        w: constants.CHLIST_CONTAINER_WIDTH,
        h: 100,
      }, 
      ChannelListTitle: {
        w: constants.CHLIST_CONTAINER_WIDTH,
        h: constants.CHLIST_TITLE_HEIGHT,
        y: constants.CHLIST_TITLE_TOP,
        text: {
          text: constants.CHLIST_TITLE,
          fontSize: constants.CHLIST_TITLE_FONTSIZE,
          textAlign: 'center'
        }
      },
     
      ChannelListTB: {
        rect: true,
        w: constants.CHLIST_CONTAINER_WIDTH,
        h: constants.CHLIST_TITLE_BH,
        y: constants.CHLIST_TITLE_BT,
        color: constants.CHLIST_TITLE_BC
      }
    }
  }

  _handleUp() {
	 // TODO
  }

  _handleDown() {
	  // TODO
  }
  
  _getFocused() {
    return this.activeList
  }

  _handleLeft() {
	  // TODO
  }

  _handleRight() {
	  // TODO
  }

  _handleKey(key) {
    if (key.code === 'Backspace') {
      navigateBackward()
      return true
    }
    return false
  }

  _handleEnter() {
    this._play(this.tag('Lists').children[0].activeItem._item)
    // TODO
    // if (selectedChannel) {
      // this.signal('channelChanged', { selectedChannel })
    // }
  }
  
  _focus() {
    // TODO
    // channelNumber = ChannelNumber.currentIndex;
  }

  updateView() {
    // TODO
  }

  async update(params) {

  }

  // async animate() {
    
  // }

  // async show() {
    
  // }

  async _play(entry) {    
    await player.playQAM(entry)
  }

  async _init() {

    const channels = await channelsServiceInit();  
    let ch=[];
    for (let _index = 0; _index < channels.length; _index++) {
      channels[_index].label= channels[_index].channelId
    }
    
    let obj = {
             type:TVChannelScreenList,
             itemSize: { w: 400, h: 50 },
             label: "",
             items: channels,
             y: 50,
             x:70
    };
    ch.push(obj);
    this._index = 0
    this.tag('Lists').children = ch;
  }

  
  get lists() {
    return this.tag('Lists').children
  }

  get activeList() {
    return this.lists[this._index]
  }
}
