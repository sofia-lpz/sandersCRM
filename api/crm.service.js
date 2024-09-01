import * as crmMongo from './crm.mongo.js'

const getUsers = async () => {
  try {
    const users = await crmMongo.getUsers();
    return users;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

const login = async () => {
  try {
    const user = await crmMongo.login();
    return user;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

export { 
  getUsers,
login };