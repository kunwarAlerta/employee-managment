const express = require("express");
const router = express.Router();

const {
  validateAddClock
} = require("../../middleware/validations/clockValidations");
const {
  validateLogin,
  validateRegister
} = require("../../middleware/validations/userValidations");


const {
  checkuserlogin, checkemployeelogin
} = require("../../middleware/auth/authenticate");

const {validateLoginEmployee,
  validateCreateEmployee
} = require("../../middleware/validations/employeeValidations");

const userController = require("../controllers/userController");
const dashboardController = require("../controllers/dashboardController");
const employeeController = require("../controllers/employeeController");
const clockedController = require("../controllers/clockedController");

router.post("/login", validateLogin, userController.login);
router.post("/register",validateRegister, userController.register);

router.get("/dashboard/get", checkuserlogin,dashboardController.getDashboardData);

router.post("/clocked/get", checkemployeelogin,clockedController.getClocked);
router.post("/clocked/add", validateAddClock ,checkemployeelogin,clockedController.createClocked);

router.post("/employee/add", validateCreateEmployee, checkuserlogin,employeeController.createEmployee);
router.post("/employee/login", validateLoginEmployee,employeeController.loginEmployee);

router.get("/employee/list",  checkuserlogin,employeeController.getEmployees);
router.get("/employee/edit/:empid", checkuserlogin,employeeController.updatePost);

module.exports = router;
