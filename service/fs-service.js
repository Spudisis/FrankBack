const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
class FsService {
    deleteFile(file) {
        if (file) {
            fs.unlinkSync(path.resolve(__dirname, "..", "static", file));
        }
    }
    async createFile(req) {
        let fileName = "";

        if (req && req.miniature) {
            const { miniature } = req;

            fileName = uuid.v4() + ".jpg";
            miniature.mv(path.resolve(__dirname, "..", "static", fileName));
        }
        return fileName;
    }
}

module.exports = new FsService();
