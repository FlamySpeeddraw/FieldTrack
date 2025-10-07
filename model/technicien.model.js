// model/technicien.model.js
const connection = require("../index");

// Obtenir l'id du rôle 'technicien'
async function getRoleId() {
  const [rows] = await connection.query("SELECT id_role FROM role WHERE nom_role = 'technicien'");
  if (rows.length === 0) throw new Error("Rôle 'technicien' non trouvé");
  return rows[0].id_role;
}

// CREATE
exports.create = async (mail, mdp) => {
  const role_id = await getRoleId();
  const [result] = await connection.query(
    "INSERT INTO utilisateur (mail, mdp, role_id) VALUES (?, ?, ?)",
    [mail, mdp, role_id]
  );
  return { id_utilisateur: result.insertId, mail, role: "technicien" };
};

// READ ALL
exports.getAll = async () => {
  const [rows] = await connection.query(
    `SELECT u.id_utilisateur, u.mail, u.mdp, r.nom_role 
     FROM utilisateur u
     JOIN role r ON u.role_id = r.id_role
     WHERE r.nom_role = 'technicien'`
  );
  return rows;
};

// READ ONE
exports.getById = async (id) => {
  const [rows] = await connection.query(
    `SELECT u.id_utilisateur, u.mail, u.mdp, r.nom_role
     FROM utilisateur u
     JOIN role r ON u.role_id = r.id_role
     WHERE u.id_utilisateur = ? AND r.nom_role = 'technicien'`,
    [id]
  );
  return rows[0] || null;
};

// UPDATE
exports.update = async (id, mail, mdp) => {
  const [result] = await connection.query(
    "UPDATE utilisateur SET mail = ?, mdp = ? WHERE id_utilisateur = ?",
    [mail, mdp, id]
  );
  return result.affectedRows > 0;
};

// DELETE
exports.remove = async (id) => {
  const [result] = await connection.query(
    "DELETE FROM utilisateur WHERE id_utilisateur = ?",
    [id]
  );
  return result.affectedRows > 0;
};
