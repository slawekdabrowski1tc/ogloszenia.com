import { useNavigate } from "react-router";
import { cn } from "lib/utils";
import type { HtmlHTMLAttributes } from "react";
import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";
import { Button } from "~/components/button";

interface HeaderProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    link: string,
    buttonText: string,
}

export default function Header({className, link, buttonText}: HeaderProps) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            const loggedIn = !!session;
            setIsLoggedIn(loggedIn);
            setUserEmail(session?.user?.email || null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const loggedIn = !!session;
                setIsLoggedIn(loggedIn);
                setUserEmail(session?.user?.email || null);
                
                if (event === 'SIGNED_OUT') {
                    navigate("/");
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            setIsLoggedIn(false);
            setUserEmail(null);
            
            navigate("/");
        } catch (error) {
            console.error("Błąd podczas wylogowywania:", error);
            alert("Wystąpił błąd podczas wylogowywania");
        }
    };

    return (
        <header className={cn("flex justify-between items-center p-6 shadow-md bg-white", className)}>
            <div 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={() => navigate("/")}
            >
                <h1 className="text-2xl font-bold text-blue-600">ogloszenia.com</h1>
            </div>
            
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate("/myPosts")}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Moje ogłoszenia
                        </button>
                        <Button 
                            onClick={handleLogout}
                        >
                            Wyloguj się
                        </Button>
                    </div>
                ) : (
                    <Button 
                        onClick={() => navigate(link)}
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
        </header>
    );
}