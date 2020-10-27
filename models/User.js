const mongoose = require('mongoose');
const md5 = require('md5');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectID],
        required: true,
        ref: 'Post',

    },
});

UserSchema.pre('save', function (next) {
    this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
    next();
})

// Hash password so it can't be seen
UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;

            next();
        })
    })
})

module.exports = mongoose.model('User', UserSchema);
