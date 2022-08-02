const {
  getChildLogger
} = require('../core/logging');
const kledingstukRepository = require('../repository/kledingstukRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('familie-service');
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Ophalen van alle kledingstukken');
  const data = await kledingstukRepository.findAll();
  const count = await data.length;
  return {
    data,
    count
  };
};

const getById = async (id) => {
  debugLog('Ophalen van kledingstuk met id');
  const data = await kledingstukRepository.findById(id);
  return data;
}

const getByName = async (name) => {
  debugLog('Ophalen van kledingstuk met naam');
  const data = await kledingstukRepository.findByName(name);
  const count = await data.length;
  return {
    data,
    count
  };
};


const create = async ({
  name,
  dropdate
}) => {
  debugLog('maak nieuw kledingstuk aan', {
    name,
    birthdate
  });

  return kledingstukRepository.create({
    name,
    dropdate
  });
};


const updateById = (id, {
  name,
  dropdate
}) => {
  debugLog(`Updating kledingstuk met id ${id}`);
  const updatedKledingstuk = kledingstukRepository.updateById(id, {
    name,
    dropdate
  });
  return updatedKledingstuk;
};


const deleteById = (id) => {
  debugLog(`Verwijderen kledingstuk met id ${id}`);
  kledingstukRepository.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};