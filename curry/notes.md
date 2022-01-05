# TODO

- [ ] Add better example code in $.parent in documentation
- [ ] Add example to $.exe and $.asyncExe
- [ ] Add documentation for helper functions (probably different page (figure how github does taht))
- [ ] Check how $.parent is written and consider every non-iterable selector to actually be iterable

- [ ] Potentially resetAnimationFrame or something, look up google (animation example problem)

## A

- [ ] A chained functions which _MUST_ be async, or are meant to be used as async, must ALWAYS use .then((v))
  - $.asyncEach
  - $.asyncExe

## B

- fuck async shit, Maybe async stuff should be handled OUTSIDE of query

### $() API

- .has (Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.)
- .is (Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.)
