'use strict'
// generally immutble

module.exports = class DAG {
  constructor () {
    this._links = {}
    this._value = null
  }

  set value (value) { this._value = value }
  get value () { return this._value }

  get links () {
    return this._links
  }

  setLink (name, node) { }

  set (path, node) {}
  get (path) {}
  del (path) {}

  getRoot (path) {}
  setRoot (path, ref) {}
  delRoot (path) {}

  iterDepth () {}
  iterBreath () {}
  iterPath (path) {}

  _linkHandler () {}
}
