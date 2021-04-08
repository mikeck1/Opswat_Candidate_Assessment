/**
 * Display Results from OPTSWAT Scan
 * 
 * @param scanResult    Response object from OPTSWAT Scan
 * @param fileName      Name of file scanned
 * @return              None. Console.log() all information from scanResult object
 */

 function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
const printScan = (scanResult, fileName, debug = false) => {
    var str = "";
    // Log Header
    str += `filename: ${fileName}\n`;              
    str += `overall_status: ${scanResult.scan_all_result_a === 'No Threat Detected' ? 'Clean' : scanResult.scan_all_result_a}\n`;

    // Log all Engine Results
    const scanDetails = scanResult.scan_details;
    for (const [engine, detail] of Object.entries(scanDetails)) {
        str += `engine: ${engine}\n`;
        str += `thread_found: ${detail.threat_found === '' ? 'Clean' : detail.threat_found}\n`;
        str += `scan_result: ${detail.scan_result_i}\n`;
        str += `def_time:  ${detail.def_time}\n`;
    }

    // Log Footer
    str += "END";
    
    if (debug) return str;
    console.log(str);
};


module.exports = printScan;