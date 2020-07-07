import jsondata from '../cache/demo/channelsV2.json'

export default class model {
  constructor() {
    this.init()
    this.data = {}
    this.currrentChannel = ''
    this.channelIndex = 0
  }

  init() {
    if (window.location.protocol != 'file:') {
      fetch('./cache/demo/channelsV2.json')
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.data = data
        })
    } else {
      this.data = jsondata
    }
  }

  getMetaData() {
    let params = {
      openRequest: {
        type: 'main',
        locator: this.data[this.channelIndex].locator,
        refId: this.data[this.channelIndex].channelId
      }
    }
    this.currrentChannel = this.data[this.channelIndex].channelId
    return params
  }

  getChannel() {
    return fetch('./cache/demo/channelsV2.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.data = data
      })
  }

  loadChannel(data) {
    this.data = data
  }

  nextChannel() {
    if (this.channelIndex < this.data.length - 1) {
      this.channelIndex++
    } else {
      return false
    }

    this.currrentChannel = this.data[this.channelIndex].channelId
    return this.getMetaData()
  }

  defaultChennal() {
    this.currrentChannel = this.data[this.channelIndex].channelId
    return this.getMetaData()
  }

  previousChannel() {
    if (this.channelIndex >= 1) {
      this.channelIndex--
    } else {
      return false
    }
    this.currrentChannel = this.data[this.channelIndex].channelId
    return this.getMetaData()
  }
}
