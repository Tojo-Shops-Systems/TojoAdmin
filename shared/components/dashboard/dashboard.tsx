import Link from "next/link";
import { Home, BarChart2, MapPin, FileText, User, UserPlus } from "lucide-react";

export default function Dashboard() {
    return (
        <aside className="h-screen w-64 bg-zinc-900 text-white flex flex-col fixed left-0 top-0 border-r border-zinc-800">
            {/* Header */}
            <div className="p-6 border-b border-zinc-800">
                <h1 className="text-2xl font-bold tracking-tight">TojoAdmin</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <Home size={20} />
                    <span className="font-medium">Inicio</span>
                </Link>
                <Link
                    href="/registerBosses"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <UserPlus size={20} />
                    <span className="font-medium">Añadir encargado</span>
                </Link>
                <Link
                    href="/analytics"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <BarChart2 size={20} />
                    <span className="font-medium">Analiticas</span>
                </Link>
                <Link
                    href="/branches"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <MapPin size={20} />
                    <span className="font-medium">Sucursales</span>
                </Link>
                <Link
                    href="/reports"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <FileText size={20} />
                    <span className="font-medium">Reportes</span>
                </Link>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-zinc-800">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-zinc-800 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                        <User size={16} className="text-zinc-400" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">Jaret Eduardo</p>
                        <p className="text-xs text-zinc-500 truncate">Admin</p>
                    </div>
                </button>
            </div>
        </aside>
    );
}
