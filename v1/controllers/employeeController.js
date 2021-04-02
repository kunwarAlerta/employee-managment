const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const sendRes = require("../../utils/response");
const { ValidationError } = require("../../middleware/errors/errors");
const employeeService = require("../services/employeeService");

async function getEmployees(req, res, next) {
  try {
    var posts = await employeeService.getAllBySearch(req.query);
    sendRes(req, res, statusCode.SUCCESS, "", posts);
  } catch (error) {
    next(error);
  }
}

async function createEmployee(req, res, next) {
  try {
    var post = await employeeService.create(req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.ORDER_CREATED_SUCCESSFULLY,
      post
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
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
