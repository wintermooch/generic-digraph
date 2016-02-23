'use strict'
const ABORTED = Symbol('aborted')

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
    this.aggergate({
      reduce: function (currentVert, results, contining) {
        // [name, result]
        if (!contining) {
          found = true
          return true
        } else {
          for (let result of results) {
            currentVert._edges.delete(result[0])
          }
        }
      },
      continue: function (currentvert) {
        return currentvert !== vertex
      }
    })
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
    function * yieldFn (opts) {
      if (opts.name) {
        opts.path = opts.path.concat(opts.name)
      }
      if (!opts.visited) {
        yield [opts.path, opts.vertex, opts.parent]
      }
    }

    // yield [[], this]
    let opts = {
      vistedVertices: new WeakSet(),
      onYield: yieldFn,
      path: []
    }
    yield* this._iterator(opts)
  }

  // opts {
  //  visisted
  //  vertex
  //  vististedVertices
  //  parent
  // }
  * _iterator (opts) {
    opts.vertex = this
    opts.visited = opts.vistedVertices.has(this)

    let contining = true
    let results = []

    if (opts.continue && !opts.continue(this, opts)) {
      contining = false
    }

    if (!opts.visited && contining) {
      opts.vistedVertices.add(this)
      opts.parent = this
      for (let edge of this._edges) {
        let childrenOpts = Object.assign({}, opts)
        childrenOpts.name = edge[0]
        let result = yield* edge[1]._iterator(childrenOpts)
        if (result) {
          results.push([childrenOpts.name, result])
        }
      }
    }
    return yield* opts.onYield(opts, results, contining)
  }

  // opts {
  //  visistedEdges
  //  continue
  //  reduce
  // }
  aggergate (opts) {
    // TODO add accumulator
    // TODO add map(aummulation, aggereration, vertex)
    if (!opts.visitedEdges) {
      opts.vistedVertices = new Set()
    }

    let contining = true
    let results = []

    if (opts.continue && !opts.continue(this)) {
      contining = false
    }

    if (!opts.vistedVertices.has(this) && contining) {
      opts.vistedVertices.add(this)
      for (let vert of this._edges) {
        let result = vert[1].aggergate(opts)
        if (result) {
          results.push([vert[0], result])
        }
      }
    }

    return opts.reduce(this, results, contining)
  }

  /**
   * Does a depth first iteration of all the edges in the graph.
   * @yields {array} - an array in the format of `[edgeName, vertex, parentVertex]`
   */
  * iterateEdges () {
    // defaults
    let opts = {
      vistedVertices: new WeakSet(),
      onYield: function * (opts) {
        if (opts.name) {
          yield [opts.name, opts.vertex, opts.parent]
        }
      }
    }
    yield * this._iterator(opts)
  }

  /**
   * iterates all the acyclic path possibilties from the current vertex to a given vertex
   * @param {vertex} vertex
   */
  * findPaths (vertex) {
    // defaults
    // if (!path) {
    //   path = []
    // }
    // if (!vistedVertices) {
    //   vistedVertices = new WeakSet()
    // }
    // if (!foundPaths) {
    //   foundPaths = new Map()
    // }

    // if (this === vertex) {
    //   yield path
    //   return [path]
    // } else if (foundPaths.has(this)) {
    //   for (let foundPath in foundPaths.get(this)) {
    //     yield path.concat(foundPath)
    //   }
    // } else if (!vistedVertices.has(this)) {
    //   vistedVertices.add(this)
    //   let paths = []
    //   for (let edge of this._edges) {
    //     let nextPath = path.concat(edge[0])
    //     let result = yield* edge[1].findPaths(vertex, nextPath, vistedVertices, foundPaths)
    //     if (result) {
    //       paths.push(path.concat(edge[0]))
    //     }
    //   }
    //   if (paths.length) {
    //     foundPaths.set(this, paths)
    //     return paths
    //   }
    // }

    // defaults
    let foundPaths = new Map()
    let opts = {
      path: [],
      vistedVertices: new WeakSet(),
      onYield: function * (opts, results, cont) {
        if (!cont) {
          yield opts.path.slice()
          return [[]]
        } else {
          let paths = foundPaths.get(opts.vertex)
          // stop! there will be no results either
          if (paths) {
            for (let path of paths) {
              yield opts.path.concat(path)
            }
          } else if (results.length) {
            console.log('results');
            // console.log(results);
            // results = results.map(function (paths) {
            //   return paths.map(function (path) {
            //     return [opts.name].concat(path)
            //   })
            // })
            let paths = []
            for (let result of results) {
              console.log(result);
              let name = result[0]
              let foundPaths = result[1]
              for (let path of foundPaths) {
                paths.push([name].concat(path))
              }
            }
            console.log('paths');
            console.log(paths);
            foundPaths.set(opts.vertex, paths)
            return paths
          }
        }
      },
      continue: function (currentVert, opts) {
        if (opts.name) {
          opts.path = opts.path.concat(opts.name)
        }
        return vertex !== currentVert
      }
    }
    yield * this._iterator(opts)
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
