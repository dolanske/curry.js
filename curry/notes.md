# NOTES & TODO

## Selection

Add support for nested selectors, should work the same way as when selecting css classes.

- [ ] `.styles h1`
- [ ] `ul > li`
- [ ] `p + span`

## Attribute selector

- [ ] Add support for selecting attribnutes
  - [ ] Basic implementation
  - [ ] Value matching attr=val
  - [ ] Not equals matching attr!=val
  - [ ] Includes in attribute value attr\*val
  - [ ] Starts with attr<val
  - [ ] Ends with attr>val

## CSS selectors

- [ ] nth child support
- [ ] nth of type

---

## Chain Functions

### .hover

[ ]

Shorthand for adding onmouseenter & onmouseleave event listener
Might need to implement add global map, in which to store the pre-hover styling

### .click

[ ]

Shorthand for adding .on('click') event listener.

### .text

[ ]

Adds text content to the selected element(s)

### Class manipulation

- [x] Add class (.addClass)
- [x] Remove class (.delClass)
- [x] Toggle class (.togClass)

### .parent

[ ]

Selects the first parent in the DOM tree

### .animate

[ ]

Animates transition from the default to the input css style

### .index

[ ]

Retrieves the html node at the input index

### .each

[ ]

Equivalent of a loop and callback over each node

---

Other jQuery methods to look at

- hide()
- show()
- toggle()

- .not
- .has (Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.)
- .filter
- .first
- .last
- .is (Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.)
