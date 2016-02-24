# constructor

[index.js:12-28](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L12-L28 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# copy

[index.js:47-49](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L47-L49 "Source code on GitHub")

Produces a copy of this vertex

**Parameters**

-   `vertex`  

Returns **vertex** 

# delEdge

[index.js:205-208](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L205-L208 "Source code on GitHub")

deletes an Edge at a given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# delVertex

[index.js:238-257](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L238-L257 "Source code on GitHub")

Disconnects the given vertex from the graph

**Parameters**

-   `vertex`  

Returns **boolean** whether the delete was succesful

# edges

[index.js:54-56](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L54-L56 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# findPaths

[index.js:344-386](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L344-L386 "Source code on GitHub")

iterates all the acyclic path possibilties from the current vertex to a given vertex

**Parameters**

-   `vertex` **vertex** 

# formatPath

[index.js:39-41](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L39-L41 "Source code on GitHub")

The function used to format paths

**Parameters**

-   `path` **Any** 

Returns **array** 

# getEdge

[index.js:119-122](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L119-L122 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# getValue

[index.js:70-77](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L70-L77 "Source code on GitHub")

Get a vertex's value

**Parameters**

-   `path` **[array]** 

Returns **Any** 

# index

[index.js:6-441](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L6-L441 "Source code on GitHub")

A very generic directed graph implementation made to be easy to extend

**Parameters**

-   `vertex`  

# isEmpty

[index.js:263-265](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L263-L265 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# iterPath

[index.js:392-395](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L392-L395 "Source code on GitHub")

iterates a given path

**Parameters**

-   `path` **array** 

# iterate

[index.js:294-322](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L294-L322 "Source code on GitHub")

Iterates over the graph

**Parameters**

-   `opts` **object** 
    -   `opts.continue` **function** a function that detetemines whether to continue iterating the current path
    -   `opts.aggergate` **function** a function returns a value for the vertex given the results of its edges
-   `accum`  
-   `name`  

# iterateEdges

[index.js:328-338](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L328-L338 "Source code on GitHub")

Does a depth first iteration of all the edges in the graph.

# iterator

[index.js:270-286](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L270-L286 "Source code on GitHub")

Does a depth first iteration of the graph

# setEdge

[index.js:129-141](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L129-L141 "Source code on GitHub")

Set an edge(s) on a given path to the givin vertex

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# setValue

[index.js:93-101](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L93-L101 "Source code on GitHub")

Set a vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# value

[index.js:61-63](https://github.com/wanderer/generic-digraph/blob/4e987a5c3061ae80bc04a736e8c5f761f8ad387c/index.js#L61-L63 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
