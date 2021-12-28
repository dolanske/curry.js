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

// Helpers object that gets exposed in callback functions

const helpers = {
  getStyleProperty,
  isObject,
  isArray,
  isNil,
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

    // TODO: should join selector by space and expand selectability for nested elements
    element = selectoDomElement(selector)

    /**
     * This chained function attaches an event listener to the selected element.
     * Then executes provided callback when event is triggered.
     *
     * @param {String} event        Event name
     * @param {String} which        Optional selector
     * @param {Function} callback   Function to execute when event is triggered
     */

    $.on = (event, callback) => {
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
     *
     * @returns HTML node(s) of the selected element
     */

    $.get = () => {
      if (!element || element.length === 0) return undefined
      if (element.length === 1) return element[0]

      return element
    }

    /**
     * Function takes in styles which are then applied to the selected element.
     * Offers 2 different syntaxes
     *
     * css('backgroundColor', 'red')
     * css({
     *  backgroundColor: 'red'
     * })
     *
     * @param {String | Object} property
     * @param {String | undefined} style
     */

    $.css = (property, style) => {
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
     * addClass('class')
     * addClass(['class1', 'class2'])
     *
     * @param {String | Array} classNames
     * @returns If action was successful
     */

    $.addClass = (classNames) => {
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

    return $
  }

  return $
})
