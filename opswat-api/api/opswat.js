/* DEPENDENCIES */
const axios = require('axios');                                     // For HTTP requests
const dotenv = require('dotenv');                                   // For reading .env file

dotenv.config();
const { API_KEY } = process.env;                                    // Get API Key from .env file

const HASH_URL = 'https://api.metadefender.com/v4/hash/';           // API URL: Check if file already scanned by file hash
const FILE_UPLOAD_URL = 'https://api.metadefender.com/v4/file/';    // API URL: Upload file and scan



/**
 * Look up previously uploaded and scanned file by MD5 hex file hash
 * 
 * @param hash          MD5 hex hash of a file which may have already been scanned.
 * @return              Response from GET
 */


const getScanByHash = (hash) => {
    return axios.get(HASH_URL + hash, {
        headers: { apikey: API_KEY },
    });
};



/**
 * Look up previously uploaded and scanned file by file data id returned from uploadFile
 * 
 * @param dataId        The id of the file returned from POST to FILE_UPLOAD_URL
 * @return              Response from GET
 */


const getScanByDataID = (dataId) => {
    return axios.get(FILE_UPLOAD_URL + dataId, {
        headers: { apikey: API_KEY },
    });
};



/**
 * Uploads and scans file
 * 
 * @param fileBuffer    File stream buffer object (ie use fs: readFile,readFileSync)
 * @param fileName      Must be local path + file name
 * @return              data_id The id of the file returned from POST to FILE_UPLOAD_URL
 */


const uploadFile = (fileBuffer, fileName) => {
    const header = {
        headers: {
            apikey: API_KEY,
            filename: fileName,
            'Content-Type': 'application/octet-stream',
        },
    };

    return axios.post(FILE_UPLOAD_URL, fileBuffer, header);
};


module.exports = { getScanByHash, getScanByDataID, uploadFile };
