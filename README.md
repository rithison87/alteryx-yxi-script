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
1. Script only works when located in the same directory as the the selected folder. Need to parameterize the paths.

## To dos:
* Connect to webpack so the YXI creation occurs after webpack bundles a tools' resources
* Parameterize the directory paths of the selected file; the script should be able to work regardless of its location
* Add logic to check Config.xml and icon files
