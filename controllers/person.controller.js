const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const mailService = require("../service/mail-service");
class PersonController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json({ userData });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json({ userData });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.refresh(refreshToken);
      res.cookie("refreshToken", token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      res.redirect(process.env.SITE_URL);
    } catch (error) {
      next(error);
    }
  }
  async getInfoUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userService.getUser(id);
      delete user.password;
      return res.json({
        email: user.email,
        id: user.id,
        name: user.name,
        surname: user.surname,
        tiers: user.tiers,
        isActivated: user.isActivated,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCodeRestore(req, res, next) {
    try {
      const { email } = req.body;
      const code = await userService.sendCode(email);

      const sendCode = await mailService.sendRestoreCode(email, code);
      return res.json("access");
    } catch (error) {
      next(error);
    }
  }
  async restorePassword(req, res, next) {
    try {
      const { email, password, accessCode } = req.body;

      const userData = await userService.changePasswordRestore(email, password, accessCode);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json({ userData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PersonController();
