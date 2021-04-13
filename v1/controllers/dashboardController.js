const statusCode = require("../../utils/statusCodes");
const sendRes = require("../../utils/response");
const employeeService = require("../services/employeeService");
const clockedService = require("../services/clockedService");

async function getDashboardData(req, res, next) {
  try {

   const now = new Date();
   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var clockedInCount= await clockedService.countDocument({isClockedIn:true });
    var clockedOutCount= await clockedService.countDocument({isClockedIn:false });
    var employeeCount = await employeeService.countDocument();

   var TodayClockedInCount= await clockedService.countDocument({isClockedIn:true,created: {$gte: today} });
   var TodayClockedOutCount= await clockedService.countDocument({isClockedIn:false,created: {$gte: today} });

   var dashboardData= {clockedInCount ,clockedOutCount ,employeeCount,TodayClockedInCount,TodayClockedOutCount};
    sendRes(req, res, statusCode.SUCCESS, "", dashboardData);
  } catch (error) {
    next(error);
  }
}

module.exports.getDashboardData = getDashboardData;