"use client";

import { Building2, MapPin, Plus, ArrowLeft, CheckCircle2, Key, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Env } from "../../env";
import Panel from "../../shared/components/panel/panel";

interface Branch {
    branch_id: number;
    branchName: string;
}

interface BranchResponseData {
    branchName: string;
    branch_id: number;
    activation_key: string;
}

export default function Branches() {
    const [mobileView, setMobileView] = useState<'menu' | 'add' | 'list'>('menu');
    const [branchName, setBranchName] = useState('');
    const [address, setAddress] = useState('');
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);

    // Search State
    const [searchTerm, setSearchTerm] = useState('');

    // Response Panel State
    const [responsePanelOpen, setResponsePanelOpen] = useState(false);
    const [responseData, setResponseData] = useState<BranchResponseData | null>(null);

    const fetchBranches = async () => {
        try {
            const response = await fetch(Env.getBranches, {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.result) {
                setBranches(data.data);
            }
        } catch (error) {
            console.error("Error fetching branches:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const filteredBranches = branches.filter(branch =>
        branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async () => {
        try {
            const response = await fetch(Env.createBranch, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    branchName,
                    address
                })
            });

            const data = await response.json();

            if (response.ok && data.result) {
                console.log("Branch created successfully");
                setBranchName('');
                setAddress('');
                fetchBranches(); // Refresh list

                // Show success panel
                setResponseData(data.data);
                setResponsePanelOpen(true);
            } else {
                console.error("Failed to create branch");
            }
        } catch (error) {
            console.error("Error creating branch:", error);
        }
    };

    return (
        <div className="p-4 lg:p-8 h-[calc(100vh-6rem)] flex flex-col">
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 lg:mb-10 text-center">Gestión de Sucursales</h1>

            {/* Mobile Menu Buttons */}
            <div className={`flex-1 flex flex-col gap-6 lg:hidden ${mobileView !== 'menu' ? 'hidden' : ''}`}>
                <button
                    onClick={() => setMobileView('add')}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-zinc-800 transition-all active:scale-95"
                >
                    <div className="p-6 bg-zinc-800 rounded-full">
                        <Plus className="text-white" size={48} />
                    </div>
                    <span className="text-3xl font-bold text-white">Agregar sucursal</span>
                </button>

                <button
                    onClick={() => setMobileView('list')}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-zinc-800 transition-all active:scale-95"
                >
                    <div className="p-6 bg-zinc-800 rounded-full">
                        <Building2 className="text-white" size={48} />
                    </div>
                    <span className="text-3xl font-bold text-white">Sucursales existentes</span>
                </button>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 ${mobileView === 'menu' ? 'hidden lg:grid' : ''}`}>
                {/* Left Card: Add Branch */}
                <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-10 flex flex-col justify-center shadow-xl ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="w-full flex flex-col items-center gap-4 lg:gap-6 mb-8 lg:mb-12 text-center relative">
                        {/* Back Button (Mobile Only) */}
                        <button
                            onClick={() => setMobileView('menu')}
                            className="absolute left-0 top-0 p-2 text-zinc-400 hover:text-white lg:hidden hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <div className="p-4 lg:p-5 bg-zinc-800 rounded-2xl">
                            <Plus className="text-white" size={32} />
                        </div>
                        <h2 className="text-2xl lg:text-4xl font-bold text-white">Agregar sucursal</h2>
                    </div>

                    <form className="space-y-6 lg:space-y-10" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <div className="space-y-2 lg:space-y-4">
                            <label htmlFor="branchName" className="block text-base lg:text-xl font-medium text-zinc-400 ml-1">
                                Nombre de sucursal
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                                    <Building2 className="h-5 w-5 lg:h-8 lg:w-8 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    id="branchName"
                                    value={branchName}
                                    onChange={(e) => setBranchName(e.target.value)}
                                    placeholder="Ej. Sucursal Centro"
                                    className="w-full pl-12 lg:pl-16 pr-4 lg:pr-6 py-4 lg:py-6 bg-zinc-800/50 border border-zinc-700 rounded-xl lg:rounded-2xl text-lg lg:text-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 lg:space-y-4">
                            <label htmlFor="address" className="block text-base lg:text-xl font-medium text-zinc-400 ml-1">
                                Dirección
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 lg:h-8 lg:w-8 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Ej. Av. Principal #123"
                                    className="w-full pl-12 lg:pl-16 pr-4 lg:pr-6 py-4 lg:py-6 bg-zinc-800/50 border border-zinc-700 rounded-xl lg:rounded-2xl text-lg lg:text-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        <div className="pt-6 lg:pt-10">
                            <button
                                type="submit"
                                className="w-full py-4 lg:py-6 px-6 lg:px-8 bg-white text-black font-bold text-lg lg:text-2xl rounded-xl lg:rounded-2xl hover:bg-zinc-200 transform hover:scale-[1.01] transition-all shadow-lg shadow-white/5 active:scale-[0.99]"
                            >
                                Dar alta
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Card: Existing Branches */}
                <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-10 flex flex-col shadow-xl min-h-0 ${mobileView === 'add' ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="w-full relative mb-6 lg:mb-8 text-center flex flex-col items-center justify-center min-h-[3rem]">
                        {/* Back Button (Mobile Only) */}
                        <button
                            onClick={() => setMobileView('menu')}
                            className="absolute left-0 top-0 p-2 text-zinc-400 hover:text-white lg:hidden hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h2 className="text-2xl lg:text-4xl font-bold text-white px-8">Sucursales existentes</h2>
                    </div>

                    {/* Search Input */}
                    <div className="mb-6 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-zinc-500" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar sucursal..."
                            className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-6">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                            </div>
                        ) : filteredBranches.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-6">
                                <Building2 size={48} className="opacity-20 lg:w-16 lg:h-16" />
                                <p className="text-lg lg:text-xl">
                                    {searchTerm ? 'No se encontraron sucursales.' : 'No hay sucursales registradas aún.'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBranches.map((branch) => (
                                    <div key={branch.branch_id} className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 flex items-center gap-4">
                                        <div className="p-3 bg-zinc-700 rounded-full">
                                            <Building2 className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{branch.branchName}</h3>
                                            <p className="text-zinc-400">ID: {branch.branch_id}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Success Panel */}
            <Panel
                isOpen={responsePanelOpen}
                onClose={() => setResponsePanelOpen(false)}
                title="Sucursal Creada"
            >
                {responseData && (
                    <div className="space-y-6 text-center">
                        <div className="flex justify-center">
                            <div className="p-4 bg-green-500/10 rounded-full">
                                <CheckCircle2 className="text-green-500 w-12 h-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-lg font-medium text-white">¡Registro Exitoso!</h4>
                            <p className="text-zinc-400">La sucursal se ha registrado correctamente en el sistema.</p>
                        </div>

                        <div className="bg-zinc-800/50 rounded-xl p-4 space-y-4 text-left">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Nombre</p>
                                <p className="text-white font-medium">{responseData.branchName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">ID Sucursal</p>
                                <p className="text-white font-medium">{responseData.branch_id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Clave de Activación</p>
                                <div className="flex items-center gap-2 bg-zinc-900 p-3 rounded-lg border border-zinc-700">
                                    <Key className="text-yellow-500 w-5 h-5" />
                                    <code className="text-yellow-500 font-mono text-lg font-bold">{responseData.activation_key}</code>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setResponsePanelOpen(false)}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                            Entendido
                        </button>
                    </div>
                )}
            </Panel>
        </div>
    );
}