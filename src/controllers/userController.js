const sequelize = require("sequelize");
const User = require("../../models").User;
const Op = sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys");
const { cleanPhone } = require("../utils/cleanPhone");



module.exports = {
  //creating a user
  createUser(userInfo, result) {
    const tellNumber = cleanPhone(userInfo.phone_number)
    // Ensure no user exist with the provided email and phone number
    User.findAll({
      where:{
        [Op.and]:[
          {email:userInfo.email,
            phone_number:tellNumber},
        ],
      },
    }).then(found => {
      if(found.length > 0){
        result(
          {error:"user by the provided email or phone number already exist"},null,
        )
        }else{
          User.create({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            phone_number:tellNumber ,
            department_id: userInfo.department_id,
          })
            .then((created) => {
              result(null, { message: "User registered successfully" });
            })
            .catch((error) => result({ error: error.message }, null));
        }
    }).catch((error) => result({ error: error.message }, null));
  
  },
  //update a user

  updateUser(updateuserInfo, result) {
    User.findByPk(updateuserInfo.userId).then((foundUser) => {
      if (foundUser !== null) {
        User.findAll({
          where: {
            [Op.and]: [
              { email: updateuserInfo.email },
              { id: { [Op.ne]: updateuserInfo.userId } },
            ],
          },
        })
          .then((found) => {
            if (found.length > 0) {
              result({ error: "Email already taken" }, null);
            } else {
              foundUser
                .update({
                  first_name: updateuserInfo.first_name,
                  last_name: updateuserInfo.last_name,
                  email: updateuserInfo.email,
                  phone_number: updateuserInfo.phone_number,
                  department_id: updateuserInfo.department_id,
                })
                .then(() => {
                  result(null, { message: "Update Successful" });
                })
                .catch((error) => result({ error: error.message }, null));
            }
          })
          .catch((error) => result({ error: error.message }, null));
      } else {
        result({ error: "Couldn`t find User by that Id" }, null);
      }
    });

  },

  //fetch all
  getAllusers(result) {
    User.findAll({ attributes: ["id", "first_name", "last_name", "email", "phone_number", "department_id"] }).then(users => {
      result(null, users)

    })
      .catch(error => {
        result({ error: "Something went wrong" }, null);
      })
  },

  //login a user
  loginUser(loginInfo, result) {
    User.findOne({
      where: {
        email: loginInfo.email,
      },
    }).then((user) => {
      if (user) {
        bcrypt.compare(loginInfo.password, user.password).then((isMatch) => {
          if (isMatch) {
            const data = {
              userId: user.id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              department_id: user.department_id
            };

            jwt.sign(
              data,
              secret.secretKey,
              { expiresIn: "30" },
              (error, token) => {
                if (error) {
                  result(
                    {
                      error: "An error occured",
                    },
                    null
                  );
                } else {
                  result(null, { token });
                }
              }
            );

          } else {
            result({ error: "Wrong email or password" });
          }
        });
      } else {
        result({
          error: "Wrong email or password",
        });
      }
    });
  },

  //delete user
  deleteUser(userId, result) {
    User.destroy({
      where: {
        id: userId
      }
    }).then(destroyed => {
      if (destroyed === 1) {
        result(null, {
          message: "user deleted successfuly"
        })

      } else {
        result({
          error: "no user found by that id"
        }, null)
      }
    }).catch((error) => result({ error: error }, null));

  }
};
