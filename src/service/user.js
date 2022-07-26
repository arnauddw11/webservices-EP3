const { getChildLogger } = require('../core/logging');
const { verifyPassword, hashPassword } = require('../core/password');
const { generateJWT, verifyJWT } = require('../core/jwt');
const Role = require('../core/roles');
const ServiceError = require('../core/serviceError');
const userRepository = require('../repository/userRepository');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger('user-service');
  this.logger.debug(message, meta);
};

const makeExposedUser = ({
  name,
  email,
  roles,
}) => ({
  name,
  email,
  roles,
});


const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  debugLog('Aanmaken van login data succesvol');

  return {
    user: makeExposedUser(user),
    token,
  };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw ServiceError.unauthorized('Gegeven email en password matchen niet');
  }
  const passwordValid = await verifyPassword(password, user.password);  
  if (!passwordValid) {
    throw ServiceError.unauthorized('Gegeven email en password matchen niet');
  }
  debugLog('Login succesvol');
  return await makeLoginData(user);
};

const register = async ({
  name,
  email,
  password,
}) => {
  debugLog('Creeër een nieuwe user', { name });
  const passwordHash = await hashPassword(password);
  const user = await userRepository.create({
    name,
    passwordHash,
    email,
    roles: [Role.ADMIN],
  });
  debugLog('User succesvol gecreeërd');
  return await makeLoginData(user);
};


const getAll = async () => {
  debugLog('Alle users ophalen');
  const data = await userRepository.findAll();
  const count = data.length;
  debugLog(`getAll succesvol, ${count} users gevonden`);
  return {
    data: data.map(makeExposedUser),
    count,
  };
};


const getById = async (id) => {
  debugLog(`Haal user met id ${id}`);
  const user = await userRepository.findById(id);


  if (!user) {
    throw ServiceError.notFound(`Geen user met id ${id} bestaat`, { id });
  }
  debugLog(`User met id ${id} gevonden`);
  return makeExposedUser(user);
};
const getByEmail = async (email) => {
  debugLog(`Haal user met email ${email}`);
  const user = await userRepository.findByEmail(email);


  if (!user) {
    throw ServiceError.notFound(`Geen user met email ${email} bestaat`, { email });
  }
  debugLog(`User met email ${email} gevonden`);
  return makeExposedUser(user);
};
const updateById = async (id, { name, email }) => {
  debugLog(`Updating user met id ${id}`, { name, email });
  const user = await userRepository.updateById(id, { name, email });
  debugLog(`User met id ${id} succesvol geupdate`);
  return makeExposedUser(user);
};


const deleteById = async (id) => {
  const deleted = await userRepository.deleteById(id);
  debugLog(`User met id ${id} succesvol verwijderd`);
  if (!deleted) {
    throw ServiceError.notFound(`Geen user met id ${id} bestaat`, { id });
  }
};

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized('Moet ingelogd zijn');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
  }

  const authToken = authHeader.substr(7);
  try {
    const {
      roles, userId,
    } = await verifyJWT(authToken);

    return {
      userId,
      roles,
      authToken,
    };
  } catch (error) {
    const logger = getChildLogger('user-service');
    logger.error(error.message, { error });
    throw ServiceError.unauthorized(error.message);
  }
};


const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden('Je hebt geen toelating om dit stuk van de app te zien');
  }
};

module.exports = {
  login,
  register,
  getAll,
  getById,
  getByEmail,
  updateById,
  deleteById,
  checkAndParseSession,
  checkRole,
};