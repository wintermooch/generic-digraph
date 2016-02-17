# constructor

[index.js:12-28](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L12-L28 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# delEdge

[index.js:198-201](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L198-L201 "Source code on GitHub")

deletes an Edge at a given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# edges

[index.js:46-48](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L46-L48 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# formatPath

[index.js:39-41](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L39-L41 "Source code on GitHub")

The function used to format paths

**Parameters**

-   `path` **Any** 

Returns **array** 

# getEdge

[index.js:110-113](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L110-L113 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# getValue

[index.js:62-69](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L62-L69 "Source code on GitHub")

Get a vertex's value

**Parameters**

-   `path` **[array]** 

Returns **Any** 

# index

[index.js:6-285](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L6-L285 "Source code on GitHub")

A very generic directed graph implementation made to be easy to extend

**Parameters**

-   `vertex`  

# isEmpty

[index.js:230-232](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L230-L232 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# iterPath

[index.js:262-265](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L262-L265 "Source code on GitHub")

iterates a given path

**Parameters**

-   `path` **array** 

# iterator

[index.js:238-240](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L238-L240 "Source code on GitHub")

Does a depth first iteration of the graph

**Parameters**

-   `path` **[array]** a path to start iterating from

# setEdge

[index.js:120-129](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L120-L129 "Source code on GitHub")

Set an edge(s) on a given path to the givin vertex

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# setValue

[index.js:85-92](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L85-L92 "Source code on GitHub")

Set a vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# value

[index.js:53-55](https://github.com/wanderer/generic-digraph/blob/d69b4a97d72bc034ba52769019bff7697f7e9f20/index.js#L53-L55 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
