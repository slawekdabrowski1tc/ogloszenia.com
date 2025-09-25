import { useNavigate } from "react-router";
import { Button } from "./button";
import { cn } from "lib/utils";
import type { HtmlHTMLAttributes } from "react";

interface HeaderProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    link: string,
    buttonText: string,
}

export default function Header({className, link, buttonText}: HeaderProps) {
    let navigate = useNavigate();

    return (<header className={cn("flex justify-between items-center p-6 shadow-md bg-white cursor-pointer", className)}>
      <h1 className="text-2xl font-bold text-blue-600" onClick={() => navigate("/")}>ogloszenia.com</h1>
      <Button variant="outline" onClick={() => navigate(link)}>{buttonText}</Button>
    </header>)
}