const { DataTypes } = require("sequelize");
const { sequelize } = require("./indexStart");

module.exports= (sequelize, DataTypes) =>{


    const Course = sequelize.define("course",{
        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        coursename: {
            type: DataTypes.ENUM(
                'certificate_software_development',
                'diploma_software_development',
                'certificate_cyber_security',
                'diploma_cyber_security'
            ),
            allowNull: false,
        }
    });

    return Course

}