const { broekModel } = require('../../data/models/broek');
const { getChildLogger } = require('../../core/logging');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('kledingstuk-service');
  this.logger.debug(message, meta);
};

const findAll = async () => {
  try{
    const data = await broekModel.find().exec();
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
  try{
    const data = await broekModel.find({'size': size}).exec();
    debugLog('findBySize(' + size + ') succesvol','');
    if(!data) {
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
    console.log(name);
    const broekData = await new broekModel({name: name, dropdate: dropdate, size: size});
    broekData.save();
    debugLog(broekData);
    return broekData;
  } catch (err) {
    debugLog(err);
  }
};

const updateById = async (id, {
  name,
  dropdate,
  size,
}) => {
  try{
    await broekModel.findById(id).update({name: name, dropdate: dropdate, size: size}).exec();
  } catch(err){
    debugLog(err);
  }
};

const findById = async (id) => {
  try{
    const data = await broekModel.findById(id).exec();
    debugLog('findById(' + id + ') succesvol','');
    if(!data) {
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
  try{
    const data = await broekModel.find({'name': name}).exec();
    debugLog('findByName(' + name + ') succesvol','');
    if(!data) {
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
  try{
    await broekModel.findById(id).remove().exec();
  }catch(err){
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