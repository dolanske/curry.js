$("ul")
  .children()
  .nth(2, ({ self }) => console.log(self.textContent))
