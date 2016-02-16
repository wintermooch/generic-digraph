'use strict'
const tape = require('tape')
const DG = require('../')

tape('basic', function (t) {
  let graph = new DG()
  let a = Symbol()
  let key = Symbol()

  graph.setVertex(key, a)
  let c = Symbol()
  let b = graph.getVertex(key)
  t.equal(b.getValue(), a, 'should add and get vertices')

  graph.setValue([key, key], c)
  b = graph.getValue([key, key])
  t.equal(b, c, 'should get values given a path')

  a = Symbol()
  graph.setVertex(key, a)
  b = graph.getVertex(key)
  t.equal(b.getValue(), a, 'should overwrite Symbol')

  graph.delete([key, Symbol()])
  b = graph.getVertex(key)
  t.equal(b.getValue(), a, 'should not delete a value on a path')

  graph.delete(key)
  b = graph.getVertex(key)
  t.equal(b, undefined, 'should delete a value')

  graph.delete(key)
  b = graph.getVertex(Symbol())
  t.equal(b, undefined, 'should not get a unset value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  graph.setValue([key, key], c)
  graph.setValue([key], c)
  b = graph.delete([key, key])
  t.equal(graph.isEmpty(), false, 'delete should not affect connected vertices')

  graph.setValue('test')
  graph.setVertex('edge', new DG({value: 'test2'}))
  let graph2 = new DG(graph)
  t.equal(graph.getValue(), graph2.getValue(), 'copy constructor should work')
  t.equal(graph.getVertex('edge').value, 'test2', 'copy constructor should work')

  graph.setValue('test')
  graph.setVertex('edge', new DG('test2'))
  graph2 = new DG(graph)
  t.equal(graph.getValue(), graph2.getValue(), 'copy constructor should work')
  t.equal(graph.getVertex('edge').value, 'test2', 'copy constructor should work')

  let edges = graph.edges
  t.equal(edges.size, 2, 'edges getter should work')

  t.end()
})

tape('paths', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.setVertex(path, value)
  let b = graph.getVertex(path)
  t.equal(b.getValue(), value, 'should set and get vertex on a path')
  t.equal(graph.delete([Symbol()]), false, 'shouldnot delete non-existing path')

  path.push(Symbol())
  path.push(Symbol())
  t.equal(graph.delete(path), false, 'shouldnot delete non-existing path')
  path.pop()
  path.pop()

  graph.delete(path)
  b = graph.getVertex(path)
  t.equal(b, undefined, 'should delete a value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  t.end()
})

tape('iterators', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.setVertex(path, value)
  let foundPath = [...graph.iterPath(path)]
  t.equal(foundPath.length, 100, 'the iterator should return all the vertices on the path')
  t.equal(foundPath[99].getValue(), value)

  foundPath = [...graph.iterPath([Symbol(), Symbol()])]
  t.equal(foundPath.length, 0, 'the iterator shouldnot crash on non-existant paths')

  // add another path to the graph
  path = Array(100).fill(Symbol())
  value = Symbol()
  graph.setVertex(path, value)

  let vertices = [...graph]
  t.equal(vertices.length, 201, 'the iterator should return all the vertices')

  graph.setVertex(path, graph)
  vertices = [...graph]
  t.equal(vertices.length, 201, 'the iterator should not revisit vertices')

  t.end()
})

