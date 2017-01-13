const fs = require('fs')
const path = require('path')

const copiedConfigXml = './Config.xml'

// const selectedFolder = 'C:\\Users\\rson\\AppData\\Roaming\\Alteryx\\Tools\\Google Analytics'
// 'C:\\SVN\\Content\\RSonSandbox\\YXI Script\\Google Analytics'
// 'C:\\SVN\\Content\\RSonSandbox\\YXI Script\\File01.txt'

// const folderProperties = path.parse(selectedFolder)
// path.dirname(selectedFolder)

// console.log('\nselectedFolder: ', selectedFolder)
// console.log('folderProperties.dir: ', folderProperties.dir)
// console.log('folderProperties.base: ', folderProperties.base, '\n')

// fs.rename(selectedFolder, 'C:\\SVN\\Content\\RSonSandbox\\Google Analytics - Copy', err => err ? console.log(err) : console.log('renamed complete'))
// fs.readdir(selectedFolder, (err, files) => console.log('err:', err, '\nfiles: ', files))

// console.log('\nselectedFolder: ', selectedFolder)
//
// const relativePath = path.relative('C:\\SVN\\Content\\RSonSandbox\\YXI_Script', selectedFolder)
// console.log(relativePath)

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val)
// })
//
// console.log('process.argv[2]: ', process.argv[2])

// fs.createReadStream('File01.txt').pipe(fs.createWriteStream('File01_Copy.txt'))
fs.rename(copiedConfigXml, './Delete.xml', err => err ? console.log(err) : console.log('Rename complete'))
// fs.unlinkSync(copiedConfigXml)
// fs.unlink('Config.xml', err => err ? console.log(err) : console.log('Copied Config.xml deleted successfully.'))
