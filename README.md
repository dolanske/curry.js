# jCurry (curry.js) 0.2.0-beta

We've all heard it, "If you add jQuery to your resume, don't expect an interview". I'm here to change that, adding jCurry, no matter the job application, guarantees you the CEO position.

Cooking up another small project to help me learn and also keep me from playing too much Rocket League and Factorio. This library aims to create a simple, barebones & from scratch implementation of jQuery without checking its source code. What a challenge right?!

## Install

Want to give it a try? Simply clone this repository!

In the root folder reside `scripts.js` and `index.html` which serve as a basic scaffolding to your project. No other folder structure is recommended, you are free to do whatever you want.

### Author's personal message to you

This is a hobby project but I am a perfectionist so I am aiming to develop this as long as it's fun and fits my capabilities. Issues, pull requests, suggestions and comments are encouraged and would help me out!

---

### API Documentation

Currently implemented functions as of 1.2.2022

- [`$(selector)`](#base-selector)
- [`$.get(property)`](#base-selector)
- [`$.del()`](#index-selector)

- [`$.on(event, callback, options)`](#event-binding)
- [`$.hover({ enter(), leave(), options })`](#hover-shorthand)
- [`$.click(callback, options)`](#click-shorthand)

- [`$.addClass(class)`](#class-list-manipulation)
- [`$.delClass(class)`](#class-list-manipulation)
- [`$.toggleClass(class)`](#class-list-manipulation)
- [`$.show(displayType)`](#element-visibility)
- [`$.hide()`](#element-visibility)
- [`$.toggle(activeDisplayType)`](#element-visibility)
- [`$.css(property, style)`](#css-injection)

- [`$.nth(index, callback)`](#nth-selector)
- [`$.nthChild(index, callback)`](#nth-child)
- [`$.first(callback)`](#first-or-last-items)
- [`$.last(callback)`](#first-or-last-items)
- [`$.prev(index, callback)`](#prev-or-next-item)
- [`$.next(index, callback)`](#prev-or-next-item)
- [`$.parent(callback)`](#parent-selector)
- [`$.children(callback)`](#children-selector)

- [`$.each(callback)`](#synchronous-iteration)
- [`$.asyncEach(callback)`](#asynchronous-iteration)
- [`$.filter(condition)`](#filter-iteration)

- [`$.append(callback)`](#append-or-delete-element)
- [`$.prepend(callback)`](#append-or-delete-element)
- [`$.addChild(callback, append)`](#add-child)
- [`$.text(text, location)`](#text-content)

- [`$.exe(callback)`](#code-execution)
- [`$.asyncExe(callback)`](#code-execution)

- [`$.animate(properties, options)`](#element-animation)

### Helpers

Each callback epxoses the `$util` object which contains a set of helpers functions for development. Documentation for each function can be found [here](/HELPERS.md).

### State

Each callback exposes a `$state` property which is a simple way of sharing data in a function chain or even between multiple different chains.

```js
// Selects all list items and saves their text content to an array
$("ul")
  .children()
  .each(({ self, $state }) => {
    if (!$state.names) $state.names = []
    $state.names.push(self.textContent)
  })

// When <ul> is clicked, read the $state
$("ul").on("click", ({ $state }) => console.log($state.names))

// ['first', 'second', 'third']
```

---

### Selecting elements

#### Base selector

`$(selector)`

Selects matching html elements. It is implemented using the `document.querySelector`function. It offers some extensive ways to query elements. For full documentation check it out on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

If the `.get(property)` function is attached, selector returns the selected elements. Otherwise it waits for chained function calls. If property is provided, it will check if such property exists in the selected element(s) and will return an array containing its findings.

```js
// Returns a HTMLCollection of every button
const buttons = $("button").get()

// Returns the value of each input element
const values = $("input").get("value")
```

---

### List Selection

#### Nth selector

`$(selector).nth(index, callback)`

Selects the element at index `n` in from the selected element(s). _Indexing starts at `1`_.

If n is not specified, automatically returns the first element. If element is not found, nothing in the chain will get executed.

```js
// Selects the third list element found and prints out it's text when clicked
$("li")
  .nth(2)
  .on("click", ({ self }) => console.log(self.textContent))
```

#### Nth child

`$(selector).nthChild(index, callback)`

Works exactly the same as `$.nth()` except it looks for children at `index` within the selected element.

```js
// Selects the first list-item and prints its text & index
$("ul").nthChild(1, ({ self, index }) => console.log(self.textContent))
```

#### First or last items

`$(selector).first(callback)`

`$(selector).last(callback)`

Selects first or last element of the HTMLCollection. Optionally provides a callback to execute a function with the selected element. Otherwise returns instance of curry for chaining.

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

Optional callback exposes:

- `self` the newly selected sibling
- `index` index of the newly selected sibling
- `prev` the previous siblings
- `$util`

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

Selects parent element(s) of the selected element(s). Provides a new HTMLCollection of selected parent(s) which can be used by chained functions.

Optionally, you can use the callback function which will execute for every element it finds.

Optional callback exposes:

- `self` the selected parent
- `child` parent's child (the original selector)
- `$util`

```js
// If any list-item is clicked, the class .ul-clicked gets added to its parent
$("li")
  .parent()
  .on("click", ({ self }) => $(self).addClass("ul-clicked"))
```

#### Children selector

`$(selector).children(callback)

Selects all children element(s) of the currently selected element. Works similarly to the `$.parent()` function except that it cannot be used with HTMLCollection. If you want to iterate over a collection an select each element's children, please use the `$.each()` iterator.

Optional callback exposes:

- `self` the selector
- `children` elements's children
- `$util`

```js
$("#list")
  // Returns all list-items of <ul>
  .children()
  // Assing the index of each child as its text content
  .each(({ self, index }) => $(self).text(index))
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

Adds new elements before/after the selected element(s). Functions accept's a callback or a string template, depending on how the user needs to generate the content.

If you are familiar with modern web frameworks, you must have heard the term render functions.
If you know vue.js, curry's render functions have exactly the same syntax.

Render function accepts 3 parameters

- `tag` html tag
- `attrs` class, id, name etc.
- `children` string or array of render functions

Attrs can be ommited, inputting `render('tag', 'text' | [...children])` will work too.

You can also input a template string instead. Either as the only parameter or as a return of a callback

```js
// Select every '.list-wrap' element
$(".list-wrap").append(({ $util }) => {
  // from creates an array of n items at i index
  // render function is the equivalent of h in vue
  const { from, render } = $util

  // Generate an array of 5 items starting at index 1
  const items = from(5, 1).map((item) => {
    return render("li", `List item ${item}`)
  })

  // Create an unordered list and append the items as children
  return render("ul", { class: ".list" }, items)
})

$("input").prepend(({ self }) => {
  // Gets the data-name="_text_" attribute of every input
  const label = self.dataset.name
  // And prepends a <label> element with the name attribute as text
  return `<label>${label}</label>`
})

// In case we want to set a simple static string, we can also use the function like this
$("blockquote").prepend("<p>I am a placeholder quote</p>")
```

#### Add child

`$(selector).addChild(callback, append = true|false)`

Works exactly the same as `prepend`& `append` except the created elements are added as children. The append parameter controls if elements are added before or after the present children. If element has no control, the parameter has no effect.

```js
$(".add-todo").on("click", ({ self }) => {
  $(self)
    // Selects the next element, which in our example is an empty <ul>
    .next()
    // Appends a child
    .addChild(({ self, render }) => {
      const index = self.children.length
      // Creates a new list-item
      return render("li", `New to-do (${index})`)
    })
})
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

`$(selector).on(event, callback, options)`

Attaches an event listener to the selected element(s) and calls the callback function on every listener trigger.

Exposed callback params: `self`, `event` or `e`, `$util`, `$state`

```js
// On click, write out the text within the button to the console
$("button").on("click", ({ self }) => {
  console.log(`Clicked button with ${self.textContent} inside.`)
})
```

#### Hover shorthand

`$(selector).hover({enter, leave, options})`

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
  options: {
    // Event listener characteristics
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  },
})
```

#### Click shorthand

`$(selector).click(callback, options)`

Shorthand for binding a `click` listener to the selected HTMLCollection. Callback exposes the same destructured parameters as the `$.on()` function.

```js
// Clicking the button will toggle between showing and hiding the next child
$("button").click(({ self }) => {
  $(self).next().toggle()
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

Exposed callback params: `self`, `prev`, `index`, `$util`, `$state`

Used for iterating over each selected element and executing a function on each iteration. Also provides the previous selected element.

```js
// Loops over each button and doubles each button's font size

$("button").each(({ self, prev, index, $util }) => {
  // Get previous element's font-size
  // If previous element is undefined, use self
  // WARNING: When using getStylePropery, set properties in kebab-case, not camelCase
  const font = $util.getStyleProperty(prev ?? self, "font-size")

  // Computed style properties can return a float in some cases
  self.style.fontSize = parseFloat(font) * (index + 1) + "px"
})
```

#### Asynchronous iteration

`$(selector).asyncEach(callback)`

Exposed callback params: `self`, `prev`, `index`, `$util`, `next`, `$state`

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

#### Filter iteration

`$(selector).filter(callback)`

Iterates over provided HTMLCollection and removes items which do not fit the provided codition. This function works similarly to how `Array.prtotype.filter()` works, but it only accepts 1 parameter which is a callback function.

Callback exposes: `self`, `index`, `$util`, `$state`

```js
// Selects all child nodes of .rows element
$(".rows")
  .children()
  // Filters out all odd indexed items
  .filter(({ index }) => (index + 1) % 2 === 0)
  // Each even row has it's text changed
  .text("I am an even row")
```

```html
<ul class="rows">
  <li>Item 1</li>
  <li>I am an even row</li>
  <li>Item 3</li>
  <li>I am an even row</li>
</ul>
```

---

### Animation

#### Element animation

`$(selector).animate(properties, options)`

`$(selector).animate(callback)`

The animate function let's you animate selected element(s) to the style properties provided. It also equips a handful of options to customize the animation.

There are two ways of working with `$.animate()`. If you are familiar with vue3, it's similar to options vs composition api. The more traditional (jQuery) object approach uses these parameters:

- `properties` A CSS object, exactly the same syntax as `$.css()` uses
- `options`:
  - `length` - Duration of the animation
  - `easing` - Easing of the animation
  - `defaultUnit` - If no unit is provided, assigns the defaultUnit, by default set to "px"
  - `callback` - Function to execute when animation is complete

```js
// Traditional Approach
$("button").click(({ $util }) => {
  // When button is clicked, every h1 element will be selected
  $("h1").animate(
    {
      // If you input a number, the _defaultUnit_ option will assign a unit
      // in our case it would be "px"
      marginLeft: 200,
      backgroundColor: "red",
    },
    {
      length: "1s",
      // Shorthand for inputing "cubic-bezier(0.85, 0, 0.15, 1)"
      // Supports all CSS easings
      easing: $util.bez(0.85, 0, 0.15, 1),
      callback: ({ self }) => {
        // In callback we can infinitely execute more animations if needed
        $(self).animate(
          {
            marginLeft: "0px",
            backgroundColor: "white",
          },
          { length: 500 }
        )
      },
    }
  )
})
```

The second approach to animation approaches it from a bit different way. Say you want to use the animated element's width to more accurately move it. With the "options" approach you'd have to use the parent selector and manually access it through its children.

When using the callback, the animated element(s) are available to you. The only drawback is that if you want to access the element's properties, you must wrap the function in `$.each` as you cannot get specific properties out of a HTMLCollection.

Callback exposes: `self`, `$util`, `$state` & `start`

The start function is the equivalent of using `$.animate()` and takes in `properties` and `options`. You can se the same options syntax then.

The difference is that now you control when the animation triggers. The next example does exactly the same as the previous one. Just with different syntax.

```js
$("button").click(({ $util }) => {
  $("h1").animate(async ({ self, $util, start }) => {
    // Execute code before animation begins
    // Thanks to the callback function, this exposes the currently animated object (if we arent selecting multiple)
    // from which we can gain properties to use in the animation

    // For example, I can get the element's width and use that
    // NOTE: This won't work if we have multiple elements selected, you can use $.each to iterate first, before animating
    // const marginLeft = $util.getStyleProperty(self, "width")

    // To actually start the animation we use the start() function
    // which also returns a promise which resolves when animation completes
    await start(
      {
        marginLeft: "200px",
        backgroundColor: "red",
      },
      {
        length: 1000,
        easing: $util.bez(0.85, 0, 0.15, 1),
        // We can still attach a callaback here
        // but using .then() is more cleaner
      }
    )

    // This also allows for animation chaining without having to use the options callback! Clean code!!
    await start(
      {
        marginLeft: 0,
        backgroundColor: "white",
      },
      { length: "0.5s" }
    ).then(() => {
      // This executes when all animations are complete
    })
  })
})
```

---

### Code execution (experimental)

Utility selector to execute code during chaining. This should be used rarely as most functions have their own callbacks. Callback is executed only once no matter how many selected elements. For execution per element, use the `$.each()` or `$.asyncEach()` iteration functions.

Callback exposes: `self`, `$util`, `$state`

`$(selector).exe(callback)`

Executes an async function in the chain. Callback exposes the `next()`. Without calling it the chain won't continue.

`$(selector).asyncExe(callback)`
