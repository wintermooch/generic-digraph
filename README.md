# SYNOPSIS 
[![NPM Package](https://img.shields.io/npm/v/generic-digraph.svg?style=flat-square)](https://www.npmjs.org/package/generic-digraph)
[![Build Status](https://img.shields.io/travis/wanderer/generic-digraph.svg?branch=master&style=flat-square)](https://travis-ci.org/wanderer/generic-digraph)
[![Coverage Status](https://img.shields.io/coveralls/wanderer/generic-digraph.svg?style=flat-square)](https://coveralls.io/r/wanderer/generic-digraph)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

This is a generic directional graph implementation. It makes use of ES6 iterators for graph traversal.

# USAGE

```javascript
const Digraph = require('generic-digraph')

// to start with the graph is just a single vertex
var vertex = new Digraph()

// now lets add an edge named 'friend' to the vertex with the value 'alice'
vertex.setEdge('friend', 'alice')

vertex.setEdge(['friend', 'brother'], 'bob')
// now the graph looks like:
// [vertex]---friend--->[alice]---brother-->[bob]

//path names and vertex values can be anything
vertex.setEdge([new Buffer('friend'), 5, true, {}, new Date()], Array())

// edges are stored in a Map
vertex.edges // Map{}

// to get an array of all of the vertices
var vertices = [...vertex]

// you can also iterate a path
vertices = [...vertex.iteratePath(['friend', 'brother'])]

// getting a vertex works like setting
var friendsBotherVertex = vertex.setEdge(['friend', 'brother'])
friendsBotherVertex.getValue() // "bob"

// delete an edge
vertex.delEdge('friend')
// now the vertex is empty
vertex.isEmpty()
```

More Examples  
[./examples/](./examples)

# API

[./docs/](./docs/index.md)

### Notes on [iterate](https://github.com/wanderer/generic-digraph/blob/master/docs/index.md#iterate)

when decsending the graph, `accumulate`!  
when asecending the graph, `aggergate`!  

do you wish to not decsend futher?  
then using `continue`, do consider  
 
`accumlate`, `continue`, `aggergate`, repeat  
`accumlate`, `continue`, `aggergate`, repeat  


# EXTENDING
This was module was built so that it could be easly extended. To see an example look at
* [functional DAG](https://github.com/wanderer/functional-dag)

# LICENSE
[MPL-2.0](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2))
