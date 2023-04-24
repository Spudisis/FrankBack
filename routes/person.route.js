const Router = require("express");
const router = new Router();
const PersonController = require("../controllers/person.controller");

//юзать его везде, где нужна авторизация для запросов
const authMiddleware = require("../middleware/auth-middleware");

const { body } = require("express-validator");
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  PersonController.registration
);
router.post("/login", PersonController.login);
router.post("/logout", PersonController.logout);
router.get("/activate/:link", PersonController.activate);
router.get("/refresh", PersonController.refresh);
router.get("/user/:id", authMiddleware, PersonController.getInfoUser);
router.post("/getCodeRestore", PersonController.getCodeRestore);
router.patch("/restorePassword", PersonController.restorePassword);
module.exports = router;
