'use strict'
const DG = require('../')

let graph = new DG(0)
graph.setEdge(['a'], 1)
graph.setEdge(['b'], 2)
graph.setEdge(['c'], 3)

graph.setEdge(['a', 'a^'], 1)
graph.setEdge(['a', 'a*'], 1)
graph.setEdge(['a', 'a&'], 1)

graph.setEdge(['b', 'b^'], 1)
graph.setEdge(['b', 'b*'], 1)
graph.setEdge(['b', 'b&'], 1)

graph.setEdge(['c', 'c^'], 1)
graph.setEdge(['c', 'c*'], 1)
graph.setEdge(['c', 'b&'], 1)

// sums all the values on the graph
let results = graph.iterate({
  aggergate: function * (name, vertex, accum, results) {
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
  aggergate: function * (name, vertex, accum, results) {
    yield vertex.value
  }
})

// [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 0]
console.log([...allValues])
