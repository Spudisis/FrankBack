const Router = require("express");
const router = new Router();
const person = require("./person.route");
const project = require("./project.route");
const buildsys = require("./build.route");
const templates = require("./templates.route");

router.use("/person", person);
router.use("/projects", project);
router.use("/build-system", buildsys);
router.use("/templates", templates);

module.exports = router;
