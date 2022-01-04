# TODO

- [ ] Add better example code in $.parent in documentation
- [ ] Add example to $.exe and $.asyncExe
- [ ] Add documentation for helper functions (probably different page (figure how github does taht))
- [ ] Check how $.parent is written and consider every non-iterable selector to actually be iterable

If I can figure out these two, it's an instant official release 1.0.0

- [ ] Figure out how to delay / pause the chain
- [ ] If chain contains async function, should probably continue once it resolves (how???)

### $() API

- .has (Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.)
- .is (Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.)
