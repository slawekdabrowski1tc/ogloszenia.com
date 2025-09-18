import { Button } from "~/components/button";
import type { Route } from "./+types/home";
import { Input } from "~/components/input";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const categories = [
  "Motoryzacja",
  "Nieruchomości",
  "Praca",
  "Elektronika",
  "Moda",
  "Dom i ogród",
  "Sport",
  "Muzyka",
  "Usługi",
  "Zwierzęta",
  "Dla dzieci",
  "Inne"]

export default function Home() {


  return (<div className="min-h-screen flex flex-col">
    <header className="flex justify-between items-center p-6 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">ogloszenia.com</h1>
      <Button variant="outline">Logowanie</Button>
    </header>
  </div>
  )
}
