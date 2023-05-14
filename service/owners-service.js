const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const { owners } = require("../models/models");

class OwnersService {
    async addOwner(userId, projectId){
        console.log(`New owner setup; userId: ${userId}, projectId: ${projectId}`);
        const result = await owners.create({userId:userId, projectId:projectId});
        return result;
    }
}

module.exports = new OwnersService();
