module.exports = function(sequelize, DataTypes) {
    var objetos = sequelize.define("objetos",{
        
        id_objeto:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        objeto:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        coleccion:{
             type: DataTypes.BOOLEAN,
             allowNull: false,
             defaultValue: false 
        },
        tabla:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    });
    objetos.associate = function (models) {
        objetos.hasMany(models.objetos_propiedades,{ foreignKey: 'id_objeto'});
    };
    return objetos;
};
