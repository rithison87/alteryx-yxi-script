// // Action Items
// DONE - Change .zip extension to .yxi // just change newZipFolder variable from .zip to .yxi
// DONE - Ignore node_modules folder when creating .zip (and possibly other folders) - USE archive.glob()
// Ignore .git files
// Create UI for user to select folder
// Create executable
// Connect to webpack
// DONE - Create/copy/move Config.xml file to root of .zip
// DONE - Copy/move tool yxi icons to root of .zip
// Create summary (console or text file output)
// Parameterize the directory paths of the selected file; the script should be able to work regardless of its location
// Add logic to check Config.xml and icon files
// Errors:
//    SEMI-DONE - Config.xml checking: filename, contents, tool name - FILENAME is checked with .on('error')
//    DONE WITH .on('error') - Check yxi icon/png

// path.resolvePaths()
// parameterize by making the user selected folders RELATIVE

function createYxi () {
  // **************************************************
  // *************** DECLARED VARIABLES ***************
  const fs = require('fs')
  const path = require('path')
  const archiver = require('archiver') // npm install archiver --save

  // variable that stores the data being compressed
  const archive = archiver('zip', { store: false })

  // variable to store the user selected folder. This is the root folder for the YXI
  // Subfolders will also be archived
  const userSelectedFolder = process.argv[2] // './Google Analytics/Sub Google Analytics' // 'Google Analytics' //
  // // These three commented variables are used to parameterize the folder path, so the script can run from any location.
  // const selectedFolderProperties = path.parse(userSelectedFolder)
  // const baseFolder = selectedFolderProperties.base
  // const dirFolder = selectedFolderProperties.dir // '+(**/Users/rson/AppData/Roaming/Alteryx/Tools)' // selectedFolderProperties.dir
  const newZipFolder = './' + userSelectedFolder + '.zip' // '.yxi' CHANGE TO THIS EXT
  const newZipPath = path.join(__dirname, newZipFolder)

  // Config.xml file: hard-code file name required for yxis
  const configXml = userSelectedFolder + '\\Config.xml'
  const copiedConfigXml = 'Config.xml'
  // Copy Config file so it's in the same directory as the main folder
  // // Testing out promises to chain the creation of the YXI folder and then deleting the copied files.
  const copyConfig = new Promise((resolve, reject) => {
    if (true) resolve(fs.createReadStream(configXml).pipe(fs.createWriteStream(copiedConfigXml)))
    else reject(console.log('Promise Rejected'))
  })

  // YXI Icon: this is usually the tool icon, but the icon can represent multiple tools for the gallery if desired
  const yxiIcon = userSelectedFolder + '\\' + userSelectedFolder + 'Icon.png'
  const copiedYxiIcon = userSelectedFolder + 'Icon.png'
  // This takes the tool icon creating a copy for archiving.
  fs.createReadStream(yxiIcon).pipe(fs.createWriteStream(copiedYxiIcon))

  // the output is saved in the same directory where the script was ran
  // new name is from userSelectedFolder
  const output = fs.createWriteStream(newZipPath)

  // variables for the glob method that filters any node_modules folder
  // Need to review and may need to fix the structure of userSelectedFolderGlob
  const userSelectedFolderGlob = userSelectedFolder + '/**' // path.resolve(userSelectedFolder + '/**')
  // const relativePathFolder = path.relative(userSelectedFolder, )
  // // Need to discuss archiving bundle.js and other assets when needed
  const globOptions = {
    ignore: ['**/node_modules/**'] // , ['**/node_modules/*', dirFolder + '/**/node_modules', dirFolder],
  }
  
  // // Console.logs
  console.log('userSelectedFolderGlob: ', userSelectedFolderGlob)
  console.log('\n__dirname: ', __dirname) 
  // console.log('dirFolder: ', dirFolder) 
  // console.log('selectedFolderProperties: ', selectedFolderProperties)
  console.log('userSelectedFolder: ', userSelectedFolder) 
  console.log('configXml: ', configXml) 
  console.log('yxiIcon: ', yxiIcon) 


  // **************************************************
  // *************** METHODS USED *********************
  // Message after archive.finalize()
  output.on('close', () => {
    console.log('\n' + archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.\n')
  })

  archive.on('error', err => { throw err })

  // set stream for archive to the user selected folder
  archive.pipe(output)

  // append the copied Config.xml and the YXI icon to the new YXI
  // testing promise to delete copies
  copyConfig.then(archive.file(copiedConfigXml)).then(console.log('ConfigXML Archived')) // .then(fs.unlinkSync('TestFile.txt')).then(console.log('ConfigXML Deleted'))
  archive.file(copiedYxiIcon)

  // delete the copied Config.xml and YXI icon files
  // fs.unlinkSync(copiedConfigXml) // , err => err ? console.log(err) : console.log('Copied Config.xml deleted successfully.'))

  archive.glob(userSelectedFolderGlob, globOptions)
  archive.finalize()
  
  // // fs.unlink and unlinkSync are methods to delete files.
  // fs.unlinkSync('TestFile.txt')
  // fs.unlink(copiedConfigXml, err => err ? console.log(err) : console.log('Copied Config.xml deleted successfully.'))
  fs.stat(copiedConfigXml, (err, stats) => err ? console.log(err) : console.log(stats))
}

module.exports = createYxi
