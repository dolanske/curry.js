# jCurry (curry.js) 0.0.1-alpha

We've all heard it, "If you add jQuery to your resume, don't expect an interview". I'm here to change that, adding jCurry, no matter the job application, guarantees you the CEO position.

---

Another small project to help me learn and also keep me from playing too much videogames. This jQuery inspired library aims to create a simple, barebones and from scratch implementation of jQuery without checking its source code. What a challenge right?!

## Install

Want to give it a try? Simply clone this repository!

In the root folder reside `scripts.js` and `index.html` which serve as a basic scaffolding to your project. No other folder structure is recommended, you are free to do whatever you want.

Within the `/curry` directory, you can find the `examples.js` folder which should give you an idea about the syntax. And feel free to fork and improve/update the library source files too.

---

### Hopes and thoughts

This is a hobby project but I am a perfectionist so I am aiming to develop this as long as it's fun and fits my capabilities. Issues, pull requests, suggestions and comments are encouraged and would help me out!

---

### API Documentation

`$(selector)`

Selects matching html nodes. Allows for selecting by class, id or element name. In the future will also support for CSS selectors and attr / value matching.

If the .get() function is attached, selector returns the selected elements. Otherwise it waits for chained function calls.

Curently supports '.class', '#id' and 'h1' native element selectors.

Example:

```js
// Returns a html node list of every button
const buttons = $("button").get()
```

---

`$(selector).on(event, callback)`

Attaches an event listener to the selected node(s) and calls the callback function on every listener trigger.

Example:

```js
// On click, write out the text within the button to the console
$("button").on("click", ({ self }) => {
  console.log(`Clicked button with ${self.textContent} inside.`)
})
```

---

`$(selector).addClass(class)` Add class(es)

`$(selector).remClass(class)` Remove class(es)

`$(selector).togClass(class)` Toggle class(es)

Manipulates classList of selected node(s). The input parameter 'class' can be a string or an array of strings.

Example:

```js
// Applies 'hovered' & 'hover-did-happen' to every p the user hovers
$("p").on("mouseenter", ({ self }) => {
  $(self).addClass(["hovered", "hover-did-happen"])
})

// When user stops hovering, remove only the 'hovered' class
$("p").on("mouseleave", ({ self }) => {
  $(self).remClass("hovered")
})
```
