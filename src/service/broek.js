const {
  getChildLogger
} = require('../core/logging');
const broekRepository = require('../repository/kledingstukken/broekRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('familie-service');
  this.logger.debug(message, meta);
};


const getBySize = async (id) => {
  debugLog('Ophalen van broeken met maat');
  const data = await broekRepository.findBySize(size);
  return data;
}



const create = async ({
  name,
  dropdate
}) => {
  debugLog('maak nieuwe broek aan', {
    name,
    dropdate
  });

  return broekRepository.create({
    name,
    dropdate
  });
};


const updateById = (id, {
  name,
  dropdate
}) => {
  debugLog(`Updating broek met id ${id}`);
  const updatedBroek = broekRepository.updateById(id, {
    name,
    dropdate
  });
  return updatedBroek;
};


module.exports = {
  getBySize,
  create,
  updateById,
};