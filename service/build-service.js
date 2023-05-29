const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const fetch = require("node-fetch");

class BuildService {
    async startBuild(projectUid) {
        console.log(`Start build for project ${projectUid};`);

        const result = await fetch(
            `http://${process.env.BUILD_SYSTEM_COORDINATOR_ADRESS}:${process.env.BUILD_SYSTEM_COORDINATOR_PORT}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },

                body: JSON.stringify({
                    purpose: "start_build",
                    project_name: projectUid,
                }),
            }
        );
        if (result) {
            return 200;
        }
        return ApiError.BadRequest("ERROR");
    }

    async interruptBuild(projectUid) {}
}

module.exports = new BuildService();
