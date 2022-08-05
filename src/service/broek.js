const {
  getChildLogger
} = require('../core/logging');
const broekRepository = require('../repository/kledingstukken/broekRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('broek-service');
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

const getBySize = async (size) => {
  debugLog('Ophalen van broeken met maat');
  const data = await broekRepository.findBySize(size);
  return data;
}



const create = async ({
  name,
  dropdate,
  size
}) => {
  console.log(name);
  debugLog('maak nieuwe broek aan', {
    name,
    dropdate,
    size
  });

  return broekRepository.create({
    name,
    dropdate,
    size
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

const getById = async (id) => {
  debugLog('Ophalen van broek met id');
  const data = await broekRepository.findById(id);
  return data;
}

const getByName = async (name) => {
  debugLog('Ophalen van broek met naam');
  const data = await broekRepository.findByName(name);
  const count = await data.length;
  return {
    data,
    count
  };
};

const deleteById = (id) => {
  debugLog(`Verwijderen broek met id ${id}`);
  broekRepository.deleteById(id);
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