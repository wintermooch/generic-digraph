# constructor

[index.js:12-25](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L12-L25 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# delete

[index.js:191-194](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L191-L194 "Source code on GitHub")

deletes a vertex at given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# edges

[index.js:39-41](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L39-L41 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# formatPath

[index.js:32-34](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L32-L34 "Source code on GitHub")

The function used to format paths

**Parameters**

-   `path` **Any** 

Returns **array** 

# getValue

[index.js:55-62](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L55-L62 "Source code on GitHub")

Get a vertex's value

**Parameters**

-   `path` **[array]** 

Returns **Any** 

# getVertex

[index.js:103-106](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L103-L106 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# index

[index.js:6-273](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L6-L273 "Source code on GitHub")

A very generic directed graph implementation made to be easy to extend

**Parameters**

-   `vertex`  

# isEmpty

[index.js:225-227](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L225-L227 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# iterPath

[index.js:250-253](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L250-L253 "Source code on GitHub")

iterates a given path

**Parameters**

-   `path` **array** 

# iterator

[index.js:232-244](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L232-L244 "Source code on GitHub")

Does a depth first iteration of the graph

**Parameters**

-   `vistedVertices`  

# setValue

[index.js:78-85](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L78-L85 "Source code on GitHub")

Set a vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# setVertex

[index.js:113-122](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L113-L122 "Source code on GitHub")

Set a path to a vertex

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# value

[index.js:46-48](https://github.com/wanderer/generic-digraph/blob/16753bfb2b7b340570070b8905b3d0e09d208d47/index.js#L46-L48 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
