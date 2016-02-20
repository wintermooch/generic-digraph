'use strict'
const tape = require('tape')
const DG = require('../')

tape('basic', function (t) {
  let graph = new DG()
  let a = Symbol('a value')
  let key = Symbol('key')

  graph.setEdge(key, a)
  let c = Symbol()
  let b = graph.getEdge(key)
  t.equal(b.getValue(), a, 'should add and get vertices')

  graph.setValue([key, key], c)
  b = graph.getValue([key, key])
  t.equal(b, c, 'should get values given a path')

  a = Symbol()
  graph.setEdge(key, a)
  b = graph.getEdge(key)
  t.equal(b.getValue(), a, 'should overwrite Symbol')

  graph.delEdge([key, Symbol()])
  b = graph.getEdge(key)
  t.equal(b.getValue(), a, 'should not delete a value on a path')

  graph.delEdge(key)
  b = graph.getEdge(key)
  t.equal(b, undefined, 'should delete a value')

  graph.delEdge(key)
  b = graph.getEdge(Symbol())
  t.equal(b, undefined, 'should not get a unset value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  graph.setValue([key, key], c)

  graph.setValue([key], c)
  b = graph.delEdge([key, key])
  t.equal(graph.isEmpty(), false, 'delete should not affect connected vertices')

  graph.setValue('test')
  graph.setEdge('edge', new DG({value: 'test2'}))
  let graph2 = new DG(graph)
  t.equal(graph.getValue(), graph2.getValue(), 'copy constructor should work')
  t.equal(graph.getEdge('edge').value, 'test2', 'copy constructor should work')

  graph.setValue('test')
  graph.getEdge('edge', new DG('test2'))
  graph2 = new DG(graph)
  t.equal(graph.getValue(), graph2.getValue(), 'copy constructor should work')
  t.equal(graph.getEdge('edge').value, 'test2', 'copy constructor should work')

  let edges = graph.edges
  t.equal(edges.size, 2, 'edges getter should work')

  let path = ['a', 'b', 'c']
  graph.setEdge(path, {test: {object: 'with value'}})
  let copy = graph.copy()
  t.notEqual(copy, graph, 'copy should work')
  t.equal(copy.getEdge(path), graph.getEdge(path), 'copy should work')

  console.log('to string should work')
  console.log(graph.toString())
  t.end()
})

tape('paths', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.setEdge(path, value)
  let b = graph.getEdge(path)
  t.equal(b.getValue(), value, 'should set and get vertex on a path')
  t.equal(graph.delEdge([Symbol()]), false, 'shouldnot delete non-existing path')

  path.push(Symbol())
  path.push(Symbol())
  t.equal(graph.delEdge(path), false, 'shouldnot delete non-existing path')
  path.pop()
  path.pop()

  graph.delEdge(path)
  b = graph.getEdge(path)
  t.equal(b, undefined, 'should delete a value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  t.end()
})

tape('iterators', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.setEdge(path, value)
  let foundPath = [...graph.iterPath(path)]
  t.equal(foundPath.length, 100, 'the iterator should return all the vertices on the path')
  t.equal(foundPath[99].getValue(), value)

  foundPath = [...graph.iterPath([Symbol(), Symbol()])]
  t.equal(foundPath.length, 0, 'the iterator shouldnot crash on non-existant paths')

  // add another path to the graph
  path = Array(100).fill(Symbol())
  value = Symbol()
  graph.setEdge(path, value)

  let vertices = [...graph]
  t.equal(vertices.length, 201, 'the iterator should return all the vertices')

  graph.setEdge(path, graph)
  vertices = [...graph]
  t.equal(vertices.length, 200, 'the iterator should not revisit vertices')

  t.end()
})

tape('iterators - findPaths', function (t) {
  let graph = new DG()
  let pathA = Array(2).fill(Symbol('A'))
  let pathB = Array(2).fill(Symbol('B'))
  let pathC = Array(2).fill(Symbol('C'))
  let vertexToFind = new DG('find me!')

  graph.setEdge(pathA, vertexToFind)
  graph.setEdge(pathB, vertexToFind)
  graph.setEdge(pathC, vertexToFind)

  let foundPaths = [...graph.findPaths(vertexToFind)]
  t.equal(foundPaths.length, 3, 'should find the correct number of paths')

  graph.setEdge(pathA, graph)
  foundPaths = [...graph.findPaths(vertexToFind)]
  t.equal(foundPaths.length, 2, 'shouldnt get traped in cycles')

  t.end()
})

