const {
  getChildLogger,
} = require('../core/logging');
const schoenRepository = require('../repository/kledingstukken/schoenRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('schoen-service');
  this.logger.debug(message, meta);
};


const getBySize = async (size) => {
  debugLog('Ophalen van schoenen met maat');
  const data = await schoenRepository.findBySize(size);
  return data;
};



const create = async ({
  name,
  dropdate,
  size,
}) => {
  debugLog('maak nieuwe schoen aan', {
    name,
    dropdate,
    size,
  });

  return schoenRepository.create({
    name,
    dropdate,
    size,
  });
};


const updateById = (id, {
  name,
  dropdate,
  size,
}) => {
  debugLog(`Updating schoen met id ${id}`);
  const updatedSchoen = schoenRepository.updateById(id, {
    name,
    dropdate,
    size,
  });
  return updatedSchoen;
};

const getAll = async () => {
  debugLog('Ophalen van alle schoenen');
  const data = await schoenRepository.findAll();
  const count = await data.length;
  return {
    data,
    count,
  };
};

const getById = async (id) => {
  debugLog('Ophalen van schoen met id');
  const data = await schoenRepository.findById(id);
  return data;
};

const getByName = async (name) => {
  debugLog('Ophalen van schoen met naam');
  const data = await schoenRepository.findByName(name);
  const count = await data.length;
  return {
    data,
    count,
  };
};

const deleteById = (id) => {
  debugLog(`Verwijderen schoen met id ${id}`);
  schoenRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  getByName,
  getBySize,
  create,
  updateById,
  deleteById,
};