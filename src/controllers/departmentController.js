const sequelize = require("sequelize");
const Department = require("../../models").Department;
const Op = sequelize.Op;

module.exports = {
  //creating a department
  createDepartment(departmentInfo, result) {

    //Ensure no department exist with the provided name
    Department.findAll({
      where:{
        [Op.and]:[
          {name:departmentInfo.name},
        ],
      }
    }).then(found => {
      if(found.length > 0){
        result(
          {error:"department with the provided name already exist"},null
        )
      }else{
        Department.create({
          name: departmentInfo.name,
        })
          .then((created) => {
            result(null, { message: "Department created successfully" });
          })
          .catch((error) => result({ error: error.message }, null));
      }
    }).catch((error) => result({ error: error.message }, null));

    
  },

  //update a department
  updateDepartment(updateDepartmentInfo, result) {
    Department.findByPk(updateDepartmentInfo.departmentId).then(
      (foundDepartment) => {
        if (foundDepartment !== null) {
          Department.findAll({
            where: {
              [Op.and]: [
                { id: { [Op.ne]: updateDepartmentInfo.departmentId } },
              ],
            },
          })
            .then((found) => {
              foundDepartment
                .update({
                  name: updateDepartmentInfo.name,
                })
                .then(() => {
                  result(null, { message: "Update Successful" });
                })
                .catch((error) => result({ error: error.message }, null));
            })
            .catch((error) => result({ error: error.message }, null));
        } else {
          result({ error: "Couldn`t find Department by that Id" }, null);
        }
      }
    );
  },

  //fetch all departments
  getAllDepartments(result) {
    Department.findAll({
      attributes: ["id", "name"],
    })
      .then((departments) => {
        result(null, departments);
      })
      .catch((error) => {
        result({ error: "Something went wrong" }, null);
      });
  },

  //delete a department
  deleteDepartment(departmentId, result) {
    Department.destroy({
      where: {
        id: departmentId,
      },
    })
      .then((destroyed) => {
        if (destroyed === 1) {
          result(null, {
            message: "Department deleted successfuly",
          });
        } else {
          result(
            {
              error: "no Department found by that id",
            },
            null
          );
        }
      })
      .catch((error) => result({ error: error }, null));
  },
};
