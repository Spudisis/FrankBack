const Router = require("express");
const router = new Router();
const BuildController = require("../controllers/build.controller");

//юзать его везде, где нужна авторизация для запросов
const authMiddleware = require("../middleware/auth-middleware");

const { body } = require("express-validator");

router.post("/start-build", /*authMiddleware, */BuildController.startBuild);

module.exports = router;