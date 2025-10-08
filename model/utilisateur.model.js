const { Utilisateur, Role } = require("../index");

const Role = sequelize.define("Role", {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "role",
  timestamps: false,
});

const Utilisateur = sequelize.define("Utilisateur", {
  id_utilisateur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mdp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id_role",
    },
  },
}, {
  tableName: "utilisateur",
  timestamps: false,
});


// GET ID
async function getRoleId(roleName) {
  const role = await Role.findOne({ where: { nom_role: roleName } });
  if (!role) throw new Error(`Rôle '${roleName}' non trouvé`);
  return role.id_role;
}

// CREATE
exports.create = async (mail, mdp, nom_role) => {
  const role_id = await getRoleId(nom_role);
  const utilisateur = await Utilisateur.create({ mail, mdp, role_id });
  return {
    id_utilisateur: utilisateur.id_utilisateur,
    mail: utilisateur.mail,
    role: nom_role,
  };
};

// READ ALL
exports.getAll = async () => {
  const utilisateurs = await Utilisateur.findAll({
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["nom_role"],
      },
    ],
    attributes: ["id_utilisateur", "mail", "mdp"],
  });

  return utilisateurs.map(u => ({
    id_utilisateur: u.id_utilisateur,
    mail: u.mail,
    mdp: u.mdp,
    nom_role: u.role.nom_role,
  }));
};

// READ ONE
exports.getById = async (id) => {
  const utilisateur = await Utilisateur.findOne({
    where: { id_utilisateur: id },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["nom_role"],
      },
    ],
    attributes: ["id_utilisateur", "mail", "mdp"],
  });

  if (!utilisateur) return null;

  return {
    id_utilisateur: utilisateur.id_utilisateur,
    mail: utilisateur.mail,
    mdp: utilisateur.mdp,
    nom_role: utilisateur.role.nom_role,
  };
};

// UPDATE
exports.update = async (id, mail, mdp, nom_role) => {
  const data = { mail, mdp };
  if (nom_role) {
    const role_id = await getRoleId(nom_role);
    data.role_id = role_id;
  }

  const [updatedRows] = await Utilisateur.update(data, {
    where: { id_utilisateur: id },
  });
  return updatedRows > 0;
};

// DELETE
exports.remove = async (id) => {
  const deletedRows = await Utilisateur.destroy({
    where: { id_utilisateur: id },
  });
  return deletedRows > 0;
};
