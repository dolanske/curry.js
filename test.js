// $(".henlo").on("click");

/**
 * #SELECTOR
 *
 * If not in a chained function, returns selected element(s) or undefined.
 */

// const h1 = $('h1').get()
// if (h1) console.log("Found an h1 element.", h1)

/**
 * #ON
 *
 * Attaches an event listener to the selected element(s). If element gets destroyed,
 * it automatically closes.
 */

// $("#btn").on("click", ({ self, event }) => {
//   console.log("CLICKED", self, event)
// })

$("h1").on("mouseenter", ({ self }) => {
  $(self).css({
    color: "red",
    fontSize: "32px",
  })
})
