const Digraph = require('../index.js')

// to start with the graph is just a single vertex
var vertex = new Digraph()

// now lets add an edge to the vertex named "bob" that points to another vertex with the value "alice"
vertex.set('friend', 'alice')

// if paths have more than one name in them they can arrays
vertex.set(['friend', 'brother'], 'bob')

// edges are stored in a Map
vertex.edges

// delete a edge
vertex.delete('friend')
