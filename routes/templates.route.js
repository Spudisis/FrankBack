const Router = require("express");
const router = new Router();
const TemplatesController = require("../controllers/templates.controller");

//юзать его везде, где нужна авторизация для запросов
const authMiddleware = require("../middleware/auth-middleware");

const { body } = require("express-validator");

router.get("/getType", authMiddleware, TemplatesController.getTemplates);
router.get("/getUser", authMiddleware, TemplatesController.getTemplatesUser);
router.post("/create", authMiddleware, TemplatesController.createTemplate);
router.patch("/update", authMiddleware, TemplatesController.updateTemplate);
router.delete("/delete", authMiddleware, TemplatesController.deleteTemplate);

module.exports = router;
