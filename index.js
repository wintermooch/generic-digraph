'use strict'

/**
 * A very generic directed graph implementation made to be easy to extend
 */
const VertexMixin = (superclass) => class Vertex extends superclass {
  /**
   * Create a new vertex
   * @param {Vertex} vertex a vertex to copy or an intial value
   */
  constructor (vertex) {
    super()
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

  /**
   * This provides a Mixin for this class
   * @example
   * class MyClass {
   *   print (t) {
   *     console.log('hell0!')
   *   }
   * }
   * const Mixin = Digraph.Mixin(MyClass)
   * const mixed = new Mixin()
   * mixed.print()
   */
  static get Mixin () {
    return VertexMixin
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
    return ((typeof (path.length) === 'number' && typeof path !== 'string')
      ? path : [path]).slice()
  }

  /**
   * Produces a copy of this vertex
   * @return {vertex}
   */
  copy () {
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
   * @property {boolean} isLeaf wether or not the current vertex is a leaf
   */
  get isLeaf () {
    return this.edges.size === 0
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
  get (path) {
    path = Vertex.formatPath(path)
    return this._get(path)
  }

  /**
   * Set an edge(s) on a given path to the givin vertex
   * @param {array} path
   * @param {*} vertex
   */
  set (path, vertex) {
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
    const name = path[0]
    path = path.slice(1)
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
      const name = path[0]
      path = path.slice(1)
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
  del (path) {
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
    const name = path.shift()
    const nextVertex = this._edges.get(name)

    if (!path.length) {
      return this._edges.delete(name)
    } else if (!nextVertex) {
      return false
    } else {
      const wasDeleted = nextVertex._delete(path)
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
      aggregate: function (name, currVert, accum, results, cont) {
        // [name, result]
        if (!cont) {
          found = true
          return true
        } else {
          for (const result of results) {
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
   * Finds a given vertex and updates it to the newVertex
   * @param {vertex} vertx
   * @param {vertex} newVertex
   */
  setVertex (vertex, newVertex) {
    this.iterate({
      aggregate: function * (name, currVert, accum, results, cont) {
        // [name, result]
        if (!cont) {
          return 'updated'
        } else if (results.length) {
          for (const result of results) {
            currVert._edges.set(result[0], newVertex)
          }
        }
      },
      continue: function (name, currVert) {
        return currVert !== vertex
      }
    }).next().value
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
  * [Symbol.iterator ] () {
    // yield [[], this]
    const opts = {
      aggregate: function * (name, currVert, accum, results, cont) {
        // if you name an edge 'undefined' its your own fault for breaking this
        if (name !== undefined) {
          accum.path = accum.concat(name)
        }
        if (cont) {
          yield [accum.path, currVert]
        }
      },
      accumulate: []
    }
    yield * this.iterate(opts)
  }

  /**
   * Iterates over the graph
   * @param {object} opts
   * @param {function} opts.continue a function that detetemines whether to continue iterating the current path. If `true` is returned then it will keep going. If `false` is returned it will stop
   * @param {function} opts.aggregate a function returns a value for the vertex given the results of its edges. The function is given the edge `name`, the `current` vertex, the `accumulation` value, the `results` for the prevous aggeragte and the results of the `continue`
   * @param {object|function} opts.accumulate an object at is copied and passed down each of the child vertices. The function is given the edge `name`, the `current` vertex and the prevous `accumlate` value
   */
  * iterate (opts) {
    // defaults
    opts.visitedVertices = new Set()

    let accum
    if (typeof opts.accumulate === 'function') {
      opts.accumFn = opts.accumulate
    } else {
      accum = opts.accumulate
    }

    opts.aggregate = makeGenerator(opts.aggregate)
    opts.accumFn = makeGenerator(opts.accumFn)
    return yield * this._iterate(opts, accum)

    function makeGenerator (fn) {
      if (typeof fn !== 'function') {
        return
      }

      if (!isGenerator(fn)) {
        const old = fn
        return function * () {
          return old(...arguments)
        }
      } else {
        return fn
      }
    }

    function isGenerator (a) {
      return !!a.prototype.next
    }
  }

  * _iterate (opts, accum, name) {
    let cont = !opts.visitedVertices.has(this)
    const results = []

    if (opts.accumFn) {
      accum = yield * opts.accumFn(name, this, accum)
    }

    if (opts.continue && !opts.continue(name, this, accum)) {
      cont = false
    }

    if (cont) {
      opts.visitedVertices.add(this)
      for (const edge of this._edges) {
        const childName = edge[0]
        const result = yield * edge[1]._iterate(opts, accum, childName)
        if (result) {
          results.push([childName, result])
        }
      }
    }

    if (opts.aggregate) {
      return yield * opts.aggregate(name, this, accum, results, cont)
    }
  }

  /**
   * Does a depth first iteration of all the edges in the graph.
   * @yields {array} - an array in the format of `[edgeName, vertex, parentVertex]`
   */
  * iterateEdges () {
    const opts = {
      aggregate: function * (name, currVert) {
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
    const foundPaths = new Map()
    const opts = {
      aggregate: function * (name, curVert, accum, results) {
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
          for (const path of paths) {
            yield accum.path.concat(path)
          }
        } else if (results.length) {
          // yeild all the path combiniations
          paths = []
          for (const result of results) {
            for (const path of result[1]) {
              paths.push([result[0]].concat(path))
            }
          }
          foundPaths.set(curVert, paths)
          return paths
        }
      },
      accumulate: function (name, currentVert, accum) {
        if (name !== undefined) {
          accum = Object.assign({}, accum)
          accum.path = accum.path.concat(name)
          accum.cont = vertex !== currentVert
          return accum
        } else {
          // default value
          return {path: [], cont: true}
        }
      },
      continue: function (name, currentVert, accum) {
        return accum.cont
      }
    }
    yield * this.iterate(opts)
  }

  toJSON () {
    const nodes = []
    const graph = [...this]
    const idMap = new Map()
    graph.reverse()
    // label the vertices
    let i = 0
    for (const vertexPair of graph) {
      const vertex = vertexPair[1]
      idMap.set(vertex, i)
      i++
      nodes.push({
        value: vertex.value,
        edges: [...vertex.edges]
      })
    }

    for (const vertex of nodes) {
      vertex.edges = vertex.edges.map((edge) => {
        // http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03
        const id = idMap.get(edge[1])
        return [edge[0], { $ref: '/' + id }]
      })
    }
    return nodes
  }

  static fromJSON (json) {
    // let a = new this.constructor(json)
    const vertices = json.map((v) => {
      return new this(v)
    })

    vertices.forEach((vert, i) => {
      vert._edges.forEach((edge, i) => {
        const id = edge.$ref.slice(1)
        vert._edges.set(i, vertices[id])
      })
    })

    return vertices[0]
  }
}

module.exports = VertexMixin(function () {})
