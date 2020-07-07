import { Lightning, Utils } from 'wpe-lightning-sdk'

export default class info extends Lightning.Component {
  static _template() {
    return {
      BGbox: {
        rect: true,
        x: 100,
        y: 200,
        w: 1000,
        h: 400,
        color: 0xffff2222,
        alpha: 1
      },
      Box: {
        rect: true,
        x: 1000,
        y: 200,
        w: 300,
        h: 400,
        color: 0xffff22ff,
        alpha: 1
      }
    }
  }

  _construct(cont) {}

  _init() {}

  _active() {
    this.patch({
      Moviename: { x: 140, y: 300, text: { text: this.argument.moviename, fontSize: 30 } },
      Rating: { x: 140, y: 370, text: { text: this.argument.rating, fontSize: 30 } },
      MovieDescription: { x: 140, y: 420, text: { text: this.argument.description, fontSize: 30 } }
    })
  }

  _handleUp() {}
  _handleDown() {}

  _handleBack() {
    this.signal('select', { item: { label: 'Info', target: 'Movie' } })
  }
  _handleEnter() {
    // this.signal('select', { item: this.children[this.index].item, ref: this.ref })
    this.signal('select', { item: this.argument.item, label: 'Info', target: 'Movie' })
  }

  static _states() {
    return []
  }
}
