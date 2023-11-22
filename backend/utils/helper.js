const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    if (!password) {
      throw new Error("Password is required");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it to the calling function
  }
};

const comparePass = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePass };
