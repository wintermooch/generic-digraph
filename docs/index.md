# constructor

[index.js:25-37](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L25-L37 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **DAG** a vertex to copy or an intial value

# delete

[index.js:121-124](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L121-L124 "Source code on GitHub")

deletes a vertex at given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# edges

[index.js:42-44](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L42-L44 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# get

[index.js:94-97](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L94-L97 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# isEmpty

[index.js:150-152](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L150-L152 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# iterPath

[index.js:174-177](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L174-L177 "Source code on GitHub")

**Parameters**

-   `path`  

# iterator

[index.js:157-169](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L157-L169 "Source code on GitHub")

**Parameters**

-   `vistedVertices`  

# set

[index.js:63-69](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L63-L69 "Source code on GitHub")

Set a path to a vertex or value

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# value

[index.js:49-51](https://github.com/wanderer/generic-digraph/blob/36b5b1a5124c0bd5de4564177909dab4754c19b6/index.js#L49-L51 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
