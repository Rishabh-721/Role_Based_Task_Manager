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

        filter.isBlocked = false;

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

const userActivation = async(req, res) => {
    try {
        const id = req.params.id;

        if(!id){
            return res.status(401).json({
                message: `Please provide user id as its requierd to activate user`
            })
        }

        const user = await userModel.findById({_id : id});

        if(!user){
            return res.status(401).json({
            message: `User dosen't exist in database kindly check if id is correct`
            })
        }

        if(user.isActive === true){
            return res.status(401).json({
                message: `user are already active in database`
            })
        }

        user.isActive = true;
        await user.save();

        res.status(200).json({
            message: `user is activated as per request`,
            data: user,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error}`
        })
    }
}

const userDeletion = async(req, res) => {
    try {
    const id = req.params.id;

    if(!id){
        return res.status(401).json({
            message: `Please provide user id as its requierd to activate user`
        })
    }

    const user = await userModel.findById({_id : id});

    if(!user){
        return res.status(401).json({
        message: `User dosen't exist in database kindly check if id is correct`
        })
    }


    user.isActive = false;
    user.isBlocked = true;
    user.sessionVersion += 1;

    await user.save();
    
    res.status(200).json({
        message: `User has been deleted from system and can't login will be logged out from system in few minutes`
    })

    } catch (error) {
       res.status(500).json({
            message: `Server Error: ${error}`
        }) 
    }
}



module.exports = {getAllUsers, userActivation, userDeletion};