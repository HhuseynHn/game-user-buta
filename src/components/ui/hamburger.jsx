import React from 'react'

const Hamburger = () => {
    return (

        <>
            <div className="sm:hidden border-t border-gray-700 bg-background">
                <div className="px-4 py-3 space-y-3">
                    <SearchInput className="w-full" />
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <Preference />
                        </li>
                        <li className="cursor-pointer hover:text-red-400">Orders</li>
                        <li className="cursor-pointer hover:text-red-400">Basket</li>
                        <li>
                            <Account />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Hamburger