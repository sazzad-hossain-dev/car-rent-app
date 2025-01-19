import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

interface SearchParams {
    manufacturer?: string;
    year?: string;
    fuel?: string;
    limit?: string;
    model?: string;
}

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const params = await searchParams;

    const manufacturer = params?.manufacturer || "";
    const year = params?.year ? parseInt(params.year) : 2022;
    const fuel = params?.fuel || "";
    const limit = params?.limit ? parseInt(params.limit) : 10;
    const model = params?.model || "";

    const allCars = await fetchCars({
        manufacturer,
        year,
        fuel,
        limit,
        model,
    });

    const isDataEmpty =
        !Array.isArray(allCars) || allCars.length < 1 || !allCars;

    return (
        <main className="overflow-hidden">
            <Hero />
            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore the cars you might like</p>
                </div>
                <div className="home__filters">
                    <SearchBar />
                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels} />
                        <CustomFilter
                            title="year"
                            options={yearsOfProduction}
                        />
                    </div>
                </div>
                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars.map((car, index) => (
                                <CarCard key={index} car={car} />
                            ))}
                        </div>
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h3 className="text-black text-xl font-bold">
                            Oops, no results
                        </h3>
                    </div>
                )}
            </div>
        </main>
    );
}
