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
    this._value = vertex

    if (vertex) {
      // copy constructor
      if (vertex instanceof Vertex) {
        this._value = vertex._value
        this._edges = this.constructor.Edges(vertex._edges)
      } else if (vertex.value || vertex.edges) {
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
   * Produces a copy of this vertex
   * @return {vertex}
   */
  copy (vertex) {
    return new this.constructor(this)
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
   * Disconnects the given vertex from the graph
   * @param {vertex}
   * @return {boolean} whether the delete was succesful
   */
  delVertex (vertex) {
    let found = false
    this.iterate({
      aggergate: function * (name, currVert, accum, results, cont) {
        // [name, result]
        if (!cont) {
          found = true
          return true
        } else {
          for (let result of results) {
            currVert._edges.delete(result[0])
          }
        }
      },
      continue: function (name, currVert) {
        return currVert !== vertex
      }
    }).next()
    return found
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
   */
  * [Symbol.iterator] () {
    // yield [[], this]
    let opts = {
      aggergate: function * (name, currVert, accum, results, cont) {
        if (name) {
          accum.path = accum.path.concat(name)
        }
        if (cont) {
          yield [accum.path, currVert]
        }
      },
      accumulate: {
        path: []
      }
    }
    yield* this.iterate(opts)
  }

  /**
   * Iterates over the graph
   * @param {object} opts
   * @param {function} opts.continue a function that detetemines whether to continue iterating the current path
   * @param {function} opts.aggergate a function returns a value for the vertex given the results of its edges
   */
  * iterate (opts, accum, name) {
    // defaults
    if (!opts.visitedVertices) {
      opts.visitedVertices = new Set()
    }
    if (!accum) {
      accum = opts.accumulate || {}
    }

    let cont = !opts.visitedVertices.has(this)
    let results = []

    if (opts.continue && !opts.continue(name, this, accum)) {
      cont = false
    }

    if (cont) {
      opts.visitedVertices.add(this)
      for (let edge of this._edges) {
        let childAccum = Object.assign({}, accum)
        let childName = edge[0]
        let result = yield* edge[1].iterate(opts, childAccum, childName)
        if (result) {
          results.push([childName, result])
        }
      }
    }
    return yield* opts.aggergate(name, this, accum, results, cont)
  }

  /**
   * Does a depth first iteration of all the edges in the graph.
   * @yields {array} - an array in the format of `[edgeName, vertex, parentVertex]`
   */
  * iterateEdges () {
    let opts = {
      aggergate: function * (name, currVert) {
        // the first vertex won't have a path name
        if (name) {
          yield [name, currVert]
        }
      }
    }
    yield * this.iterate(opts)
  }

  /**
   * iterates all the acyclic path possibilties from the current vertex to a given vertex
   * @param {vertex} vertex
   */
  * findPaths (vertex) {
    // defaults
    let foundPaths = new Map()
    let opts = {
      accumulate: {
        path: []
      },
      aggergate: function * (name, curVert, accum, results) {
        let paths = foundPaths.get(curVert)
        // we have reached the end
        if (!accum.cont) {
          yield accum.path
          return [
            []
          ]
        } else if (paths) {
          // we have hit a node that all ready has been trasvered, so combine
          // results
          for (let path of paths) {
            yield accum.path.concat(path)
          }
        } else if (results.length) {
          // yeild all the path combiniations
          paths = []
          for (let result of results) {
            for (let path of result[1]) {
              paths.push([result[0]].concat(path))
            }
          }
          foundPaths.set(curVert, paths)
          return paths
        }
      },
      continue: function (name, currentVert, accum) {
        if (name) {
          accum.path = accum.path.concat(name)
        }
        accum.cont = vertex !== currentVert
        return accum.cont
      }
    }
    yield * this.iterate(opts)
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

  toString () {
    let string = `root`
    // string += ' Edges ' + this.edges.size
    for (let vert of this) {
      string += `${pathToString(vert[0])} ${toString(vert[1].value)}`
      string += ' | Edges ' + vert[1].edges.size
      string += '\n'
    }
    return string
    function pathToString (path) {
      let string = ''
      for (let name of path) {
        string += toString(name)
        string += ' -> '
      }
      return string
    }

    function toString (value) {
      if (typeof value === 'symbol') {
        return String(value)
      } else {
        return JSON.stringify(value)
      }
    }
  }
}
