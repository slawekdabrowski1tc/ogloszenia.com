import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "~/components/button";
import Header from "~/components/header";
import { Input } from "~/components/input";

export default function RegisterPage() { 
 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register data:", { email, username, password });
    };

    return (
        <div className="flex flex-col items-center h-screen">
                    <Header className="w-full" link="/login" buttonText="Zaloguj się" />
                    <div className="flex items-center justify-center bg-gray-50 px-6 my-auto">
                        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                            <h2 className="text-2xl font-bold text-center mb-6">Zarejestruj się</h2>
        
                            <form onSubmit={handleSubmit} className="space-y-4">
                                 <div>
                                    <label className="block text-sm font-medium mb-1">Nazwa użytkownika</label>
                                    <Input
                                        type="text"
                                        placeholder="Nazwa użytkownika"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Podaj email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
        
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hasło</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Podaj hasło"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                                        </button>
                                    </div>
                                </div>
        
                                <Button type="submit" className="w-full">
                                    Zarejestruj się
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
    )
}