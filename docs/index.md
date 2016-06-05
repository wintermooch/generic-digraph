# Mixin

[index.js:42-44](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L42-L44 "Source code on GitHub")

This provides a Mixin for this class

**Examples**

```javascript
class MyClass {
  print (t) {
    console.log('hell0!')
  }
}
const Mixin = Digraph.Mixin(MyClass)
const mixed = new Mixin()
mixed.print()
```

# VertexMixin

[index.js:6-513](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L6-L513 "Source code on GitHub")

A very generic directed graph implementation made to be easy to extend

**Parameters**

-   `superclass`  

# constructor

[index.js:11-28](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L11-L28 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# copy

[index.js:63-65](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L63-L65 "Source code on GitHub")

Produces a copy of this vertex

Returns **vertex** 

# del

[index.js:228-231](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L228-L231 "Source code on GitHub")

deletes an Edge at a given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# delVertex

[index.js:261-280](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L261-L280 "Source code on GitHub")

Disconnects the given vertex from the graph

**Parameters**

-   `vertex`  

Returns **boolean** whether the delete was succesful

# edges

[index.js:70-72](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L70-L72 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# findPaths

[index.js:423-469](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L423-L469 "Source code on GitHub")

iterates all the acyclic path possibilties from the current vertex to a given vertex

**Parameters**

-   `vertex` **vertex** 

# formatPath

[index.js:55-57](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L55-L57 "Source code on GitHub")

The function used to format paths

**Parameters**

-   `path` **Any** 

Returns **array** 

# get

[index.js:142-145](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L142-L145 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# getValue

[index.js:93-100](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L93-L100 "Source code on GitHub")

Get a vertex's value

**Parameters**

-   `path` **[array]** 

Returns **Any** 

# isEmpty

[index.js:309-311](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L309-L311 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# isLeaf

[index.js:84-86](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L84-L86 "Source code on GitHub")

**Properties**

-   `isLeaf` **boolean** wether or not the current vertex is a leaf

# iterate

[index.js:340-373](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L340-L373 "Source code on GitHub")

Iterates over the graph

**Parameters**

-   `opts` **object** 
    -   `opts.continue` **function** a function that detetemines whether to continue iterating the current path. If `true` is returned then it will keep going. If `false` is returned it will stop
    -   `opts.aggregate` **function** a function returns a value for the vertex given the results of its edges. The function is given the edge `name`, the `current` vertex, the `accumulation` value, the `results` for the prevous aggeragte and the results of the `continue`
    -   `opts.accumulate` **object or function** an object at is copied and passed down each of the child vertices. The function is given the edge `name`, the `current` vertex and the prevous `accumlate` value

# iterateEdges

[index.js:407-417](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L407-L417 "Source code on GitHub")

Does a depth first iteration of all the edges in the graph.

# iterator

[index.js:316-331](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L316-L331 "Source code on GitHub")

Does a depth first iteration of the graph

# set

[index.js:152-164](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L152-L164 "Source code on GitHub")

Set an edge(s) on a given path to the givin vertex

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# setValue

[index.js:116-124](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L116-L124 "Source code on GitHub")

Set a vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# setVertex

[index.js:287-303](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L287-L303 "Source code on GitHub")

Finds a given vertex and updates it to the newVertex

**Parameters**

-   `vertx` **vertex** 
-   `vertex`  
-   `newVertex` **vertex** 

# value

[index.js:77-79](https://github.com/wanderer/generic-digraph/blob/08324ffec3feb83e14a516dbf5fc9eb76b02c449/index.js#L77-L79 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
