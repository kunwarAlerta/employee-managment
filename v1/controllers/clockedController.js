const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const sendRes = require("../../utils/response");
const clockedService = require("../services/clockedService");
const mongoose = require("mongoose");

async function getClocked(req, res, next) {
  try {
    var clocked = await clockedService.getAll();
    sendRes(req, res, statusCode.SUCCESS, "", clocked);
  } catch (error) {
    next(error);
  }
}

async function createClocked(req, res, next) {
  try {
    req.body.employee=mongoose.Types.ObjectId(req.body.employee);
    var clocked = await clockedService.create(req.body);
    sendRes(req, res, statusCode.SUCCESS, "", clocked);
  } catch (error) {
    next(error);
  }
}


module.exports.getClocked = getClocked;
module.exports.getClocked = getClocked;
module.exports.createClocked=createClocked;
