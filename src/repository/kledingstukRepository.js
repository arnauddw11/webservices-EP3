const uuid = require('uuid');
const { getChildLogger } = require('../core/logging');
const { kledingstukModel } = require('../models/kledingstuk');

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('kledingstuk-service');
	this.logger.debug(message, meta);
};

const findAll = async () => {
  try{
    const data = await kledingstukModel.find().exec();
    debugLog('findAll succesvol',"");
    if(!data) {
      debugLog('Geen document gevonden');
      console.log('test');
      throw new Error('Geen document gevonden');
    }
    return data;
   } catch (error) {
    debugLog(`FindAll error:`, error);
     return error;
   }
};

const findById = async (id) => {
  try{
    const data = await kledingstukModel.find({'id': id}).exec();
    debugLog('findById(' + id + ') succesvol',"");
    if(!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
   } catch (error) {
    debugLog(`FindById error:`, error);
     return error;
   }
};

const findByName = async (name) => {
  try{
    const data = await kledingstukModel.find({'name': name}).exec();
    debugLog('findByName(' + name + ') succesvol',"");
    if(!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
   } catch (error) {
    debugLog(`FindByName error:`, error);
     return error;
   }
};
const create = async ({
  name,
  dropdate
}) => {
  try {
    const kledingstukData = await new kledingstukModel({name: name, dropdate: dropdate});
    kledingstukData.save();
    debugLog(kledingstukData);
    return kledingstukData;
  } catch (err) {
    debugLog(err);
  }
};

const updateById = async (id, {
  name,
  dropdate
}) => {
  try{
    await kledingstukModel.findById(id).update({name: name, dropdate: dropdate}).exec();
    } catch(err){
     debugLog(err);
  }
};

const deleteById = async (id) => {
  try{
    await kledingstukModel.findById(id).remove().exec();
  }catch(err){
    debugLog(err);
  }
};

module.exports = {
  findAll,
  findByName,
  create,
  updateById,
  findById,
  deleteById,
};