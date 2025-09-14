import Link from 'next/link'
import React from 'react'

export const CategoryNavbar = () => {

  const categories = [
    { name: "PC", path: "/home" },
    { name: "Stream", path: "/home" },
    { name: "PlayStation", path: "/home" },
    { name: "Others", path: "/home" },
  ]

  return (
    <>
      {/* <ul>
        <input type="" />
        
        <li><Link href="/"> PC</Link> </li>
        <li><Link href="/"> Stream </Link> </li>
        <li><Link href="/">Play Stadion</Link></li>
        <li><Link href="/">Others</Link></li>

      </ul> */}

      <div className="w-full max-w-xs">
        <select
          className="w-full border border-gray-400 rounded p-2 bg-black text-white text-sm sm:text-base"
          onChange={(e) => {
            const value = e.target.value
            if (value) window.location.href = value
          }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.path}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

    </>
  )
}
