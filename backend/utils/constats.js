const path = require('path');

const regexAvatarLink = /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i;
const regexLink = /^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im;

const PATH_FRONTEND = (path.join(__dirname, '../../frontend'));

const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
module.exports = {
  regexAvatarLink, regexLink, allowedCors, DEFAULT_ALLOWED_METHODS, PATH_FRONTEND,
};
