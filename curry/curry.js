"use strict"

/**
 *
 * Helpers & Utilities
 *
 */

function getStyleProperty(el, property) {
  return window.getComputedStyle(el, null).getPropertyValue(property)
}

function noop(a, b, c) { /* NO OPERATION */ } // prettier-ignore

function isObject(value) {
  let type = typeof value
  return value != null && (type == "object" || type == "function")
}

function isArray(value) {
  return Array.isArray(value)
}

function isNil(value) {
  return value === undefined || value === null
}

function from(n, start = 0) {
  return Array.from({ length: n }, (_, i) => i + start)
}

function isNodeMap(list) {
  return list.length !== undefined
}

function bindListener(el, name, callback, state, options) {
  el.addEventListener(
    name,
    (e) => {
      callback({
        event: e,
        e: e,
        self: el,
        helpers,
        state,
      })
    },
    options
  )
}

/**
 * Loops over HTML node list and applies callback for each item
 *
 * @param {HTMLNodeList} elements Elements to iterate on
 * @param {Function} callback Execute on each loop
 */
function map(elements, callback) {
  if (isNodeMap(elements)) {
    for (let i = 0; i < elements.length; i++) {
      callback(elements[i], i)
    }
  }
}

function render(tag, attrs, children) {
  // We can omit prps when calling the function
  if (
    typeof attrs === "string" ||
    typeof attrs === "number" ||
    Array.isArray(attrs)
  ) {
    children = attrs
    attrs = {}
  }

  // Convert any non-array children to string for the HTML node creation
  if (!isNil(children)) {
    if (!Array.isArray(children)) {
      children = `${children}`
    } else if (typeof children[0] === "string") {
      children = children[0]
    }
  }

  return {
    tag,
    attrs,
    children,
  }
}

function getSiblingIndex(el) {
  if (!el) return 0

  let i = 0
  let cloned = el
  // While it has previous siblings, add +1 to the index
  while ((cloned = cloned.previousElementSibling) != null) {
    i++
  }

  return i
}

function createElement(vnode, container, where) {
  if (isArray(vnode)) {
    vnode.map((node) => createElement(node, container, where))
    return
  }

  // We assign it to vnode.el to also compare when we use the patch function
  const el = (vnode.el = document.createElement(vnode.tag))

  // Props
  if (vnode.attrs) {
    for (const key in vnode.attrs) {
      let value = vnode.attrs[key]
      el.setAttribute(key, value)
    }
  }

  // Children
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      // If child is just a text, add it to the element
      el.textContent = vnode.children
    } else {
      // If its an array, call itself and repeat the process
      vnode.children.forEach((child) => {
        if (typeof child === "string") {
          el.textContent += " " + child
        } else {
          createElement(child, el)
        }
      })
    }
  }

  switch (where) {
    case "prepend": {
      container.parentNode.insertBefore(el, container)
      break
    }
    case "append": {
      container.parentNode.insertBefore(el, container.nextSibling)
      break
    }
    case "prependchild": {
      container.insertBefore(el, container.firstChild)
      break
    }
    case "appendchild":
    default: {
      container.appendChild(el)
      break
    }
  }

  return el
}

// Helpers object that gets exposed in callback functions

const helpers = {
  getStyleProperty,
  isObject,
  isArray,
  isNil,
  from,
  render,
  isElements: isNodeMap,
  mapElements: map,
  getSiblingIndex,
}

// const validSelectors = [".", "#", "[", ":"]
const validSelectors = [".", "#"]

const validDisplayValues = [
  "inline",
  "block",
  "contents",
  "flex",
  "grid",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "inline-table",
  "list-item",
  "run-in",
  "table",
  "table-caption",
  "table-column-group",
  "table-header-group",
  "table-footer-group",
  "table-row-group",
  "table-cell",
  "table-column",
  "table-row",
  "initial",
  "inherit",
]

function queryElement(selector) {
  if (isObject(selector) || selector.nodeType) return selector

  const el = document.querySelectorAll(selector)

  return el
}

/*----------  ----------*/

/**
 *
 * fetch API helpers
 *
 */

const $api = {
  get: () => {},
  post: () => {},
  put: () => {},
  del: () => {},
}

/*----------  ----------*/

/**
 *
 * C U R R Y .js
 *
 */

;(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.$ = factory()))
})(this, function () {
  "use strict"

  // Define global variables
  let element
  const state = {}

  /**
   *
   * @param {String} selector Selects an existing element in the DOM
   * @returns Instance of curry for function chaining
   *
   */

  const $ = (selector) => {
    if (!selector) throw Error("Selector must contain a string.")

    if (typeof selector === "string" && selector.startsWith("$")) {
      // Special selectors start with $
      switch (selector) {
        case "$state": {
          return state
        }
        case "$helpers": {
          return helpers
        }
        default:
          console.warn("Unsupported magic selector.")
          return
      }
    }

    element = queryElement(selector)

    /**
     *
     * @param {String} property
     * @returns HTML node(s) of the selected element
     */

    $.get = (property) => {
      if (!element || element.length === 0) return undefined

      if (property) {
        if (isNodeMap(element)) {
          const params = []
          map(element, (el) => {
            if (el[property]) params.push(el[property])
          })

          return params
        } else {
          if (element[property]) return [element[property]]
        }
      }

      if (element.length === 1) return element[0]

      return element
    }

    /**
     * Delets selected element(s)
     */

    $.del = () => {
      if (!element) return

      if (isNodeMap(element)) {
        map(element, (node) => node.remove())
      } else {
        element.remove()
      }
    }

    /**
     * This chained function attaches an event listener to the selected element.
     * Then executes provided callback when event is triggered.
     *
     * @param {String} event        Event name
     * @param {Function} callback   Function to execute when event is triggered
     * @param {Object} options
     */

    $.on = (event, callback, options) => {
      if (!element) return $

      // Is HTML collection
      if (isNodeMap(element)) {
        for (const item of element) {
          bindListener(item, event, callback, state, options)
        }
      } else {
        bindListener(element, event, callback, state, options)
      }

      return $
    }

    /**
     * Function takes in styles which are then applied to the selected element.
     * Offers 2 different syntaxes
     *
     * @param {String | Object} property
     * @param {String | undefined} style
     */

    $.css = (property, style) => {
      if (!element) return $

      if (!property) {
        console.warn("No style entered")
        return false
      }

      // If property && style are a string, it's a singular style addition
      if (typeof property === "string" && typeof style === "string") {
        element.style[property] = style
        return true
      }

      // If property is an object and style is undefined, we assign inline style
      if (isObject(property)) {
        Object.entries(property).map(([key, value]) => {
          element.style[key] = value
        })
        return true
      }
    }

    /**
     * Adds a class name or an array of class names to the selected element(s)
     *
     * @param {String | Array} classNames
     * @returns If action was successful
     */

    $.addClass = (classNames) => {
      if (!element) return $

      if (!classNames || classNames.length === 0) {
        console.warn("No class name(s) entered")
        return false
      }

      if (isArray(classNames)) {
        classNames.map((item) => element.classList.add(item))
        return true
      }

      if (typeof classNames === "string") {
        element.classList.add(classNames)
        return true
      }
    }

    /**
     * Removes a class name or an array of class names from the selected element(s)
     *
     * delClass('class')
     * delClass(['class1', 'class2'])
     *
     * @param {String | Array} classNames
     * @returns If action was successful
     */

    $.delClass = (classNames) => {
      if (!element) return $

      if (!classNames || classNames.length === 0) {
        console.warn("No class name(s) entered")
        return false
      }

      if (isArray(classNames)) {
        classNames.map((item) => element.classList.remove(item))
        return true
      }

      if (typeof classNames === "string") {
        element.classList.remove(classNames)
        return true
      }
    }

    /**
     * Toggles between the class(es) of the selected element(s)
     *
     * @param {String | Array} classNames
     * @returns If action was successful
     */

    $.toggleClass = (classNames) => {
      if (!element) return $

      if (!classNames || classNames.length === 0) {
        console.warn("No class name(s) entered")
        return false
      }

      const toggle = (cls) => {
        if (element.classList.contains(cls)) {
          element.classList.remove(cls)
        } else {
          element.classList.add(cls)
        }
      }

      if (isArray(classNames)) {
        classNames.map((item) => toggle(item))
      }

      if (typeof classNames === "string") {
        toggle(classNames)
      }
    }

    /**
     * Iterates over provided HTML node list with a callback function.
     *
     * @param {Function} callback Function which executes on each iteration
     * @returns Instance of curry for function chaining
     */

    $.each = (callback) => {
      if (!element) return $

      if (!callback) throw Error("Callback must be a function")

      // Selector picked just 1 item and it is not a HTMl collection
      if (element.length === undefined) {
        callback({ self: element, helpers, index: 0, state })
      } else {
        let prev = null
        let index = 0

        for (const el of element) {
          callback({ self: el, prev, helpers, index, state })
          prev = el
          index += 1
        }
      }

      return $
    }

    /**
     * Works exactly like .each but it exposes a next() function
     * which won't go to the next loop unless called.
     *
     * This allows the user to make API calls for each selected NODE and wait until
     * each is resolved before continuing to the next loop.
     *
     * @param {Function} callback Function which executes on each iteration
     * @returns Instance of curry for function chaining
     */

    // TODO: Should be wrapped in Promise.all and return curry instance
    // upon fully resolving

    $.asyncEach = async (callback) => {
      if (!element) return $

      if (!callback) throw Error("Callback must be a function")

      // Selector picked just 1 item and it is not a HTMl collection
      if (element.length === undefined) {
        callback({ self: element, helpers, index: 0, state })
      } else {
        let prev = null
        let index = 0

        for (const el of element) {
          await new Promise((resolve) =>
            callback({ self: el, prev, helpers, index, next: resolve, state })
          )

          prev = el
          index += 1
        }
      }

      return $
    }

    /**
     * Selects an element at the index `n`, if element is not found, nothing happens
     *
     * @param {Number} index
     * @param {Function | undefined} callback
     * @returns Instance of curry for function chaining
     */

    $.nth = (index, callback) => {
      if (!element) return $

      // If element doesn't have length, we assume there is just
      // one element and the index function gets ignored
      if (isNodeMap(element)) {
        // If index exceeds the element list length,
        // automatically clear selection and break the chain
        if (index > element.length) {
          // element = undefined
          // return $
          return undefined
        }

        if (!index || index === 1) {
          // If index is not set or is 0, return first element
          element = element[0]
        } else {
          for (let i = 0; i <= element.length; i++) {
            if (index - 1 === i) {
              element = element[i]
              break
            }
          }
        }
      }

      if (callback) callback({ self: element, helpers, index, state })

      return $
    }

    /**
     * Selects element at index n of all its available siblings
     *
     * @param {Number} n
     * @param {Function | undefined} callback
     * @returns Instance of curry for function chaining
     */

    $.nthChild = (n, callback) => {
      if (!element) return $

      if (isNodeMap(element)) {
        if (element.length === 1) {
          element = element[0]
        } else {
          throw Error(
            "Cannot use function $.next() on a HTMLCollection. Wrap your functionality in the $.each() iterator."
          )
        }
      }

      if (n > element.children.length) {
        // throw Error(`No child found for index '${n}'`)
        return undefined
      }

      if (!n || n === 1) {
        // Select the first child
        element = element.firstElementChild
      }

      if (element.children && n > 1) {
        map(element.children, (child, index) => {
          if (n - 1 === index) {
            element = child
          }
        })
      }

      if (callback) callback({ self: element, helpers, index: n, state })

      return $
    }

    /**
     * Returns the children of selected element
     *
     * @param {Function | undefined} callback
     * @returns Instance of curry for function chaining
     */

    $.children = (callback) => {
      if (!element) return undefined

      if (isNodeMap(element)) {
        if (element.length === 1) {
          element = element[0]
        } else {
          throw Error(
            "Cannot use function $.children() on a HTMLCollection. Wrap your functionality in the $.each() iterator."
          )
        }
      }

      if (element.children.length === 0) return undefined

      // Save current element before its overriden by the selected children
      const self = element
      element = element.children

      if (callback)
        callback({ self, children: element.children, helpers, state })

      return $
    }

    /**
     * Selects the next or next nth child if available
     *
     * @param {Number | Function} index
     * @param {Function | undefined} callback
     *
     * @returns Instance of curry for function chaining
     */

    $.next = (index, callback) => {
      return selectNTHSibling("next", index, callback)
    }

    $.prev = (index, callback) => {
      return selectNTHSibling("prev", index, callback)
    }

    const selectNTHSibling = (selectType, index, callback) => {
      if (!element) return $

      const type =
        selectType === "next" ? "nextElementSibling" : "previousElementSibling"

      if (isNodeMap(element)) {
        if (element.length === 1) {
          element = element[0]
        } else {
          throw Error(
            "Cannot use function $.next() on a HTMLCollection. Wrap your functionality in the $.each() iterator."
          )
        }
      }

      // If callback has been provided but index hasn't
      if (typeof index !== "number") {
        callback = index
        index = null
      }

      if (element[type]) {
        // If index is provided
        if (index) {
          const prev = element
          // Loop over next children and find element at index
          for (let i = 0; i < index; i++) {
            if (element[type]) {
              element = element[type]
            }
          }

          // Callback
          if (callback) {
            callback({
              self: element,
              prev,
              index: getSiblingIndex(element),
              helpers,
              state,
            })
          }
        } else {
          // otherwise just select the next item
          if (callback) {
            callback({
              self: element[type],
              prev: element,
              index: getSiblingIndex(element[type]),
              helpers,
              state,
            })
          }

          element = element[type]
        }
      } else {
        element = undefined

        return $
      }

      return $
    }

    /**
     * Selects the first element in the
     *
     * @param {Function} (Optional) callback
     * @returns Instance of curry for function chaining
     */

    $.first = (callback) => {
      if (!element) return $

      if (isNodeMap(element)) {
        element = element[0]
      }

      if (callback) callback({ self: element, helpers, state })

      return $
    }

    $.last = (callback) => {
      if (!element) return $

      let index = 0

      if (isNodeMap(element)) {
        index = element.length - 1
        element = element[index]
      }

      if (callback) callback({ self: element, helpers, index, state })

      return $
    }

    /**
     * Appends html to the selected element(s)
     *
     * @param {String | Function} callback
     * @returns Instance of curry for function chaining
     */

    $.append = (callback) => {
      if (!element) return $

      const vdom =
        typeof callback === "function"
          ? callback({ self: element, render, helpers, state })
          : callback

      // If callback is a string, we just render a new html template
      if (typeof vdom === "string") {
        if (isNodeMap(element)) {
          for (const el of element) {
            el.insertAdjacentHTML("afterend", vdom)
          }
        } else {
          element.insertAdjacentHTML("afterend", vdom)
        }
      } else if (!isNil(vdom)) {
        if (isNodeMap(element)) {
          map(element, (node) => createElement(vdom, node, "append"))
        } else {
          createElement(vdom, element, "append")
        }
      }

      return $
    }

    /**
     * Prepends html to the selected element(s)
     *
     * @param {String | Function} callback
     * @returns Instance of curry for function chaining
     */

    $.prepend = (callback) => {
      if (!element) return $

      const vdom =
        typeof callback === "function"
          ? callback({ self: element, render, helpers, state })
          : callback

      // If callback is a string, we just render a new html template
      if (typeof vdom === "string") {
        if (isNodeMap(element)) {
          for (const el of element) {
            el.insertAdjacentHTML("beforebegin", vdom)
          }
        } else {
          element.insertAdjacentHTML("beforebegin", vdom)
        }
      } else if (!isNil(vdom)) {
        if (isNodeMap(element)) {
          map(element, (node) => createElement(vdom, node, "prepend"))
        } else {
          createElement(vdom, element, "prepend")
        }
      }

      return $
    }

    /**
     * Prepends / Appends new child node(s)
     *
     * @param {Function} callback
     * @param {Boolean} append
     * @returns Instance of curry for function chaining
     */

    $.addChild = (callback, append = true) => {
      if (!element) return $

      const vdom =
        typeof callback === "function"
          ? callback({ self: element, render, helpers, state })
          : callback

      if (typeof vdom === "string") {
        if (isNodeMap(element)) {
          map(element, (node) =>
            node.insertAdjacentHTML(append ? "beforeend" : "afterbegin", vdom)
          )
        } else {
          element.insertAdjacentHTML(append ? "beforeend" : "afterbegin", vdom)
        }
      } else if (!isNil(vdom)) {
        if (isNodeMap(element)) {
          map(element, (node) => {
            createElement(vdom, node, append ? "appendchild" : "prependchild")
          })
        } else {
          createElement(vdom, element, append ? "appendchild" : "prependchild")
        }
      }

      return $
    }

    /**
     * Replaces or adds text content to the selected element(s)
     *
     * @param {String} text
     * @param {String} ['replace', 'prepend', 'append'] location
     * @returns Instance of curry for function chaining
     */

    $.text = (text, location = "replace") => {
      if (!element) return $

      // Invalid location argument
      if (!["replace", "prepend", "append"].includes(location)) {
        console.warn(
          `Function $.text(text, location) doesn't accept parameter "${location}" as a valid argument.`,
          "Please use 'replace', 'prepend' or 'append'"
        )

        return $
      }

      const setText = (el, text, location) => {
        switch (location) {
          case "prepend": {
            el.insertAdjacentText("afterbegin", text)
            break
          }
          case "append": {
            el.insertAdjacentText("beforeend", text)
            break
          }
          default:
          case "replace": {
            el.textContent = text
            break
          }
        }
      }

      if (isNodeMap(element)) {
        map(element, (node) => setText(node, text, location))
      } else {
        setText(element, text, location)
      }

      return $
    }

    /**
     * Adds, removes toggles inline 'display' property of the selected element(s)
     */

    $.show = (display = "block") => {
      if (!element) return $

      if (!validDisplayValues.includes(display)) {
        console.warn(
          `Function $.show(displayValue) doesn't accept parameter "${display}" as a valid argument.`,
          "Please use the correct css property value."
        )

        return $
      }

      if (isNodeMap(element)) {
        for (const el of element) {
          el.style.display = display
        }
      } else {
        element.style.display = display
      }

      return $
    }

    $.hide = () => {
      if (!element) return $

      if (isNodeMap(element)) {
        for (const el of element) {
          el.style.display = "none"
        }
      } else {
        element.style.display = "none"
      }

      return $
    }

    $.toggle = (onActive = "block") => {
      if (!element) return $

      if (!validDisplayValues.includes(onActive)) {
        console.warn(
          `Function $.toggle(onActive) doesn't accept parameter "${onActive}" as a valid argument.`,
          "Please use the correct css property value."
        )

        return $
      }

      const isActive =
        getStyleProperty(
          isNodeMap(element) ? element[0] : element,
          "display"
        ) === "none"
          ? false
          : true

      const toggleSelf = (active, element, onActive) => {
        if (active) {
          $(element).hide()
        } else {
          $(element).show(onActive)
        }
      }

      if (isNodeMap(element)) {
        for (const el of element) {
          toggleSelf(isActive, el, onActive)
        }
      } else {
        toggleSelf(isActive, element, onActive)
      }

      return $
    }

    /**
     * Shorthand for $(selecor).on('mouseenter') and $(selector).on('mouselave')
     *
     * Takes in an object with enter and leave functions, if leave function is not present,
     * it resets the element to the previous state
     *
     * TODO: If leave function is ommited, figure out how to restore it to its pre enter() value
     */

    // let previousState

    $.hover = (functions) => {
      if (!element) return $

      const { enter, leave, options } = functions

      if (!enter || !leave)
        throw Error("Function $.hover({enter, leave}) is missing a parameter.")

      if (isNodeMap(element)) {
        for (const el of element) {
          $(el).on("mouseenter", (args) => enter({ ...args }), options)
          $(el).on("mouseleave", (args) => leave({ ...args }), options)
        }
      } else {
        $(element).on("mouseenter", (args) => enter({ ...args }), options)
        $(element).on("mouseleave", (args) => leave({ ...args }), options)
        // $(element).on("mouseenter", (args) => {
        //   previousState = element.cloneNode(true)
        //   enter({ ...args })
        // })

        // $(element).on("mouseleave", (args) => {
        //   if (leave) {
        //     leave({ ...args })
        //   } else {
        //     element.replaceNode(previousState)

        //     console.log("h")
        //     $(element).hover(callback)
        //   }
        // })
      }

      return $
    }

    /**
     * Shorthand for attaching an $.on('click') event listener
     *
     * @param {Function} callback
     * @returns Instance of curry for function chaining
     */

    $.click = (callback, options) => {
      if (!element || !callback) return $

      if (isNodeMap(element)) {
        map(element, (node) => {
          $(node).on("click", (args) => callback({ ...args }), options)
        })
      } else {
        $(element).on("click", (args) => callback({ ...args }), options)
      }

      return $
    }

    /**
     * Select parent node of each selected element(s)
     *
     * @param {Function} callback Optional
     * @returns Instance of curry for function chaining
     */

    $.parent = (callback) => {
      if (!element) return

      if (isNodeMap(element)) {
        // Create a new HTMLCollection
        const fragment = document.createDocumentFragment()

        map(element, (node) => {
          if (node && node.parentNode) {
            const parent = node.parentNode

            if (callback)
              callback({ self: parent, child: node, helpers, state })

            // Clone parent node to the HTMLCollection
            fragment.appendChild(parent.cloneNode(true))
          }
        })

        // Set all found parents as the new selected element
        element = fragment.children
      } else {
        if (element && element.parentNode) {
          const parent = element.parentNode

          if (callback)
            callback({ self: parent, child: element, helpers, state })

          element = parent
        }
      }

      return $
    }

    /**
     * Executes a callback function only once even if element is a HTMLCollection
     *
     * @param {Function} callback
     * @returns Instance of curry for function chaining
     */

    $.exe = (callback) => {
      if (!element || !callback) return $

      callback({ self: element, helpers, state })

      return $
    }

    $.asyncExe = async (callback) => {
      if (!element || !callback) return $

      await new Promise((resolve, reject) => {
        callback({ self: element, helpers, next: resolve, reject, state })
      })

      return $
    }

    /**
     * Iterates over a HTMLCollection and removes those which do not fit the condition
     *
     * @param {*} callback
     */
    $.filter = (callback) => {
      if (!element) return $

      if (!callback)
        console.warn(
          "No condition to iterate on, this chain node will be skipped."
        )

      if (isNodeMap(element)) {
        // Create a new HTMLCollection
        const filtered = []

        map(element, (node, index) => {
          const result = callback({ self: node, index, helpers, state })

          if (result) {
            filtered.push(node)
          }
        })

        // Set all found parents as the new selected element
        element = filtered
      } else {
        const result = callback({ self: element, helpers, state, index: 0 })

        if (!result) element = undefined
      }

      return $
    }

    /**
     * Applies animation to selected element(s) with provided CSS property object
     *
     * @param {Object} properties
     * @param {Object} Options
     * @returns
     */

    $.animate = (
      properties,
      {
        length = 500,
        easing = "ease-in-out",
        callback,
        defaultUnit = "px",
      } = {}
    ) => {
      if (!element || !properties) return $

      const applyAnimation = (el) => {
        const inSeconds = length / 1000
        const prevTransition = el.style.transition

        el.style.transition = `${inSeconds}s all ${easing} `

        new Promise((resolve) => {
          // Apply styling
          Object.entries(properties).map(([index, value]) => {
            const property = index

            // Assign default unit
            if (typeof value === "number") {
              value = value + defaultUnit
            }

            el.style[property] = value
          })

          setTimeout(() => resolve(), length)
        }).then(() => {
          // Reapply previous transition property
          el.style.transition = prevTransition

          if (callback) callback({ self: el, helpers, state })
        })
      }

      if (isNodeMap(element)) {
        map(element, (node) => applyAnimation(node))
      } else {
        applyAnimation(element)
      }

      return $
    }

    return $
  }

  return $
})
