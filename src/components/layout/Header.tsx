import * as React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';
import { useRouter } from 'next/router';

const links = [
  { href: '/programming', label: 'Programming' },
  { href: '/covid', label: 'COVID-19' },
  { href: '/saved', label: 'Saved' },
];

export default function Header() {
  const { push } = useRouter();
  const [title, setTitle] = React.useState('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/search/${title}`);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <nav className='flex gap-4'>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <div className='mr-3 flex-1'>
            <label htmlFor='search' className='sr-only' />
            <div className='relative text-gray-400 focus-within:text-gray-400'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <HiOutlineSearch className='h-5 w-5' aria-hidden='true' />
              </div>
              <form onSubmit={onSubmit}>
                <input
                  id='search'
                  name='search'
                  className='text-grey-900 placeholder-grey-700 block w-full rounded-md border border-transparent bg-slate-300 bg-opacity-25 py-2 pl-10 pr-3 leading-5 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm'
                  placeholder='Search for articles'
                  type='search'
                  onChange={onChange}
                />
              </form>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
