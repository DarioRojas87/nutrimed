const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userControllers = {
  addUser: async (req, res) => {
    console.log("entra a adduser");
    const { name, lastName, data, password, src, google, doc, passwordAdm } =
      req.body;
    const hashedPassword = bcryptjs.hashSync(password);
    const userType = doc ? Doctor : Patient;
    try {
      if (process.env.PASSWORD_ADM !== passwordAdm && userType == Doctor)
        throw new Error("No tienes autorizacion");
      let newUser = new userType({
        name,
        lastName,
        data,
        password: hashedPassword,
        src,
        google,
        doc,
      });
      let repeatUser = await userType.findOne({ "data.mail": data.mail });
      if (repeatUser)
        throw new Error("Mail is being used with another account");
      await newUser.save();
      let token = jwt.sign({ ...newUser }, process.env.SECRETOKEN);
      res.json({ success: true, res: { newUser, token } });
    } catch (err) {
      res.json({ success: false, res: err.message });
    }
  },
};
module.exports = userControllers;
