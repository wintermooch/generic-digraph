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

  t.end()
})

tape('paths', function (t) {
  let graph = new DG()
  let path = Array(100).fill(Symbol())
  let value = Symbol()

  graph.set(path, value)
  let b = graph.get(path)
  t.equal(b.value, value, 'should set and get vertex on a path')

  graph.delete(path)
  b = graph.get(path)
  t.equal(b, undefined, 'should delete a value')
  t.equal(graph.isEmpty(), true, 'should report to be empty')

  t.end()
})

