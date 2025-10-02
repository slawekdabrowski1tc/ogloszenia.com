import Header from "~/components/header";
import { Button } from "~/components/button";
import { useState } from "react";
import type { LoaderFunctionArgs } from "react-router";

const mockAd = {
    title: "Sprzedam rower górski",
    date: "2025-09-18",
    price: "1200 zł",
    description:
      "Rower w świetnym stanie, używany tylko rekreacyjnie. Amortyzatory, hamulce tarczowe, lekka rama aluminiowa.",
    images: [
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
    ],
    user: "Jan Kowalski",
    location: "Warszawa",
  };

export default function post({params}: LoaderFunctionArgs) {
    if (!params.id) return;
    const id = params.id;

    const [selectedImage, setSelectedImage] = useState(mockAd.images[0]);

    

    return (
        <div className="min-h-screen bg-gray-50">
          <Header link={"/"} buttonText={"Wyloguj się"} />
    
          <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="mb-4">
                <img
                  src={selectedImage}
                  alt={mockAd.title}
                  className="w-full h-96 object-cover rounded-2xl shadow"
                />
              </div>
    
              <div className="flex gap-4">
                {mockAd.images.map((img, i) => (
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
            </div>
    

            <div>
              <h1 className="text-3xl font-bold mb-2">{mockAd.title}</h1>
              <p className="text-gray-500 text-sm mb-4">
                Dodano: {new Date(mockAd.date).toLocaleDateString()}
              </p>
    
              <p className="text-2xl font-semibold text-green-600 mb-6">
                {mockAd.price}
              </p>
    
              <p className="text-gray-700 mb-6">{mockAd.description}</p>
    
              <Button className="mb-10">Skontaktuj się</Button>
    
              <div className="flex items-center gap-6 text-gray-600 text-sm">
                <span className="font-medium">Użytkownik: {mockAd.user}</span>
                <span>Lokalizacja: {mockAd.location}</span>
              </div>
            </div>
          </main>
        </div>
      );

}