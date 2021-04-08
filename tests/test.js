/* DEPENDENCIES */
var expect = require('chai').expect;
require('mocha-sinon');
const crypto = require('crypto');                                                   // Used to generate file hash
const fs = require('fs')
const path = require('path')

/* HELPER FILES */
const printScan = require('../opswat-api/PrintScanner/printScan.js');
const { getScanByHash, getScanByDataID, uploadFile } = require('../opswat-api/api/opswat.js');

const fileName = "hi2.txt"
const filePath = path.join(path.dirname(__filename), fileName)
const fileBuffer = fs.readFileSync(filePath)



// Get expected result
const testFileName = "test_result2.txt"
const testFilePath = path.join(path.dirname(__filename), testFileName)
const testResult = fs.readFileSync(testFilePath).toString();




/* TEST getScanByHash */
const testFileHash = async (fileBuffer, fileName) => {
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');         // Create File Hash

    try {
        const res = await getScanByHash(hash);                                      // Check if hash has been scanned before
        const { scan_results } = res.data;                                          // Get results
        const result =  printScan(scan_results, fileName, true);                    // Display cached results
        
        const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('')              // Diff the expected with returned
        const C = diff(result+"",testResult+"")
        console.log(C.length+"");
    } catch (err) {                                                                 // Cache DNE so continue, otherwise log error and return
        if (err.response && err.response.status !== 404)
            console.log(err);

    }
}; 
describe('testing getScanByHash ', () => {
    beforeEach(function() {
        this.sinon.stub(console, 'log');
      });
    it('can get scan report by hash', async () => {
        await testFileHash(fileBuffer,fileName);
        expect( console.log.calledWith(0+"") ).to.be.true;       
    });
});




/* TEST getScanByDataID */
const testById = async (fileBuffer, fileName) => {
    const id = "bzIxMDQwOE1HZXBoN2RkazFfOTdidFdJX2Y"

    try {
        const resByDataId = await getScanByDataID(id);
        if (resByDataId.data.scan_results.progress_percentage === 100) {   // Check if file done scanning
            const { scan_results } = resByDataId.data;
            const result =  printScan(scan_results, fileName, true);       // Display cached results
        
            const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('') // Diff the expected with returned
            const C = diff(result+"",testResult+"")
            console.log(C.length+"");
        }
        
    } catch (err) {                                                        // Cache DNE so continue, otherwise log error and return
        if (err.response && err.response.status !== 404)
            console.log(err);

    }
};
describe('testing getScanByID ', () => {
    beforeEach(function() {
        this.sinon.stub(console, 'log');
      });
    it('can get scan report by id', async () => {
        await testById(fileBuffer,fileName);
        expect( console.log.calledWith(0+"") ).to.be.true;       
    });
});