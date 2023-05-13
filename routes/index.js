const Router = require("express");
const router = new Router();
const person = require("./person.route");
const project = require("./project.router")

router.use("/person", person);
router.use("/projects", project)

module.exports = router;
