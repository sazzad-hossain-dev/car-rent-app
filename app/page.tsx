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

// This is the correct type expected by Next.js
export default async function Home({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const manufacturer = searchParams?.manufacturer || "";
    const year = searchParams?.year ? parseInt(searchParams.year) : 2022;
    const fuel = searchParams?.fuel || "";
    const limit = searchParams?.limit ? parseInt(searchParams.limit) : 10;
    const model = searchParams?.model || "";

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
