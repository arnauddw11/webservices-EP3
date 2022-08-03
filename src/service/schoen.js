const {
  getChildLogger
} = require('../../core/logging');
const schoenRepository = require('../repository/kledingstukken/broekRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('familie-service');
  this.logger.debug(message, meta);
};


const getBySize = async (id) => {
  debugLog('Ophalen van schoenen met maat');
  const data = await schoenRepository.findBySize(size);
  return data;
}



const create = async ({
  name,
  dropdate
}) => {
  debugLog('maak nieuwe schoen aan', {
    name,
    dropdate
  });

  return schoenRepository.create({
    name,
    dropdate
  });
};


const updateById = (id, {
  name,
  dropdate
}) => {
  debugLog(`Updating schoen met id ${id}`);
  const updatedSchoen = schoenRepository.updateById(id, {
    name,
    dropdate
  });
  return updatedSchoen;
};


module.exports = {
  getBySize,
  create,
  updateById,
};