import FilterPageClient from "@/components/courses/filteration/FilterPageClient";
import FilterResultsClient from "@/components/courses/filteration/FilterResultsClient";

export default function Page() {
  return (
    <FilterPageClient>
      <FilterResultsClient />
    </FilterPageClient>
  );
}
