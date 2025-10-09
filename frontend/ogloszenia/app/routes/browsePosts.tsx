import { categories } from "lib/defaultValues";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { PostCard } from "~/components/browse/postCard";
import Footer from "~/components/footer";
import Header from "~/components/header";

export default function AdsPage() {
    const [searchParams, setSearchParams] = useSearchParams()

  const ads = [
    {
      id: 1,
      title: "Sprzedam samochód Opel Astra",
      price: "18 900 zł",
      image: "https://picsum.photos/400/300?random=1",
      category: "Motoryzacja",
    },  
    {
      id: 2,
      title: "Laptop gamingowy MSI",
      price: "4 200 zł",
      image: "https://picsum.photos/400/300?random=2",
      category: "Elektronika",
    },
    {
      id: 3,
      title: "Mieszkanie 2 pokoje, Kraków",
      price: "2 300 zł/mc",
      image: "https://picsum.photos/400/300?random=3",
      category: "Nieruchomości",
    },
    {
      id: 4,
      title: "Rowerek dziecięcy",
      price: "250 zł",
      image: "https://picsum.photos/400/300?random=4",
      category: "Dla dzieci",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("cat") || "Wszystkie");

  const filteredAds =
    selectedCategory === "Wszystkie"
      ? ads
      : ads.filter((ad) => ad.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header link="/login" buttonText="Zaloguj się" />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Ogłoszenia</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSearchParams({cat: cat})
                setSelectedCategory(cat)
            }}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAds.map((ad) => (
            <PostCard key={ad.id} {...ad} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
