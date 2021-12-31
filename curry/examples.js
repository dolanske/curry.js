$("li")
  .filter(({ index }) => (index + 1) % 2 === 0)
  .each(({ self }) => $(self).text("cum"))
