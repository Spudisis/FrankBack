const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const buildService = require("../service/build-service");

class BuildController {
    async startBuild(req, res, next) {
        //add user validation
        try {
            const { projectUid } = req.body;

            const result = await buildService.startBuild(projectUid);

            res.json({ result });
        } catch (error) {
            next(error);
        }
    }

    async interruptBuild(projectUid) {
        //add user validation
    }
}

module.exports = new BuildController();
