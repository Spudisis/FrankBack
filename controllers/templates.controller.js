const ApiError = require("../exceptions/api-error");
const TokenService = require("../service/token-service");
const TemplateService = require("../service/template-service");
class TemplatesController {
    async getTemplates(req, res, next) {
        try {
            const { p, l, type } = req.query;
            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)["id"];

            const listTemplates = await TemplateService.getTemplateType(
                p,
                l,
                type,
                userId
            );
            return res.json(listTemplates);
        } catch (error) {
            next(error);
        }
    }

    async getTemplatesUser(req, res, next) {
        try {
            const { p, l, type } = req.query;
            console.log(p, l, type);
            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)["id"];
            const listTemplatesUser = await TemplateService.getTemplateUser(
                p,
                l,
                type,
                userId
            );
            return res.json(listTemplatesUser);
        } catch (error) {
            next(error);
        }
    }

    async createTemplate(req, res, next) {
        try {
            const body = req.body;

            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)["id"];
            const template = await TemplateService.createTemplate(body, userId);
            res.json(template);
        } catch (error) {
            next(error);
        }
    }

    async updateTemplate(req, res, next) {
        try {
            const body = req.body;
            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)["id"];
            const template = await TemplateService.updateTemplate(body, userId);
            res.json(template);
        } catch (error) {
            next(error);
        }
    }

    async deleteTemplate(req, res, next) {
        try {
            const { id } = req.body;
            const accessToken = req.headers.authorization.split(" ")[1];
            const userId = TokenService.validateAccessToken(accessToken)["id"];
            await TemplateService.deleteTemplate(id, userId);
            res.json({ 200: 200 });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TemplatesController();