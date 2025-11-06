import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { PostCard } from "~/components/browse/postCard";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { categories } from "lib/defaultValues";
import { supabase } from "lib/supabase";

type Ad = {
  id: string;
  title: string;
  price: string;
  images: string[];
  category: string;
};

export default function AdsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("cat") || "Wszystkie"
  );

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);

      const cat = searchParams.get("cat");
      let query = supabase.from("ads").select("*");

      if (cat && cat !== "Wszystkie") {
        query = query.eq("category", cat);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Błąd przy pobieraniu ogłoszeń:", error);
      } else {
        setAds(data || []);
      }

      setLoading(false);
    };

    fetchAds();
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSearchParams({ cat });
    setSelectedCategory(cat);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header link="/login" buttonText="Zaloguj się" />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Ogłoszenia</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["Wszystkie", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Ładowanie ogłoszeń...</p>
        ) : ads.length === 0 ? (
          <p className="text-center text-gray-500">Brak ogłoszeń w tej kategorii.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ads.map((ad) => (
              <PostCard
                key={ad.id}
                id={ad.id}
                title={ad.title}
                price={ad.price}
                image={ad.images?.[0]}
                category={ad.category}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
