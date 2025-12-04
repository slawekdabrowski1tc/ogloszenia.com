import type { Route } from "./+types/home";
import { TestimonialCard } from "~/components/home/testimonialCard";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "lib/supabase";
import {categories,  testimonials } from "lib/defaultValues";
import { Button } from "~/components/button";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Nowa aplikacja React Router" },
    { name: "description", content: "Witamy w React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleAddPostClick = () => {
    if (isLoggedIn) {
      navigate("/add");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        link="/login"
        buttonText="Zaloguj się"
      />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Dodawaj ogłoszenia jak mistrz
        </h2>
        <p className="text-gray-600 max-w-2xl mb-8">
          Twórz i publikuj swoje ogłoszenia w prosty sposób. Skontaktuj się z innymi
          użytkownikami i znajdź dokładnie to, czego potrzebujesz.
        </p>

        <div className="mb-10 w-full max-w-lg flex flex-col space-y-3">
          {isLoggedIn ? (
            <>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Witaj, {user?.email || "Użytkowniku"}!
                </p>
              </div>
              <Button className="flex-1" onClick={() => navigate("/add")}>
                Dodaj ogłoszenie
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/myPosts")}
              >
                Moje ogłoszenia
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1" onClick={handleAddPostClick}>
                Dodaj ogłoszenie
              </Button>
            </>
          )}
        </div>

        <div className="w-full max-w-5xl">
          <h3 className="text-lg font-semibold mb-6">Kategorie:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 text-center hover:shadow-md cursor-pointer transition"
                onClick={() => navigate(`/browse?cat=${cat}`)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </main>

      <section className="py-16 bg-gray-50">
        <h3 className="text-2xl font-bold text-center mb-10">Opinie użytkowników</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}