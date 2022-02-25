'use strict';

const authorManager = require('ep_etherpad-lite/node/db/AuthorManager');

let logger = {};
for (const level of ['debug', 'info', 'warn', 'error']) {
  logger[level] = console[level].bind(console, 'ep_user_displayname:');
}
let settings;

exports.clientVars = async (hookName, {socket}) => {
  if (settings == null) return;
  const {user = {}} = socket.client.request.session;
  const {displayname, displaynameChangeable: changeable = settings.changeableDefault} = user;
  return {ep_user_displayname: {changeable: displayname == null || !!changeable}};
};

exports.handleMessage = async (hookName, {message, socket, sessionInfo: {authorId}}) => {
  logger.debug(hookName);
  if (settings == null) return;
  const {user = {}} = socket.client.request.session;
  const {displayname, displaynameChangeable: changeable = settings.changeableDefault} = user;
  if (displayname == null) return;
  const {type, data: {type: dType} = {}} = message || {};
  if (type === 'CLIENT_READY') {
    // context.sessionInfo was added in Etherpad 1.9.0.
    // TODO: author ID might come from session ID, not token.
    if (authorId == null) authorId = await authorManager.getAuthor4Token(message.token);
    if (changeable && await authorManager.getAuthorName(authorId) != null) return;
    if (message.userInfo) { // Etherpad >= 1.8.15.
      if (!changeable || !message.userInfo.name) {
        message.userInfo.name = displayname;
        logger.debug('mutated CLIENT_READY:', message);
      }
    } else {
      await authorManager.setAuthorName(authorId, displayname); // Etherpad < 1.8.15.
      logger.debug('updated author displayname:', displayname);
    }
  } else if (type === 'COLLABROOM' && dType === 'USERINFO_UPDATE' && !changeable) {
    const {userInfo = {}} = message.data;
    userInfo.name = displayname;
  }
};

exports.init_ep_user_displayname = async (hookName, {logger: l}) => {
  if (l != null) logger = l;
};

exports.loadSettings = async (hookName, context) => {
  const {settings: {requireAuthentication, ep_user_displayname: s = {}}} = context;
  settings = null;
  if (!requireAuthentication) {
    logger.warn('disabled because requireAuthentication is false');
    return;
  }
  settings = {
    changeableDefault: false,
    ...s,
  };
  logger.info('configured:', settings);
};
