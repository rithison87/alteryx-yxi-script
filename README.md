# alteryx-yxi-script
A script using node to create Alteryx YXIs

## Node packages used:
Archiver: https://github.com/archiverjs/node-archiver (```npm install archiver --save```)

## To execute the script:
At the moment, the script must be in the same directory as the selected folder. 

To execute the script, run this command: ```node .\index.js '[folder name]'```

## Test Folder
Test Folder can be used with the script. It contains a node_modules folder that should be ignored and the required Config.xml and Icon.png files. It also has subfolders and  resource files such as app.js and bundle.js that may be ignored as needed.

## .js files info:
* index.js
  * Main file to run createYxi and deleteCopies
* createYxi.js
  * Main function to create the YXIs.
* deleteCopies.js
  * Separate function to delete the copied Config.xml files. Will eventually add code to delete the tool's icon.
* node_funcs.js
  * Used to learn and test node functions from fs and path.

## Current Issues:
1. deleteCopies.js is not executing as expected when chained after createYxi.js.
  * The copied file is currently Config.xml. Once deleting Config.xml works correctly, will add code to delete copied tool icons.
2. Need to only include bundle.js and Supporting_Macros folder. Currently not doing this because not all tools use a bundle.js.
3. Script only works when located in the same directory as the the selected folder. Need to parameterize the paths.
