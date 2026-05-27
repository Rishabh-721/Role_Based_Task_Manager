const userModel = require("../model/user.model");
const taskModel = require("../model/task.model");

const getAllUsers = async(req, res) => {
    try {
        const {active, verified, role} = req.query;

        const filter = {};

        if(active !== undefined){
            filter.isActive = JSON.parse(active);
        }

        if(verified !== undefined){
            filter.isVerified = JSON.parse(verified);
        }

        if(req.user.role === "super-admin"){

        if(role){
            filter.role = role;
        }else{
            filter.role = {
                $in: ["admin", "employee"]
            };
        }

        }else if(req.user.role === "admin"){
            filter.role = "employee";
        }else{
            return res.status(403).json({
            success: false,
            message: "Access denied"
         });
        }

        const users = await userModel.find(filter);

        return res.status(200).json({
         success: true,
         count: users.length,
         data: users
      });


    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error}`
        })
    }
}


module.exports = {getAllUsers};