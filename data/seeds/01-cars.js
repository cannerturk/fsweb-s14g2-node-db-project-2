module.exports = {
    async seed(knex) {
        const cars = [
            {
                vin: "1HGCM82633A847592",
                make: "Toyota",
                model: "Corolla",
                mileage: 128450,
                title: "Clean",
                transmission: "Automatic"
            },
            {
                vin: "2DBRF40J63F451298",
                make: "Mercedes-Benz",
                model: "C200",
                mileage: 86500,
                title: "Clean",
                transmission: "Automatic"
            },
            {
                vin: "3HMCM56557C404321",
                make: "Honda",
                model: "Accord",
                mileage: 214300,
                title: null,
                transmission: null
            }
        ];
        for (const car of cars) {
            await knex("cars").insert(car);
        }
    }
}
