const jwt = require("jsonwebtoken");
const { TokenSchema } = require("../models/models");
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refresh_token) {
    const tokenData = await TokenSchema.findOne({ where: { userId: userId } });

    if (tokenData) {
      const data = await TokenSchema.update({ refresh_token: refresh_token }, { where: { userId: userId } });
      return data;
    }
    const token = await TokenSchema.create({ userId, refresh_token: refresh_token });
    return token;
  }
  async removeToken(refresh_token) {
    console.log(refresh_token);
    const tokenData = await TokenSchema.destroy({ where: { refresh_token: refresh_token } });
    return tokenData;
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
      return userData;
    } catch (error) {
      return null;
    }
  }
  async findToken(refresh_token) {
    const tokenData = await TokenSchema.findOne({ where: { refresh_token: refresh_token } });
    return tokenData;
  }
}

module.exports = new TokenService();
