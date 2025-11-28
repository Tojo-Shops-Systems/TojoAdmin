"use client";

import Link from "next/link";
import { Home, BarChart2, MapPin, FileText, User, UserPlus, X } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div
                className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-center px-4 z-50 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className="text-xl font-bold text-white tracking-tight">TojoAdmin</h1>
            </div>

            {/* Sidebar Overlay (Mobile only) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-[100dvh] w-full md:w-64 bg-zinc-900 text-white flex flex-col border-r border-zinc-800 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >
                {/* Header (Desktop) */}
                <div className="p-6 border-b border-zinc-800 hidden md:block">
                    <h1 className="text-2xl font-bold tracking-tight">TojoAdmin</h1>
                </div>

                {/* Mobile Header in Sidebar (to close) */}
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center md:hidden">
                    <h1 className="text-xl font-bold tracking-tight">Menu</h1>
                    <button onClick={() => setIsOpen(false)} className="p-2">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <Home size={20} />
                        <span className="font-medium">Inicio</span>
                    </Link>
                    <Link
                        href="/registerBosses"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <UserPlus size={20} />
                        <span className="font-medium">Añadir encargado</span>
                    </Link>
                    <Link
                        href="/analytics"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <BarChart2 size={20} />
                        <span className="font-medium">Analiticas</span>
                    </Link>
                    <Link
                        href="/branches"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <MapPin size={20} />
                        <span className="font-medium">Sucursales</span>
                    </Link>
                    <Link
                        href="/reports"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <FileText size={20} />
                        <span className="font-medium">Reportes</span>
                    </Link>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-zinc-800">
                    <Link
                        href="/account"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                            <User size={16} className="text-zinc-400" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">Jaret Eduardo</p>
                            <p className="text-xs text-zinc-500 truncate">Admin</p>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
}
