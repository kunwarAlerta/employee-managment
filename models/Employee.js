const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeModel = new Schema(
  {
    name: {
       type:String,
    },
    email:{
      type:String,
    },
    password:{
      type:String,
    },
    country: {
      type:String,
    },
    city: {
      type:String,
    },
    jobDescription: {
      type:String,
    },
    weeklyPerformance: {
      type:Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Employee = mongoose.model("Employee", EmployeeModel);
module.exports = Employee;
