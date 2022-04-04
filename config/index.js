const path = require("path");

module.exports = {
    API_KEY_PDF : process.env.API_KEY_PDF,
    API_KEY_FILEIO : process.env.API_KEY_FILEIO,
    ROOT_PATH :  path.resolve(__dirname, "..")
}