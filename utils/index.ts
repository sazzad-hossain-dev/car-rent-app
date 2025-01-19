import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, fuel, model, year } = filters;

    const headers = {
        "x-rapidapi-key": "94a48f3222mshc3059c5efdc4bf7p138582jsn2c7d6814baf0",
        "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
    };

    const defaultManufacturers = [
        "BMW",
        "Audi",
        "Honda",
        "Porsche",
        "Mercedes",
        "Toyota",
        "Nissan",
        "Ford",
        "Chevrolet",
        "Tesla",
    ];

    const cars = [];

    const manufacturersToFetch = manufacturer
        ? Array(10).fill(manufacturer)
        : defaultManufacturers.sort(() => 0.5 - Math.random()).slice(0, 10);

    for (const currentManufacturer of manufacturersToFetch) {
        const queryParams = new URLSearchParams();
        queryParams.append("make", currentManufacturer);
        if (fuel) queryParams.append("fuel_type", fuel);
        if (model) queryParams.append("model", model);
        if (year) queryParams.append("year", year.toString());

        const apiUrl = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryParams}`;
        console.log("API Request URL:", apiUrl);

        try {
            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                console.error(
                    `Error fetching data for ${currentManufacturer}:`,
                    response.statusText
                );
                continue;
            }

            const result = await response.json();
            if (result.length > 0) {
                cars.push(result[0]);
            }

            if (cars.length >= 10) break;
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    }

    return cars;
}

export const CalculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
    url.searchParams.append("customer", "img");
    url.searchParams.append("make", make);
    url.searchParams.append("modelFamily", model.split(" ")[0]);
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("modelYear", ` ${year}`);
    url.searchParams.append("angle", `${angle}`);

    return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    const newPathname = `${
        window.location.pathname
    }?${searchParams.toString()}`;
    return newPathname;
};
