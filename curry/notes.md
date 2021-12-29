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

- [x] Document .css
- [ ] nth child support
- [ ] nth of type

---

## Chain Functions

### .hover

[ ] Implement
[ ] Document

Shorthand for adding onmouseenter & onmouseleave event listener
Might need to implement add global map, in which to store the pre-hover styling

### .click

[ ] Implement
[ ] Document

Shorthand for adding .on('click') event listener.

### .parent

Selects parent element

[ ] Implement
[ ] Document

### .next

Selects next child

[ ] Implement
[ ] Document

### .prev

Selects previous child

[ ] Implement
[ ] Document

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

### .addChild

- [ ] Implement
- [ ] Documentation

### hide

[ ] Implement
[ ] Document

### show

[ ] Implement
[ ] Document

### toggle

[ ] Implement
[ ] Document

---

- .not
- .has (Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.)
- .filter
- .first
- .last
- .is (Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.)
