const Clocked = require("../../models/Clocked");
async function getAll() {
  try {
    var clocked = await Clocked.find({isDeleted:false}).populate('employee').exec();
    return clocked;
  } catch (error) {
    throw new Error(error);
  }
}


async function updateQueryAll({}, params) {
  try {
    var clocked = await Clocked.updateMany({}, params);
    return clocked;
  } catch (error) {
    throw new Error(error);
  }
}

async function create(body) {
  try {
    var employees = await Clocked.create(body);
    return employees;
  } catch (error) {
    throw new Error(error);
  }
}

async function countDocument(params) {
  try {
    var params = {...params ,isDeleted: false };
    var countClocked = await Clocked.countDocuments(params);
    return countClocked;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var clocked = await Clocked.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    });scroll
    return clocked;
  } catch (error) {
    throw new Error(error);
  }
}
async function searchQuery(key, params) {
  try {
    var clocked = await Clocked.findById(key, params);
    return clocked;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    await Clocked.findOne(body);
    return clocked;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
      var clocked = await Clocked.findById(id);
      return clocked;
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var clocked = await Clocked.findByIdAndDelete(id);
    return clocked;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.getAll = getAll;
module.exports.updateQueryAll = updateQueryAll;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
module.exports.updateQuery = updateQuery;
module.exports.searchQuery = searchQuery;
module.exports.countDocument = countDocument;
module.exports.remove = remove;
