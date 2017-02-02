/**
 * Created by nicolas on 26/01/17.
 */

const paramError = (baseObject, desc) => {
  for (let des of Object.keys(desc)) {
    if (baseObject[des] === undefined || typeof baseObject[des] !== desc[des].type) {
      if (desc[des].defaultValue === undefined)
        return des;
      baseObject[des] = desc.default;
    }
  }
};

const paramExtract = (baseObject, params) => {
  let validParams = {};
  for (let param of params) {
    if (baseObject[param] !== undefined)
      validParams[param] = baseObject[param];
  }
  return validParams;
};

module.exports = {
  paramError,
  paramExtract
};