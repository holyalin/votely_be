const prisma = require("./prismaClient");

// Create
const createUser = async (data) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

// Read
const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

// Update
const updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};

// Delete
const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};



// Category CRUD
const createCategory = async (data) => {
    const category = await prisma.category.create({ data });
    return category;
  };
  
  const getCategory = async (id) => {
    const category = await prisma.category.findUnique({ where: { id } });
    return category;
  };
  
  const updateCategory = async (id, data) => {
    const category = await prisma.category.update({ where: { id }, data });
    return category;
  };
  
  const deleteCategory = async (id) => {
    const category = await prisma.category.delete({ where: { id } });
    return category;
  };
  
  // History CRUD
  const createHistory = async (data) => {
    const history = await prisma.history.create({ data });
    return history;
  };
  
  const getHistory = async (id) => {
    const history = await prisma.history.findUnique({ where: { id } });
    return history;
  };
  
  const updateHistory = async (id, data) => {
    const history = await prisma.history.update({ where: { id }, data });
    return history;
  };
  
  const deleteHistory = async (id) => {
    const history = await prisma.history.delete({ where: { id } });
    return history;
  };
  
  // Option CRUD
  const createOption = async (data) => {
    const option = await prisma.option.create({ data });
    return option;
  };
  
  const getOption = async (id) => {
    const option = await prisma.option.findUnique({ where: { id } });
    return option;
  };
  
  const updateOption = async (id, data) => {
    const option = await prisma.option.update({ where: { id }, data });
    return option;
  };
  
  const deleteOption = async (id) => {
    const option = await prisma.option.delete({ where: { id } });
    return option;
  };
  
  // Polling CRUD
  const createPolling = async (data) => {
    const polling = await prisma.polling.create({ data });
    return polling;
  };
  
  const getPolling = async (id) => {
    const polling = await prisma.polling.findUnique({ where: { id } });
    return polling;
  };
  
  const updatePolling = async (id, data) => {
    const polling = await prisma.polling.update({ where: { id }, data });
    return polling;
  };
  
  const deletePolling = async (id) => {
    const polling = await prisma.polling.delete({ where: { id } });
    return polling;
  };
  
  module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    createHistory,
    getHistory,
    updateHistory,
    deleteHistory,
    createOption,
    getOption,
    updateOption,
    deleteOption,
    createPolling,
    getPolling,
    updatePolling,
    deletePolling,
  };


