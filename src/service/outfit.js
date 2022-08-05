const {
  getChildLogger,
} = require('../core/logging');
const outfitRepository = require('../repository/outfitRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('outfit-service');
  this.logger.debug(message, meta);
};


const create = async ({
  bovenstukId,
  broekId,
  schoenId,
}) => {
  debugLog('maak nieuwe outfit aan', {
    bovenstukId,
    broekId,
    schoenId,
  });

  return outfitRepository.create({
    bovenstukId,
    broekId,
    schoenId,
  });
};


const updateById = (id, {
  bovenstukId,
  broekId,
  schoenId,
}) => {
  debugLog(`Updating outfit met id ${id}`);
  const updatedOutfit = outfitRepository.updateById(id, {
    bovenstukId,
    broekId,
    schoenId,
  });
  return updatedOutfit;
};

const getAll = async () => {
  debugLog('Ophalen van alle outfits');
  const data = await outfitRepository.findAll();
  const count = await data.length;
  return {
    data,
    count,
  };
};

const getById = async (id) => {
  debugLog('Ophalen van outfit met id');
  const data = await outfitRepository.findById(id);
  return data;
};

const deleteById = (id) => {
  debugLog(`Verwijderen outfit met id ${id}`);
  outfitRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};