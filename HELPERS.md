# Helpers object documentation

You can access the `$util` helper object in any callback with destructuring. Said object contains some quality of life helpers for development.

- `$util.getStyleProperty(element, property)` - Returns element's applied style, property must be accessed in kebab-case just like in CSS

- `$util.isObject(value)` - Returns true if value is an object

- `$util.isArray(value)` - Returns true if value is an array

- `$util.isObject(value)` - Returns true if value nullish, therefore null or undefined

- `$util.from(n)` - Creates an array with index values of length `n`

- `$util.render(tag, attrs, children)` - Creates a virtual dom node

- `$util.isElements(value)` - Returns true if value is a HTMLCollection

- `$util.mapElements(HTMLCollection, callback)` - Loops over HTMLCollection and executes a callback on each element, exposing current listed `node` & `index`

- `$util.getSiblingIndex(element)` - Returns an index of selected element between its children

- `$util.undef(value, default)` - If value is nullish, return the set default value

- `$util.bez(x1,x2,y1,y1)` - Formats input cubic bezoar values into CSS like syntax. Essentially a shorthand for writing "cubic-bezoar(1,0,1,0)"

- `$util.bez(name)` - Optionally a generic cubic-bezoar function name can be inputted and if it exists, it returns a preset cubic bezoar. List of all available bezoards can be found [here](https://easings.net/). Every easing except the bottom row is available.

<table>
  <tr>
    <td>`$util.getStyleProperty(element, property)`<td />
    <td>Returns element's applied style, property must be accessed in kebab-case just like in CSS<td />
  <tr />
</table>
