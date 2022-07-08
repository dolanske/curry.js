# v1.20

- Refactored `$.slideUp` & `$.slideDown` to use `transform: scale` instead of setting a `height` to it
- Intention behind jCurry was to use arrow function with descructuring. There are use cases where that syntax can be annoying to use.

```js
// jCurry now supports this

// Original syntax
$("button").on("click", ({ self }) => {
  $(self).text("You clicked me")
})

// jQuery syntax
// even like this, you can still use descructured
// properties, as you may need them in some functions
$("button").on("click", function ({ $util }) {
  $(this).text("You clicked me")
})
```

- improved hover, now with full support with single callback, which on hover-end resets the hoevered element to its pre-hover state
