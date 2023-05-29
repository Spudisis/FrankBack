const fs = require("fs");
const path = require("path");

class FsService {
    deleteFile(file) {
        if (file) {
            fs.unlinkSync(
                path.resolve(__dirname, "..", "static", file)
            );
        }
    }
}

module.exports = new FsService();
