# constructor

[index.js:11-28](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L11-L28 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# copy

[index.js:64-66](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L64-L66 "Source code on GitHub")

Produces a copy of this vertex

Returns **vertex** 

# del

[index.js:196-199](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L196-L199 "Source code on GitHub")

deletes an Edge at a given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# delVertex

[index.js:229-248](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L229-L248 "Source code on GitHub")

Disconnects the given vertex from the graph

**Parameters**

-   `vertex`  

Returns **boolean** whether the delete was succesful

# edges

[index.js:71-73](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L71-L73 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# findPaths

[index.js:391-437](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L391-L437 "Source code on GitHub")

iterates all the acyclic path possibilties from the current vertex to a given vertex

**Parameters**

-   `vertex` **vertex** 

# formatPath

[index.js:55-58](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L55-L58 "Source code on GitHub")

The function used to format paths

**Parameters**

-   `path` **Any** 

Returns **array** 

# get

[index.js:122-125](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L122-L125 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# getValue

[index.js:94-101](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L94-L101 "Source code on GitHub")

Get a vertex's value

**Parameters**

-   `path` **[array]** 

Returns **Any** 

# isEmpty

[index.js:277-279](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L277-L279 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# isLeaf

[index.js:85-87](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L85-L87 "Source code on GitHub")

**Properties**

-   `isLeaf` **boolean** wether or not the current vertex is a leaf

# iterate

[index.js:308-341](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L308-L341 "Source code on GitHub")

Iterates over the graph

**Parameters**

-   `opts` **object** 
    -   `opts.continue` **function** a function that detetemines whether to continue iterating the current path. If `true` is returned then it will keep going. If `false` is returned it will stop
    -   `opts.aggregate` **function** a function returns a value for the vertex given the results of its edges. The function is given the edge `name`, the `current` vertex, the `accumulation` value, the `results` for the prevous aggeragte and the results of the `continue`
    -   `opts.accumulate` **object or function** an object at is copied and passed down each of the child vertices. The function is given the edge `name`, the `current` vertex and the prevous `accumlate` value

# iterateEdges

[index.js:375-385](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L375-L385 "Source code on GitHub")

Does a depth first iteration of all the edges in the graph.

# iterator

[index.js:284-299](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L284-L299 "Source code on GitHub")

Does a depth first iteration of the graph

# Mixin

[index.js:42-44](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L42-L44 "Source code on GitHub")

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

# set

[index.js:132-145](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L132-L145 "Source code on GitHub")

Set an edge(s) on a given path to the givin vertex

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# setValue

[index.js:108-115](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L108-L115 "Source code on GitHub")

Set a vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# setVertex

[index.js:255-271](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L255-L271 "Source code on GitHub")

Finds a given vertex and updates it to the newVertex

**Parameters**

-   `vertx` **vertex** 
-   `vertex`  
-   `newVertex` **vertex** 

# value

[index.js:78-80](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L78-L80 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex

# VertexMixin

[index.js:6-481](undefined/blob/2cc179ccf6ca1190545b7115f75d012e899e73a4/index.js#L6-L481 "Source code on GitHub")

A very generic directed graph implementation made to be easy to extend

**Parameters**

-   `superclass`  
