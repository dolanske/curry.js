# jCurry (curry.js) v1.1.0

We've all heard it, "If you add jQuery to your resume, don't expect an interview". I'm here to change that, adding jCurry, no matter the job application, guarantees you the CEO position.

Cooking up this project finally made me play less Rocket League and focus on some personal work. So I now proudly present to you, jCurry. Fast & small javascript library for quick web development because let's be real, most of us used the same 10 jQuery functions. Written from scratch and without any reference by yours truly.

## Install

Simply clone this repository, which also serves as a starting template.
If you prefer things your way, simply copy the minified code in the source folder. Happy coding!

**Notice**: I love feedback. Please, report any issues or feature requests if you have any. I will literally make any of your wishes happen.

## Feature requests

As stated, I will be absolutely delighted if someone has a feature requests and if it's in my powers to implement it. That being said, before you request a feature, check out the [Planned Features](/PlannedFeatures.md) document first.

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

| Method       | Parameters                                                         | Summary                                                                                                     |
| ------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| $(selector)  | `selectors`                                                        | Uses `querySelectorAll` and accepts wide variety of parameters. [Description](#selector)                    |
| $.get()      | `property` (optional)                                              | Returns either matched elements or array of selected property of matched elements. [Description](#selector) |
| $.is()       | `condition`                                                        | Iterates over matched elements and if 1 passes the condition, returns true. [Description](#is)              |
| $.first()    | `callback` (optional)                                              | Selects the first element from matched elements. [Description](#first)                                      |
| $.last()     | `callback` (optional)                                              | Selects the last element from matched elements. [Description](#last)                                        |
| $.nth()      | <ul><li>`index`</li><li>`callback` (optional)</li></ul>            | Selects element at `index` from matched elements. [Description](#nth)                                       |
| $.prev()     | <ul><li>`index` (optional)</li><li>`callback` (optional)</li></ul> | Selects previous element or previous nth element. [Description](#prev-and-next)                             |
| $.next()     | <ul><li>`index` (optional)</li><li>`callback` (optional)</li></ul> | Selects next element or next nth element. [Description](#prev-and-next)                                     |
| $.parent()   | `callback` (optional)                                              | Selects the element's parent node. [Description](#parent)                                                   |
| $.children() | `callback` (optional)                                              | Selects the element's child nodes. [Description](#children)                                                 |
| $.nthChild() | <ul><li>`index` </li><li>`callback` (optional)</li></ul>           | Selects element's child node at `index`. [Description](#nth-child)                                          |

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
| $.delClass()    | `classList`                                                         | Removes class name or list of class names from the matched elements. [Description](#delete-class)          |
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

Used in conditions. Accepts the same selector syntax as `$()`. Returns true if condition satisfies at least one element in matched elements.

```js
if ($("[type=checkbox]").is(":checked")) {
  // At least one checkbox is checked
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
$("li").nth(2).text("I am last :(")
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

Works exactly like `$.each()` but to execute next iteration, you must call the `next()` function. This iterator is good for chaining data fetching and other async actions.

```js
$("img").asyncEach(({ next, self }) => {
  const url = $(self).attr("data-url")

  new Promise((resolve) => {
    return fetch("url/of/image")
  })
    .then((response) => response.json())
    .then((response) => {
      /* */
      $(self).attr("src", response.url)

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

### Append

### Prepend

### Add Child

### Text

### Attr

### Del
