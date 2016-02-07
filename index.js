'use strict'
class EdgeMap extends Map {
  set (name, vertex) {
    if (!(vertex instanceof DG)) {
      vertex = new DG(vertex)
    }
    return super.set(name, vertex)
  }
}

// A very generic Directed graph implementation
const DG = module.exports = class DG {
  /**
   * Create a new vertex
   * @param {DAG} vertex a vertex to copy or an intial value
   */
  constructor (vertex) {
    this._edges = new EdgeMap()
    this._value = null

    if (vertex) {
      // copy constructor
      if (vertex instanceof DG) {
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
    path = formatPath(path)
    let name = path.pop()

    if (!path.length) {
      this.edges.set(name, vertex)
      return
    }

    let nextVertex = this.edges.get(name)
    if (!nextVertex) {
      nextVertex = new DG()
      this.edges.set(name, nextVertex)
    }

    nextVertex.set(path, vertex)
  }

  get (path) {
    path = formatPath(path)
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

  delete (path) {
    path = formatPath(path)
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

  isEmpty () {
    return !this.edges.size && (this._value === null || this._value === undefined)
  }

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

  * iterPath (path) {
    path = formatPath(path)
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
