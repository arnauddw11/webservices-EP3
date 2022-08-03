const {
  getChildLogger
} = require('../core/logging');
const broekRepository = require('../repository/kledingstukken/broekRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('familie-service');
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Ophalen van alle broeken');
  const data = await broekRepository.findAll();
  const count = await data.length;
  return {
    data,
    count
  };
};

const getById = async (id) => {
  debugLog('Ophalen van broek met id');
  const data = await broekRepository.findById(id);
  return data;
}

const getBySize = async (id) => {
  debugLog('Ophalen van broeken met maat');
  const data = await broekRepository.findBySize(size);
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
  getBySize,
  create,
  updateById,
  deleteById,
  getByName,
};