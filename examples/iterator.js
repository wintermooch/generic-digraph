'use strict'
const DG = require('../')

let graph = new DG(0)
graph.set(['a'], 1)
graph.set(['b'], 2)
graph.set(['c'], 3)

graph.set(['a', 'a^'], 2)
graph.set(['a', 'a*'], 6)
graph.set(['a', 'a&'], 1)

graph.set(['b', 'b^'], 2)
graph.set(['b', 'b*'], 3)
graph.set(['b', 'b&'], 1)

graph.set(['c', 'c^'], 2)
graph.set(['c', 'c*'], 4)
graph.set(['c', 'c&'], 1)

/**
we now have a tree that looks like this
          0 - root
       /  | \
      /   |  \
     a    b   c
    /     |    \
   1      2     3
 / | \  / | \  / |\
2  6  13  2  12  4 1
**/

// sums all the values on the graph
let results = graph.iterate({
  // aggerates the results form the its children nodes
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

console.log([...allPaths])
