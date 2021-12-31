# TODO

- [ ] Add better example code in $.parent in documentation
- [ ] Add example to $.exe and $.asyncExe
- [ ] Add documentation for helper functions (probably different page (figure how github does taht))
- [x] Reorganize the API documentaiton function list

- [ ] Check how $.parent is written and consider every non-iterable selector to actually be iterable

## Selection (version number + 0.1.0)

Add support for nested selectors, should work the same way as when selecting css classes.

- [ ] `.styles h1`
- [ ] `ul > li`
- [ ] `p + span`

## Attribute selector (version number + 0.1.0)

- [ ] Add support for selecting attribnutes
  - [ ] Basic implementation
  - [ ] Value matching attr=val
  - [ ] Not equals matching attr!=val
  - [ ] Includes in attribute value attr\*val
  - [ ] Starts with attr<val
  - [ ] Ends with attr>val

---

## Chain Functions

### .hover

[x] Implement
[x] Document

- TODO:

Shorthand for adding onmouseenter & onmouseleave event listener
Might need to implement add global map, in which to store the pre-hover styling

--- ANIMATIONS (version number + 0.1.0)

### .animate

[ ] Implement
[ ] Document

Animates transition from the default to the input css style

### .slideDown

[ ] Implement
[ ] Document

if element is not displayed, it should roll it down

### .slideUp

[ ] Implement
[ ] Document

### .slideToggle

[ ] Implement
[ ] Document

---

- .not
- .has (Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.)
- .filter
- .is (Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.)

- element creation?
