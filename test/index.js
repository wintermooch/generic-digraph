'use strict'
const tape = require('tape')
const DG = require('../')

tape('basic', function (t) {
  let graph = new DG()
  let a = Symbol()
  let key = Symbol()

  graph.set(key, a)
  graph.set([key, key], Symbol())
  let b = graph.get(key)
  t.equal(b.getValue(), a, 'should add and get vertices')

  a = Symbol()
  graph.set(key, a)
  b = graph.get(key)
  t.equal(b.getValue(), a, 'should overwrite Symbol')

  graph.delete([key, Symbol()])
  b = graph.get(key)
  t.equal(b.getValue(), a, 'should not delete a value on a path')

  graph.delete(key)
  b = graph.get(key)
  t.equal(b, undefined, 'should delete a value')

  graph.delete(key)
  b = graph.get(Symbol())
  t.equal(b, undefined, 'should not get a unset value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  graph.setValue('test')
  graph.set('edge', new DG('test2'))
  let graph2 = new DG(graph)
  t.equal(graph.getValue(), graph2.getValue(), 'copy constructor should work')
  t.equal(graph.get('edge').value, 'test2', 'copy constructor should work')

  graph.delete('edge')
  t.equal(graph.get('edge'), undefined, 'delete edge should work')

  t.end()
})

tape('paths', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.set(path, value)
  let b = graph.get(path)
  t.equal(b.getValue(), value, 'should set and get vertex on a path')
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
  t.equal(foundPath[99].getValue(), value)

  // add another path to the graph
  path = Array(100).fill(Symbol())
  value = Symbol()
  graph.set(path, value)

  let vertices = [...graph]
  t.equal(vertices.length, 201, 'the iterator should return all the vertices')
  t.end()
})

