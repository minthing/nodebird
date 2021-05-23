
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //테이블명은 posts가됨
        content: {
            type:DataTypes.TEXT, // 길이 특정이 불가능한 매우 긴 글
            allowNull:false,
        }
    },{
        charset:'utf8mb4', //이모티콘 가능
        collate:'utf8mb4_general_ci'
    });
    Post.assosicate = (db) => {
        db.Post.belongsTo(db.User) // UserId 자동생성
        db.Post.hasMany(db.Comment)
        db.Post.hasMany(db.Image)
        db.Post.belongsToMany(db.Hashtag, {through:'PostHashtag'}); // UserId 자동생성
    }
    return Post;
}