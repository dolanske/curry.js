$("ul")
  .children()
  .each(({ self, state }) => {
    if (!state.names) state.names = []
    state.names.push(self.textContent)
  })

$("ul").on("click", ({ state }) => console.log(state))
