const {
  getChildLogger
} = require('../core/logging');
const bovenstukRepository = require('../repository/kledingstukken/bovenstukRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('familie-service');
  this.logger.debug(message, meta);
};


const getBySize = async (id) => {
  debugLog('Ophalen van bovenstukken met maat');
  const data = await bovenstukRepository.findBySize(size);
  return data;
}

const create = async ({
  name,
  dropdate
}) => {
  debugLog('maak nieuw bovenstuk aan', {
    name,
    dropdate
  });

  return bovenstukRepository.create({
    name,
    dropdate
  });
};


const updateById = (id, {
  name,
  dropdate
}) => {
  debugLog(`Updating bovenstuk met id ${id}`);
  const updatedBovenstuk = bovenstukRepository.updateById(id, {
    name,
    dropdate
  });
  return updatedBovenstuk;
};


module.exports = {
  getBySize,
  create,
  updateById,
};