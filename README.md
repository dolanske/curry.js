# jCurry (curry.js) 0.0.1-alpha

We've all heard it, "If you add jQuery to your resume, don't expect an interview". I'm here to change that, adding jCurry, no matter the job application, guarantees you the CEO position.

Cooking up another small project to help me learn and also keep me from playing too much Rocket League and Factorio. This library aims to create a simple, barebones & from scratch implementation of jQuery without checking its source code. What a challenge right?!

## Install

Want to give it a try? Simply clone this repository!

In the root folder reside `scripts.js` and `index.html` which serve as a basic scaffolding to your project. No other folder structure is recommended, you are free to do whatever you want.

### Author's personal message to you

This is a hobby project but I am a perfectionist so I am aiming to develop this as long as it's fun and fits my capabilities. Issues, pull requests, suggestions and comments are encouraged and would help me out!

---

### API Documentation

#### Selecting elements

`$(selector)`

Selects matching html nodes. Allows for selecting by class, id or element name. In the future will also support for CSS selectors and attr / value matching.

If the .get() function is attached, selector returns the selected elements. Otherwise it waits for chained function calls.

Curently supports '.class', '#id' and 'h1' native element selectors.

```js
// Returns a html node list of every button
const buttons = $("button").get()
```

---

`$(selector).index(n)`

Selects the element at index `n` in a HTML Node list. Is zero indexed.

If n is not specified, automatically returns the first element. If element is not found, nothing in the chain will get executed.

```js
// Selects the third list element found and prints out it's text when clicked
$("li")
  .index(2)
  .on("click", ({ self }) => console.log(self.textContent))
```

---

`$(selector).first()`

`$(selector).last()`

Selects first or last element of the HTML Node list. Optionally provides a callback to execute a function with the selected element. Otherwise returns instance of curry for chaining.

```js
// Selects the first element and applies style
$("button").first().css("color", "blue")

// Selects the last element and prints it's text content & element's index
$("button").last(({ self, index }) => console.log(self.textContent, index))
```

---

#### DOM manipulation

`$(selector).del()`

Deletes selected element(s)

```js
// When an element with the class '.delete-me' is clicked, it gets deleted
$(".delete-me").on("click", ({ self }) => {
  $(self).del()
})
```

---

`$(selector).append()` - Renders element(s) after the selector(s)

`$(selector).prepend()` - Renders element(s) before the selector(s)

Creates HTML node(s) before/after the selected element(s). Functions accept's a callback or a string template, depending on how the user needs to generate the content.

If you are familiar with modern web frameworks, you must have heard the term render functions.
If you know vue.js, curry's render functions have exactly the same syntax.

Render function acceppts 3 parameters

- `tag` html tag
- `attrs` class, id, name etc.
- `children` string or array of render functions

Attrs can be ommited, inputting `render('tag', 'text' | [...children])` will work too

You can also input a template string instead as the only parameter

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

---

#### Event binding

`$(selector).on(event, callback)`

Attaches an event listener to the selected element(s) and calls the callback function on every listener trigger.

Exposed callback params: `self`, `event` or `e`, `helpers`

```js
// On click, write out the text within the button to the console
$("button").on("click", ({ self }) => {
  console.log(`Clicked button with ${self.textContent} inside.`)
})
```

---

#### Class list manipulation

`$(selector).addClass(class)` Add class(es)

`$(selector).delClass(class)` Remove class(es)

`$(selector).togClass(class)` Toggle class(es)

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

#### Style binding

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

---

#### Element looping

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

---

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
