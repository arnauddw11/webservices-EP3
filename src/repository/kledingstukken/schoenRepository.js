const {
  schoenModel,
} = require('../../data/models/schoen');
const {
  getChildLogger,
} = require('../../core/logging');
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('kledingstuk-service');
  this.logger.debug(message, meta);
};
const findAll = async () => {
  try{
    const data = await schoenModel.find().exec();
    debugLog('findAll succesvol','');
    if(!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
  } catch (error) {
    debugLog('FindAll error:', error);
    return error;
  }
};
const findBySize = async (size) => {
  try {
    const data = await schoenModel.find({
      'size': size,
    }).exec();
    debugLog('findBySize(' + size + ') succesvol', '');
    if (!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
  } catch (error) {
    debugLog('FindBySize error:', error);
    return error;
  }
};

const create = async ({
  name,
  dropdate,
  size,
}) => {
  try {
    const schoenData = await new schoenModel({
      name: name,
      dropdate: dropdate,
      size: size,
    });
    schoenData.save();
    debugLog(schoenData);
    return schoenData;
  } catch (err) {
    debugLog(err);
  }
};

const updateById = async (id, {
  name,
  dropdate,
  size,
}) => {
  try {
    await schoenModel.findById(id).update({
      name: name,
      dropdate: dropdate,
      size: size,
    }).exec();
  } catch (err) {
    debugLog(err);
  }
};
const findById = async (id) => {
  try {
    const data = await schoenModel.findById(id).exec();
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
const findByName = async (name) => {
  try {
    const data = await schoenModel.find({
      'name': name,
    }).exec();
    debugLog('findByName(' + name + ') succesvol', '');
    if (!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
  } catch (error) {
    debugLog('FindByName error:', error);
    return error;
  }
};

const deleteById = async (id) => {
  try {
    await schoenModel.deleteOne({_id: id}).exec();
  } catch (err) {
    debugLog(err);
  }
};
module.exports = {
  findAll,
  findById,
  findByName,
  findBySize,
  create,
  updateById,
  deleteById,
};