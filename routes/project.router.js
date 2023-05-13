const Router = require("express");
const router = new Router();
const PersonController = require("../controllers/project.controller");

//юзать его везде, где нужна авторизация для запросов
const authMiddleware = require("../middleware/auth-middleware");

const { body } = require("express-validator");



module.exports = router;
