const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Hash the password before creating a User
    User.beforeCreate(async (user) => {
        try {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt); // Corrected usage
        } catch (error) {
            throw new Error('Error encrypting password');
        }
    });

    // Instance method to validate the password
    User.prototype.isValidPassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw error;
        }
    };

    return User;
};
