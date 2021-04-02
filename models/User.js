const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = new Schema(
  {
    isApprovedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      index: true,
    },
    password: {
      type: String,
      index: true,
    },
    access: [
      {
        module: { type: String, default: null },
        moduleCode: { type: Number, default: 0 },
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        filter: { type: Boolean, default: false },
        sort: { type: Boolean, default: false },
        setStatus: { type: Boolean, default: false },
      },
    ],
    role: {
      type: String,
      enum: ["ADMIN","USER"],
    },
    accessToken: {
      type: String,
      index: true,
      default: null,
    },
    resetToken: { type: String, default: null },
    resetTokenDate: { type: Date, default: null },
    isApproved: {
      type: Boolean,
      default: null,
    },
    isApprovedAt: {
      type: Date,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
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
UserModel.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.__v;
  },
});

const Admin = mongoose.model("User", UserModel);
module.exports = Admin;
