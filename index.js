/* DEPENDENCIES */
const prompt = require('prompt')
const fs = require('fs')
const path = require('path')

/* HELPER FILES */
const fileScan = require('./opswat-api/FileScanner/fileScan.js')

/* GET COMMAND LINE ARGUMENTS */
var myArgs = process.argv.slice(2) // gets all command line arguments => outputs array

/* GET FILE NAME */
const fileName = myArgs[0]                                      // First argument is file name
const filePath = path.join(path.dirname(__filename), fileName)  // combines the directories path with the file name

if (fileName != '' && fs.existsSync(filePath)) {                // Checks if file exists
    
    const fileBuffer = fs.readFileSync(filePath)                // Read file contents
    
    fileScan(fileBuffer, path.basename(fileName))               // Scan file contents
} else {
    console.log('Could not find file. Please try again.')
}
