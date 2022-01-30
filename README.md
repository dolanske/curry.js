# jCurry (curry.js) v1.1.0

We've all heard it, "If you add jQuery to your resume, don't expect an interview". I'm here to change that, adding jCurry, no matter the job application, guarantees you the CEO position.

Cooking up this project finally made me play less Rocket League and focus on some personal work. So I now proudly present to you, jCurry. Fast & small javascript library for quick web development because let's be real, most of us used the same 10 jQuery functions. Written from scratch and without any reference by yours truly.

## Install

Simply clone this repository, which also serves as a starting template.
If you prefer things your way, simply copy the minified code in the source folder. Happy coding!

**Notice**: I love feedback. Please, report any issues or feature requests if you have any. I will literally make any of your wishes happen.

---

## API

### Selectors

| Method       | Parameters                                                         | Summary                                                                                                 |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| $(selector)  | `selectors`                                                        | Uses `querySelectorAll` and accepts wide variety of parameters. [Description](#selector)                |
| $.get()      | `property` (optional)                                              | Returns either matched elements or array of selected property of matched elements. [Description](#each) |
| $.is()       | `condition`                                                        | Iterates over matched elements and if 1 passes the condition, returns true. [Description](#each)        |
| $.first()    | `callback` (optional)                                              | Selects the first element. [Description](#first)                                                        |
| $.last()     | `callback` (optional)                                              | Selects the last element. [Description](#last)                                                          |
| $.nth()      | <ul><li>`index`</li><li>`callback` (optional)</li></ul>            | Selects element at index `n`. [Description](#nth)                                                       |
| $.prev()     | <ul><li>`index` (optional)</li><li>`callback` (optional)</li></ul> | Selects previous element or previous nth element. [Description](#prev)                                  |
| $.next()     | <ul><li>`index` (optional)</li><li>`callback` (optional)</li></ul> | Selects next element or next nth element. [Description](#prev)                                          |
| $.parent()   | `callback` (optional)                                              | Selects the element's parent node. [Description](#parent)                                               |
| $.children() | `callback` (optional)                                              | Selects the element's child nodes. [Description](#children)                                             |
| $.nthChild() | <ul><li>`index` </li><li>`callback` (optional)</li></ul>           | Selects element's child node at `index`. [Description](#nth-child)                                      |

### Event binding

| Method    | Parameters                                                                | Summary                                                                                                      |
| --------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| $.on()    | <ul><li>`event`</li><li>`callback`</li><li>`options` (optional)</li></ul> | Binds an event listener to the matched elements. [Description](#on)                                          |
| $.click() | <ul><li>`callback`</li><li>`options` (optional)</li></ul>                 | Shorthand for attaching an `$.on('click')`. [Description](#click)                                            |
| $.hover() | `states` or `function`                                                    | Powerful shorthand for `$(selecor).on('mouseenter')` and `$(selector).on('mouselave')` [Description](#hover) |

### Style binding

| Method          | Parameters                                                          | Summary                                                                                                    |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| $.addClass()    | `classList`                                                         | Adds class name or list of class names to the matched elements. [Description](#add-class)                  |
| $.delClass()    | `classList`                                                         | Removes class name or list of class names from the matched elements. [Description](#del-class)             |
| $.toggleClass() | `classList`                                                         | Toggles between class name or list of class names on the matched elements. [Description](#toggle-class)    |
| $.show()        | `displayValue` (optional)                                           | Adds `display=block` or user selected `display=displayvalue` to the matched elements. [Description](#show) |
| $.hide()        | none                                                                | Adds `display=none` to the matched elements. [Description](#hide)                                          |
| $.toggle()      | `onActive` (optional)                                               | Toggles between `$.show()` and `$.hide()`. [Description](#toggle)                                          |
| $.css()         | <ul><li>`property`</li><li>`value`</li></ul> or <br/> `styleObject` | Adds inline CSS to the matched elements. [Description](#css)                                               |

### Animations

| Method          | Parameters                                                          | Summary                                                                         |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| $.slideDown()   | <ul><li>`duration` (optional)</li><li>`easing` (optional)</li></ul> | Display the matched elements with a sliding motion. [Description](#slide-down)  |
| $.slideUp()     | <ul><li>`duration` (optional)</li><li>`easing` (optional)</li></ul> | Hide the matched elements with a sliding motion. [Description](#slide-up)       |
| $.slideToggle() | <ul><li>`duration` (optional)</li><li>`easing` (optional)</li></ul> | Toggles between `$.slideDown()` and `$.slideUp()`. [Description](#slide-toggle) |
| $.animate()     | <ul><li>`properties`</li><li>`options`</li></ul>                    | Animate matched elements to the added properties. [Description](#animate)       |
| $.fadeIn()      | <ul><li>`to`</li><li>`options`</li></ul>                            | Display the matched elements with a fading motion. [Description](#fade-in)      |
| $.fadeOut()     | <ul><li>`to`</li><li>`options`</li></ul>                            | Hide the matched elements with a fading motion. [Description](#fade-out)        |
| $.fadeToggle()  | <ul><li>`from`</li><li>`to`</li><li>`options`</li></ul>             | Toggles between `$.fadeIn()`and`$.fadeOut()`. [Description](#fade-toggle)       |

### Iteration

| Method        | Parameters | Summary                                                                                                |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| $.each()      | `callback` | Iterates over matched elements and executes callback on each iteration. [Description](#each)           |
| $.asyncEach() | `callback` | Same as `$.each()` but each iteration requires calling the `next()` method. [Description](#async-each) |
| $.filter()    | `callback` | Filters matched elements by the provided condition. [Description](#filter)                             |

### DOM Manipulation

| Method       | Parameters                                                                   | Summary                                                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $.append()   | `callback` or `templateString`                                               | Appends a new element to the matched elements. [Description](#append)                                                                                             |
| $.prepend()  | `callback` or `templateString`                                               | Prepends a new element to the matched elements. [Description](#prepend)                                                                                           |
| $.addChild() | <ul><li>`callback` or `templateString`</li><li>`append` (optional)</li></ul> | Prepends a new child element to the matched elements children. [Description](#addChild)                                                                           |
| $.text()     | <ul><li>`text`</li><li>`location` (optional)</li></ul>                       | Replaces or adds text content to the matched elements. [Description](#text)                                                                                       |
| $.attr()     | <ul><li>`property`</li><li>`value` (optional)</li></ul>                      | Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.. [Description](#attr) |
| $.del()      | none                                                                         | Removes matching elements from the DOM. [Description](#del)                                                                                                       |
