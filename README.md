# SYNOPSIS 
[![NPM Package](https://img.shields.io/npm/v/generic-digraph.svg?style=flat-square)](https://www.npmjs.org/package/generic-digraph)
[![Build Status](https://img.shields.io/travis/wanderer/generic-digraph.svg?branch=master&style=flat-square)](https://travis-ci.org/wanderer/generic-digraph)
[![Coverage Status](https://img.shields.io/coveralls/wanderer/generic-digraph.svg?style=flat-square)](https://coveralls.io/r/wanderer/generic-digraph)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

This is a generic directional graph implementation.

# USAGE

```javascript
const Digraph = require('generic-digraph')

// to start with the graph is just a single vertex
var vertex = new Digraph()

// now lets add an edge named 'friend' to the vertex with the value 'alice'
vertex.setVertex('friend', 'alice')

vertex.setVertex(['friend', 'brother'], 'bob')
//now the graph looks like:
// [vertex]---friend--->[alice]---brother-->[bob]

//path names and vertex values can be anything
vertex.setVertex([new Buffer('friend'), 5, false, {}, new Date()], Array())

// edges are stored in a Map
vertex.edges // Map{}

//you can iterate the graph to get all of its vertices
var vertices = [...vertex]

//you can also iterate a path
vertices = [...vertex.iterPath(['friend', 'brother'])]

//getting a vertex works like setting
var friendsBotherVertex = vertex.setVertex(['friend', 'brother'])
friendsBotherVertex.getValue() //"bob"

// delete an edge
vertex.delete('friend')
//now the vertex is empty
vertex.isEmpty()
```

# API
[./docs/](./docs/index.md)

# EXTENDING
This was module was built so that it could be easly extended. To see an example look at
* [functional DAG](https://github.com/wanderer/functional-dag)

# LICENSE
[MPL-2.0](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2))
