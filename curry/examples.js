/**
 *  $()
 *
 * The basic selector used to select element(s) from the DOM.
 *
 * $('.button') selects every element with the .button class name
 * $('button')  selects every <button> element
 * $('#id')     selects the elemet by its ID
 *
 * TODO:
 * $('[attribute]') $('[attribute=value']) will select any element with said attributes
 * $('_selector_:first-of-type') adding : after a selector will apply CSS like selectors
 *
 * $('h1').get()
 */

// const h1 = $("h1").get()
// if (h1) console.log("Found an h1 element.", h1)

/**
 *  .on
 *
 * Attaches an event listener to the selected element(s). If element gets destroyed,
 * it automatically closes during garbage collection.
 *
 * The next example will execute user input script on click.
 * In the parameters, self is the HTML node and e/event is the click event
 *
 */

// $("#btn").on("click", ({ self }) => {
//   console.log(`Clicked ${self.tagName} which says ${self.textContent}`)
// })

// $("h1").on("mouseenter", ({ self }) => {
//   $(self).css({
//     color: "red",
//     fontSize: "32px",
//   })
// })

// $("h1").on("mouseleave", ({ self }) => {
//   $(self).css({
//     color: "white",
//     fontSize: "inherit",
//   })
// })

/**
 *  .addClass ( add class )
 *  .delClass ( remove class )
 *  .togClass ( toggle class )
 *
 * Adds a class or an array of classes to the selected element(s).
 */

// $("h1").on("click", ({ self }) => {
//   $(self).togClass("flip")
// })

/**
 *  .each
 */

$("button").each(({ self, prev, helpers, index }) => {
  const font = helpers.getStyleProperty(prev ?? self, "font-size")

  self.style.fontSize = parseFloat(font) * (index + 1) + "px"
})
