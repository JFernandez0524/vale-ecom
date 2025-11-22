'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, route, authStatus } = useAuth();
  console.log({
    user,
    route,
    authStatus,
  });

  console.log({ user, route, authStatus });
  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <nav className='container mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <div className='text-2xl font-bold text-gray-800'>
          <Link href='/'>Valentina&apos;s</Link>
        </div>

        {/* Menu Links */}
        <div className='flex space-x-6'>
          <a
            href='#products'
            className='text-gray-600 hover:text-gray-900 font-medium'
          >
            Products
          </a>
          <a
            href='#about'
            className='text-gray-600 hover:text-gray-900 font-medium'
          >
            About
          </a>
          {/* You can add more links here */}
        </div>
      </nav>
    </header>
  );
}
