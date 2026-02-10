// src/components/WhatsAppButton.tsx
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/918144426440 " // Your number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </a>
    );
};