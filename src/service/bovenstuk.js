const {
  getChildLogger
} = require('../core/logging');
const bovenstukRepository = require('../repository/kledingstukken/bovenstukRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('bovenstuk-service');
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

const getAll = async () => {
  debugLog('Ophalen van alle bovenstukken');
  const data = await bovenstukRepository.findAll();
  const count = await data.length;
  return {
    data,
    count
  };
};

const getById = async (id) => {
  debugLog('Ophalen van bovenstuk met id');
  const data = await bovenstukRepository.findById(id);
  return data;
}

const getByName = async (name) => {
  debugLog('Ophalen van bovenstuk met naam');
  const data = await bovenstukRepository.findByName(name);
  const count = await data.length;
  return {
    data,
    count
  };
};

const deleteById = (id) => {
  debugLog(`Verwijderen bovenstuk met id ${id}`);
  bovenstukRepository.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  getByName,
  getBySize,
  create,
  updateById,
  deleteById,
};