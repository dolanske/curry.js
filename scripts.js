// Write your scripts perhaps here

const { addClass, attr, css } = $

$("h1").hover((self) => {
  $(self).exe([
    addClass("hovered"),
    attr("title", "hello title"),
    css("background", "color"),
  ])
})
