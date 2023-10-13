const AuthenticationTokenManager = require('../../../Applications/security/AuthenticationTokenManager');

module.exports = (container) => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenManager = container.getInstance(AuthenticationTokenManager.name);
    const { id, email } = await tokenManager.decodePayload(token);
    req.authID = id;
    req.authEmail = email;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('not loggedin');
  } finally {
    next();
  }
};
