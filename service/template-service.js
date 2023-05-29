const ApiError = require("../exceptions/api-error");
const { Templates } = require("../models/models");
const { Op } = require("sequelize");

class TemplateService {
    validate(page, limit, userId) {
        if (!page) {
            throw ApiError.BadRequest("Not found page value");
        }
        if (!limit) {
            throw ApiError.BadRequest("Not found limit value");
        }
        if (!userId) {
            throw ApiError.BadRequest("Not found userId value");
        }
    }

    async getTemplateType(page, limit, type, userId) {
        this.validate(page, limit, userId);

        const listTemplate = await Templates.findAndCountAll({
            where: {
                type,
                [Op.or]: [{ privateStatus: false }, { userId: userId }],
            },
            order: [["updatedAt", "DESC"]],
            limit: limit,
            offset: (page - 1) * limit,
        });
        return listTemplate;
    }
    async getTemplateUser(page, limit, type, userId) {
        this.validate(page, limit, userId);
        const where = { userId };
        if (type) {
            where.type = type;
        }

        const listTemplateUser = await Templates.findAndCountAll({
            where: {
                ...where,
            },
            order: [["updatedAt", "DESC"]],
            limit: limit,
            offset: (page - 1) * limit,
        });
        return listTemplateUser;
    }

    async createTemplate(body, fileName, userId) {
        const { name, privateStatus, type, layout } = body;
        if (!name || !type || !layout || !userId) {
            throw ApiError.BadRequest(
                "Not found !name || !privateStatus || !layout || !userId"
            );
        }
        const template = await Templates.create({
            ...body,
            miniature: fileName,
            userId,
        });
        return template;
    }

    async updateTemplate(body, userId) {
        if (!userId) {
            throw ApiError.BadRequest("Not found userId");
        }
        if (!body.name) {
            throw ApiError.BadRequest("Not found name");
        }
        if (!body.type) {
            throw ApiError.BadRequest("Not found type");
        }
        const updTemplate = await Templates.update(body, { where: { userId } });
        return updTemplate;
    }

    async deleteTemplate(id, userId) {
        if (!id || !userId) {
            throw ApiError.BadRequest("Not found id | userID");
        }
        await Templates.destroy({ where: { userId, id } });
    }
}

module.exports = new TemplateService();
