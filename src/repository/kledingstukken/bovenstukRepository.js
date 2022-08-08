const { bovenstukModel } = require('../../data/models/bovenstuk');
const { getChildLogger } = require('../../core/logging');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('kledingstuk-service');
  this.logger.debug(message, meta);
};

const findBySize = async (size) => {
  try{
    const data = await bovenstukModel.find({'size': size}).exec();
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
    const bovenstukData = await new bovenstukModel({name: name, dropdate: dropdate, size: size});
    bovenstukData.save();
    debugLog(bovenstukData);
    return bovenstukData;
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
    await bovenstukModel.findById(id).update({name: name, dropdate: dropdate, size: size}).exec();
  } catch(err){
    debugLog(err);
  }
};
const findById = async (id) => {
  try{
    const data = await bovenstukModel.findById(id).exec();
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
    const data = await bovenstukModel.find({'name': name}).exec();
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
    await bovenstukModel.deleteOne({_id: id}).exec();
  }catch(err){
    debugLog(err);
  }
};
const findAll = async () => {
  try{
    const data = await bovenstukModel.find().exec();
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

module.exports = {
  findAll,
  findById,
  findByName,
  findBySize,
  create,
  updateById,
  deleteById,
};