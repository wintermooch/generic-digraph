'use strict'
const Graph = require('../')

const MAX_PATH_LENTH = 1
const ROUNDS = 1000000

let paths = generateData()

let testName = 'random'
console.time(testName)
randomPathInsertions(paths)
console.timeEnd(testName)

testName = 'random deletes'
console.time(testName)
randomPathInsertionsAndDeletions(paths)
console.timeEnd(testName)

function generateData () {
  let paths = []
  for (let i = 0; i < ROUNDS; i++) {
    let path = new Array(Math.random() * MAX_PATH_LENTH | 0).fill(Symbol())
    paths.push(path)
  }
  return paths
}

function randomPathInsertions (data) {
  let graph = new Graph()
  data.forEach((path) => {
    graph.set(path, Symbol())
  })
}

function randomPathInsertionsAndDeletions (data) {
  let graph = new Graph()
  data.forEach((path) => {
    graph.set(path, Symbol())
  })

  data.forEach((path) => {
    graph.del(path)
  })
}
