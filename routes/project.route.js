const Router = require("express");
const router = new Router();
const ProjectController = require("../controllers/project.controller");

//юзать его везде, где нужна авторизация для запросов
const authMiddleware = require("../middleware/auth-middleware");

const { body } = require("express-validator");

router.post("/createnew", authMiddleware, ProjectController.createEmptyProject);
router.delete("/delete", authMiddleware, ProjectController.deleteProject);
router.get("/public-projects", /*authMiddleware, */ProjectController.getPublicProjects);
router.get("/project-info/:id", authMiddleware, ProjectController.getProjectInfo);
router.patch("/update", authMiddleware, ProjectController.updateProject);
router.get("/my-projects", authMiddleware, ProjectController.getUserProjects)
router.get('/last-update-project/:userId', authMiddleware, ProjectController.getLastUpdateProjectByUser)

module.exports = router;
