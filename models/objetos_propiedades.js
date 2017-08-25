module.exports = function (sequelize, DataTypes) {
    var objetos_propiedades = sequelize.define("objetos_propiedades", {
        id_objeto_propiedad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_objeto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        propiedad: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        clave_principal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        tipo_dato: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        campo_identity: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        clave_personalizada: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    objetos_propiedades.associate = function (models) {
        objetos_propiedades.belongsTo(models.objetos, { foreignKey: 'id_objeto' });
    };
    return objetos_propiedades;
};