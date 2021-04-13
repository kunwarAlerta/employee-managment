const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ClockedModel = new Schema(
  {
    employee:{
        type:Schema.Types.ObjectId,
         ref:"Employee" , 
    },
    isClockedIn: {
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

const Clocked = mongoose.model("Clocked", ClockedModel);
module.exports = Clocked;
