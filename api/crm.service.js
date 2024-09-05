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

const getList = async (resource, { sort, range, filter }) => {
    try {
        const data = await crmMongo.getList(resource, { sort, range, filter });
        return data;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
};

const getOne = async (resource, id) => {
    try {
        const data = await crmMongo.getOne(resource, id);
        return data;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
};

const getMany = async (resource, filter) => {
    try {
        const data = await crmMongo.getMany(resource, filter);
        return data;
    }
    catch (err) {
        console.error(err);
        return { error: err.message };
    }
};

const getManyReference = async (resource, id, relatedResource, { sort, range, filter }) => {
    try {
        const data = await crmMongo.getManyReference(resource, id, relatedResource, { sort, range, filter });
        return data;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
};

const create = async (resource, data) => {
    try {
        const result = await crmMongo.create(resource, data);
        return result;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}

const update = async (resource, id, data) => {
    try {
        const result = await crmMongo.update(resource, id, data);
        return result;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}

const updateMany = async (resource, data) => {
    try {
        const result = await crmMongo.updateMany(resource, data);
        return result;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}

const deleteOne = async (resource, id) => {
    try {
        const result = await crmMongo.deleteOne(resource, id);
        return result;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}

const deleteMany = async (resource, data) => {
    try {
        const result = await crmMongo.deleteMany(resource, data);
        return result;
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}


export { 
    login,
    getList,
    getOne, 
    getMany, 
    getManyReference,
    create,
    update,
    updateMany,
    deleteOne,
    deleteMany
};