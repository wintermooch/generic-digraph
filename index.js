'use strict'
// Just a map that forces each element to be a Vertex
class EdgeMap extends Map {
  set (name, vertex) {
    if (!(vertex instanceof Vertex)) {
      vertex = new Vertex(vertex)
    }
    return super.set(name, vertex)
  }
}

/**
 * A very generic Directed graph implementation made to be easy to extend
 */
const Vertex = module.exports = class Vertex {

  /**
   * Create a new vertex
   * @param {Vertex} vertex a vertex to copy or an intial value
   */
  constructor (vertex) {
    this._edges = new Vertex.EdgeMap()
    this._value = null

    if (vertex) {
      // copy constructor
      if (vertex instanceof Vertex) {
        this._value = vertex._value
        this._edges = new Vertex.EdgeMap(vertex._edges)
      } else {
        this._value = vertex
      }
    }
  }

  /**
   * @property {EdgeMap} EdgeMap exposes the Map used for storing edges
   */
  static get EdgeMap () {
    return EdgeMap
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
   * Set an edge to a given value
   * @param {*} name
   * @param {*} value
   */
  setEdge (name, value) {
    return this._edges.set(name, value)
  }

  /**
   * Get an edge's vertex
   * @param {*} name
   * @return {Vertex}
   */
  getEdge (name) {
    return this._edges.get(name)
  }

  /**
   * Delete an edge
   * @param {*} name
   */
  deleteEdge (name) {
    return this._edges.delete(name)
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
  getValue () {
    return this._value
  }

  /**
   * Set the vertex's value
   * @param {*} val
   */
  setValue (val) {
    this._value = val
    return this
  }

  /**
   * Set a path to a vertex or value
   * @param {array} path
   * @param {*} vertex
   */
  set (path, vertex) {
    // only do the path validation here
    path = Vertex.formatPath(path)
    //  all ther really work is done here
    return this._set(path, vertex)
  }

  /**
   * over ride this for a custom set
   * @param {array} path
   * @param {*} vertex
   * @private
   */
  _set (path, vertex) {
    let name = path.pop()
    // we are at the end of the path
    if (!path.length) {
      // if we are not setting vertex assume we are setting just the value
      if (!(vertex instanceof Vertex) && this._edges.has(name)) {
        let old = this._edges.get(name)
        old._value = vertex
        return old
      }
      return this.edges.set(name, vertex)
    }

    let nextVertex = this._edges.get(name)
    // automatical grow the graph if the path enconters missing vertices
    if (!nextVertex) {
      nextVertex = new Vertex()
      this._edges.set(name, nextVertex)
    }
    return nextVertex._set(path, vertex)
  }

  /**
   * Gets a vertex from the given path
   * @param {array} path
   * @return {DG}
   */
  get (path) {
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

    return nextVertex.get(path)
  }

  /**
   * deletes a vertex at given path
   * @param {array} path
   * @return {boolean} whether the delete was succesful
   */
  delete (path) {
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

    let wasDeleted = nextVertex.delete(path)
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
    yield* this._iterPath(path)
  }

  /**
   * override this to implement a custom `iterPath`
   * @param {array} path
   * @private
   */
  * _iterPath (path) {
    let name = path.pop()
    let nextVertex = this._edges.get(name)
    if (nextVertex) {
      yield nextVertex
      yield* nextVertex._iterPath(path)
    }
  }

}
