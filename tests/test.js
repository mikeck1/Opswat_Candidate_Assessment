/* DEPENDENCIES */
var expect = require('chai').expect;                                                // For sinon
var assert = require('chai').assert;
require('mocha-sinon');                                                             // Test console.log
const crypto = require('crypto');                                                   // Used to generate file hash
const fs = require('fs')                                                            // To get file stream
const path = require('path')                                                        // Gets path to file

/* HELPER FILES */
const printScan = require('../opswat-api/PrintScanner/printScan.js');
const { getScanByHash, getScanByDataID, uploadFile } = require('../opswat-api/api/opswat.js');
const fileScan = require('../opswat-api/FileScanner/fileScan.js')

const fileName = "hi2.txt"                                                          // Sample test input (already scanned file)
const filePath = path.join(path.dirname(__filename), "data/"+fileName)
const fileBuffer = fs.readFileSync(filePath)
const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('')                      // Diff the expected with returned


/* Get expected result (from saved file test_result2.txt) */
const testFileName = "test_result2.txt"                                             // Expected result from already scanned file
const testFilePath = path.join(path.dirname(__filename), "data/"+testFileName)
const testResult = fs.readFileSync(testFilePath).toString();

/* Tests a function that takes a string and diffs ouput with expected result */
const test = async (lambda, str) => {
    try {
        const res = await lambda(str);                                              // Check if hash has been scanned before
        const { scan_results } = res.data;                                          // Get results
        const result = printScan(scan_results, fileName, debug = true);             // Display cached results
        console.log(diff(result + "", testResult + "").length + "");
    }
    catch (err) {                                                                   // Log error and return
        console.log(err.response.status+": "+err.response.statusText);
    }
};


/* TEST getScanByHash */
describe('testing getScanByHash ', () => {
    beforeEach(function () {
        this.sinon.stub(console, 'log');
    });
    it('can get scan report by hash', async () => {
        const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');     // Create File Hash
        await test(getScanByHash, hash);
        // await testFileHash(fileBuffer,fileName);                                 // prints difference in string values
        expect(console.log.calledWith(0 + "")).to.be.true;                          // Expecting to have 0 length difference  
    });

    it('can show correct error with unrecognized hash', async () => {
        await test(getScanByHash, "123");
        expect(console.log.calledWith("400: Bad Request")).to.be.true;
    });
});

/* TEST getScanByDataID */
describe('testing getScanByID ', () => {
    beforeEach(function () {
        this.sinon.stub(console, 'log');
    });
    it('can get scan report by id', async () => {
        const id = "bzIxMDQwOE1HZXBoN2RkazFfOTdidFdJX2Y";
        await test(getScanByDataID, id);
        expect(console.log.calledWith(0 + "")).to.be.true;
    });
});


/* TEST fileScan */
describe('testing fileScan', () => {
    beforeEach(function () {
        this.sinon.stub(console, 'log');
    });
    it('can get scan report from known file', async () => {
        const res = await fileScan(fileBuffer,fileName, debug = true);                  // Check if hash has been scanned before                                       // Get results
        expect(res).equal(testResult);
    });




    
    // it('can get scan report from unknown file', async () => {
    //     const fileName = "fileThatChanges.txt";                                                          // Sample test input (already scanned file)
    //     // let randomString = Math.random().toString(36).substring(7);
    //     // fs.appendFileSync(fileName, randomString);
    //     const filePath = path.join(path.dirname(__filename), "data/"+fileName)
    //     const fileBuffer = fs.readFileSync(filePath)
    //     const res = await fileScan(fileBuffer,fileName, debug = true);              // Check if hash has been scanned before   
    //     const correctTextCount = 3355;                                    // Get results
    //     expect(res.length).equal(correctTextCount);
    // });
});

// setTimeout(function(){
//     changeFile();
// }, 6000);

// const changeFile = async () => {
//     setTimeout(function(){
//         const fileName = "fileThatChanges.txt";                                                          // Sample test input (already scanned file)
//         let randomString = Math.random().toString(36).substring(7);
//         fs.appendFileSync("tests/data/"+fileName, randomString);
//     }, 1000);
// }