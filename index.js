'use strict'

class EdgeMap extends Map {
  set (name, vertex) {
    if (vertex.constructor.name === 'DAG') {
      return super(name, vertex)
    }
    throw new Error('invalid vertex')
  }
}

// A very generic Directed acyclic graph implementation
module.exports = class DAG {
  /**
   * Create a new vertex
   * @param {DAG} vertex a vertex to copy or an intial value
   */
  constructor (vertex) {
    this._edges = new EdgeMap()
    this._value = null

    if (vertex) {
      // copy constructor
      if (vertex.constructor.name === 'DAG') {
        Object.assign(this, vertex)
      } else {
        this.value = vertex
      }
    }
  }

  get edges () {
    return this._edges
  }

  get value () {
    return this._value
  }

  set value (val) {
    this._value = val
    return val
  }

  set (path, vertex) {
    path = !Array.isArray(path) ? [path] : path
    let name = path.pop()

    if (!path.length) {
      this.edges.set(name, vertex)
      return
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      nextVertex = new DAG()
      this.edges.set(path, nextVertex)
    }

    nextVertex.set(path, vertex)
  }

  get (path) {
    path = !Array.isArray(path) ? [path] : path
    let name = path.pop()

    if (!path.length) {
      return this.edges.get(name)
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      return
    }

    nextVertex.get(path)
  }

  delete (path) {
    path = !Array.isArray(path) ? [path] : path
    let name = path.pop()

    if (!path.length) {
      return this.edges.delete(name)
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      return false
    }

    nextVertex.get(path)
  }

  iterDepth () {}
  iterBreath () {}
  iterPath (path) {}
}

/**
 * immutable notes
  getRoot (path) {}
  setRoot (path, ref) {}
  delRoot (path) {}

  batch (ops) {
    // NO READS ALLOWED
    // build ops tree
    // at every branch of the operation tree we can parrilize
  }
**/
