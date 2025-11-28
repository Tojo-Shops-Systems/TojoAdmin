"use client";

import { Building2, MapPin, Plus } from "lucide-react";

export default function Branches() {
    return (
        <div className="p-8 h-[calc(100vh-6rem)] flex flex-col">
            <h1 className="text-4xl font-bold text-white mb-10 text-center">Gestión de Sucursales</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
                {/* Left Card: Add Branch */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 flex flex-col justify-center shadow-xl">
                    <div className="flex flex-col items-center gap-4 mb-10 text-center">
                        <div className="p-4 bg-zinc-800 rounded-xl">
                            <Plus className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Agregar sucursal</h2>
                    </div>

                    <form className="space-y-8">
                        <div className="space-y-3">
                            <label htmlFor="branchName" className="block text-lg font-medium text-zinc-400 ml-1">
                                Nombre de sucursal
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Building2 className="h-7 w-7 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    id="branchName"
                                    placeholder="Ej. Sucursal Centro"
                                    className="w-full pl-14 pr-6 py-5 bg-zinc-800/50 border border-zinc-700 rounded-xl text-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="address" className="block text-lg font-medium text-zinc-400 ml-1">
                                Dirección
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <MapPin className="h-7 w-7 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Ej. Av. Principal #123"
                                    className="w-full pl-14 pr-6 py-5 bg-zinc-800/50 border border-zinc-700 rounded-xl text-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="button"
                                className="w-full py-5 px-6 bg-white text-black font-bold text-xl rounded-xl hover:bg-zinc-200 transform hover:scale-[1.01] transition-all shadow-lg shadow-white/5 active:scale-[0.99]"
                            >
                                Dar alta
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Card: Existing Branches */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 flex flex-col shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Sucursales existentes</h2>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {/* Placeholder for list */}
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-6">
                            <Building2 size={64} className="opacity-20" />
                            <p className="text-xl">No hay sucursales registradas aún.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}