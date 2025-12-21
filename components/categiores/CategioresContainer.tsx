import CategoryCard from "./CategoryCard";
import HomeContainer from "../shared/HomeContainer";
import { supabase } from "@/lib/supabase";
import { Category, iconsMap } from "@/lib/types";

export default async function CategoriesContainer() {
  const { data: categories, error } = (await supabase
    .from("categories")
    .select("*")) as { data: Category[] | null; error: null };

  if (error) {
    return <p>Failed to load categories.</p>;
  }

  return (
    <HomeContainer title="categories">
      <div className="py-6 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories?.map((item) => {
          const Icon = iconsMap[item.icon];
          return (
            <CategoryCard
              key={item.id}
              title={item.title}
              count={item.num_courses}
              Icon={Icon}
            />
          );
        })}
      </div>
    </HomeContainer>
  );
}
