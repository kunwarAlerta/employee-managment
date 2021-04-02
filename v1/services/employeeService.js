const Employee = require("../../models/Employee");
const constants = require("../../utils/constants");
async function getAll(params) {
  try {
    let skip = parseInt(params.pageNo - 1) || constants.DEFAULT_SKIP;
    let limit = constants.DEFAULT_LIMIT;
    skip = skip * limit;
    let sortKey = params.sortKey || "createdAt";
    let sortType = params.sortType || 1;

    var employeedata = await Employee.aggregate([
      { $match: { isDeleted: false } },
      { $sort: { [sortKey]: sortType } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { pageNo: params.pageNo } },
          ],
          employees: [{ $skip: skip }, { $limit: limit }], // add projection here wish you re-shape the docs
        },
      },
      { $unwind: "$metadata" },
    ]);
    return employeedata;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQueryAll({}, params) {
  try {
    var employees = await Employee.updateMany({}, params);
    return employees;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBySearch(params) {
  try {
    let skip = parseInt(params.pageNo - 1) || constants.DEFAULT_SKIP;
    let limit = constants.DEFAULT_LIMIT;
    skip = skip * limit;
    let sortKey = params.sortKey || "createdAt";
    let sortType = params.sortType || 1;

    var employeedata = await Employee.aggregate([
      {
        $match: {
          isDeleted: false,
          $or: [
            { email: { $regex: new RegExp(`^${params.search}`, "i") } },
            { name: { $regex: new RegExp(`^${params.search}`, "i") } },
            { city: { $regex: new RegExp(`^${params.search}`, "i") } },
          ],
        },
      },
      { $sort: { [sortKey]: sortType } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { pageNo: params.pageNo } },
          ],
          users: [{ $skip: skip }, { $limit: limit }],
        },
      },
      { $unwind: { path: "$metadata", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          employees: 1,
          metadata: {
            $ifNull: ["$metadata", { $literal: { total: 0, pageNo: 0 } }],
          },
        },
      },
    ]);
    return employeedata;
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    var employees = await Employee.create(body);
    return employees;
  } catch (error) {
    throw new Error(error);
  }
}

async function countDocument() {
  try {
    var countEmployee = await Employee.countDocuments({ isDeleted: false });
    return countEmployee;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var employee = await Employee.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    });scroll
    return employee;
  } catch (error) {
    throw new Error(error);
  }
}
async function searchQuery(key, params) {
  try {
    var employee = await Employee.findById(key, params);
    return employee;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var employee = await Employee.findOne(body);
    return employee;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    return await Employee.findById(id);
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var employee = await Employee.findByIdAndDelete(id);
    return employee;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.getAll = getAll;
module.exports.updateQueryAll = updateQueryAll;
module.exports.getAllBySearch = getAllBySearch;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
module.exports.updateQuery = updateQuery;
module.exports.searchQuery = searchQuery;
module.exports.countDocument = countDocument;
module.exports.remove = remove;
