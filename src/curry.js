"use strict"

/**
 *
 * Helpers & Utilities
 *
 */

function noop() {}

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

function isFunction(func) {
  return Object.prototype.toString.call(func) == "[object Function]"
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

const formatAnimationOptions = (options = {}) => {
  return {
    length: undef(options.length, 500),
    easing: undef(options.easing, "ease-in-out"),
    callback: options.callback,
    // defaultUnit: undef(options.defaultUnit, "px"),
  }
}

// Helpers object that gets exposed in callback functions

const $util = {
  getStyleProperty,
  isObject,
  isArray,
  isNil,
  isFunction,
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
          map(element, (node) => {
            if (node[property]) params.push(node[property])
          })

          return params
        }
      }

      return element
    }

    /**
     * Delets selected element(s)
     */

    $.del = () => {
      if (!element) return

      map(element, (node) => {
        node.remove()
      })
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
        console.warn(
          "[$.css] No style entered, this chain node will be skipped."
        )
        return $
      }

      // If property && style are a string, it's a singular style addition
      if (typeof property === "string" && typeof style === "string") {
        map(element, (node) => {
          node.style[property] = style
        })
        return true
      }
      // If property is an object and style is undefined, we assign inline style
      else if (isObject(property)) {
        Object.entries(property).map(([key, value]) => {
          map(element, (node) => {
            node.style[key] = value
          })
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
        console.warn(
          "[$.addClass] No class name(s) entered, this chain node will be skipped."
        )
        return $
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
        console.warn(
          "[$.delClass] No class name(s) entered, this chain node will be skipped."
        )
        return $
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
        console.warn(
          "[$.toggleClass] No class name(s) entered, this chain node will be skipped."
        )
        return $
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
        console.warn(`[$.nth] Did not find element at specified index (${n}).`)
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

      // Loop over selected elements
      map(element, (node) => {
        // Index exceeds the children length
        if (n > node.children.length) {
          console.warn(
            `[$.nthChild] Did not find element's child at specified index (${n}).`
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
        if (callback) callback({ self: child, $util, $state })
      })

      element = children

      return $
    }

    /**
     * Returns the children of selected element
     *
     * @param {Function | undefined} callback
     * @returns Instance of curry for function chaining
     */

    $.children = (callback) => {
      if (!element || element.length === 0) return $

      const children = []

      map(element, (node) => {
        children.push(...node.children)

        if (callback) {
          callback({ self: node, children: node.children, $util, $state })
        }
      })

      element = children

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

      const siblingPlace =
        selectType === "next" ? "nextElementSibling" : "previousElementSibling"

      // If callback has been provided but index hasn't
      if (typeof index !== "number") {
        callback = index
        index = null
      }

      const matches = []

      map(element, (node) => {
        if (node[siblingPlace]) {
          // If index is provided
          if (index) {
            const prev = node
            // Loop over next children and find element at index
            for (let i = 0; i < index; i++) {
              if (node[siblingPlace]) {
                matches.push(node[siblingPlace])
                break
              }
            }

            // Callback
            if (callback) {
              callback({ self: node, prev, index: getSiblingIndex(node), $util, $state, }) //prettier-ignore
            }
          } else {
            // otherwise just select the next item
            if (callback) {
              callback({ self: node[siblingPlace], prev: node, index: getSiblingIndex(node[siblingPlace]), $util, $state, }) //prettier-ignore
            }

            matches.push(node[siblingPlace])
          }
        }
      })

      element = matches

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

      element = [element[0]]

      if (callback) callback({ self: element, $util, $state })

      return $
    }

    $.last = (callback) => {
      if (!element || element.length === 0) return $

      const index = element.length - 1
      element = [element[index]]

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

      map(element, (node) => {
        const vdom =
          typeof callback === "function"
            ? callback({ self: node, render, $util, $state })
            : callback

        if (typeof vdom === "string") {
          node.insertAdjacentHTML("afterend", vdom)
        } else if (!isNil(vdom)) {
          createElement(vdom, node, "append")
        }
      })

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

      map(element, (node) => {
        const vdom =
          typeof callback === "function"
            ? callback({ self: node, render, $util, $state })
            : callback

        if (typeof vdom === "string") {
          node.insertAdjacentHTML("beforebegin", vdom)
        } else if (!isNil(vdom)) {
          createElement(vdom, node, "prepend")
        }
      })

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

      map(element, (node) => {
        const vdom =
          typeof callback === "function"
            ? callback({ self: element, render, $util, $state })
            : callback

        if (typeof vdom === "string") {
          node.insertAdjacentHTML(append ? "beforeend" : "afterbegin", vdom)
        } else if (!isNil(vdom)) {
          createElement(vdom, node, append ? "appendchild" : "prependchild")
        }
      })

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
      if (
        !["replace", "prepend", "append", "before", "after"].includes(location)
      ) {
        console.warn(
          `Function $.text(text, location) doesn't accept parameter "${location}" as a valid argument.`,
          "Please use 'replace', 'prepend' or 'append'. This chain node will be skipped."
        )

        return $
      }

      const setText = (el, text, location) => {
        switch (location) {
          case "before":
          case "prepend": {
            el.insertAdjacentText("afterbegin", text)
            break
          }
          case "after":
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

      map(element, (node) => {
        setText(node, text, location)
      })

      return $
    }

    /**
     * Adds, removes toggles inline 'display' property of the selected element(s)
     */

    $.show = (display = "block") => {
      if (!element || element.length === 0) return $

      map(element, (node) => {
        node.style.display = display
      })

      return $
    }

    $.hide = () => {
      if (!element || element.length === 0) return $

      map(element, (node) => {
        node.style.display = "none"
      })

      return $
    }

    $.toggle = (onActive = "block") => {
      if (!element || element.length === 0) return $

      const toggleSelf = (active, el, onActive) => {
        if (active) {
          $(el).hide()
        } else {
          $(el).show(onActive)
        }
      }

      map(element, (node) => {
        const isActive =
          getStyleProperty(node, "display") === "none" ? false : true

        toggleSelf(isActive, node, onActive)
      })

      return $
    }

    /**
     * Shorthand for $(selecor).on('mouseenter') and $(selector).on('mouselave')
     *
     * Takes in an object with enter and leave functions, if leave function is not present,
     * it resets the element to the previous state
     *
     */

    $.hover = (functions) => {
      if (!element || element.length === 0) return $

      if (isObject(functions) && !isFunction(functions)) {
        const { enter, leave, options } = functions

        if (enter && leave) {
          map(element, (node) => {
            $(node).on("mouseenter", (args) => enter({ ...args }), options)
            $(node).on("mouseleave", (args) => leave({ ...args }), options)
          })
        } else {
          console.warn(
            "[$.hover] Function $.hover({ enter, leave }) requires both parameters. This chain node will be skipped."
          )
        }
      } else if (isFunction(functions)) {
        // Stores "clean" elements before any on-hover is applied
        const cloned = []

        map(element, (node, index) => {
          cloned.push(node.cloneNode(true))
          // Apply styles like normal
          $(node).on("mouseenter", (args) => functions({ ...args }))

          // Reset node
          $(node).on("mouseleave", () => {
            // Reset node
            // TODO: Figure out attributes to reset
            // TODO: replace attributes with clone
            const clone = cloned[index]
            node.removeAttribute("style")
            node.classList = clone.classList
            node.innerHTML = clone.innerHTML
          })
        })
      } else {
        console.warn(
          "[$.hover] Did no provide callback. This chain node will be skipped."
        )
        return $
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

      map(element, (node) => {
        $(node).on("click", (args) => callback({ ...args }), options)
      })

      return $
    }

    /**
     * Select parent node of each selected element(s)
     *
     * @param {Function} callback Optional
     * @returns Instance of curry for function chaining
     */

    $.parent = (callback) => {
      if (!element || element.length === 0) return

      // Create a new HTMLCollection
      const children = []

      map(element, (node) => {
        if (node.parentNode) {
          const parent = node.parentNode

          if (callback) {
            callback({
              self: parent,
              child: node,
              $util,
              $state,
            })
          }

          children.push(parent)
        }
      })

      // Set all found parents as the new selected element
      element = children

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

      if (!callback) {
        console.warn(
          "[$.filter] No condition to iterate on, this chain node will be skipped."
        )

        return $
      }

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

      return $
    }

    /**
     * Applies animation to selected element(s) with provided CSS property object.
     * Used to transfer from state A to state B
     *
     * @param {Object} properties
     * @param {Object} options
     * @returns Instance of curry for function chaining
     */

    $.animate = async (properties, options) => {
      if (!element || !properties) return $

      options = formatAnimationOptions(options)

      if (isFunction(properties)) {
        // Using the function callback
        const execute = properties

        async function start(properties, options) {
          options = formatAnimationOptions(options)

          const promises = []

          map(element, (node) => {
            promises.push(applyAnimation(node, properties, options))
          })

          return Promise.all(promises)
        }

        await execute({ self: element, $util, start, $state })
      } else {
        // Properties is an object
        map(element, (node) => {
          applyAnimation(node, properties, options)
        })
      }

      return $
    }

    const applyAnimation = async (el, properties, options) => {
      const { length, easing, callback } = options
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

      map(element, (node) => {
        sd(node)
      })

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

      map(element, (node) => {
        su(node)
      })

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
        const display = getStyleProperty(el, "display")

        if (display === "none") {
          $(el).slideDown(duration, easing)
        } else {
          $(el).slideUp(duration, easing)
        }
      }

      map(element, (node) => {
        st(node)
      })

      return $
    }

    /**
     * Iterates over elements and if one passes the check (same as using querySelectorAll)
     * it returns true. Otherwise returns false
     *
     * @param {String} condition
     * @returns If condition matches or not
     */

    $.is = (condition) => {
      if (!element || element.length === 0) return false

      const matches = (el, selector) =>
        (
          el.matches ||
          el.matchesSelector ||
          el.msMatchesSelector ||
          el.mozMatchesSelector ||
          el.webkitMatchesSelector ||
          el.oMatchesSelector
        ).call(el, selector)

      for (const node of element) {
        if (matches(node, condition)) return true
      }

      return false
    }

    /**
     * Applies opacity fade-in effect to an element. You can specify at what value it stops.
     *
     * @param {Float} to Number between 0 and 1. Default 1
     * @param {Object} options Same as animation options object
     * @returns Instance of curry for function chaining
     */

    $.fadeIn = (to = 1, options) => {
      if (!element || element.length === 0) return $

      if (to < 0) {
        console.warn(
          "[$.fadeIn] Supplied end value parameter of 0 or less. Please use $.fadeOut or $.fadeToggle for that. This chain node will be skipped."
        )
        return $
      }

      options = formatAnimationOptions(options)

      map(element, (node) => {
        $(node).animate(({ start }) => {
          start({ opacity: to }, options)
        })
      })

      return $
    }

    /**
     * Applies opacity fade-out effect to an element
     *
     * @param {Float} to Number between 0 and 1. Default 0
     * @param {Object} options Same as animation options object
     * @returns Instance of curry for function chaining
     */

    $.fadeOut = (to = 0, options) => {
      if (!element || element.length === 0) return $

      if (to >= 1) {
        console.warn(
          "[$.fadeOut] Supplied end value parameter of 1 or greater. Please use $.fadeIn or $.fadeToggle for that. This chain node will be skipped."
        )
        return $
      }

      options = formatAnimationOptions(options)

      map(element, (node) => {
        $(node).animate(({ start }) => {
          start({ opacity: to }, options)
        })
      })

      return $
    }

    /**
     * Toggles between fadeIn and fadeOut. Allows for specifying
     * starting and ending values.
     *
     * @param {Float} from Starting amount of opacity. Defaults to 0
     * @param {Float} to Ending amount of opacity. Defaults to 1
     * @param {Object} options Same as animation options object
     * @returns Instance of curry for function chaining
     */

    $.fadeToggle = (from = 0, to = 1, options) => {
      if (!element || element.length === 0) return $

      options = formatAnimationOptions(options)

      map(element, (node) => {
        const opacity = parseFloat(getStyleProperty(node, "opacity"))

        if (opacity > from) {
          $(node).fadeOut(from, options)
        } else if (opacity < to) {
          $(node).fadeIn(to, options)
        }
      })

      return $
    }

    /**
     * Get the value of an attribute for the first element in the set of
     * matched elements or set one or more attributes for every matched element.
     *
     * @param {String | Array} property Optional attribute name(s) to ask or set to the selected elements
     * @param {String | Array} value Optional value(s) to set to the selected elements
     * @returns Attribute value or true/false if addition was succesful
     */

    $.attr = (property, value) => {
      if (!element || element.length === 0) return $

      if (!property) {
        console.warn("[$.attr] Did not provide required property name(s).")
        return false
      }

      // Returns the first matched element's property
      if (!value) {
        if (isArray(property)) {
          return property.map((prop) => element[0].getAttribute(prop))
        }

        return element[0].getAttribute(property)
      }

      map(element, (node) => {
        if (isArray(property)) {
          if (isArray(value)) {
            // Assign attribute value for property at index N to value at index N
            // Example [title,desc], ['Hello','World]
            // title=Hello, desc=World
            property.map((prop, index) => node.setAttribute(prop, value[index]))
          } else {
            // For each property, set the value
            // Example [title, desc], 'Hello',
            // title=Hello, desc=Hello
            property.map((prop) => node.setAttribute(prop, value))
          }
        } else {
          if (isArray(value)) {
            // Set every value to the attribute
            console.warn(
              "[$.attr] Cannot set array of values to a single property."
            )
          } else {
            // Set attribute value
            node.setAttribute(property, value)
          }
        }
      })

      // if (isArray(property)) {

      // }
    }

    // TODO: Consider this for 1.2.0
    // $.animation = (keyframes, options) => {
    //   if (!element || element.length === 0) return $

    //   map(element, async (node) => {
    //     const keys = new KeyframeEffect(node, keyframes)
    //     const animation = new Animation(keys, document.timeline)

    //     node.animate(keyframes, options)
    //   })
    // }

    return $
  }

  return $
})
