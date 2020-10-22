const {
  checkIfLoggedIn,
} = require("./../firebase");

module.exports = {
  validateAuth: async (req, res, next) => {
    const {
      authorization,
    } = req.headers;
    try{
      const user = await checkIfLoggedIn(authorization);
      req.userId = user.uid;
    } catch(e) {
      console.log(e);
      return res
        .status(401)
        .send({
          message: "User not authorized."
        });
    }
    return next();
  },
}