const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const mailService = require("../service/mail-service");

/*project controller
usability: do work with projects

create empty one
remove exact project
change exact project
get list of visible projects 
get one exact project
*/

class ProjectController {
    
}

module.exports = new ProjectController();