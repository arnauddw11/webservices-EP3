const uuid = require('uuid');
const { schoenModel } = require('../../data/models/schoen');

const findBySize = async (size) => {
  try{
    const data = await schoenModel.find({'size': size}).exec();
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
    const schoenData = await new schoenData({id: id, name: name, dropdate: dropdate, size: size});
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
  try{
    await schoenModel.findById(id).update({name: name, dropdate: dropdate, size: size}).exec();
    } catch(err){
     debugLog(err);
  }
};

module.exports = {
  findBySize,
  create,
  updateById,
};