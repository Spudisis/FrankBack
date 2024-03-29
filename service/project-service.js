const { projects, modelLink, refreshPassword } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const FsService = require("./fs-service");
const ApiError = require("../exceptions/api-error");
const fs = require("fs");
const path = require("path");
class ProjectService {
    async createEmptyProject(projectName, statusAccess, miniature) {
        if (!projectName) {
            throw ApiError.BadRequest("project name not exist");
        }
        console.log(
            `New project setup; name: ${projectName}, access: ${
                statusAccess ? "public" : "private"
            }`
        );
        const randUID = uuid.v4().slice(0, 16);
        const project = await projects.create({
            uid: randUID,
            name: projectName,
            statusAccess: statusAccess,
            miniature,
            layout: "{}",
        });
        console.log("Project: " + project);
        return project;
    }

    async deleteProject(projectUid) {
        if (!projectUid) {
            throw ApiError.BadRequest("project uid not exist");
        }
        console.log(`Setup project delete process; project uid: ${projectUid}`);
        const project = await projects.findOne({ where: { uid: projectUid } });
        const result = await projects.destroy({
            where: { uid: projectUid },
        });

        FsService.deleteFile(project.miniature);
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    async overwriteProject(projectUid, newLayout) {
        if (!projectUid) {
            throw ApiError.BadRequest("project uid not exist");
        }
        console.log(`Setup project rewrite; project uid: ${projectUid}`);
        const [result] = await projects.update(
            {
                layout: newLayout,
            },
            {
                where: { uid: projectUid },
            }
        );
        if (result) {
            console.log(`Updated rows: ${result}`);
            return result;
        } else {
            console.log("Row not found");
            return false;
        }
    }

    async getProject(projectUid) {
        if (!projectUid) {
            throw ApiError.BadRequest("project uid not exist");
        }
        console.log(`Setup get project; project uid: ${projectUid}`);
        const project = await projects.findOne({
            where: { uid: projectUid },
        });
        console.log(project);
        if (!project) {
            throw ApiError.BadRequest("Project not found");
        }
        console.log("Got project; " + project);
        return project;
    }

    async getProjectById(id) {
        if (!id) {
            throw ApiError.BadRequest("project id not exist");
        }
        console.log(`Setup get project; project id: ${id}`);
        const project = await projects.findOne({
            order: [["updatedAt", "DESC"]],
            where: { id },
        });
        if (!project) {
            throw ApiError.BadRequest("Project not found");
        }
        console.log("Got project; " + project);
        return project;
    }

    async getPublicProjects(page, limit) {
        console.log(`Setup get public projects`);
        const visibleProjects = await projects.findAndCountAll({
            where: { statusAccess: true },
            limit: limit,
            offset: (page - 1) * limit,
        });
        return visibleProjects;
    }

    async getListedProjects(projectsIdList, page, limit) {
        console.log(`Setup get listed projects ${projectsIdList}`);
        const listedProjects = await projects.findAndCountAll({
            where: {
                id: projectsIdList,
            },
            order: [["updatedAt", "DESC"]],
            limit: limit,
            offset: (page - 1) * limit,
        });
        return listedProjects;
    }
}

module.exports = new ProjectService();
