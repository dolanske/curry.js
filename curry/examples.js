$("button").hover({
  enter: ({ self }) => $(self).css("color", "red"),
  leave({ self }) {
    $(self).css("color", "blue")
  },
})
