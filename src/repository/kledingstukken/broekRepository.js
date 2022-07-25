const uuid = require('uuid');
const { broekModel } = require('../../models/broek');

const findBySize = async (size) => {
  try{
    const data = await broekModel.find({'size': size}).exec();
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
    const broekData = await new broekModel({id: id, name: name, dropdate: dropdate, size: size});
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

module.exports = {
  findBySize,
  create,
  updateById,
};