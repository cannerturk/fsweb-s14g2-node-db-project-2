const { getById, getByVin } = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await getById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: `car with id ${req.params.id} not found` });
    }
    req.car = car;
    next();
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const requiredFields = ["vin", "make", "model", "mileage"];
  const missingFields = requiredFields.filter((f) => req.body[f] === undefined || req.body[f] === null || req.body[f] === "");
  if (missingFields.length) {
    return res.status(400).json({ message: `${missingFields.join(",")} is missing` });
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  if (!vinValidator.validate(req.body.vin)) {
    return res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const car = await getByVin(req.body.vin);

    if (!car) return next();

    if (req.params.id && String(car.id) === String(req.params.id)) return next();

    return res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
