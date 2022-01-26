// Write your scripts here

$("ul")
  .nthChild(2)
  .on("click", ({ self }) => console.log(self.textContent))
