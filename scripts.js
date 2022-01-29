// Write your scripts here

/*
 * Getting attributes
 */

// Returns attribute value
console.log($("a").attr("href"))
//  Returns
console.log($("a").attr(["href", "title"]))

/*
 * Setting attributes
 */

// Assigns value to key
$("a").attr("href", "path/to/page")

// Will throw a warning and do nothing
$("a").attr("href", ["path/to/page", "other/to/pat"])

// Assigns key:value pair based on index
$("a").attr(["href", "title", "data-iterations"], ["/hello", "Hello World", 10])

// Sets the same value for every key
$("a").attr(["title", "data-description"], "I am the same text!!!")
