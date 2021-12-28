/*----------  append / prepend examples  ----------*/
/*
// Select the second button in DOM
$("button").append(({ helpers }) => {
  const { from, render } = helpers

  // Generate an array of 1 items starting at index 1
  const items = from(5, 1).map((item) => {
    return render("li", `List item ${item}`)
  })

  // Create an unordered list and append the items as children
  return render("ul", { class: "test" }, items)
})

*/

// $("button").append("<p>I am under a button</p>")

/*----------  first / last examples  ----------*/

// First (doesnt return index, always 0)
const firstButton = $("button").first().get()

//Last, returns index
$("button").last(({ index }) => console.log(index))
