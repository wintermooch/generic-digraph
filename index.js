'use strict'

/**
 * A very generic directed graph implementation made to be easy to extend
 */
module.exports = class Vertex {

  /**
   * Create a new vertex
   * @param {Vertex} vertex a vertex to copy or an intial value
   */
  constructor (vertex) {
    this._edges = this.constructor.Edges()
    this._value = null

    if (vertex) {
      // copy constructor
      if (vertex instanceof Vertex) {
        this._value = vertex._value
        this._edges = this.constructor.Edges(vertex._edges)
      } else if (typeof vertex === 'object') {
        this._value = vertex.value
        this._edges = this.constructor.Edges(vertex.edges)
      } else {
        this._value = vertex
      }
    }
  }

  static Edges (edges) {
    return new Map(edges)
  }

  /**
   * The function used to format paths
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
   * Get a vertex's value
   * @param {array} [path]
   * @return {*}
   */
  getValue (path) {
    if (arguments.length === 0) {
      return this._getValue()
    } else {
      path = Vertex.formatPath(path)
      return this._get(path, '_getValue')
    }
  }

  /**
   * Get this vertex's value
   * @return {*}
   * @private
   */
  _getValue () {
    return this._value
  }

  /**
   * Set a vertex's value
   * @param {array} [path]
   * @param {*} val
   */
  setValue (path, val) {
    if (arguments.length === 1) {
      return this._setValue(path)
    } else {
      path = Vertex.formatPath(path)
      path.push(val)
      return this._set(path, null, '_setValue')
    }
  }

  /**
   * Set this vertex's value
   * @param {array} [path]
   * @param {*} val
   * @private
   */
  _setValue (val) {
    this._value = val
    return this
  }

  /**
   * Gets a vertex from the given path
   * @param {array} path
   * @return {DG}
   */
  getEdge (path) {
    path = Vertex.formatPath(path)
    return this._get(path)
  }

  /**
   * Set an edge(s) on a given path to the givin vertex
   * @param {array} path
   * @param {*} vertex
   */
  setEdge (path, vertex) {
    // only do the path and vertex validation here
    if (!(vertex instanceof Vertex)) {
      vertex = new this.constructor(vertex)
    }
    path = Vertex.formatPath(path)
    if (path.length === 1) {
      return this._setEdge(path[0], vertex)
    } else {
      // all the real work is done here
      return this._set(path, vertex, '_setEdge')
    }
  }

  /**
   * Set this vertex
   * @param {*} vertex
   * @private
   */
  _setEdge (edge, vertex) {
    this._edges.set(edge, vertex)
  }

  /**
   * over ride this for a custom set
   * @param {array} path
   * @param {*} vertex
   * @private
   */
  _set (path, payload, setFnc) {
    let name = path.shift()
    // we are at the end of the path
    if (!path.length) {
      return this[setFnc](name, payload)
    } else {
      let nextVertex = this._edges.get(name)
      // automatically grow the graph if the path enconters missing vertices
      if (!nextVertex) {
        nextVertex = new this.constructor()
        this._edges.set(name, nextVertex)
      }
      nextVertex._set(path, payload, setFnc)
      return
    }
  }

  /**
   * override this to implement a custom get
   * @param {array} path
   * @return {DG}
   * @private
   */
  _get (path, getFnc) {
    // the last name in the path
    if (!path.length) {
      if (getFnc) {
        return this[getFnc]()
      } else {
        return this
      }
    } else {
      let name = path.shift()
      let nextVertex = this._edges.get(name)
      if (!nextVertex) {
        return
      } else {
        return nextVertex._get(path, getFnc)
      }
    }
  }

  /**
   * deletes an Edge at a given path
   * @param {array} path
   * @return {boolean} whether the delete was succesful
   */
  delEdge (path) {
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
    let name = path.shift()
    let nextVertex = this._edges.get(name)

    if (!path.length) {
      return this._edges.delete(name)
    } else if (!nextVertex) {
      return false
    } else {
      let wasDeleted = nextVertex._delete(path)
      if (nextVertex.isEmpty()) {
        this._edges.delete(name)
      }
      return wasDeleted
    }
  }

  /**
   * Returns truthy on whether the vertexs is empty
   * @return {boolean}
   */
  isEmpty () {
    return !this._edges.size && (this._value === undefined || this._value === null)
  }

  /**
   * Does a depth first iteration of the graph
   * @param {array} [path] a path to start iterating from
   */
  * [Symbol.iterator] (path, vistedVertices) {
    if (!path) {
      path = []
    }
    if (!vistedVertices) {
      vistedVertices = new WeakSet()
    }
    if (!vistedVertices.has(this)) {
      vistedVertices.add(this)
      yield [path, this]
      for (let edge of this._edges) {
        let nextPath = path.concat(edge[0])
        yield* edge[1][Symbol.iterator](nextPath, vistedVertices)
      }
    }
  }

  /**
   * iterates all the acyclic path possibilties from the current vertex to a given vertex
   * @param {vertex} vertex
   */
  * findPaths (vertex, path, vistedVertices) {
    if (!path) {
      path = []
    }
    if (!vistedVertices) {
      vistedVertices = new WeakSet()
    }
    if (this === vertex) {
      yield path
    } else if (!vistedVertices.has(this)) {
      vistedVertices.add(this)
      for (let edge of this._edges) {
        let nextPath = path.concat(edge[0])
        yield* edge[1].findPaths(vertex, nextPath, vistedVertices)
      }
    }
  }

  /**
   * iterates a given path
   * @param {array} path
   */
  * iterPath (path) {
    path = Vertex.formatPath(path)
    yield* this._iterPath(path)
  }

  /**
   * override this to implement a custom `iterPath`
   * @param {array} path
   * @private
   */
  * _iterPath (path) {
    if (path.length) {
      let name = path.shift()
      let nextVertex = this._edges.get(name)
      // inject something
      // nextVertex = checkFunc(nextVertex)
      if (nextVertex) {
        yield nextVertex
        yield* nextVertex._iterPath(path)
      }
    }
  }

}
