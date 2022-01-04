// Library object
const V = {
  one: async () =>
    new Promise((resolve, reject) => {
      // Do async stuff
      console.log("ONE")

      // In case we want to stop the execution chain
      // reject('Error, shit my pants')

      setTimeout(() => {
        // Resolve and continue the chain
        resolve(V)
      }, 1000)
    }),
  two: async () => {
    console.log("TWO")

    return V
  },
}

// This works, but each async function introduces another nesting
V.one().then((V) => V.two())

// Is there a way to shorten it to this?
V.one().two()
