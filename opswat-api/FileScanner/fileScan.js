/* DEPENDENCIES */
const crypto = require('crypto');                                                   // Used to generate file hash

/* HELPER FILES */
const printScan = require('../PrintScanner/printScan.js');
const { getScanByHash, getScanByDataID, uploadFile } = require('../api/opswat');


/**
 * Check if file already scanned
 * 
 * @param fileBuffer    File stream buffer object (ie use fs: readFile,readFileSync)
 * @param fileName      Must be local path + file name
 * @return              response from GET
 */


const fileScan = async (fileBuffer, fileName, debug = false) => {
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');         // Create File Hash

    try {
        const res = await getScanByHash(hash);                                      // Check if hash has been scanned before
        const { scan_results } = res.data;                                          // Get results
        return printScan(scan_results, fileName, debug);                                          // Display cached results
    } catch (err) {                                                                 // Cache DNE so continue, otherwise log error and return
        if (err.response && err.response.status !== 404)
        {
            console.log(err.response.status+": "+err.response.statusText);
            return;
        }
    }

    /* SCAN FILE */
    try {
        const { data_id } = (await uploadFile(fileBuffer, fileName)).data;          // Upload File and scan
        console.log(data_id);
        const intervalId = setInterval(async () => {
            try {
                const resByDataId = await getScanByDataID(data_id);                 // Check every 1 seconds by id, see if file done scanning

                if (resByDataId.data.scan_results.progress_percentage === 100) {   // Check if file done scanning
                    const { scan_results } = resByDataId.data;

                    return printScan(scan_results, fileName, debug);                              // Display results
                }

            } catch (err) {
                console.log(err);
                clearInterval(intervalId);                                          // Error: return immediately
            }
        }, 1000);
    } catch (err) {
        console.log(err.response.status+": "+err.response.statusText);
    }

};

module.exports = fileScan;
