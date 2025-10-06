const connection = require('./../index');

const createUser = async (mail, password) => {
    const [results] = await connection.execute(`INSERT INTO utilisateur (mail, mdp, role_id) VALUES (?, ?, 2);`, [mail, password]);
    return results;
};

module.exports = { createUser };