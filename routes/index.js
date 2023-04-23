const Router = require("express");
const router = new Router();
const person = require("./person.route");

router.use("/person", person);

module.exports = router;
