import { useEffect, useState } from "react";
import Header from "~/components/header";
import { Button } from "~/components/button";
import { useNavigate } from "react-router";
import { supabase } from "lib/supabase";

interface Post {
  id: string;
  title: string;
  price: string;
  category: string;
  images: string[];
  description: string;
  created_at: string;
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPosts();
  }, []);

  async function fetchUserPosts() {
    setLoading(true);
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .eq("user_id", user.user.id)
      .order("created_at", { ascending: false });

    if (error) console.error("Błąd podczas pobierania ogłoszeń:", error);
    else setPosts(data || []);

    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;

    const { error } = await supabase.from("ads").delete().eq("id", Number(id));

    if (error) alert("Nie udało się usunąć ogłoszenia.");
    else setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEdit(id: string) {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header link="/" buttonText="Strona główna" />

      <main className="max-w-6xl mx-auto px-6 py-10 w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Moje ogłoszenia</h1>

        {loading ? (
          <p className="text-center text-gray-500">Ładowanie...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">
            Nie masz jeszcze żadnych ogłoszeń.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <img
                  src={post.images?.[0] || "https://via.placeholder.com/400x300"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  <p className="text-green-600 font-bold mb-2">{post.price} zł</p>
                  <p className="text-gray-400 text-sm mb-4">{post.category}</p>

                  <div className="mt-auto flex justify-between items-center">
                    <Button
                      onClick={() => handleEdit(post.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Edytuj
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Usuń
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
