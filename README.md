# jCurry (curry.js) 0.0.11-alpha

We've all heard it, "If you add jQuery to your resume, don't expect an interview". I'm here to change that, adding jCurry, no matter the job application, guarantees you the CEO position.

Cooking up another small project to help me learn and also keep me from playing too much Rocket League and Factorio. This library aims to create a simple, barebones & from scratch implementation of jQuery without checking its source code. What a challenge right?!

## Install

Want to give it a try? Simply clone this repository!

In the root folder reside `scripts.js` and `index.html` which serve as a basic scaffolding to your project. No other folder structure is recommended, you are free to do whatever you want.

### Author's personal message to you

This is a hobby project but I am a perfectionist so I am aiming to develop this as long as it's fun and fits my capabilities. Issues, pull requests, suggestions and comments are encouraged and would help me out!

---

### API Documentation

Currently implemented functions as of 30.12.2021 19:03

- [`$(selector)`](#base-selector)
- [`$.get()`](#base-selector)
- [`$.del()`](#index-selector)
- [`$.on(event, callback)`](#event-binding)
- [`$.css(property, style)`](#css-injection)
- [`$.addClass(class)`](#class-list-manipulation)
- [`$.delClass(class)`](#class-list-manipulation)
- [`$.toggleClass(class)`](#class-list-manipulation)
- [`$.each(callback)`](#synchronous-iteration)
- [`$.asyncEach(callback)`](#asynchronous-iteration)
- [`$.nth(n)`](#nth-selector)
- [`$.first(callback)`](#first-or-last-items)
- [`$.last(callback)`](#first-or-last-items)
- [`$.prev(index, callback)`](#prev-or-next-item)
- [`$.next(index, callback)`](#prev-or-next-item)
- [`$.append(callback)`](#append-or-delete-element)
- [`$.prepend(callback)`](#append-or-delete-element)
- [`$.text(text, location)`](#text-content)
- [`$.show(displayType)`](#element-visibility)
- [`$.hide()`](#element-visibility)
- [`$.toggle(activeDisplayType)`](#element-visibility)
- [`$.hover({ enter(), leave() })`](#hover-shorthand)
- [`$.parent(callback)`](#parent-selector)

### Selecting elements

#### Base selector

`$(selector)`

Selects matching html nodes. Allows for selecting by class, id or element name. In the future will also support for CSS selectors and attr / value matching.

If the `.get()` function is attached, selector returns the selected elements. Otherwise it waits for chained function calls.

Curently supports '.class', '#id' and 'h1' native element selectors.

```js
// Returns a html node list of every button
const buttons = $("button").get()
```

---

### List Selection

#### Nth selector

`$(selector).nth(n)`

Selects the element at index `n` in from the selected element(s). Zero indexed.

If n is not specified, automatically returns the first element. If element is not found, nothing in the chain will get executed.

```js
// Selects the third list element found and prints out it's text when clicked
$("li")
  .nth(2)
  .on("click", ({ self }) => console.log(self.textContent))
```

#### First or last items

`$(selector).first(callback)`

`$(selector).last(callback)`

Selects first or last element of the HTML Node list. Optionally provides a callback to execute a function with the selected element. Otherwise returns instance of curry for chaining.

```js
// Selects the first element and applies style
$("button").first().css("color", "blue")

// Selects the last element and prints it's text content & element's index
$("button").last(({ self, index }) => console.log(self.textContent, index))
```

#### Prev or next item

`$(selector).prev(index, callback)`

`$(selector).next(index, callback)`

Selects the previous / next or nth sibling if element has any, otherwise returns undefined and skips this chain node. Index and callback are both optional, this function should primarily be used for chaining.

If you use custom index, it is recommended to use `2` and higher, as `1` has the same functionality as no index. And 0 would select itself.

Callback exposes:

- `self` the newly selected sibling
- `index` index of the newly selected sibling
- `prev` the previous siblings
- `helpers`

```js
$("li").on("click", ({ self }) => {
  $(self).next(({ self, prev, index }) => {
    console.log(
      `${prev.textContent}'s next sibling is ${self.textContent} with index ${index}`
    )
  })
})

// When button is clicked, it removes a sibling element 2 items before it
$("button").on("click", ({ self }) => {
  $(self).prev(2).del()
})
```

#### Parent selector

`$(selector).parent(callback)`

Selects parent node(s) of the selected element(s). Provides a new HTMLCollection of selected parent(s) which can be used by chained functions.

Optionally, you can use the callback function which will execute for every element it finds.

Callback exposes:

- `self` the selected parent
- `child` parent's child (the original selector)
- `helpers`

```js
// If any list-item is clicked, the class .ul-clicked gets added to its parent
$("li")
  .parent()
  .on("click", ({ self }) => $(self).addClass("ul-clicked"))
```

---

### DOM manipulation

#### Delete

`$(selector).del()`

Deletes selected element(s)

```js
// When an element with the class '.delete-me' is clicked, it gets deleted
$(".delete-me").on("click", ({ self }) => {
  $(self).del()
})
```

#### Append or delete element

`$(selector).append(callback | template string)` - Renders element(s) after the selector(s)

`$(selector).prepend(callback | template string)` - Renders element(s) before the selector(s)

Creates HTML node(s) before/after the selected element(s). Functions accept's a callback or a string template, depending on how the user needs to generate the content.

If you are familiar with modern web frameworks, you must have heard the term render functions.
If you know vue.js, curry's render functions have exactly the same syntax.

Render function accepts 3 parameters

- `tag` html tag
- `attrs` class, id, name etc.
- `children` string or array of render functions

Attrs can be ommited, inputting `render('tag', 'text' | [...children])` will work too.

You can also input a template string instead. As the only parameter.

```js
// Select every '.list-wrap' element
$(".list-wrap").append(({ helpers }) => {
  // from creates an array of n items at i index
  // render function is the equivalent of h in vue
  const { from, render } = helpers

  // Generate an array of 5 items starting at index 1
  const items = from(5, 1).map((item) => {
    return render("li", `List item ${item}`)
  })

  // Create an unordered list and append the items as children
  return render("ul", { class: ".list" }, items)
})

// Selects every input in the DOM and prepends a label to it
$("input").prepend("<label>Input label here</label>")
```

#### Text content

`$(selector).text(text, location)`

Sets the selected element(s) textContent to the input string.
Optionally, you can set in what location the text appears.

`location` parameter accepts the following values:

- `replace` replaces inner textContent
- `prepend` prepends text before the existing text content
- `append` appends text after the existing text content

```js
// Each blockquote element starts with 'so he said: '
$("blockquote").text("So he said: ", "prepend")

// Every paragraph's text is replaced
$("p").text("I am the text content now")
```

---

### Event binding

`$(selector).on(event, callback)`

Attaches an event listener to the selected element(s) and calls the callback function on every listener trigger.

Exposed callback params: `self`, `event` or `e`, `helpers`

```js
// On click, write out the text within the button to the console
$("button").on("click", ({ self }) => {
  console.log(`Clicked button with ${self.textContent} inside.`)
})
```

#### Hover shorthand

`$(selector).hover({enter, leave})`

Shorthand for binding event listener `mouseenter` and `mouseleave` to the selected element(s).
The parameter is an object with 2 required parameters.

- `enter` executes when cursor hovers over element
- `leave` executes when cursor leaves element

Each callback exposes the same destructured parameters as the `$.on()` function.

Planned feature: if leave function is ommited, return element to it's original state.

```js
// When any button is hovered, change its color to red
// When mouse leaves the button, change its color to blue
$("button").hover({
  // Two different possible syntax options
  enter: ({ self }) => $(self).css("color", "red"),
  leave({ self }) {
    $(self).css("color", "blue")
  },
})
```

---

### Class list manipulation

`$(selector).addClass(class | list of classes)` Add class(es)

`$(selector).delClass(class | list of classes)` Remove class(es)

`$(selector).toggleClass(class | list of classes)` Toggle class(es)

Manipulates classList of selected element(s). The input parameter 'class' can be a string or an array of strings.

```js
// Applies 'hovering' & 'hovered-previously' to every p the user hovers
$("p").on("mouseenter", ({ self }) => {
  $(self).addClass(["hovering", "hovered-previously"])
})

// When user stops hovering, remove only the 'hovering' class
$("p").on("mouseleave", ({ self }) => {
  $(self).delClass("hovering")
})
```

---

### Style binding

#### CSS injection

`$(selector).css('property', 'value')`

`$(selector).css({...property:value})`

Applies inline styles for the selected element(s). Allows two different types of syntax. String and an object.

```js
// Applies a single property:value pair to the element
$(".car").css("color", "blue")

// Allows for inputting as many styles as needed
$(".dogs").css({
  width: "16px",
  height: "56px",
  color: "brown",
})
```

#### Element visibility

`$(selector).show(displayType)`

`$(selector).hide()`

`$(selector).toggle(displayType)`

Utility functions which show, hide or toggle between the two states for the selected element(s).
Setting the optional parameter to a valid property value for `display` will use that, instead of `block`.

For allowed values, check the 'property values' list at [W3](https://www.w3schools.com/cssref/pr_class_display.asp) documentation.

It's very useful when toggling between inline / flex styles, where we'd have to wrap the elements in an additional <div> to no break any custom styling.

```js
$(".show-paragraph").on("click", ({ self }) => {
  // Default style of .p is { display: none }
  // This function will toggle between display: none & display: inline-block
  $("p").toggle("inline-block")
})
```

---

### Element iteration

#### Synchronous iteration

`$(selector).each(callback)`

Exposed callback params: `self`, `prev`, `index`, `helpers`

Used for iterating over each selected element and executing a function on each iteration. Also provides the previous selected element.

```js
// Loops over each button and doubles each button's font size

$("button").each(({ self, prev, index, helpers }) => {
  // Get previous element's font-size
  // If previous element is undefined, use self
  // WARNING: When using getStylePropery, set properties in kebab-case, not camelCase
  const font = helpers.getStyleProperty(prev ?? self, "font-size")

  // Computed style properties can return a float in some cases
  self.style.fontSize = parseFloat(font) * (index + 1) + "px"
})
```

#### Asynchronous iteration

`$(selector).asyncEach(callback)`

Exposed callback params: `self`, `prev`, `index`, `helpers`, `next`

Iterates over selected element(s) in the same fashion as `.each()` except to continue in the loop, we must call the `next()` function on each iteration. This allows us to work with promises or any async/await actions which should not happen synchonously but in order.

```js
// Iterate over each post we find
$(".post").asyncEach(({ self, next }) => {
  // Some async API call to return the post's thumbnail
  new Promise((resolve) => /* ASYNC API CALL */)
    .then((url) => {
      // Assign the thumbnail to self's background-image
      $(self).css("backgroundImage", `url(${url})`)

      // Call next() to continue the loop
      next()
    })
})
```
