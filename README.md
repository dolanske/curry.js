# jCurry (curry.js) v1.1.0

We've all heard it, "If you add jQuery to your resume, don't expect an interview". I'm here to change that, adding jCurry, no matter the job application, guarantees you the CEO position.

Cooking up this project finally made me play less Rocket League and focus on some personal work. So I now proudly present to you, jCurry. Fast & small javascript library for quick web development because let's be real, most of us used the same 10 jQuery functions. Written from scratch and without any reference by yours truly.

## Install

Simply clone this repository, which also serves as a starting template.
If you prefer things your way, simply copy the minified code in the source folder. Happy coding!

**Notice**: I love feedback. Please, report any issues or feature requests if you have any. I will literally make any of your wishes happen.

## Feature requests

As stated, I will be absolutely delighted if someone has a feature requests and if it's in my powers to implement it. That being said, before you request a feature, check out the Projects tab if it isn't already being considered / in development.

---

## API

You start a chain by using a selector and then chain functions as needed. For example:

```js
$(".list") // Get all elements with the class .list
  .children() // Get its child elements
  .first() // Select the first one
  .text("First list item") // Set its text
```

### Selectors

| Method       | Parameters                                                         | Summary                                                                                                 |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| $(selector)  | `selectors`                                                        | Uses `querySelectorAll` and accepts wide variety of parameters. [Example](#selector)                    |
| $.get()      | `property` (optional)                                              | Returns either matched elements or array of selected property of matched elements. [Example](#selector) |
| $.is()       | `condition`                                                        | Iterates over matched elements and if 1 passes the condition, returns true. [Example](#is)              |
| $.first()    | `callback` (optional)                                              | Selects the first element from matched elements. [Example](#first)                                      |
| $.last()     | `callback` (optional)                                              | Selects the last element from matched elements. [Example](#last)                                        |
| $.nth()      | <ul><li>`index`</li><li>`callback` (optional)</li></ul>            | Selects element at `index` from matched elements. [Example](#nth)                                       |
| $.prev()     | <ul><li>`index` (optional)</li><li>`callback` (optional)</li></ul> | Selects previous element or previous nth element. [Example](#prev-and-next)                             |
| $.next()     | <ul><li>`index` (optional)</li><li>`callback` (optional)</li></ul> | Selects next element or next nth element. [Example](#prev-and-next)                                     |
| $.parent()   | `callback` (optional)                                              | Selects the element's parent node. [Example](#parent)                                                   |
| $.children() | `callback` (optional)                                              | Selects the element's child nodes. [Example](#children)                                                 |
| $.nthChild() | <ul><li>`index` </li><li>`callback` (optional)</li></ul>           | Selects element's child node at `index`. [Example](#nth-child)                                          |

### Event binding

| Method    | Parameters                                                                | Summary                                                                                                  |
| --------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| $.on()    | <ul><li>`event`</li><li>`callback`</li><li>`options` (optional)</li></ul> | Binds an event listener to the matched elements. [Example](#on)                                          |
| $.click() | <ul><li>`callback`</li><li>`options` (optional)</li></ul>                 | Shorthand for attaching an `$.on('click')`. [Example](#click)                                            |
| $.hover() | `states` or `function`                                                    | Powerful shorthand for `$(selecor).on('mouseenter')` and `$(selector).on('mouselave')` [Example](#hover) |

### Style binding

| Method          | Parameters                                                          | Summary                                                                                                |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| $.addClass()    | `classList`                                                         | Adds class name or list of class names to the matched elements. [Example](#add-class)                  |
| $.delClass()    | `classList`                                                         | Removes class name or list of class names from the matched elements. [Example](#delete-class)          |
| $.toggleClass() | `classList`                                                         | Toggles between class name or list of class names on the matched elements. [Example](#toggle-class)    |
| $.show()        | `displayValue` (optional)                                           | Adds `display=block` or user selected `display=displayvalue` to the matched elements. [Example](#show) |
| $.hide()        | none                                                                | Adds `display=none` to the matched elements. [Example](#hide)                                          |
| $.toggle()      | `onActive` (optional)                                               | Toggles between `$.show()` and `$.hide()`. [Example](#toggle)                                          |
| $.css()         | <ul><li>`property`</li><li>`value`</li></ul> or <br/> `styleObject` | Adds inline CSS to the matched elements. [Example](#css)                                               |

### Animations

| Method          | Parameters                                                          | Summary                                                                     |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| $.slideDown()   | <ul><li>`duration` (optional)</li><li>`easing` (optional)</li></ul> | Display the matched elements with a sliding motion. [Example](#slide-down)  |
| $.slideUp()     | <ul><li>`duration` (optional)</li><li>`easing` (optional)</li></ul> | Hide the matched elements with a sliding motion. [Example](#slide-up)       |
| $.slideToggle() | <ul><li>`duration` (optional)</li><li>`easing` (optional)</li></ul> | Toggles between `$.slideDown()` and `$.slideUp()`. [Example](#slide-toggle) |
| $.animate()     | <ul><li>`properties`</li><li>`options`</li></ul>                    | Animate matched elements to the added properties. [Example](#animate)       |
| $.fadeIn()      | <ul><li>`to`</li><li>`options`</li></ul>                            | Display the matched elements with a fading motion. [Example](#fade-in)      |
| $.fadeOut()     | <ul><li>`to`</li><li>`options`</li></ul>                            | Hide the matched elements with a fading motion. [Example](#fade-out)        |
| $.fadeToggle()  | <ul><li>`from`</li><li>`to`</li><li>`options`</li></ul>             | Toggles between `$.fadeIn()`and`$.fadeOut()`. [Example](#fade-toggle)       |

### Iteration

| Method        | Parameters | Summary                                                                                            |
| ------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| $.each()      | `callback` | Iterates over matched elements and executes callback on each iteration. [Example](#each)           |
| $.asyncEach() | `callback` | Same as `$.each()` but each iteration requires calling the `next()` method. [Example](#async-each) |
| $.filter()    | `callback` | Filters matched elements by the provided condition. [Example](#filter)                             |

### DOM Manipulation

| Method       | Parameters                                                                   | Summary                                                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $.append()   | `callback` or `templateString`                                               | Appends a new element to the matched elements. [Example](#append-and-prepend)                                                                                 |
| $.prepend()  | `callback` or `templateString`                                               | Prepends a new element to the matched elements. [Example](#append-and-prepend)                                                                                |
| $.addChild() | <ul><li>`callback` or `templateString`</li><li>`append` (optional)</li></ul> | Prepends a new child element to the matched elements children. [Example](#addChild)                                                                           |
| $.text()     | <ul><li>`text`</li><li>`location` (optional)</li></ul>                       | Replaces or adds text content to the matched elements. [Example](#text)                                                                                       |
| $.attr()     | <ul><li>`property`</li><li>`value` (optional)</li></ul>                      | Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.. [Example](#attr) |
| $.del()      | none                                                                         | Removes matching elements from the DOM. [Example](#del)                                                                                                       |

---

### Helpers

Every callback exposes the `$util` object which contains numerous helper functions. You can find description of each function in this [documentation here](/HELPERS.md).

### State

Every callback exposes the `$state` property which is a simple way of sharing data in any and inbetween chains. This could be easily solved with a variable outside of your chains but this solution doesn't pollute your code.

```js
$("li").each(({ self, $state }) => {
  if (!$state.listItems) $state.listItems = []
  $state.listItems.push(self.textContent)
})

$("ul").on("click", ({ $state }) => console.log($state.listItems))
```

---

### Selector

Selects an array of elements which match the selector. It offers extensive ways to query elements. For full documentation check it out on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

```js
$("button") // Selects every button
$(".my-button") // Selects every element with the 'my-button' class
$("#my-id") // Selects the element with id set to 'my-id'
$("[href]") // Selects every element with the 'href' attribute
$("[title=hello]") // Selects every element with the 'title' attribute with value 'hello'

// You can also retrieve the jCurry's $state and $utils

const state = $("$state")
const utilities = $("$util")
```

You can also attach the `.get()` function which returns the matched elements so you can manipulate them outside of the curry scope.

```js
// Returns a HTMLCollection of all button elements
const buttons = $("button").get()

// Returns an array of every input's value
const values = $("input").get("value")
```

### Is

Parameters:

- `condition`
- `applier` default: `every` (if condition is an array, set if it should apply to 'some', 'every' or 'none' of the selected elements)

Used in conditions. Accepts the same selector syntax as `$()`. Returns true if condition satisfies at least one element in matched elements.

```js
if ($("[type=checkbox]").is(":checked")) {
  // At least one checkbox is checked
}

if ($("ul").is(["ul", ".specific-list"], "some")) {
  // Checks if ANY <ul> is, well, <ul> and has '.specific-list' class
}
```

### First

Parameters:

- `callback` (optional) exposes:
  - `self` selected element

Selects the first element in matched elements. Accepts a callback.

```js
$("li").first().text("I am first")
```

### Last

Parameters:

- `callback` (optional) exposes:
  - `self` selected element

Selects the last element in matched elements. Accepts a callback.

```js
$("li").last().text("I am last :(")
```

### Nth

Parameters:

- `index`
- `callback` (optional) exposes:
  - `self` selected element
  - `index` of selected element

Selects the element at the provided index in matched elements. It is 1 indexed, meaning if no index or index 0 is provided, it returns the first element.

```js
$("li").nth(2).text("I am second!")
```

### Prev and Next

Parameters:

- `index` (optional)
- `callback` (optional) exposes:
  - `self` selected element
  - `index` of selected element
  - `prev` previous selector

Selects the previous / next elements of the matched elements.

```html
<button class="un-rev">Reverse</button>
<p>Hello World</p>
<button class="rev">Reverse</button>
```

```js
$(".rev").on("click", ({ self }) => {
  $(self).prev().text("dlroW olleH")
})

$(".un-rev").on("click", ({ self }) => {
  $(self).next().text("Hello World")
})
```

### Parent

Parameters:

- `callback` (optional) exposes:
  - `self` parent element
  - `child` previous selector

Selects parent nodes of each matched elements.

```html
<div class="wrapper">
  <p>I am a special text</p>
</div>
```

```js
$("p").each(({ self }) => {
  if ($(self).parent().is(".wrapper")) {
    $(self).parent().addClass("wrapper-has-p")
  }
})
```

### Children

Parameters:

- `callback` (optional) exposes:
  - `self` child elements
  - `parent` parent element

Selects each selected elements child nodes.

```js
const listItems = $("ul").children().get()
```

### Nth child

Parameters:

- `index`
- `callback` (optional) exposes:
  - `self` selector element
  - `children` child elements

Selects the child nodes of the matched elements at provided index.

```js
$("ul").nthChild(2).text("I am second!")
```

### On

Parameters:

- `event`
- `callback` exposes:
  - `e` or `event`
  - `self`
- `options` (optional)
  - event listener options ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener))

Binds an event listener to matched elements.

```js
$(".wrapper").on("mouseenter", ({ self }) => {
  $(self).css("backgroundColor", "red")
})
```

### Click

Parameters:

- `callback` exposes
  - `e` or `event`
  - `self`
- `options` (optional)
  - event listener options ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener))

Shorthand for binding `$.on('click', callback)` to to matched elements..

```js
$("button").click(({ self }) => console.log(`Clicked ${self.textContent}`))
```

### Hover

Usage #1 Parameters:

- `functions`
  - `enter` callback, executes on `mouseenter`
  - `leave` callback, executes on `mouseleave`
- `options` (optional)
  - event listener options ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener))

Shorthand for binding `$.on('mouseenter', callback)` and `$.on('mouseleave', callback)` to matched elements.

```js
$("p").hover({
  enter: ({ self }) => $(self).css("background", "red"),
  leave: ({ self }) => $(self).css("background", "transparent"),
})
```

Usage #2 parameters:

- `callback`

In cases where we only want to bind styles / classes and so on when user **enters** and reset once user **leaves**. We can use the function parameter which is the equivalent of only using the `enter` function.

```js
// This example deems the same result as the previous one
$("p").hover(({ self }) => {
  $(self).css("background", "red")
})
```

**NOTE:** This is an experimental technology and the reset to previous state might not fully work. Feedback is appreciated.

### Add class

Parameters:

- `classList`

Appends class or a class list to the matched elements.

```js
$("span").addClass("color-red")
$("span").addClass("color-red background-blue")
$("span").addClass(["color-red", "font-size-14"])
```

### Delete class

Parameters:

- `classList`

Removes class or a class list from the matched elements.

```js
$("span").delClass("color-red")
$("span").delClass("color-red background-blue")
$("span").delClass(["color-red", "font-size-14"])
```

### Toggle class

Parameters:

- `classList`

Toggles between the provided class or a class list on the matched elements.

```js
$("button").click(({ self }) => $(self).next().toggleClass("active"))
```

### Show

Parameters:

- `displayValue` (optional), default: `block`

Used for showing hidden elements. Applies the `display=displayValue` style to every matched element.

```js
$("button").click(() => {
  $(".hidden-wrapper").show("inline-flex")
})
```

### Hide

Used for hiding visible elements. Applies `display=none` style to every matched element.

```js
$("button").click(() => {
  $(".hidden-wrapper").hide()
})
```

### Toggle

Parameters:

- `displayValue` (optional), default: `block`

Toggles between `$.show(displayValue)` and `$.hide()` on every matched element.

```js
$("button").click(() => {
  $(".hidden-wrapper").toggle("inline-flex")
})
```

### CSS

Usage #1 parameters:

- `property` CSS property name
- `value` CSS property value

Appends inline style to the matched elements.

```js
$("ul").css("listStyle", "none")
```

Usage #2 parameters:

- `style` object of CSS property:value pairs

Appends a style object to the matched elements,

```js
$("ul").css({
  listStyle: "none",
  background: "blue",
})
```

### Slide down

Parameters:

- `duration` (optional) default: `500` ms
- `easing` (optional) default: `ease-in-out`

Applies revealing sliding down animation to matched elements.

```js
$("button").click(() => {
  $(".hidden-wrapper").slideDown(250, "linear")
})
```

### Slide up

Parameters:

- `duration` (optional) default: `500` ms
- `easing` (optional) default: `ease-in-out`

Applies hiding sliding up animation to matched elements.

```js
$("button").click(() => {
  $(".hidden-wrapper").slideUp(1000)
})
```

### Slide toggle

Parameters:

- `duration` (optional) default: `500` ms
- `easing` (optional) default: `ease-in-out`

Toggles between `$.slideDown()` and `$.slideUp()` on matched elements.

```js
$("button").click(() => {
  $(".hidden-wrapper").slideToggle(1000)
})
```

### Animate

Usage #1 parameters:

- `properties` object of properties to animate (like CSS object)
- `options` (optional)
  - `length` (optional) default: `500` ms
  - `easing` (optional) default: `ease-in-out`
  - `callback` (optional) executes once animation completes, exposes:
    - `self` animated element

Applies selected CSS object styles in animation. Unlike jQuery it only applies temporary `transition` property to the animated elements.

```js
$("button").click(({ $util }) => {
  $("h1").animate(
    {
      marginLeft: 200,
      backgroundColor: "red",
    },
    {
      length: "1s", // or 'length: 1000'
      easing: $util.bez("easeInOutCubic"), // cubic-bezoar(0.65, 0, 0.35, 1)
      callback: ({ self }) => {
        // In callback we can infinitely execute more animations if needed
        $(self).animate({
          marginLeft: "0px",
          backgroundColor: "transparent",
        })
      },
    }
  )
})
```

Usage #2 parameters:

- `callback` which exposes:
  - `start` starts the animation, can be called multiple times. Takes in the same parameters as usage #1
    - `properties`
    - `options`
  - `self` animated element

A different and more flexible approach to animation. Allows you to essentially execute keyframed animation in any length you need. You can decide when to trigger each keyframe and so on. You also gain space to execute any kind of code you want before you start the animation.

```js
$("button").click(({ $util }) => {
  $("h1").animate(async ({ self, $util, start }) => {
    // Execute code before animation begins

    // For example, I can get the element's width and use that
    // const marginLeft = $util.getStyleProperty(self, "width")

    // Or make an API call and then execute animation when it resolves
    await start(
      {
        marginLeft: "200px",
        backgroundColor: "red",
      },
      {
        length: 1000,
        easing: $util.bez("easeInOutCubic"),
      }
    )

    await start({
      marginLeft: 0,
      backgroundColor: "transparent",
    }).then(() => {
      // You can attach .then() to the last keyframe to detect when animation completes
    })
  })
})
```

### Fade in

Parameters:

- `to` default: `1`, specify opacity to which the element fades in
- `options` - `$.animate()` options object
  - `length` (optional) default: `500` ms
  - `easing` (optional) default: `ease-in-out`
  - `callback` (optional) executes once animation completes, exposes:
    - `self` animated element

Applies opacity fade in effect to an element. You can specify at what value it stops.

```js
$("button").click(() => {
  // Content class elements will show up with opacity 0.95
  $(".content").fadeIn(0.95)
})
```

### Fade out

Parameters:

- `to` default: `0`, specify opacity to which the element fades out
- `options` - `$.animate()` options object
  - `length` (optional) default: `500` ms
  - `easing` (optional) default: `ease-in-out`
  - `callback` (optional) executes once animation completes, exposes:
    - `self` animated element

Applies opacity fade out effect to an element. You can specify at what value it stops.

```js
$("button").click(() => {
  // Content class elements will fade-out to opacity 0
  $(".content").fadeOut()
})
```

### Fade Toggle

Parameters:

- `from` default: `0`
- `to` default: `1`
- `options` - `$.animate()` options object
  - `length` (optional) default: `500` ms
  - `easing` (optional) default: `ease-in-out`
  - `callback` (optional) executes once animation completes, exposes:
    - `self` animated element

Toggles between `$.fadeIn` and `$.fadeOut()`.

```js
$("button").click(() => {
  $(".content").fadeToggle(0, 0.5, { length: 500, easing: "linear" })
})
```

### Each

Parameters:

- `callback`, exposes:
  - `self` current iterated element
  - `prev` previous element in iteration
  - `index` index of iteration

Iterates over selected elements and calls callback function on each iteration

```js
$("ul")
  .children()
  .each(({ self, index }) => {
    $(self).text(`I am ${index + 1}}.`)
  })
```

### Async each

Parameters:

- `callback`, exposes:
  - `self` current iterated element
  - `prev` previous element in iteration
  - `index` index of iteration
  - `next` function that must be called to execute next iteration

Works exactly like `$.each()` but to execute next iteration, you must call the `next()` function. This iterator is good for chaining data fetching and other async actions which could cause issues when all called instantly.

```js
$(".users").asyncEach(({ next, self }) => {
  const users = $(self).attr("data-users-endpoint")

  new Promise((resolve) => fetch(users))
    .then((response) => response.json())
    .then((response) => {
      $(self).addChild(response.template)
      next()
    })
})
```

### Filter

Parameters:

- `callback` exposes:
  - `self` iterated element
  - `index`

Iterates over matched elements and removes those which do not match the provided contition.

```js
const everyEvenChild = $("ul")
  .children()
  .filter(({ index }) => index % 2 === 0)
  .get()
```

### Append and Prepend

Inserts new element(s) either in front or after matched elements

Usage #1 parameters:

- `template` template string

```js
$("blockquote").prepend("<label>And so they said:</label>")
```

Usage #2 parameters:

- `callback` exposes:
  - `self` element which we will add the new element to
  - `render` render function

```js
$("input").prepend(({ self }) => {
  const labelText = $(self).attr("data-label")

  return `<label>${labelText}</label>`
})
```

If you are familiar with modern frameworks, you must have heard the term `render function`. Well jCurry's render functions have exactly the same syntax. For reference [Vue documentation](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments)

```js
$("input").prepend(({ self }) => {
  const labelText = $(self).attr("data-label")

  return render("label", { title: labelText }, labelText)
})
```

### Add Child

Parameters:

- `callback` exposes:
  - `self` element which we will add the new element to
  - `render` render function
- `append` default: `true` - wether to insert new elements before or after existing children

Works exactly the same way as `$.append` and `$.prepen` except it creates the new element as a child node of the matched elements.

```js
$(".list-wrap").addChild(({ $util, render }) => {
  // Generate an array of 5 items starting at index 1
  const items = $util.from(5, 1).map((item) => {
    return render("li", `#${item} List item`)
  })

  // Create an unordered list and append the items as its children
  return render("ul", { class: ".list" }, items)
})
```

### Text

Parameters:

- `text`
- `location` default: `replace` - replaces elements text
  - allowed values: `replace`, `before` OR `prepend`, `after` OR `append`

Replaces or appends text to the matched elements.

```js
$("p").text("I am the paragraph now")
$("p").text("The text is as follows:", "before")
$("p").text(".", "after")
```

### Attr

Parameters:

- `property`
- `value`

Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.

```js
// Returns value of a single attribute
const path = $("a").attr("href")
// Returns array of values from selected attributes
const [path, title] = $("a").attr(["href", "title"])

// Assigns value to key
$("a").attr("href", "path/to/page")

// Will throw a warning and skip this chain node
$("a").attr("href", ["path/to/page", "other/to/pat"])

// Assigns key:value pair based on index
$("a").attr(["href", "title", "data-iterations"], ["/hello", "Hello World", 10])

// Sets the same value for every key
$("a").attr(["title", "data-description"], "I am the same text!!!")
```

### Del

Removes matched elements from the DOM.

```js
$("ul")
  .children()
  .filter(({ self, index }) => index % 2 === 0)
  .del()
```
