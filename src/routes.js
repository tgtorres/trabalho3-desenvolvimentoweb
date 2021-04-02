const express = require("express");
const routes = express.Router();

const MemberController = require("./controllers/MemberController");
const ActivityController = require("./controllers/ActivityController");

routes.get("/members", MemberController.index);
routes.post("/members", MemberController.store);
routes.get("/members/:id", MemberController.show);
routes.put("/members/:id", MemberController.update);
routes.delete("/members/:id", MemberController.destroy);

routes.get("/activities", ActivityController.index);
routes.post("/activities", ActivityController.store);
routes.get("/activities/:id", ActivityController.show);
routes.put("/activities/:id", ActivityController.update);
routes.delete("/activities/:id", ActivityController.destroy);

module.exports = routes;