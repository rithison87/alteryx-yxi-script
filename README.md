# alteryx-yxi-script
A script using node to create Alteryx YXIs

## To execute the script:
To execute the script, run this command: ```node .\createYxi.js '[folder name]'```

The folder name can either be an absolute path or just a name that is within the same folder as the script.

## Test Folder
Test Folder can be used with the script. It contains the following:
* files and folders that should be ignored (such as node_modules and .bak files)
* the required Config.xml and Icon.png files.
* Subfolders to include like Subfolder01 and Subfolder 02
* Subfolders to exclude like App and src
* Resource files such as app.js, bundle.js, and a .json.

## To dos:
* Connect to webpack so the YXI creation occurs after webpack bundles a tools' resources
* Add logic to check Config.xml and icon files
