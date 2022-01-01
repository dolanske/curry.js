$("button").click(({ self, helpers }) => {
  // Get width of all h1
  // const width = helpers.getStyleProperty(self, "width")
  // $("h1").animate(
  //   {
  //     marginLeft: width,
  //     backgroundColor: "red",
  //   },
  //   {
  //     length: 1000,
  //     callback: ({ self }) => {
  //       $(self).animate(
  //         {
  //           marginLeft: "0px",
  //           backgroundColor: "white",
  //         },
  //         { length: 500 }
  //       )
  //     },
  //   }
  // )

  // TODO Figure out a way to use $.animate with a callback so that within the animation
  // object we could access self, helpers, state etc

  $("h1").animate(async ({ self, helpers, start }) => {
    // Before animation happens, we can execute any js needed
    console.log("before animation")

    // To actually start the animation we use the start() function
    // which also returns a promise which resolves when animation completes
    await start({
      marginLeft: helpers.getStyleProperty(self, "width"),
      backgroundColor: "red",
    }).then(() => {
      // Execute after animation finishes
      console.log("animation finished")
    })
  })
})
