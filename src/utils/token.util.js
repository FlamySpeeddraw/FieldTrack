const crypto = require("crypto");

exports.hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

exports.generateRefreshToken = () => {
    return crypto.randomBytes(48).toString("hex");
}