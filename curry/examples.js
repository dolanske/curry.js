/*----------  append / prepend examples  ----------*/
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
