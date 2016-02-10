# EdgeMap

[index.js:39-41](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L39-L41 "Source code on GitHub")

**Properties**

-   `EdgeMap` **EdgeMap** exposes the Map used for storing edges

# Vertex

[index.js:15-265](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L15-L265 "Source code on GitHub")

A very generic Directed graph implementation made to be easy to extend

**Parameters**

-   `vertex`  

# constructor

[index.js:21-34](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L21-L34 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# delete

[index.js:187-190](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L187-L190 "Source code on GitHub")

deletes a vertex at given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# deleteEdge

[index.js:81-83](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L81-L83 "Source code on GitHub")

Delete an edge

**Parameters**

-   `name` **Any** 

# edges

[index.js:55-57](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L55-L57 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# formatPath

[index.js:48-50](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L48-L50 "Source code on GitHub")

The function used to format all paths used by `set` and `get`

**Parameters**

-   `path` **Any** 

Returns **array** 

# get

[index.js:155-158](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L155-L158 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# getEdge

[index.js:73-75](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L73-L75 "Source code on GitHub")

Get an edge's vertex

**Parameters**

-   `name` **Any** 

Returns **Vertex** 

# getValue

[index.js:97-99](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L97-L99 "Source code on GitHub")

Get the vertex's value

Returns **Any** 

# isEmpty

[index.js:221-223](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L221-L223 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# iterPath

[index.js:246-249](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L246-L249 "Source code on GitHub")

iterates a given path

**Parameters**

-   `path` **array** 

# iterator

[index.js:228-240](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L228-L240 "Source code on GitHub")

Does a depth first iteration of the graph

**Parameters**

-   `vistedVertices`  

# set

[index.js:115-120](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L115-L120 "Source code on GitHub")

Set a path to a vertex or value

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# setEdge

[index.js:64-66](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L64-L66 "Source code on GitHub")

Set an edge to a given value

**Parameters**

-   `name` **Any** 
-   `value` **Any** 

# setValue

[index.js:105-108](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L105-L108 "Source code on GitHub")

Set the vertex's value

**Parameters**

-   `val` **Any** 

# value

[index.js:89-91](https://github.com/wanderer/generic-digraph/blob/127d33ff05ea85a392a2591e6aa56acc46a3495e/index.js#L89-L91 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
