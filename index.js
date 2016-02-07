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

// used to attach the internal functions
const DELETE = Symbol()
const SET = Symbol()
const GET = Symbol()
const ITERPATH = Symbol()

// A very generic Directed graph implementation
const Vertex = module.exports = class Vertex {

  /**
   * Create a new vertex
   * @param {DAG} vertex a vertex to copy or an intial value
   */
  constructor (vertex) {
    this._edges = new EdgeMap()
    this._value = null

    if (vertex) {
      // copy constructor
      if (vertex instanceof Vertex) {
        Object.assign(this, vertex)
      } else {
        this.value = vertex
      }
    }
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
  set value (val) {
    this._value = val
    return val
  }

  /**
   * Set a path to a vertex or value
   * @method set
   * @param {array} path
   * @param {*} vertex
   */
  set (path, vertex) {
    // only do the path validation here
    path = formatPath(path)
    //  all ther really work is done here
    this[SET](path, vertex)
    return this
  }

  [SET] (path, vertex) {
    let name = path.pop()

    if (!path.length) {
      this.edges.set(name, vertex)
      return
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      nextVertex = new Vertex()
      this.edges.set(name, nextVertex)
    }

    nextVertex.set(path, vertex)
  }

  /**
   * Gets a vertex from the given path
   * @method set
   * @param {array} path
   * @return {DG}
   */
  get (path) {
    path = formatPath(path)
    return this[GET](path)
  }

  [GET] (path) {
    let name = path.pop()

    // the last name in the path
    if (!path.length) {
      return this.edges.get(name)
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      return
    }

    return nextVertex.get(path)
  }

  /**
   * deletes a vertex at given path
   * @method delete
   * @param {array} path
   * @return {boolean} whether the delete was succesful
   */
  delete (path) {
    path = formatPath(path)
    return this[DELETE](path)
  }

  [DELETE] (path) {
    let name = path.pop()

    if (!path.length) {
      return this.edges.delete(name)
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      return false
    }

    let wasDeleted = nextVertex.delete(path)
    if (nextVertex.isEmpty()) {
      this.edges.delete(name)
    }
    return wasDeleted
  }

  /**
   * Returns truthy on whether the vertexs is empty
   * @method isEmpty
   * @return {boolean}
   */
  isEmpty () {
    return !this.edges.size && (this._value === null || this._value === undefined)
  }

  /**
   * @method Symbol.iterator
   */
  * [Symbol.iterator] (vistedVertices) {
    if (!vistedVertices) {
      vistedVertices = vistedVertices
    }

    if (!vistedVertices.has(this)) {
      vistedVertices.add(this)
      yield this
      for (let vertex in this._edges) {
        yield* vertex[Symbol.iterator](vistedVertices)
      }
    }
  }

  /**
   * @method iterPath
   */
  * iterPath (path) {
    path = formatPath(path)
    return this[ITERPATH](path)
  }

  * [ITERPATH] (path) {
    let name = path.pop()
    yield this

    let nextVertex = this.edges.get(name)
    if (nextVertex) {
      yield* nextVertex.iterPath
    }
  }
}

function formatPath (path) {
  return (Array.isArray(path) ? path : [path]).slice()
}
