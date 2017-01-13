function deleteCopies () {
  const fs = require('fs')

  const copiedConfigXml = './Config.xml' // __dirname
//  fs.rename(copiedConfigXml, './Delete.xml', err => err ? console.log(err) : console.log('Rename complete'))
  // fs.createReadStream(copiedConfigXml).pipe(fs.createWriteStream('Delete.xml'))
  // fs.unlinkSync('Delete.xml')
  fs.unlink(copiedConfigXml, err => err ? console.log(err) : console.log('Copied Config.xml deleted successfully.'))
}

module.exports = deleteCopies
