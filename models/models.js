const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const users = sequelize.define(
    "users",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, unique: false, allowNull: false },
        tiers: {
            type: DataTypes.STRING,
            unique: false,
            defaultValue: "STANDART",
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            unique: false,
            defaultValue: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const projects = sequelize.define(
    "projects",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uid: { type: DataTypes.STRING, unique: true, allowNull: false },
        name: { type: DataTypes.STRING, unique: false, allowNull: false },
        miniature: { type: DataTypes.STRING, unique: false, allowNull: true },
        statusAccess: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        layout: { type: DataTypes.TEXT, allowNull: false },
    },
    {
        freezeTableName: true,
    }
);

const refreshPassword = sequelize.define(
    "refreshPassword",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        accessCode: { type: DataTypes.INTEGER, unique: false, allowNull: true },
    },
    {
        freezeTableName: true,
    }
);
const owners = sequelize.define(
    "owners",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
        freezeTableName: true,
    }
);

const modelLink = sequelize.define("activateLink", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    activateLink: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const TokenSchema = sequelize.define("TokenSchema", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refresh_token: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Templates = sequelize.define("Templates", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    type: { type: DataTypes.STRING, unique: false, allowNull: false },
    miniature: { type: DataTypes.STRING, unique: false, allowNull: true },
    privateStatus: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    tiers: {
        type: DataTypes.STRING,
        unique: false,
        defaultValue: "STANDART",
    },
    layout: { type: DataTypes.TEXT, allowNull: false },
});

users.hasMany(owners);
owners.belongsTo(users);

projects.hasMany(owners);
owners.belongsTo(projects);

users.hasOne(refreshPassword);
refreshPassword.belongsTo(users);

users.hasOne(modelLink);
modelLink.belongsTo(users);

users.hasOne(TokenSchema);
TokenSchema.belongsTo(users);

users.hasMany(Templates);
Templates.belongsTo(users);

module.exports = {
    users,
    projects,
    refreshPassword,
    modelLink,
    TokenSchema,
    owners,
    Templates,
};
