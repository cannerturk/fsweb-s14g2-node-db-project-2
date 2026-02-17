const db = require("../../data/db-config");

const getAll = async () => db("cars");

const getById = async (id) => db("cars").where("id", id).first();

const getByVin = async (vin) => db("cars").where("vin", vin).first();

const create = async (car) => {
  await db("cars").insert(car);
  return getByVin(car.vin);
};

const updateCarById = async (id, car) => {
  await db("cars").where("id", id).update(car);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
  updateCarById,
};
