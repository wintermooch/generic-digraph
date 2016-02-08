# SYNOPSIS 
[![NPM Package](https://img.shields.io/npm/v/generic-digraph.svg?style=flat-square)](https://www.npmjs.org/package/generic-digraph)
[![Build Status](https://img.shields.io/travis/wanderer/generic-digraph.svg?branch=master&style=flat-square)](https://travis-ci.org/wanderer/generic-digraph)
[![Coverage Status](https://img.shields.io/coveralls/wanderer/generic-digraph.svg?style=flat-square)](https://coveralls.io/r/wanderer/generic-digraph)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

This is a generic directional graph implementation

# USAGE

```javascript
const Digraph = require('generic-digraph')

// to start with the graph is just a single vertex
var vertex = new Digraph()

// now lets add an edge to the vertex named "bob" that points to another vertex with the value "alice"
vertex.set('friend', 'alice')

// if paths have more than one name in them they can arrays
vertex.set(['friend', 'brother'], 'bob')
//now the graph looks like:
// [vertex]---friend--->[alice]---brother-->[bob]

//path names and vertex values can be anything
vertex.set([new Buffer('friend'), 5, false, {}, new Date()], Array())

// edges are stored in a Map
vertex.edges // Map{}

//you can iterate the graph to get all of its vertices
var vertices = [...vertex]

//you can also iterate a path
vertices = [...vertex.iterPath(['friend', 'brother'])]

//getting a vertex works like setting
var friendsBotherVertex = vertex.get(['friend', 'brother'])
friendsBotherVertex.value //"bob"

// delete an edge
vertex.delete('friend')
//now the vertex is empty
vertex.isEmpty()
```

# API
[./docs/](./docs/index.md)

# LICENSE
[MPL-2.0](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2))
