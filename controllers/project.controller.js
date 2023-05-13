const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const mailService = require("../service/mail-service");
const projectService = require("../service/project-service");

/*project controller
usability: do work with projects

create empty one
remove exact project
change exact project
get list of visible projects 
get one exact project
*/

class ProjectController {
    async createEmptyProject(req, res, next){
        try{
            const { projectName, statusAccess } = req.body;
            const projectData = await projectService.createEmptyProject(projectName, statusAccess);
            return res.json({ projectData });
        } catch (error) {
            next(error);
        }
    }

    async deleteProject(req, res, next){
        try{
            //add user validation
            const { projectUid } = req.body;

            const result = await projectService.deleteProject(projectUid);
            
            return res.json({ result });
        } catch(error){
            next(error);
        }
    }

    async updateProject(req, res, next){
        try{
            //add user validation
            //add valid response 
            const { projectUid, newLayout } = req.body;

            const updatedInfo = await projectService.overwriteProject(projectUid, newLayout);
            
            return res.json({ updatedInfo });
        } catch(error){
            next(error);
        }
    }

    async getProjectInfo(req, res, next){
        try{
            //add user validation
            const { id } = req.params;
            console.log(id)
            const projectInfo = await projectService.getProject(id);
            return res.json({ projectInfo });
        } catch(error){
            next(error);
        }
    }

    async getPublicProjects(req, res, next){
        try{
            const projects = await projectService.getPublicProjects();
            return res.json({ projects });
        } catch(error){
            next(error);
        }
    }
}

module.exports = new ProjectController();