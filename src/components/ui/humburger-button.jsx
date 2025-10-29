import { Menu, X } from 'lucide-react'
import React from 'react'

const HamburgerButton = ({ mobileMenuOpen, onClick }) => {
    return (

        <>
            <button
                onClick={onClick}
                aria-label="Toggle menu"
                className="sm:hidden p-3 rounded-full bg-inherit hover:bg-gray-800/10 text-white hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 active:bg-gray-800/20"
            >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                    {/* Top line */}
                    <div
                        className={`w-6 h-0.5 bg-current transform transition-all duration-500 ease-in-out ${mobileMenuOpen
                            ? "rotate-45 translate-y-0"
                            : "rotate-0 -translate-y-2"
                            }`}
                    />

                    {/* Middle line */}
                    <div
                        className={`w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${mobileMenuOpen
                            ? "opacity-0 scale-0"
                            : "opacity-100 scale-100"
                            }`}
                    />

                    {/* Bottom line */}
                    <div
                        className={`w-6 h-0.5 bg-current transform transition-all duration-500 ease-in-out ${mobileMenuOpen
                            ? "-rotate-45 translate-y-0"
                            : "rotate-0 translate-y-2"
                            }`}
                    />
                </div>
            </button>


        </>
    )
}

export default HamburgerButton