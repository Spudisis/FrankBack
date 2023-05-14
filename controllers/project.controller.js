const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const mailService = require("../service/mail-service");
const projectService = require("../service/project-service");
const TokenService = require("../service/token-service");
const OwnersService = require("../service/owners-service");

/*project controller
usability: do work with projects

create empty one
remove exact project
change exact project
get list of visible projects
get one exact project
*/

class ProjectController {

    async createEmptyProject(req, res, next) {
        try {
            //add response with error if needed
            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)['id'];

            const { projectName, statusAccess } = req.body;
            const projectData = await projectService.createEmptyProject(projectName,statusAccess);

            if(projectData){
                const ownerData = await OwnersService.addOwner(userId, projectData.id);
                if(ownerData){
                    return res.json({ 
                        projectUid: projectData.uid
                    });
                }
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteProject(req, res, next) {
        try {
            //add response with error if needed
            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)['id'];

            const { projectUid } = req.body;
            const project = await projectService.getProject(projectUid);

            if(project.id){
                const validatedOwner = await OwnersService.validateOwner(userId, project.id);
                if(validatedOwner){
                    const result = await projectService.deleteProject(projectUid);
                    if(result){
                        return res.json({ result:200 });
                    }
                }
            }
        } catch (error) {
            next(error);
        }
    }

    async updateProject(req, res, next) {
        try {
            //add response with error if needed
            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)['id'];

            const { projectUid, newLayout } = req.body;
            const project = await projectService.getProject(projectUid);

            if(project.id){
                const validatedOwner = await OwnersService.validateOwner(userId, project.id);
                if(validatedOwner){
                    const updatedInfo = await projectService.overwriteProject(projectUid, newLayout);
                    if(updatedInfo){
                        return res.json({ result:200 });
                    }else{
                        return res.json({ result:503 });
                    }
                }else{
                    return res.json({ result:503 });
                }
            }else{
                return res.json({ result:503 });
            }
        } catch (error) {
            next(error);
        }
    }

    async getProjectInfo(req, res, next) {
        try {
            //add response with error if needed
            const { id } = req.params;

            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)['id'];

            const projectInfo = await projectService.getProject(id);
            delete projectInfo.id;

            if(projectInfo.id){
                const validatedOwner = await OwnersService.validateOwner(userId, projectInfo.id);
                if(validatedOwner){
                    return res.json({ 
                        uid: projectInfo.uid,
                        name: projectInfo.name,
                        miniature: projectInfo.miniature,
                        layout: projectInfo.layout,
                        creationDate: projectInfo.createdAt,
                        lastUpdateTime: projectInfo.updatedAt,
                        statusAccess: projectInfo.statusAccess
                    });
                }else{
                    if(projectInfo.statusAccess){
                        return res.json({ 
                            uid: projectInfo.uid,
                            name: projectInfo.name,
                            miniature: projectInfo.miniature,
                            layout: projectInfo.layout,
                            lastUpdateTime: projectInfo.updatedAt,
                        });
                    } else {
                        return res.json({ result:503 }); 
                    }
                }
            }else{
                return res.json({ result:503 });
            }
        } catch (error) {
            next(error);
        }
    }

    async getPublicProjects(req, res, next) {
        try {
            const pagination = req.query;

            const projects = await projectService.getPublicProjects(pagination.p, pagination.l);
            return res.json({ projects });
        } catch (error) {
            next(error);
        }
    }

    async getUserProjects(req, res, next){
        try {
            const pagination = req.query;

            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)['id'];

            const ownerRecords = await OwnersService.getOwnerProjectsList(userId);

            const projectsIds = []

            ownerRecords.forEach(element => {
                if(element.dataValues.projectId != null)
                    projectsIds.push(element.dataValues.projectId);
            });

            if(ownerRecords.length > 0){
                const userProjects = await projectService.getListedProjects(projectsIds, pagination.p, pagination.l)
                if(userProjects){
                    return res.json({ userProjects });
                }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProjectController();
