# _setValue

[index.js:92-95](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L92-L95 "Source code on GitHub")

Set this vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# _setVertex

[index.js:127-134](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L127-L134 "Source code on GitHub")

Set this vertex

**Parameters**

-   `vertex` **Any** 

# constructor

[index.js:12-25](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L12-L25 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **Vertex** a vertex to copy or an intial value

# delete

[index.js:189-192](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L189-L192 "Source code on GitHub")

deletes a vertex at given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# edges

[index.js:39-41](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L39-L41 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# formatPath

[index.js:32-34](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L32-L34 "Source code on GitHub")

The function used to format paths

**Parameters**

-   `path` **Any** 

Returns **array** 

# getValue

[index.js:55-62](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L55-L62 "Source code on GitHub")

Get a vertex's value

**Parameters**

-   `path` **[array]** 

Returns **Any** 

# getVertex

[index.js:102-105](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L102-L105 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# index

[index.js:6-271](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L6-L271 "Source code on GitHub")

A very generic directed graph implementation made to be easy to extend

**Parameters**

-   `vertex`  

# isEmpty

[index.js:223-225](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L223-L225 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# iterPath

[index.js:248-251](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L248-L251 "Source code on GitHub")

iterates a given path

**Parameters**

-   `path` **array** 

# iterator

[index.js:230-242](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L230-L242 "Source code on GitHub")

Does a depth first iteration of the graph

**Parameters**

-   `vistedVertices`  

# setValue

[index.js:78-85](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L78-L85 "Source code on GitHub")

Set a vertex's value

**Parameters**

-   `path` **[array]** 
-   `val` **Any** 

# setVertex

[index.js:112-121](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L112-L121 "Source code on GitHub")

Set a path to a vertex

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# value

[index.js:46-48](https://github.com/wanderer/generic-digraph/blob/aa5b6b5a29eabc371b79af2ec5d0066688cbc483/index.js#L46-L48 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
