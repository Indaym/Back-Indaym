module.exports.createRes = (res, code, payload) => {
  if (payload)
    return res.status(code).json(payload);

  switch (code) {
    case 500:
      payload = { status: 'error', code: 'server error' };
      break;
    case 200:
      payload = { status: 'ok'};
      break;
  }
  return res.status(code).json(payload);
}