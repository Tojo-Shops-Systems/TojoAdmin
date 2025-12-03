"use client";

import { User, CreditCard, Phone, Plus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Env } from "../../env";
import Panel from "../../shared/components/panel/panel";

export default function RegisterBosses() {
    const [mobileView, setMobileView] = useState<'menu' | 'add' | 'list'>('menu');

    // Form State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [curp, setCurp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Response Panel State
    const [responsePanelOpen, setResponsePanelOpen] = useState(false);

    const handleSubmit = async () => {
        try {
            console.log("Submitting form...");

            const apiUrl = Env.registerPersonalDataBoss;
            console.log("API URL:", apiUrl);

            if (!apiUrl) {
                console.error("API URL is undefined. Please check env.tsx");
                alert("Error de configuración: La URL de la API no está definida.");
                return;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    CURP: curp,
                    phoneNumber
                })
            });

            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok && data.result) {
                console.log("Boss registered successfully");
                setFirstName('');
                setLastName('');
                setCurp('');
                setPhoneNumber('');

                // Show success panel
                setResponsePanelOpen(true);
            } else {
                console.error("Failed to register boss:", data);
                alert("Error al registrar encargado: " + (data.msg || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error registering boss:", error);
            alert("Ocurrió un error al intentar registrar el encargado. Revisa la consola para más detalles.");
        }
    };

    return (
        <div className="p-4 lg:p-8 h-[calc(100vh-6rem)] flex flex-col">
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 lg:mb-10 text-center">Gestión de Encargados</h1>

            {/* Mobile Menu Buttons */}
            <div className={`flex-1 flex flex-col gap-6 lg:hidden ${mobileView !== 'menu' ? 'hidden' : ''}`}>
                <button
                    onClick={() => setMobileView('add')}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-zinc-800 transition-all active:scale-95"
                >
                    <div className="p-6 bg-zinc-800 rounded-full">
                        <Plus className="text-white" size={48} />
                    </div>
                    <span className="text-3xl font-bold text-white">Alta de encargados</span>
                </button>

                <button
                    onClick={() => setMobileView('list')}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:bg-zinc-800 transition-all active:scale-95"
                >
                    <div className="p-6 bg-zinc-800 rounded-full">
                        <User className="text-white" size={48} />
                    </div>
                    <span className="text-3xl font-bold text-white">Encargados existentes</span>
                </button>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 ${mobileView === 'menu' ? 'hidden lg:grid' : ''}`}>
                {/* Left Card: Add Boss */}
                <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-10 flex flex-col justify-center shadow-xl ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="w-full flex flex-col items-center gap-4 lg:gap-6 mb-6 lg:mb-8 text-center relative">
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
                        <h2 className="text-2xl lg:text-4xl font-bold text-white">Alta de encargados</h2>
                    </div>

                    <form className="space-y-3 lg:space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {/* First Name */}
                        <div className="space-y-1 lg:space-y-2">
                            <label htmlFor="firstName" className="block text-base lg:text-lg font-medium text-zinc-400 ml-1">
                                Nombre(s)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 lg:h-6 lg:w-6 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Ej. Jaret Eduardo"
                                    className="w-full pl-12 lg:pl-16 pr-4 lg:pr-6 py-3 lg:py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl lg:rounded-2xl text-base lg:text-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className="space-y-1 lg:space-y-2">
                            <label htmlFor="lastName" className="block text-base lg:text-lg font-medium text-zinc-400 ml-1">
                                Apellidos
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 lg:h-6 lg:w-6 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Ej. Gonzalez Carrasco"
                                    className="w-full pl-12 lg:pl-16 pr-4 lg:pr-6 py-3 lg:py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl lg:rounded-2xl text-base lg:text-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        {/* CURP */}
                        <div className="space-y-1 lg:space-y-2">
                            <label htmlFor="curp" className="block text-base lg:text-lg font-medium text-zinc-400 ml-1">
                                CURP
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                                    <CreditCard className="h-5 w-5 lg:h-6 lg:w-6 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    id="curp"
                                    value={curp}
                                    onChange={(e) => setCurp(e.target.value)}
                                    placeholder="Ej. GOCJ040419..."
                                    className="w-full pl-12 lg:pl-16 pr-4 lg:pr-6 py-3 lg:py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl lg:rounded-2xl text-base lg:text-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1 lg:space-y-2">
                            <label htmlFor="phoneNumber" className="block text-base lg:text-lg font-medium text-zinc-400 ml-1">
                                Teléfono
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-zinc-500" />
                                </div>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Ej. 8711416849"
                                    className="w-full pl-12 lg:pl-16 pr-4 lg:pr-6 py-3 lg:py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl lg:rounded-2xl text-base lg:text-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all hover:bg-zinc-800"
                                />
                            </div>
                        </div>

                        <div className="pt-4 lg:pt-6">
                            <button
                                type="submit"
                                className="w-full py-3 lg:py-5 px-6 lg:px-8 bg-white text-black font-bold text-lg lg:text-2xl rounded-xl lg:rounded-2xl hover:bg-zinc-200 transform hover:scale-[1.01] transition-all shadow-lg shadow-white/5 active:scale-[0.99]"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Card: Existing Bosses (Empty for now) */}
                <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-10 flex flex-col shadow-xl min-h-0 ${mobileView === 'add' ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="w-full relative mb-6 lg:mb-8 text-center flex flex-col items-center justify-center min-h-[3rem]">
                        {/* Back Button (Mobile Only) */}
                        <button
                            onClick={() => setMobileView('menu')}
                            className="absolute left-0 top-0 p-2 text-zinc-400 hover:text-white lg:hidden hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h2 className="text-2xl lg:text-4xl font-bold text-white px-8">Encargados existentes</h2>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 space-y-6">
                        <User size={48} className="opacity-20 lg:w-16 lg:h-16" />
                        <p className="text-lg lg:text-xl">
                            Próximamente
                        </p>
                    </div>
                </div>
            </div>

            {/* Success Panel */}
            <Panel
                isOpen={responsePanelOpen}
                onClose={() => setResponsePanelOpen(false)}
                title="Encargado Registrado"
            >
                <div className="space-y-6 text-center">
                    <div className="flex justify-center">
                        <div className="p-4 bg-green-500/10 rounded-full">
                            <CheckCircle2 className="text-green-500 w-12 h-12" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-lg font-medium text-white">¡Registro Exitoso!</h4>
                        <p className="text-zinc-400">El encargado se ha registrado correctamente en el sistema.</p>
                    </div>

                    <button
                        onClick={() => setResponsePanelOpen(false)}
                        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Entendido
                    </button>
                </div>
            </Panel>
        </div>
    );
}