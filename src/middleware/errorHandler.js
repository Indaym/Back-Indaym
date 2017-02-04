/**
 * Created by nicolas on 23/01/17.
 */

class errorCustom {
  constructor(code, message, infos = []) {
    this.code = code;
    this.message = message;
    this.infos = infos;
  }
}

const errorExecutor = (next, error) => {
  if (error !== undefined && error instanceof errorCustom)
    next(error);
  else
    next(new errorCustom(500, "Internal Server Error"))
};

module.exports = {
  errorCustom,
  errorExecutor
};