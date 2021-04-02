const express = require("express");
const router = express.Router();

const {
  validateLogin,
  validateRegister
} = require("../../middleware/validations/userValidations");

const {
  checkuserlogin
} = require("../../middleware/auth/authenticate");

const {
  validateCreateEmployee
} = require("../../middleware/validations/employeeValidations");

const userController = require("../controllers/userController");
const employeeController = require("../controllers/employeeController");

router.post("/login", validateLogin, userController.login);
router.post("/register",validateRegister, userController.register);


router.post("/employee/add", validateCreateEmployee, checkuserlogin,employeeController.createEmployee);
router.post("/employee/list",  checkuserlogin,employeeController.getEmployees);
// router.get("/employee/edit/:empid", checkuserlogin,employeeController.createOrder);
// router.put("/employee/update/:empid", validateAddEmployee , checkuserlogin,employeeController.createOrder);

module.exports = router;
