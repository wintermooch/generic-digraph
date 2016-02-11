'use strict'

/**
 * A very generic Directed graph implementation made to be easy to extend
 */
module.exports = class Vertex {

  /**
   * Create a new vertex
   * @param {Vertex} vertex a vertex to copy or an intial value
   */
  constructor (vertex) {
    this._edges = new Map()
    this._value = null

    if (vertex) {
      // copy constructor
      if (vertex instanceof Vertex) {
        this._value = vertex._value
        this._edges = new Map(vertex._edges)
      } else {
        this._value = vertex
      }
    }
  }

  /**
   * The function used to format all paths used by `set` and `get`
   * @param {*} path
   * @return {array}
   */
  static formatPath (path) {
    return (Array.isArray(path) ? path : [path]).slice()
  }

  /**
   * @property {map} edges a map of edges that the vertex has
   */
  get edges () {
    return this._edges
  }

  /**
   * @property {*} value the value of the vertex
   */
  get value () {
    return this._value
  }

  /**
   * Get the vertex's value
   * @return {*}
   */
  getValue (path) {
    return this._value
  }

  /**
   * Set the vertex's value
   * @param {*} val
   */
  setValue (path, val) {
    if (arguments.length === 1) {
      return this._setValue(path)
    } else {
      path = Vertex.formatPath(path)
      return this._set(path, val, 'setValue')
    }
  }

  _setValue (val) {
    this._value = val
    return this
  }

  /**
   * Set a path to a vertex
   * @param {array} path
   * @param {*} vertex
   */
  setVertex (path, vertex) {
    if (arguments.length === 1) {
      return this._setVertex(path)
    } else {
      // only do the path validation here
      path = Vertex.formatPath(path)
      // all the real work is done here
      return this._set(path, vertex, 'setVertex')
    }
  }

  _setVertex (vertex) {
    if (!(vertex instanceof Vertex)) {
      vertex = new Vertex(vertex)
    }
    Object.assign(this, vertex)
    return this
  }

  /**
   * over ride this for a custom set
   * @param {array} path
   * @param {*} vertex
   * @private
   */
  _set (path, vertex, setFnc) {
    // we are at the end of the path
    if (!path.length) {
      return this[setFnc](vertex)
    }

    let name = path.pop()
    let nextVertex = this._edges.get(name)
    // automatically grow the graph if the path enconters missing vertices
    if (!nextVertex) {
      nextVertex = new Vertex()
      this._edges.set(name, nextVertex)
    }
    nextVertex._set(path, vertex, setFnc)
    return
  }

  /**
   * Gets a vertex from the given path
   * @param {array} path
   * @return {DG}
   */
  getVertex (path) {
    path = Vertex.formatPath(path)
    return this._get(path)
  }

  /**
   * override this to implement a custom get
   * @param {array} path
   * @return {DG}
   * @private
   */
  _get (path) {
    let name = path.pop()

    // the last name in the path
    if (!path.length) {
      return this._edges.get(name)
    }

    let nextVertex = this._edges.get(name)
    if (!nextVertex) {
      return
    }

    return nextVertex.getVertex(path)
  }

  /**
   * deletes a vertex at given path
   * @param {array} path
   * @return {boolean} whether the delete was succesful
   */
  delVertex (path) {
    path = Vertex.formatPath(path)
    return this._delete(path)
  }

  /**
   * override this to implement a custom delete
   * @param {array} path
   * @return {boolean} whether the delete was succesful
   * @private
   */
  _delete (path) {
    let name = path.pop()

    if (!path.length) {
      return this._edges.delete(name)
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      return false
    }

    let wasDeleted = nextVertex.delVertex(path)
    if (nextVertex.isEmpty()) {
      this._edges.delete(name)
    }
    return wasDeleted
  }

  /**
   * Returns truthy on whether the vertexs is empty
   * @return {boolean}
   */
  isEmpty () {
    return !this._edges.size && (this._value === null || this._value === undefined)
  }

  /**
   * Does a depth first iteration of the graph
   */
  * [Symbol.iterator] (vistedVertices) {
    if (!vistedVertices) {
      vistedVertices = new WeakSet()
    }

    if (!vistedVertices.has(this)) {
      vistedVertices.add(this)
      yield this
      for (let edge of this._edges) {
        yield* edge[1][Symbol.iterator](vistedVertices)
      }
    }
  }

  /**
   * iterates a given path
   * @param {array} path
   */
  * iterPath (path) {
    path = Vertex.formatPath(path)
    yield* this._iterPath(path, function (vertex) {
      return vertex
    })
  }

  /**
   * override this to implement a custom `iterPath`
   * @param {array} path
   * @private
   */
  * _iterPath (path, onVertex) {
    if (path.length) {
      let name = path.pop()
      let nextVertex = this._edges.get(name)
      // inject something
      nextVertex = onVertex(nextVertex)
      if (nextVertex) {
        yield nextVertex
        yield* nextVertex._iterPath(path, onVertex)
      }
    }
  }

}
