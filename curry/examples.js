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
 *
 * Iterates over each selected HTML node. Exposes the current, previous element as well as the index
 */

// $("button").each(({ self, prev, helpers, index }) => {
//   const font = helpers.getStyleProperty(prev ?? self, "font-size")
//   self.style.fontSize = parseFloat(font) * (index + 1) + "px"
// })

/**
 *  .asyncEach
 */

$("button").asyncEach(({ self, next }) => {
  setTimeout(() => {
    console.log(self.textContent)

    next()
  }, 500)
})
