# TODO

- [ ] Add better example code in $.parent in documentation
- [ ] Add example to $.exe and $.asyncExe
- [ ] Add documentation for helper functions (probably different page (figure how github does taht))
- [ ] Check how $.parent is written and consider every non-iterable selector to actually be iterable

- [ ] Figure out how to delay / pause the chain
- [ ] If chain contains async function, should probably continue once it resolves (how???)

---

## Chain Functions

### .hover

[x] Implement
[x] Document

- TODO:

Shorthand for adding onmouseenter & onmouseleave event listener
Might need to implement add global map, in which to store the pre-hover styling

--- ANIMATIONS (version number + 0.1.0)

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
