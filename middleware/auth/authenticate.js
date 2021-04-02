const jwt = require("jsonwebtoken");
const config = require("config");
const { noAuth } = require("../errors/errors");
const messages = require("../../utils/messages");

async function checkuserlogin(req,res,next) {
  try{
  var token =  req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) throw new noAuth(messages.UNAUTHORIZED)
     var verify= await jwt.verify(token, config.get('jwtsecret'));
  if(!verify) throw new noAuth(messages.UNAUTHORIZED)
     var user= await userService.get(verify._id);
    if(!user) throw new noAuth(messages.UNAUTHORIZED)
    req.user=user;
    next()
  }
  catch (error) {
      next(error);
  }
}
module.exports.checkuserlogin=checkuserlogin;