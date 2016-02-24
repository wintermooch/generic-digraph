'use strict'
const DG = require('../')

let graph = new DG(0)
graph.setEdge(['a'], 1)
graph.setEdge(['b'], 2)
graph.setEdge(['c'], 3)

graph.setEdge(['a', 'a^'], 2)
graph.setEdge(['a', 'a*'], 6)
graph.setEdge(['a', 'a&'], 1)

graph.setEdge(['b', 'b^'], 2)
graph.setEdge(['b', 'b*'], 3)
graph.setEdge(['b', 'b&'], 1)

graph.setEdge(['c', 'c^'], 2)
graph.setEdge(['c', 'c*'], 4)
graph.setEdge(['c', 'b&'], 1)

// sums all the values on the graph
let results = graph.iterate({
  aggregate: function * (name, vertex, accum, results) {
    let sum = vertex.value
    for (let result of results) {
      // result[index, value]
      sum += result[1]
    }
    return sum
  }
}).next().value
// 15
console.log(results)

// returns all the values on the graph
let allValues = graph.iterate({
  aggregate: function * (name, vertex, accum, results) {
    yield vertex.value
  }
})

// [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 0]
console.log([...allValues])

let allPaths = graph.iterate({
  aggregate: function * (name, vertex, accum, results) {
    yield accum
  },
  accumulate: function (edgeName, vertex, accum) {
    if (edgeName) {
      accum = accum.concat(edgeName)
      return accum
    } else {
      // the intial value for the accumlator
      return []
    }
  }
})

// [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 0]
console.log([...allPaths])
