const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const { owners, projects } = require("../models/models");

class OwnersService {
    async addOwner(userId, projectId) {
        console.log(
            `New owner setup; userId: ${userId}, projectId: ${projectId}`
        );
        const result = await owners.create({
            userId: userId,
            projectId: projectId,
        });
        return result;
    }

    async deleteOwner(userId, projectId) {
        console.log(
            `Delete owner setup; userId: ${userId}, projectId: ${projectId}`
        );
        const result = await owners.destroy({
            where: {
                userId: userId,
                projectId: projectId,
            },
        });
        return result;
    }

    async validateOwner(userId, projectId) {
        console.log(
            `Validate owner setup; userId: ${userId}, projectId: ${projectId}`
        );
        const result = await owners.findOne({
            where: {
                userId: userId,
                projectId: projectId,
            },
        });
        return result;
    }

    async getOwnerProjectsList(userId) {
        console.log(`Get owner's projects setup; userId: ${userId}`);
        const result = await owners.findAll({
            where: {
                userId: userId,
            },
        });
        return result;
    }
    async findLastUpdProjectUser(userId) {
        const result = await owners.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: projects,
                },
            ],
            order: [[projects, "updatedAt", "DESC"]],
        });
        console.log(result);
        const one = result[0].project;
        if (!one) {
            throw ApiError.BadRequest("Нет проектов");
        }

        return one;
    }
}

module.exports = new OwnersService();
