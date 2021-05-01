module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email:{
            type: DataTypes.STRING(40),
            allowNull: false
        },
        nickname:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        // createdAt, updatedAt 자동으로 생김
    },{
        charset:'utf8',
        collate:'utf8_general_ci'
    });
    User.associate = (db) => {

    }
    return User
}