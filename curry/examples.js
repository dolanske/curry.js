$("button").click(({ $util }) => {
  $("h1").animate(async ({ $util, start }) => {
    // Execute code before animation begins
    // Thanks to the callback function, this exposes the currently animated object (if we arent selecting multiple)
    // from which we can gain properties to use in the animation

    // For example, I can get the element's width and use that
    // NOTE: This won't work if we have multiple elements selected, you can use $.each to iterate first, before animating
    // const marginLeft = $util.getStyleProperty(self, "width")

    // To actually start the animation we use the start() function
    // which also returns a promise which resolves when animation completes
    console.log($util)

    await start(
      {
        marginLeft: "200px",
        backgroundColor: "red",
      },
      {
        length: 1000,
        // easing: $util.bez(0.85, 0, 0.15, 1),
        easing: $util.bez("easeInOutQuad"),
      }
    )

    await start(
      {
        marginLeft: 0,
        backgroundColor: "white",
      },
      { length: "0.5s" }
    )
  })
})
