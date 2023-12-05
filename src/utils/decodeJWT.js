const jwt=require('jsonwebtoken')

const decodeJWT = (token, signature) => {
  const payload = jwt.verify(token, signature);
  return payload;
};

module.exports = decodeJWT;
