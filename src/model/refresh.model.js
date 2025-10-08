const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Refresh = sequelize.define("Refresh", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tokenHash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        parentHash: {
            type: DataTypes.STRING
        },
        deviceId: {
            type: DataTypes.STRING
        },
        userAgent: {
            type: DataTypes.STRING
        },
        ip: {
            type: DataTypes.STRING
        },
        revoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
    return Refresh;
}