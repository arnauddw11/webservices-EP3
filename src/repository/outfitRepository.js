const {
  outfitModel,
} = require('../data/models/outfit');
const {
  schoenModel
} = require('../data/models/schoen');
const {
  broekModel
} = require('../data/models/broek');
const {
  bovenstukModel
} = require('../data/models/bovenstuk');
const {
  getChildLogger,
} = require('../core/logging');
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('outfit-service');
  this.logger.debug(message, meta);
};
const findAll = async () => {
  try {
    const data = await outfitModel.find().exec();
    const outfits = new Array();
    console.log(data[0]._id);
    for (var i = 0; i < data.length; i++) {
      outfits.push(findById(data[i]._id));
    }
    debugLog('findAll succesvol', '');
    if (!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
  } catch (error) {
    debugLog('FindAll error:', error);
    return error;
  }
};

const create = async ({
  bovenstukId,
  broekId,
  schoenId,
}) => {
  try {
    const outfitData = await new outfitModel({
      bovenstukId: bovenstukId,
      broekId: broekId,
      schoenId: schoenId,
    });
    outfitData.save();
    debugLog(outfitData);
    return outfitData;
  } catch (err) {
    debugLog(err);
  }
};

const updateById = async (id, {
  bovenstukId,
  broekId,
  schoenId,
}) => {
  try {
    await outfitModel.findById(id).update({
      bovenstukId: bovenstukId,
      broekId: broekId,
      schoenId: schoenId,
    }).exec();
  } catch (err) {
    debugLog(err);
  }
};

const findById = async (id) => {
  try {
    const data = await outfitModel.findById(id).exec();

    const bovenstuk = await bovenstukModel.findById(data.bovenstukId).exec();
    const broek = await broekModel.findById(data.broekId).exec();
    const schoen = await schoenModel.findById(data.schoenId).exec();
    const outfit = {
      bovenstuk: bovenstuk,
      broek: broek,
      schoen: schoen,
    };
    debugLog('findById(' + id + ') succesvol', '');
    if (!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return outfit;
  } catch (error) {
    debugLog('FindById error:', error);
    return error;
  }
};

const deleteById = async (id) => {
  try {
    await outfitModel.findById(id).remove().exec();
  } catch (err) {
    debugLog(err);
  }
};
module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};