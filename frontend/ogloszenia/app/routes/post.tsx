import Header from "~/components/header";
import { Button } from "~/components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "lib/supabase";

interface Post {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  created_at: string;
  user_id: string;
  location?: string;
}

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else {
        setPost(data);
        if (data.images && data.images.length > 0) setSelectedImage(data.images[0]);
      }
    }

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Wczytywanie ogłoszenia...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header link={"/"} buttonText={"Wyloguj się"} />

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="mb-4">
            <img
              src={selectedImage ?? ""}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl shadow"
            />
          </div>

          {post.images && post.images.length > 1 && (
            <div className="flex gap-4">
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === img ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-4">
            Dodano: {new Date(post.created_at).toLocaleDateString()}
          </p>

          <p className="text-2xl font-semibold text-green-600 mb-6">
            {post.price}
          </p>

          <p className="text-gray-700 mb-6">{post.description}</p>

        </div>
      </main>
    </div>
  );
}
