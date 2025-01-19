import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

export default async function Home({
    searchParams,
}: {
    searchParams?:
        | { [key: string]: string | undefined }
        | Promise<{ [key: string]: string | undefined }>;
}) {
    const resolvedSearchParams = await Promise.resolve(searchParams);

    const manufacturer = resolvedSearchParams?.manufacturer || "";
    const year = resolvedSearchParams?.year
        ? parseInt(resolvedSearchParams.year)
        : 2022;
    const fuel = resolvedSearchParams?.fuel || "";
    const limit = resolvedSearchParams?.limit
        ? parseInt(resolvedSearchParams.limit)
        : 10;
    const model = resolvedSearchParams?.model || "";

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
