$("button").click(({ self }) => {
  $(self)
    .append(({ $util }) => {
      const { from, render } = $util

      return render(
        "ul",
        { name: Date.now() },
        from(5, 1).map((item) =>
          render("li", { class: "list-item" }, `${item}. TEST`)
        )
      )
    })
    .next()
    .children()
    .each(({ index, self }) => {
      if (index % 2 === 0) {
        $(self).css("color", "red")
      }

      setTimeout(() => {
        $(self).animate(async ({ start, $util }) => {
          const { bez } = $util

          if (index % 2 !== 0) {
            await start(
              {
                color: "blue",
                backgroundColor: "yellow",
              },
              {
                length: index * 1000,
                easing: bez("easeInOutCirc"),
              }
            ).then(() => {
              if (index === 9) {
                $(self).parent().prepend(`<strong>F I N I S H E D</strong>`)
              }
            })
          }
        })
      }, 1)
    })
})
