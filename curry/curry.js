"use strict"

/**
 *
 * Helpers & Utilities
 *
 */

function getStyleProperty(el, property) {
  return window.getComputedStyle(el, null).getPropertyValue(property)
}

function noop(a, b, c) {
  /* NO OPERATION */
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

function render(tag, props, children) {
  // We can omit prps when calling the function
  if (
    typeof props === "string" ||
    typeof props === "number" ||
    Array.isArray(props)
  ) {
    children = props
    props = {}
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
    props,
    children,
  }
}

function createElement(vnode, container, where = "child") {
  if (isArray(vnode)) {
    vnode.map((node) => createElement(node, container, where))
    return
  }

  // We assign it to vnode.el to also compare when we use the patch function
  const el = (vnode.el = document.createElement(vnode.tag))

  // Props
  if (vnode.props) {
    for (const key in vnode.props) {
      let value = vnode.props[key]
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
    case "child":
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
}

const validSelectors = [".", "#", "[", ":"]

function selectoDomElement(selector) {
  if (isObject(selector) && selector.selectedBy) return selector

  let el, prefix
  let element = selector

  if (validSelectors.includes(selector.charAt(0))) {
    element = selector.substring(1)
    prefix = selector.charAt(0)
  }

  switch (prefix) {
    // Class name selector
    case ".": {
      el = document.getElementsByClassName(element)
      break
    }
    // ID selector
    case "#": {
      el = document.getElementById(element)
      break
    }
    // Attribute selector
    case "[": {
    }
    // Index / nth selector
    case ":": {
    }

    // Element Selector
    default: {
      el = document.getElementsByTagName(element)
      break
    }
  }

  if (!el) throw Error(`Selected '${selector}' element doesn't exist`)

  if (el.length !== undefined) {
    for (const element of el) {
      element.selectedBy = selector
    }
  } else if (el) {
    el.selectedBy = selector
  }

  return el
}

/*----------  ----------*/

/**
 *
 * fetch API helpers
 *
 */

const api = {
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

  let element

  /**
   *
   * @param {String} selector Selects an existing element in the DOM
   * @returns Instance of curry for function chaining
   *
   * The selector currently accepts this syntax:
   * `.test`  Class selector
   * `#id`    Id selector
   * `h1`     Native HTML elemenets
   */

  const $ = (selector) => {
    if (!selector) throw Error("Selector must contain a string.")

    element = selectoDomElement(selector)

    /**
     *
     * @returns HTML node(s) of the selected element
     */

    $.get = () => {
      if (!element || element.length === 0) return undefined
      if (element.length === 1) return element[0]

      return element
    }

    /**
     * Delets selected element(s)
     */

    $.del = () => {
      if (!element) return

      // Only 1 element selected
      if (element.length === undefined) {
        element.remove()
      }

      for (const el of element) {
        el.remove()
      }
    }

    /**
     * This chained function attaches an event listener to the selected element.
     * Then executes provided callback when event is triggered.
     *
     * @param {String} event        Event name
     * @param {String} which        Optional selector
     * @param {Function} callback   Function to execute when event is triggered
     */

    $.on = (event, callback) => {
      if (!element) return $

      const bindListener = (item) => {
        item.addEventListener(event, (e) => {
          callback({
            event: e,
            e: e,
            self: item,
            helpers,
          })
        })
      }

      // Is HTML collection
      if (element.length !== undefined) {
        for (const item of element) {
          bindListener(item)
        }
      } else {
        bindListener(element)
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

    $.togClass = (classNames) => {
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
        callback({ self: element, helpers, index: 0 })
      } else {
        let prev = null
        let index = 0

        for (const el of element) {
          callback({ self: el, prev, helpers, index })
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
        callback({ self: element, helpers, index: 0 })
      } else {
        let prev = null
        let index = 0

        for (const el of element) {
          await new Promise((resolve) =>
            callback({ self: el, prev, helpers, index, next: resolve })
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
     * @returns Instance of curry for function chaining
     */

    $.index = (index) => {
      if (!element) return

      // If element doesn't have length, we assume there is just
      // one element and the index function gets ignored
      if (element.length !== undefined) {
        // If index exceeds the element list length,
        // automatically clear selection and break the chain
        if (index + 1 > element.length) {
          element = undefined
          return $
        }

        if (isNil(index) || index === 0) {
          // If index is not set or is 0, return first element
          element = element[0]
        } else {
          for (let i = 0; i <= element.length; i++) {
            if (index === i) {
              element = element[i]
              break
            }
          }
        }
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
      if (!element) return

      if (element.length !== undefined) {
        element = element[0]
      }

      if (callback) callback({ self: element, helpers })

      return $
    }

    $.last = (callback) => {
      if (!element) return

      let index = 0

      if (element.length !== undefined) {
        index = element.length - 1
        element = element[index]
      }

      if (callback) callback({ self: element, helpers, index })

      return $
    }

    /**
     * Appends html to the selected element(s)
     *
     * @param {String | Function} callback
     * @returns Instance of curry for function chaining
     */
    $.append = (callback) => {
      if (!element) return

      // If callback is a string, we just render a new html template
      if (typeof callback === "string") {
        if (element.length !== undefined) {
          for (const el of element) {
            el.insertAdjacentHTML("afterend", callback)
          }
        } else {
          element.insertAdjacentHTML("afterend", callback)
        }

        return $
      }

      const vdom = callback({ self: element, render, helpers })

      if (!isNil(vdom)) {
        if (element.length === undefined) {
          createElement(vdom, element, "append")
        } else {
          for (const el of element) {
            createElement(vdom, el, "append")
          }
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
      if (!element) return

      // If callback is a string, we just render a new html template
      if (typeof callback === "string") {
        if (element.length !== undefined) {
          for (const el of element) {
            el.insertAdjacentHTML("beforebegin", callback)
          }
        } else {
          element.insertAdjacentHTML("beforebegin", callback)
        }

        return $
      }

      const vdom = callback({ self: element, render, helpers })

      if (!isNil(vdom)) {
        if (element.length === undefined) {
          createElement(vdom, element, "prepend")
        } else {
          for (const el of element) {
            createElement(vdom, el, "prepend")
          }
        }
      }

      return $
    }

    return $
  }

  return $
})
