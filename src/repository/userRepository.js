const {
  getChildLogger,
} = require('../core/logging');
const {
  userModel,
} = require('../data/models/user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('user-service');
  this.logger.debug(message, meta);
};

const findAll = async () => {
  try {
    const data = await userModel.find().exec();
    debugLog('findAll succesvol', '');
    if (!data) {
      debugLog('Geen document gevonden');
      console.log('test');
      throw new Error('Geen document gevonden');
    }
    return data;
  } catch (error) {
    debugLog('FindAll error:', error);
    return error;
  }
};

const findById = async (id) => {
  try {
    const data = await userModel.findById(id).exec();
    debugLog('findById(' + id + ') succesvol', '');
    if (!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
  } catch (error) {
    debugLog('FindById error:', error);
    return error;
  }
};

const findByEmail = async (email) => {
  try {
    const data = await userModel.findOne({
      email: email,
    }).exec();
    debugLog('findByEmail(' + data.email + ') succesvol', '');
    if (!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
  } catch (error) {
    debugLog('FindByEmail error:', error);
    return error;
  }
};
const create = async ({
  name,
  passwordHash,
  email,
  roles,
}) => {
  try {
    const rolesString = JSON.stringify(roles);
    const userData = new userModel({
      name: name,
      password: passwordHash,
      email: email,
      roles: rolesString,
    });
    userData.save();
    debugLog(userData);
    return userData;
  } catch (err) {
    debugLog(err);
  }
};

const updateById = async (id, {
  name,
  email,
}) => {
  try {
    await userModel.findById(id).update({
      name: name,
      email: email,
    }).exec();
  } catch (err) {
    debugLog(err);
  }
};

const deleteById = async (id) => {
  try {
    await userModel.findById(id).remove().exec();
  } catch (err) {
    debugLog(err);
  }
};

module.exports = {
  findAll,
  findByEmail,
  create,
  updateById,
  findById,
  deleteById,
};