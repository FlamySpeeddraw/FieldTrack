const db = require("../config/connexion");
const User = db.User;
const Role = db.Role;

const getAllUtilisateurs = async (req, res, next) => {
    try {
        const utilisateurs = await User.findAll({
            include: [{ model: Role, as: 'role', attributes: ['nom_role'] }],
            attributes: ['id', 'mail', 'mdp']
        });

        if (!utilisateurs || utilisateurs.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé." });
        }

        const mapped = utilisateurs.map(u => ({
            id: u.id,
            mail: u.mail,
            mdp: u.mdp,
            nom_role: u.role ? u.role.nom_role : null
        }));

        res.status(200).json({ data: mapped });
    } catch (e) { next(e); }
};

const getUtilisateurById = async (req, res, next) => {
    try {
        const utilisateur = await User.findByPk(req.params.id, {
            include: [{ model: Role, as: 'role', attributes: ['nom_role'] }],
            attributes: ['id', 'mail', 'mdp']
        });

        if (!utilisateur) return res.status(404).json({ message: "Utilisateur introuvable" });

        res.status(200).json({ data: utilisateur });
    } catch (e) { next(e); }
};

const createUtilisateur = async (req, res, next) => {
    try {
        const { mail, mdp, role } = req.body;

        if (!mail || !mdp || !role) return res.status(400).json({ message: "Les champs 'mail', 'mdp' et 'role' sont obligatoires." });

        const roleInstance = await Role.findOne({ where: { nom_role: role } });
        if (!roleInstance) return res.status(404).json({ message: "Rôle introuvable" });

        console.log(roleInstance);

        const newUtilisateur = await User.create({ mail, mdp, role_id: roleInstance.id });
        res.status(201).json({ message: "Utilisateur créé", data: newUtilisateur });
    } catch (e) { next(e); }
};

const updateUtilisateur = async (req, res, next) => {
    try {
        const allowedFields = ['mail', 'mdp', 'role'];
        const updateData = {};
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) updateData[field] = req.body[field];
        });

        if (updateData.role) {
            const roleInstance = await Role.findOne({ where: { nom_role: updateData.role } });
            if (!roleInstance) return res.status(404).json({ message: "Rôle introuvable" });
            updateData.role_id = roleInstance.id_role;
            delete updateData.role;
        }

        const [updated] = await User.update(updateData, { where: { id_utilisateur: req.params.id } });
        res.status(200).json({ updated });
    } catch (e) { next(e); }
};

const deleteUtilisateur = async (req, res, next) => {
    try {
        const deleted = await User.destroy({ where: { id_utilisateur: req.params.id } });
        if (deleted) {
            res.status(200).json({ message: "Utilisateur supprimé" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (e) { next(e); }
};

module.exports = { getAllUtilisateurs, getUtilisateurById, createUtilisateur, updateUtilisateur, deleteUtilisateur };
