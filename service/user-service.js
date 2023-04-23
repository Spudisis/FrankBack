const { users, modelLink } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await users.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest("Пользователь уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuid.v4();
    console.log(email, password);
    const user = await users.create({ email: email, password: hashPassword });
    console.log("USER:" + user);
    const createLink = await modelLink.create({ userId: user.id, activateLink });
    await mailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/person/activate/${activateLink}`);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activateLink) {
    const user = await modelLink.findOne({ where: { activateLink } });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка");
    }
    const changeUser = await users.update({ isActivated: true }, { where: { id: user.userId } });
  }

  async login(email, password) {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким Email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refresh_token) {
    const token = await tokenService.removeToken(refresh_token);
    return token;
  }
  async refresh(refresh_token) {
    console.log(refresh_token);
    if (!refresh_token) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refresh_token);
    const tokenFromDB = await tokenService.findToken(refresh_token);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await users.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async getUser(id) {
    if (!id) {
      throw ApiError.BadRequest("id отсутствует");
    }
    const user = await users.findAll({ where: { id } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    return user;
  }
}

module.exports = new UserService();