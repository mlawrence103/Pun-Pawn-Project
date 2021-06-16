const { ModuleFilenameHelpers } = require("webpack");
const {
  models: { User },
} = require("../db");

//store all of our functions that will act as middleware between our request and our response and we will use it as we see fit

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

//if we get past require token, we can guarantee that we have a user, but we want to check if user has admin permissions
const isAdmin = (req, res, next) => {
  if (req.user.userType !== "ADMIN") {
    return res
      .status(403)
      .send("You are not authorized to access this information!");
  } else {
    // if the user is an admin, pass them forward
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};