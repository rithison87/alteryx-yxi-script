# alteryx-yxi-script
A script using node to create Alteryx YXIs

## Node packages used:
Archiver: https://github.com/archiverjs/node-archiver (```npm install archiver --save```)

## To execute the script:
At the moment, the script must be in the same directory as the selected folder. 

To execute the script, run this command: ```node .\createYxi.js '[folder name]'```

## Test Folder
Test Folder can be used with the script. It contains the following:
* a node_modules folder that should be ignored
* the required Config.xml and Icon.png files.
* Subfolders to include like Subfolder01 and Subfolder 02
* Subfolders to exclude like App and src
* Resource files such as app.js, bundle.js, and a .json.

## Current Issues:
1. There is nothing handling the deletion of the copied XML and icon files.
2. Need to only include bundle.js and Supporting_Macros folder. Currently not doing this because not all tools use a bundle.js.
3. Script only works when located in the same directory as the the selected folder. Need to parameterize the paths.
4. There's a list of potential to dos commented in createYxi.js
