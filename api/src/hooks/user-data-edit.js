// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const crypto = require('crypto');

const gravatarUrl = 'https://s.gravatar.com/avatar'
const query ='s=60';

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { email, password,first_name } = context.data;
    const hash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    const avatar = `${gravatarUrl}/${hash}?${query}`;

    const userData = {
      email,
      password,
      first_name,
      avatar
    };
    context.data = userData
    return context;
  };
};
