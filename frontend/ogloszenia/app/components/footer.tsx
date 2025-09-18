import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-xl font-bold text-blue-600 mb-4 md:mb-0">
            ogloszenia.com
          </h2>

          <div className="flex space-x-6 text-gray-600">
            <a href="#" className="hover:text-blue-600">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-400">
            <FaTwitter size={24}/>
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram size={24}/>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ogloszenia.com. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
