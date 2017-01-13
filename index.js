const createYxi = require('./createYxi')
const deleteCopies = require('./deleteCopies')
const fs = require('fs')

createYxi()
// deleteCopies()
// fs.unlinkSync('./Config.xml')

// const executeScript = new Promise( (resolve, reject) => {
//   resolve(createYxi())
//   reject(new Error('fail'))
// })

// executeScript // .then(deleteCopies())

// // Used to review the passed args
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val)
// })
