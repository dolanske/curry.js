"use strict"

/**
 *
 * Helpers & Utilities
 *
 */

function getStyleProperty(el, property) {
  return window.getComputedStyle(el, null).getPropertyValue(property)
}

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

function undef(property, def) {
  return isNil(property) ? def : property
}

function bez(...args) {
  // In case a pre-selected bezoar is requested
  if (typeof args[0] === "string" && args.length === 1) {
    const bezoars = {
      easeInSine: [0.12, 0, 0.39, 0],
      easeOutSine: [0.61, 1, 0.88, 1],
      easeInOutSine: [0.37, 0, 0.63, 1],
      easeInCubic: [0.32, 0, 0.67, 0],
      easeOutCubic: [0.33, 1, 0.68, 1],
      easeInOutCubic: [0.65, 0, 0.35, 1],
      easeInQuint: [0.64, 0, 0.78, 0],
      easeOutQuint: [0.22, 1, 0.36, 1],
      easeInOutQuint: [0.83, 0, 0.17, 1],
      easeInCirc: [0.55, 0, 1, 0.45],
      easeOutCirc: [0, 0.55, 0.45, 1],
      easeInOutCirc: [0.85, 0, 0.15, 1],
      easeInQuad: [0.11, 0, 0.5, 0],
      easeOutQuad: [0.5, 1, 0.89, 1],
      easeInOutQuad: [0.45, 0, 0.55, 1],
      easeInQuart: [0.5, 0, 0.75, 0],
      easeOutQuart: [0.25, 1, 0.5, 1],
      easeInOutQuart: [0.76, 0, 0.24, 1],
      easeInExpo: [0.7, 0, 0.84, 0],
      easeOutExpo: [0.16, 1, 0.3, 1],
      easeInOutExpo: [0.87, 0, 0.13, 1],
      easeInBack: [0.36, 0, 0.66, -0.56],
      easeOutBack: [0.34, 1.56, 0.64, 1],
      easeInOutBack: [0.68, -0.6, 0.32, 1.6],
    }

    const bez = args[0]

    if (bezoars[bez]) {
      return `cubic-bezier(${bezoars[bez].join(",")})`
    } else {
      throw Error(`Selected easing function "${bez}" doesn't exist.`)
    }
  }

  const format = args.map((item) => Math.max(Math.min(item, 1), 0))
  return `cubic-bezier(${format.join(",")})`
}

function bindListener(el, name, callback, $state, options) {
  el.addEventListener(
    name,
    (e) => {
      callback({
        event: e,
        e: e,
        self: el,
        $util,
        $state,
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
      const shouldBreak = callback(elements[i], i)

      if (shouldBreak) {
        break
      }
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

const $util = {
  getStyleProperty,
  isObject,
  isArray,
  isNil,
  from,
  render,
  isElements: isNodeMap,
  mapElements: map,
  getSiblingIndex,
  undef,
  bez,
}

function queryElement(selector) {
  if (isObject(selector) || selector.nodeType) return [selector]

  return document.querySelectorAll(selector)
}

/*------------------------------------------*/

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
  // let element
  const $state = {}

  /**
   *
   * @param {String} selector Selects an existing element in the DOM
   * @returns Instance of curry for function chaining
   *
   */

  const $ = (selector) => {
    let element
    if (!selector) throw Error("Selector cannot be empty.")

    if (typeof selector === "string" && selector.startsWith("$")) {
      // Special selectors start with $
      switch (selector) {
        case "$state": {
          return $state
        }
        case "$util": {
          return $util
        }
        default:
          // console.warn("Unsupported magic selector.")
          throw Error("Unsupported magic selector.")
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

      map(element, (node) => node.remove())
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
      if (!element || element.length === 0) return $

      map(element, (node) => {
        bindListener(node, event, callback, $state, options)
      })

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
      if (!element || element.length === 0) return $

      if (!property) {
        console.warn("No style entered")
        return false
      }

      // If property && style are a string, it's a singular style addition
      if (typeof property === "string" && typeof style === "string") {
        map(element, (node) => (node.style[property] = style))
        return true
      }
      // If property is an object and style is undefined, we assign inline style
      else if (isObject(property)) {
        Object.entries(property).map(([key, value]) => {
          map(element, (node) => (node.style[key] = value))
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
      if (!element || element.length === 0) return $

      if (!classNames || classNames.length === 0) {
        console.warn("No class name(s) entered")
        return false
      }

      if (isArray(classNames)) {
        map(element, (node) => {
          classNames.map((item) => node.classList.add(item))
        })
        return $
      }

      if (typeof classNames === "string") {
        map(element, (node) => {
          node.classList.add(classNames)
        })

        return $
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
      if (!element || element.length === 0) return $

      if (!classNames || classNames.length === 0) {
        console.warn("No class name(s) entered")
        return false
      }

      if (isArray(classNames)) {
        map(element, (node) => {
          classNames.map((item) => node.classList.remove(item))
        })
        return $
      }

      if (typeof classNames === "string") {
        map(element, (node) => {
          node.classList.remove(classNames)
        })

        return $
      }
    }

    /**
     * Toggles between the class(es) of the selected element(s)
     *
     * @param {String | Array} classNames
     * @returns If action was successful
     */

    $.toggleClass = (classNames) => {
      if (!element || element.length === 0) return $

      if (!classNames || classNames.length === 0) {
        console.warn("No class name(s) entered")
        return false
      }

      const toggle = (cls, el) => {
        if (el.classList.contains(cls)) {
          el.classList.remove(cls)
        } else {
          el.classList.add(cls)
        }
      }

      if (isArray(classNames)) {
        map(element, (node) => {
          classNames.map((cls) => toggle(cls, node))
        })
        return $
      }

      if (typeof classNames === "string") {
        map(element, (node) => {
          toggle(classNames, node)
        })
      }
    }

    /**
     * Iterates over provided HTML node list with a callback function.
     *
     * @param {Function} callback Function which executes on each iteration
     * @returns Instance of curry for function chaining
     */

    $.each = (callback) => {
      if (!element || element.length === 0) return $

      if (!callback) throw Error("Callback must be a function")

      let prev = null

      map(element, (node, index) => {
        callback({ self: node, prev, $util, index, $state })
        prev = node
      })

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

    $.asyncEach = async (callback) => {
      if (!element || element.length === 0) return $

      if (!callback) throw Error("Callback must be a function")

      let prev = null
      let index = 0

      for (const el of element) {
        await new Promise((resolve) =>
          callback({
            self: el,
            prev,
            $util,
            index,
            next: resolve,
            $state,
          })
        )

        prev = el
        index += 1
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
      if (!element || element.length === 0) return $

      // If index exceeds the element list length,
      // automatically clear selection and break the chain
      if (index > element.length) {
        console.warn(
          `[Warning] Did not find element at specified index (${n}).`
        )
        return $
      }

      if (!index || index === 1) {
        // If index is not set or is 0, return first element
        element = [element[0]]
      } else {
        for (let i = 0; i <= element.length; i++) {
          if (index - 1 === i) {
            element = [element[i]]
            break
          }
        }
      }

      if (callback) {
        callback({ self: element[0], $util, index, $state })
      }

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
      if (!element || element.length === 0) return $

      // Save each child and execute callback on it
      const children = []

      console.log(element)

      // Loop over selected elements
      map(element, (node) => {
        // Index exceeds the children length
        if (n > node.children.length) {
          console.warn(
            `[Warning] Did not find element's child at specified index (${n}).`
          )
          return true // break;
        }

        // Select the first child
        if (!n || n === 1) {
          children.push(node.firstElementChild)
        } else {
          // Loop over each element's child
          map(node.children, (child, index) => {
            if (n - 1 === index) {
              children.push(child)
            }
          })
        }
      })

      children.map((child) => {
        callback({ self: child, $util, $state })
      })

      // if (callback) callback({ self: element, $util, $state })

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
        callback({ self, children: element.children, $util, $state })

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
      if (!element || element.length === 0) return $

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
              $util,
              $state,
            })
          }
        } else {
          // otherwise just select the next item
          if (callback) {
            callback({
              self: element[type],
              prev: element,
              index: getSiblingIndex(element[type]),
              $util,
              $state,
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
      if (!element || element.length === 0) return $

      if (isNodeMap(element)) {
        element = element[0]
      }

      if (callback) callback({ self: element, $util, $state })

      return $
    }

    $.last = (callback) => {
      if (!element || element.length === 0) return $

      let index = 0

      if (isNodeMap(element)) {
        index = element.length - 1
        element = element[index]
      }

      if (callback) callback({ self: element, $util, index, $state })

      return $
    }

    /**
     * Appends html to the selected element(s)
     *
     * @param {String | Function} callback
     * @returns Instance of curry for function chaining
     */

    $.append = (callback) => {
      if (!element || element.length === 0) return $

      const vdom =
        typeof callback === "function"
          ? callback({ self: element, render, $util, $state })
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
      if (!element || element.length === 0) return $

      const vdom =
        typeof callback === "function"
          ? callback({ self: element, render, $util, $state })
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
      if (!element || element.length === 0) return $

      const vdom =
        typeof callback === "function"
          ? callback({ self: element, render, $util, $state })
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
      if (!element || element.length === 0) return $

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
      if (!element || element.length === 0) return $

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
      if (!element || element.length === 0) return $

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
      if (!element || element.length === 0) return $

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
      if (!element || element.length === 0) return $

      const { enter, leave, options } = functions

      if (!enter || !leave)
        throw Error(
          "Function $.hover({ enter, leave }) requires both parameters."
        )

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
              callback({
                self: parent,
                child: node,
                $util,
                $state,
              })

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
            callback({
              self: parent,
              child: element,
              $util,
              $state,
            })

          element = parent
        }
      }

      return $
    }

    /**
     * Iterates over a HTMLCollection and removes those which do not fit the condition
     *
     * @param {*} callback
     * @returns Instance of curry for function chaining
     */

    $.filter = (callback) => {
      if (!element || element.length === 0) return $

      if (!callback)
        console.warn(
          "No condition to iterate on, this chain node will be skipped."
        )

      if (isNodeMap(element)) {
        // Create a new HTMLCollection
        const filtered = []

        map(element, (node, index) => {
          const result = callback({
            self: node,
            index,
            $util,
            $state,
          })

          if (result) {
            filtered.push(node)
          }
        })

        // Set all found parents as the new selected element
        element = filtered
      } else {
        const result = callback({
          self: element,
          $util,
          $state,
          index: 0,
        })

        if (!result) element = undefined
      }

      return $
    }

    /**
     * Applies animation to selected element(s) with provided CSS property object
     *
     * @param {Object} properties
     * @param {Object} options
     * @returns Instance of curry for function chaining
     */

    $.animate = async (properties, options) => {
      if (!element || !properties) return $

      const formatOptions = (options = {}) => {
        return {
          length: undef(options.length, 500),
          easing: undef(options.easing, "ease-in-out"),
          callback: options.callback,
          defaultUnit: undef(options.defaultUnit, "px"),
        }
      }

      options = formatOptions(options)

      if (typeof properties === "function") {
        // Using the function callback
        const execute = properties

        async function start(properties, options) {
          options = formatOptions(options)

          if (isNodeMap(element)) {
            const promises = []

            for (const el of element) {
              promises.push(applyAnimation(el, properties, options))
            }

            return Promise.all(promises)
          } else {
            return applyAnimation(element, properties, options)
          }
        }

        await execute({ self: element, $util, start, $state })
      } else {
        // Properties is an object
        if (isNodeMap(element)) {
          map(element, (node) => applyAnimation(node, properties, options))
        } else {
          applyAnimation(element, properties, options)
        }
      }

      return $
    }

    const applyAnimation = async (el, properties, options) => {
      const { length, easing, callback, defaultUnit } = options
      const prevTransition = el.style.transition
      let duration = length

      if (typeof length === "string" && length.endsWith("s")) {
        duration = parseFloat(length.slice(0, -1)) * 1000
      }

      el.style.transition = `${duration / 1000}s all ${easing}`

      return new Promise((resolve) => {
        // Apply styling for each property
        Object.entries(properties).map(([index, value]) => {
          const property = index

          // Assign default unit
          if (typeof value === "number") {
            value = value + defaultUnit
          }

          el.style[property] = value
        })

        setTimeout(() => resolve(), duration)
      }).then(() => {
        // Reapply previous transition property
        el.style.transition = prevTransition

        if (callback) callback({ self: el, $util, $state })
      })
    }

    /**
     * Takes a hidden element and applies a roll-down animation
     *
     * @param {String | Number} duration
     * @param {String} easing
     * @returns Instance of curry for function chaining
     */

    $.slideDown = (duration = 500, easing = "ease-in-out") => {
      if (!element || element.length === 0) return $

      const sd = (el) => {
        // Set default pre-style values
        el.style.display = "block"
        el.style.overflow = "hidden"
        el.style.height = 0

        // Save transition and height
        const height = el.scrollHeight

        $(el).animate(
          { height },
          {
            duration,
            easing,
            callback: ({ self }) => {
              self.style.overflow = "inherit"
              self.style.height = "inherit"
            },
          }
        )
      }

      if (isNodeMap(element)) {
        map(element, (node) => sd(node))
      } else {
        sd(element)
      }

      return $
    }

    /**
     * Rolls element up and hiding it
     *
     * @param {String | Number} duration
     * @param {String} easing
     * @returns Instance of curry for function chaining
     */

    $.slideUp = (duration = 500, easing = "ease-in-out") => {
      if (!element || element.length === 0) return $

      const su = (el) => {
        el.style.overflow = "hidden"
        el.style.height = el.scrollHeight

        setTimeout(() => {
          $(el).animate(
            { height: 0 },
            {
              duration,
              easing,
              callback: ({ self }) => {
                self.style.display = "none"
              },
            }
          )
        }, 1)
      }

      if (isNodeMap(element)) {
        map(element, (node) => su(node))
      } else {
        su(element)
      }

      return $
    }

    /**
     * Toggles between slideDown() & slideUp()
     *
     * @param {String | Number} duration
     * @param {String} easing
     * @returns Instance of curry for function chaining
     */

    $.slideToggle = (duration = 500, easing = "ease-in-out") => {
      if (!element || element.length === 0) return $

      const st = (el) => {
        if (el.style.display === "none") {
          $(el).slideDown(duration, easing)
        } else {
          $(el).slideUp(duration, easing)
        }
      }

      if (isNodeMap(element)) {
        map(element, (node) => st(node))
      } else {
        st(element)
      }

      return $
    }

    // $.is = (what, callback) => {}

    return $
  }

  return $
})