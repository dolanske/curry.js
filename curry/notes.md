# NOTES & TODO

## Selection

Add support for nested selectors, should work the same way as when selecting css classes.

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

- [ ] Add support for querying using syntax as CSS
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

- [ ] Add class (.addClass)
- [ ] Remove class (.delClass)
- [ ] Toggle class (.togClass)
  - [ ] Add support for default class (gets added on page load, toggles between default and new class)

### .parent

[ ]

Selects the first parent in the DOM tree

###

---
