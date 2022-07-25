const uuid = require('uuid');
const { bovenstukModel } = require('../../models/bovenstuk');

const findBySize = async (size) => {
  try{
    const data = await bovenstukModel.find({'size': size}).exec();
    debugLog('findBySize(' + size + ') succesvol',"");
    if(!data) {
      debugLog('Geen document gevonden');
      throw new Error('Geen document gevonden');
    }
    return data;
   } catch (error) {
    debugLog(`FindBySize error:`, error);
     return error;
   }
};

const create = async ({
  name,
  dropdate,
  size,
}) => {
  try {
    const id = uuid.v4();
    const bovenstukData = await new bovenstukModel({id: id, name: name, dropdate: dropdate, size: size});
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

module.exports = {
  findBySize,
  create,
  updateById,
};