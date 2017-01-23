/**
 * Created by nicolas on 23/01/17.
 */

module.exports = (code, message, infos = {}) => {
  const error = {
    code: code,
    message: message,
    infos: infos
  };
  return error;
};