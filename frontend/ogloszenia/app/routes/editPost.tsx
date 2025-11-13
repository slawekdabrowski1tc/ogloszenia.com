import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "~/components/header";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { supabase } from "lib/supabase";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    "Motoryzacja",
    "Elektronika",
    "Nieruchomości",
    "Dla dzieci",
    "Moda",
    "Sport",
    "Zwierzęta",
    "Dom i ogród",
    "Inne",
  ];

  useEffect(() => {
    if (!id) return;
    fetchPost();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Nie udało się pobrać ogłoszenia");
      navigate("/myPosts");
      return;
    }

    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
    setCategory(data.category);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert("Musisz być zalogowany, aby edytować ogłoszenie.");
      return;
    }
  
    const numericId = Number(id);

    console.log(numericId)
  
    const { data, error } = await supabase
      .from("ads")
      .update({
        title,
        description,
        price,
        category,
      })
      .eq("id", numericId)
      .select();
  
    if (error) {
      console.error("Błąd przy aktualizacji:", error);
      alert("Nie udało się zaktualizować ogłoszenia.");
    } else {
      console.log("Zaktualizowano:", data);
      alert("Ogłoszenie zostało zaktualizowane!");
      navigate("/myPosts");
    }
  }
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Ładowanie ogłoszenia...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header link="/myPosts" buttonText="Powrót" />

      <main className="max-w-3xl mx-auto px-6 py-10 w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Edytuj ogłoszenie</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Tytuł ogłoszenia</label>
            <Input
              type="text"
              placeholder="Wpisz tytuł..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Opis</label>
            <textarea
              placeholder="Opisz ogłoszenie..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cena</label>
            <Input
              type="number"
              placeholder="Podaj cenę"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Wybierz kategorię</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full">
            Zapisz zmiany
          </Button>
        </form>
      </main>
    </div>
  );
}
