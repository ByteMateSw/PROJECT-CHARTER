"use client";
import { useEffect, useState } from "react";


export default function Alert({ message, onClose }: { message: string[], onClose: () => void }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                onClose();
            }, 500); // Duración de la animación de salida
        }, 10000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;


    return (
        <div className="absolute w-full p-8 z-50">
            <div
                className={`alert alert-error duration-150 ${visible ? 'animate-fadeIn' : 'animate-fadeOut'
                    }`}
            >     <div className="flex">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
                    </svg>
                    <span className="text-bold text-4xl ml-2">Error</span>
                    <div className="flex flex-col ml-4">
                        <div
                            className="grid gap-2"
                            style={{ gridTemplateColumns: `repeat(2, minmax(0, 1fr))` }}
                        >
                            {message.map((item, i) => (
                                <div className="flex flex-row justify-center" key={i}>
                                    <span className="text-content2">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}