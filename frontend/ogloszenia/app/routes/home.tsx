import { Button } from "~/components/button";
import type { Route } from "./+types/home";
import { Input } from "~/components/input";
import {categories, testimonials} from "./../../lib/defaultValues"
import { TestimonialCard } from "~/components/home/testimonialCard";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const naviate = useNavigate();

  return (<div className="min-h-screen flex flex-col">
    <Header link="/login" buttonText="Zaloguj się" />

    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
        Dodawaj ogłoszenia jak mistrz
      </h2>
      <p className="text-gray-600 max-w-2xl mb-8">
        Twórz i publikuj swoje ogłoszenia w prosty sposób. Skontaktuj się z innymi
        użytkownikami i znajdź dokładnie to, czego potrzebujesz.
      </p>


      <div className="mb-10 w-full max-w-lg flex flex-col space-y-3">
        <Button className="flex-1" onClick={() => naviate("/add")}>Dodaj ogłoszenie</Button>
        <Input placeholder="Wyszukaj ogloszenie" className="flex 1 text-center" />
      </div>

      <div className="w-full max-w-5xl">
        <h3 className="text-lg font-semibold mb-6">Kategorie:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 text-center hover:shadow-md cursor-pointer transition"
              onClick={() => naviate(`/browse?cat=${cat}`)}
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
  )
}

