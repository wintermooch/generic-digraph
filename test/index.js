'use strict'
const tape = require('tape')
const DG = require('../')

tape('basic', function (t) {
  let graph = new DG()
  let a = Symbol()
  let key = Symbol()

  graph.set(key, a)
  let b = graph.get(key)
  t.equal(b.value, a, 'should add and get vertices')

  graph.delete(key)
  b = graph.get(key)
  t.equal(b, undefined, 'should delete a value')

  graph.delete(key)
  b = graph.get(Symbol())
  t.equal(b, undefined, 'should not get a unset value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  let graph2 = new DG()
  graph2.value = Symbol()
  graph.set('test', graph2)
  t.equal(graph.get('test').value, graph2.value, 'copy constructor should work')

  t.end()
})

tape('paths', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.set(path, value)
  let b = graph.get(path)
  t.equal(b.value, value, 'should set and get vertex on a path')
  t.equal(graph.delete([Symbol()]), false, 'shouldnot delete non-existing path')

  graph.delete(path)
  b = graph.get(path)
  t.equal(b, undefined, 'should delete a value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  t.end()
})

tape('iterators', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.set(path, value)
  let foundPath = [...graph.iterPath(path)]
  t.equal(foundPath.length, 100, 'the iterator should return all the vertices on the path')
  t.equal(foundPath[99].value, value)

  // add another path to the graph
  path = Array(100).fill(Symbol())
  value = Symbol()
  graph.set(path, value)

  let vertices = [...graph]
  t.equal(vertices.length, 201, 'the iterator should return all the vertices')
  t.end()
})

