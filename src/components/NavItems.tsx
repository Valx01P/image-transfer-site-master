'use client';

import { headerLinks } from '../constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from "next/image"
import React from 'react'

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        
        return (
          <li
            key={link.route}
            className={`${
              isActive && 'text-purple-900'
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route} className='flex gap-3'>
            <Image src={link.imagePath} width={19} height={16} alt={link.imageAlt} />
                {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems