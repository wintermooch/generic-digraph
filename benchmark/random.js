'use strict'
const Graph = require('../')

const MAX_PATH_LENTH = 1
const ROUNDS = 1000000
const paths = generateData()

benchmark('random insertions', randomPathInsertions)
benchmark('random insertions & deletes', randomPathInsertionsAndDeletions)

function benchmark (testName, func) {
  console.time(testName)
  func(paths)
  console.timeEnd(testName)
}

function generateData () {
  const paths = []
  for (let i = 0; i < ROUNDS; i++) {
    const path = new Array(Math.random() * MAX_PATH_LENTH | 0).fill(Symbol())
    paths.push(path)
  }
  return paths
}

function randomPathInsertions (data) {
  const graph = new Graph()
  data.forEach((path) => {
    graph.set(path, Symbol())
  })
}

function randomPathInsertionsAndDeletions (data) {
  const graph = new Graph()
  data.forEach((path) => {
    graph.set(path, Symbol())
  })

  data.forEach((path) => {
    graph.del(path)
  })
}
