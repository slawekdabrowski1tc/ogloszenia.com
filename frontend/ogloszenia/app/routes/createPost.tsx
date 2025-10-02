import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "~/components/button";
import Header from "~/components/header";
import { Input } from "~/components/input";

export default function createPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };


    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log({
            title,
            description,
            price,
            images,
        });

    };

    return (
        <div className="w-full flex flex-col items-center gap-10">
            <Header buttonText="wyloguj się" link="/" className="w-full" />
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Dodaj ogłoszenie
                </h2>

                <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nazwa ogłoszenia</label>
                        <Input
                            type="text"
                            placeholder="Wpisz tytuł..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Opis ogłoszenia</label>
                        <textarea
                            placeholder="Opisz swoje ogłoszenie..."
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
                        <label className="block text-sm font-medium mb-2">
                            Zdjęcia ogłoszenia
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mb-4"
                        />

                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {images.map((file, i) => (
                                    <div key={i} className="relative group">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Dodaj ogłoszenie
                    </Button>
                </form>
            </div>
        </div>
    )
}
