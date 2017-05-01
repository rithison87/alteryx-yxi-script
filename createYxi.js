const fs = require('fs-extra')
const path = require('path')
const archiver = require('archiver')
const ncp = require('ncp').ncp
const program = require('commander')
const argv = require('minimist')(process.argv.slice(2))

// newline to make console look cleaner
console.log('\n')

// check if in correct directory (Not needed if absolute pathing is working)
// const userName = process.env['USERPROFILE'].split(path.sep)[2]
// const correctDirectory = `C:\\Users\\${userName}\\AppData\\Roaming\\Alteryx\\Tools`
// const checkDirectory = correctDirectory === __dirname
// console.log('Current directory: ', __dirname)
// if (!checkDirectory) {
	// console.error("Script is in wrong directory.")
	// console.error(`Move script to: ${correctDirectory}`)
	// console.log('\n')
	// process.exit(1)
// }

program
	.version('v0.2.0')
	.option('Absolute Path', 'Enter absolute path of folder to generate yxi')
	.option('Same Directory', 'Enter folder name within same directory to generate yxi')
	.parse(process.argv)

// variable that stores the compressed data
const archive = archiver('zip', { store: false })

// variable to store the user selected folder. This is the root folder for the YXI
// Subfolders will also be archived
const userSelectedFolder = process.argv[2]

// if user input is help CREATE HELP SECTION
// enter a folder within the same directory of the script OR
// enter an absolute path

const parsedUserSelectedFolder = path.parse(userSelectedFolder)
const noRootDir = parsedUserSelectedFolder.root === ''

// check if a directory of same name already exists in root directory
// refactor this error handle to create a folder with a temp name change
const rootFolders = fs.readdirSync("C:\\")
const checkRootFolder = rootFolders.includes(parsedUserSelectedFolder.name)
if (checkRootFolder) {
	console.error("Your root directory (C:\) includes a folder of the same name. Please change and try again.")
	process.exit(1)
}

// checking valid inputs and directory
const directoryItems = fs.readdirSync(__dirname)
const filterDirectoryItems = directoryItems.filter((d) => {
	return !d.includes('.')
})
const checkUserInput = filterDirectoryItems.includes(userSelectedFolder)

// check if user input is valid
if (!checkUserInput && noRootDir) {
	console.error("Re-run script and enter a valid folder name.")
	console.log('\n')
	process.exit(1)
}

const newZipFolder = `./${userSelectedFolder}.yxi` // '.yxi' CHANGE TO THIS EXT
const newZipPath = !noRootDir ? path.join(__dirname, `${parsedUserSelectedFolder.name}.yxi`) : path.join(__dirname, newZipFolder)

// globObtions to filter files and folders from being archived
const userSelectedFolderGlob = path.join(parsedUserSelectedFolder.root, `${parsedUserSelectedFolder.name}/**`)
const globOptions = {
  ignore: [
    '**/App/**',
    '**/app/**',
    '*/Config.xml',
    '**/*.bak',
    '*/bundle.js.map',
    '**/*.git',
    '*/.gitignore',
    '**/node_modules/**',
    '*/README.md',,
    '**/reference-files/**',
    '**/testing-workflows/**'
    ] // , ['**/node_modules/*', dirFolder + '/**/node_modules', dirFolder],
}

// *************** ARCHIVE FUNCTION ******************
const archiveYxi = (output, copiedConfigXml, userSelectedFolderGlob, globOptions) => {
	archive.on('error', err => { throw err })

	// set stream for archive to the user selected folder
	archive.pipe(output)

	// append the copied Config.xml and the YXI icon to the new YXI
	archive.file(copiedConfigXml)

	// delete the copied Config.xml and YXI icon files
	// fs.unlinkSync(copiedConfigXml) // , err => err ? console.log(err) : console.log('Copied Config.xml deleted successfully.'))

	archive.glob(userSelectedFolderGlob, globOptions)
	archive.finalize()
}

// Function to delete files
const deleteFile = filename => {
  return fs.unlinkSync(filename)
}

// Message after archive.finalize() completes
// Delete the copied files
const archiveClose = (output, copiedConfigXml) => {
	output.on('close', () => {
		console.log(`\n${parsedUserSelectedFolder.name}.yxi has been created: ${archive.pointer()} total bytes\n`)
		deleteFile(copiedConfigXml)
		// deleteFile(copiedYxiIcon)
		fs.removeSync(`C:\\${parsedUserSelectedFolder.name}`)
	})
}

// options object will be used by ncp to filter files and directories
const options = {
	filter(filename) {
		// console.log(filename)
		const filtered = !filename.includes('node_modules')
			&& !filename.includes(`${userSelectedFolder}\\app`)
			&& !filename.includes(`${userSelectedFolder}\\reference-files`)
			&& !filename.includes(`${userSelectedFolder}\\testing-workflows`)
			&& !filename.includes('bundle.js.map')
			&& !filename.endsWith('.bak')
			&& !filename.endsWith('.git')
			&& !filename.endsWith('.gitignore')
			&& !filename.endsWith('README.md')
		return filtered
	}
}

// branch between absolute path and same directory location
// if root dir exists, then copy dir to C:\ and zip there
if (!noRootDir) {	
	ncp(userSelectedFolder, parsedUserSelectedFolder.root + parsedUserSelectedFolder.name, options, function (err) {
		if (err) {
			return console.error(err)
		}
		// Config.xml file: hard-code file name required for yxis
		const configXml = path.join(parsedUserSelectedFolder.root, `${parsedUserSelectedFolder.name}\\Config.xml`)
		const copiedConfigXml = 'Config.xml'
		// Copy the config.xml into the YXI's root folder
		fs.createReadStream(configXml)
		  .pipe(fs.createWriteStream(copiedConfigXml))
		
		const output = fs.createWriteStream(newZipPath)
		archiveYxi(output, copiedConfigXml, userSelectedFolderGlob, globOptions)
		archiveClose(output, copiedConfigXml)
	})
}

// execute this block if user entered a folder within the same directory of the script
if (noRootDir) {
	const noRootDestination = `C:\\${parsedUserSelectedFolder.name}`
	ncp(userSelectedFolder, noRootDestination, options, function (err) {
		if (err) {
			return console.error(err)
		}
		// Config.xml file: hard-code file name required for yxis
		const configXml = path.join(__dirname, `${parsedUserSelectedFolder.name}\\Config.xml`)
		console.log('configXml: ', configXml)
		const copiedConfigXml = 'Config.xml'
		// Copy the config.xml into the YXI's root folder
		fs.createReadStream(configXml)
		  .pipe(fs.createWriteStream(copiedConfigXml))
		
		const output = fs.createWriteStream(newZipPath)
		archiveYxi(output, copiedConfigXml, userSelectedFolderGlob, globOptions)
		archiveClose(output, copiedConfigXml)	
	})
}

// *************** CONSOLE SUMMARY ******************
console.log('Selected directory to create YXI: ', userSelectedFolder)