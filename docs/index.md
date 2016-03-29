# constructor

[index.js:12-28](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L12-L28 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# copy

[index.js:47-49](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L47-L49 "Source code on GitHub")

Produces a copy of this vertex

Returns **vertex** 

# delEdge

[index.js:212-215](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L212-L215 "Source code on GitHub")

deletes an Edge at a given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# delVertex

[index.js:245-264](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L245-L264 "Source code on GitHub")

Disconnects the given vertex from the graph

**Parameters**

-   `vertex`  

Returns **boolean** whether the delete was succesful

# edges

[index.js:54-56](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L54-L56 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# findPaths

[index.js:407-453](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L407-L453 "Source code on GitHub")

iterates all the acyclic path possibilties from the current vertex to a given vertex

**Parameters**

-   `vertex` **vertex** 

# formatPath

[index.js:39-41](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L39-L41 "Source code on GitHub")

The function used to format paths

**Parameters**

-   `path` **Any** 

Returns **array** 

# getEdge

[index.js:126-129](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L126-L129 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# getValue

[index.js:77-84](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L77-L84 "Source code on GitHub")

Get a vertex's value

**Parameters**

-   `path` **[array]** 

Returns **Any** 

# index

[index.js:6-497](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L6-L497 "Source code on GitHub")

A very generic directed graph implementation made to be easy to extend

**Parameters**

-   `vertex`  

# isEmpty

[index.js:293-295](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L293-L295 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# isLeaf

[index.js:68-70](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L68-L70 "Source code on GitHub")

**Properties**

-   `isLeaf` **boolean** wether or not the current vertex is a leaf

# iterate

[index.js:324-357](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L324-L357 "Source code on GitHub")

Iterates over the graph

**Parameters**

-   `opts` **object** 
    -   `opts.continue` **function** a function that detetemines whether to continue iterating the current path. If `true` is returned then it will keep going. If `false` is returned it will stop
    -   `opts.aggregate` **function** a function returns a value for the vertex given the results of its edges. The function is given the edge `name`, the `current` vertex, the `accumulation` value, the `results` for the prevous aggeragte and the results of the `continue`
    -   `opts.accumulate` **object or function** an object at is copied and passed down each of the child vertices. The function is given the edge `name`, the `current` vertex and the prevous `accumlate` value

# iterateEdges

[index.js:391-401](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L391-L401 "Source code on GitHub")

Does a depth first iteration of all the edges in the graph.

# iterator

[index.js:300-315](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L300-L315 "Source code on GitHub")

Does a depth first iteration of the graph

# setEdge

[index.js:136-148](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L136-L148 "Source code on GitHub")

Set an edge(s) on a given path to the givin vertex

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# setValue

[index.js:100-108](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L100-L108 "Source code on GitHub")

Set a vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# setVertex

[index.js:271-287](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L271-L287 "Source code on GitHub")

Finds a given vertex and updates it to the newVertex

**Parameters**

-   `vertx` **vertex** 
-   `vertex`  
-   `newVertex` **vertex** 

# value

[index.js:61-63](https://github.com/wanderer/generic-digraph/blob/5deb782131a95dcccec1215856e6376939f4a319/index.js#L61-L63 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
