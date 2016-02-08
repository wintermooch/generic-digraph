# constructor

[index.js:25-37](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L25-L37 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `vertex` **DAG** a vertex to copy or an intial value

# delete

[index.js:121-124](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L121-L124 "Source code on GitHub")

deletes a vertex at given path

**Parameters**

-   `path` **array** 

Returns **boolean** whether the delete was succesful

# edges

[index.js:42-44](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L42-L44 "Source code on GitHub")

**Properties**

-   `edges` **map** a map of edges that the vertex has

# get

[index.js:94-97](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L94-L97 "Source code on GitHub")

Gets a vertex from the given path

**Parameters**

-   `path` **array** 

Returns **DG** 

# isEmpty

[index.js:150-152](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L150-L152 "Source code on GitHub")

Returns truthy on whether the vertexs is empty

Returns **boolean** 

# iterPath

[index.js:177-180](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L177-L180 "Source code on GitHub")

iterates a given path

**Parameters**

-   `path` **array** 

# iterator

[index.js:158-170](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L158-L170 "Source code on GitHub")

Does a depth first iteration of the graph

**Parameters**

-   `vistedVertices`  

# set

[index.js:63-69](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L63-L69 "Source code on GitHub")

Set a path to a vertex or value

**Parameters**

-   `path` **array** 
-   `vertex` **Any** 

# value

[index.js:49-51](https://github.com/wanderer/generic-digraph/blob/213b75843ab04f16419de496507fa63bb406b567/index.js#L49-L51 "Source code on GitHub")

**Properties**

-   `value` **Any** the value of the vertex
