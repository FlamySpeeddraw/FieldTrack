const { Utilisateur, Role } = require("../index");

// 🔹 Obtenir l'id du rôle 'technicien'
async function getRoleId() {
  const role = await Role.findOne({ where: { nom_role: "technicien" } });
  if (!role) throw new Error("Rôle 'technicien' non trouvé");
  return role.id_role;
}

// 🔹 CREATE
exports.create = async (mail, mdp) => {
  const role_id = await getRoleId();
  const utilisateur = await Utilisateur.create({ mail, mdp, role_id });
  return {
    id_utilisateur: utilisateur.id_utilisateur,
    mail: utilisateur.mail,
    role: "technicien",
  };
};

// 🔹 READ ALL
exports.getAll = async () => {
  const techniciens = await Utilisateur.findAll({
    include: [
      {
        model: Role,
        as: "role",
        where: { nom_role: "technicien" },
        attributes: ["nom_role"],
      },
    ],
    attributes: ["id_utilisateur", "mail", "mdp"],
  });

  return techniciens.map(t => ({
    id_utilisateur: t.id_utilisateur,
    mail: t.mail,
    mdp: t.mdp,
    nom_role: t.role.nom_role,
  }));
};

// 🔹 READ ONE
exports.getById = async (id) => {
  const technicien = await Utilisateur.findOne({
    where: { id_utilisateur: id },
    include: [
      {
        model: Role,
        as: "role",
        where: { nom_role: "technicien" },
        attributes: ["nom_role"],
      },
    ],
    attributes: ["id_utilisateur", "mail", "mdp"],
  });

  if (!technicien) return null;

  return {
    id_utilisateur: technicien.id_utilisateur,
    mail: technicien.mail,
    mdp: technicien.mdp,
    nom_role: technicien.role.nom_role,
  };
};

// 🔹 UPDATE
exports.update = async (id, mail, mdp) => {
  const [updatedRows] = await Utilisateur.update(
    { mail, mdp },
    { where: { id_utilisateur: id } }
  );
  return updatedRows > 0;
};

// 🔹 DELETE
exports.remove = async (id) => {
  const deletedRows = await Utilisateur.destroy({
    where: { id_utilisateur: id },
  });
  return deletedRows > 0;
};
