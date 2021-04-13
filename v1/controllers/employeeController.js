const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const common = require("../../utils/common");
const sendRes = require("../../utils/response");
const { ValidationError } = require("../../middleware/errors/errors");
const employeeService = require("../services/employeeService");

async function getEmployees(req, res, next) {
  try {
    var employees = await employeeService.getAllBySearch(req.query);
    sendRes(req, res, statusCode.SUCCESS, "", employees);
  } catch (error) {
    next(error);
  }
}

async function loginEmployee(req, res, next) {
  try {
    var sendObj = {};
    var employee = await employeeService.search({
      email: req.body.email,
    });
    if (!employee) throw new ValidationError(messages.INVALID_EMAIL_OR_PASSWORD);
    var loggedin = await common.comparePasswordHash(
      req.body.password,
      employee.password
    );
    if (!loggedin) throw new ValidationError(messages.INVALID_EMAIL_OR_PASSWORD);
    var accesstoken = await common.jwtSign(employee);
    sendObj.user = employee;
    sendObj.accessToken = accesstoken;
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_SIGNED_IN_SUCCESSFULLY,
      sendObj
    );
  } catch (error) {
    next(error);
  }
}

async function createEmployee(req, res, next) {
  try {
    var sendObj = {};
    var exists = await employeeService.search({
      email: req.body.email,
    });
    if (exists) throw new ValidationError(messages.EMAIL_EXISTS);
    var password = await common.generatePasswordHash(req.body.password);
    req.body.password = password;
    var employee = await employeeService.create(req.body);
    var accesstoken = await common.jwtSign(employee);
    sendObj.user = employee;
    sendObj.accessToken = accesstoken;
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.EMPLOYEE_CREATED_SUCCESSFULLY,
      sendObj
    );
  } catch (error) {
    next(error);
  }
}

async function updatePost(req, res, next) {
  try {
    var post = await employeeService.updateQuery({ _id: req.body._id }, req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.POST_UPDATED_SUCCESSFULLY,
      post
    );
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    var post = await employeeService.remove(req.params.postid);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.POST_DELETED_SUCCESSFULLY,
      post
    );
  } catch (error) {
    next(error);
  }
}
module.exports.getEmployees = getEmployees;
module.exports.createEmployee = createEmployee;
module.exports.loginEmployee = loginEmployee;

module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
