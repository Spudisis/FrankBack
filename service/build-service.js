const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const request = require('request');

class BuildService {
    async startBuild(projectUid){
        console.log(`Start build for project ${projectUid};`)
          
        const result = await request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: `http://${process.env.BUILD_SYSTEM_COORDINATOR_ADRESS}:${process.env.BUILD_SYSTEM_COORDINATOR_PORT}`,
            body: JSON.stringify({ 'purpose': 'start_build', 'project_name': projectUid })
        });

        return 200;
    }

    async interruptBuild(projectUid){

    }
}

module.exports = new BuildService();
