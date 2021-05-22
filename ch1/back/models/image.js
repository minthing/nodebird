
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { //테이블명은 posts가됨
        content: {
            type:DataTypes.STRING(200),
            allowNull:false,
        }
    },{
        charset : 'utf8',
        collate : 'utf8_general_ci',
    });
    Image.assosicate = (db) => {
        db.Comment.belongsTo(db.User); // UserId 자동생성
        db.Comment.belongsTo(db.Post)
    }
    return Image;
}