
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { //테이블명은 posts가됨
        content: {
            type:DataTypes.TEXT, // 길이 특정이 불가능한 매우 긴 글
            allowNull:false,
        }
    },{
        charset:'utf8mb4', //이모티콘 가능
        collate:'utf8mb4_general_ci'
    });
    Comment.assosicate = (db) => {
        db.Comment.belongsTo(db.User); // UserId 자동생성
        db.Comment.belongsTo(db.Post)
    }
    return Comment;
}