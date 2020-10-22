const {
    auth,
  } = require("./../firebase");


    module.exports = {
        login: async (req, res) => {
            const {
                email,
                phoneNumber,
                password,
                firstName,
                lastName
              } = req.body;
          
              const user = await auth.createUser({
                email,
                phoneNumber,
                password,
                displayName: `${firstName} ${lastName}`
              });
          
              return res.send(user);
        },
        // mainlogin: async(req,res) =>{
        //     const {email,password} = req.body;
        //     return auth.sign(email, password);
          
        // }
    }