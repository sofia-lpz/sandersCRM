import * as crmMongo from './crm.mysql.js'

const login = async (username, password) => {
  try {
      const user = await crmMongo.getUserByUsername(username);
      if (user && user.contraseña === password) {
          return user;
      }
      return null;
  } catch (err) {
      console.error(err);
      return { error: err.message };
  }
};

export { 
login
};