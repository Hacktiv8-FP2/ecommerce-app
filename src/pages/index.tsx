import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  const products = [
    {
      id: 1,
      name: 'Fusion',
      category: 'UI Kit',
      href: '#',
      price: '$49',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
      imageAlt:
        'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    // More products...
  ];

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center justify-between space-x-4'>
              <h2 className='text-lg font-medium text-gray-900'>
                Customers also viewed
              </h2>
              <a
                href='#'
                className='whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500'
              >
                View all<span aria-hidden='true'> &rarr;</span>
              </a>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4'>
              {products.map((product) => (
                <div key={product.id} className='group relative'>
                  <div className='aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100'>
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className='object-cover object-center'
                    />
                    <div
                      className='flex items-end p-4 opacity-0 group-hover:opacity-100'
                      aria-hidden='true'
                    >
                      <div className='w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter'>
                        View Product
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900'>
                    <h3>
                      <a href='#'>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.name}
                      </a>
                    </h3>
                    <p>{product.price}</p>
                  </div>
                  <p className='mt-1 text-sm text-gray-500'>
                    {product.category}
                  </p>
                  <div className='mt-6'>
                    <a
                      href={product.href}
                      className='relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200'
                    >
                      Add to bag
                      <span className='sr-only'>, {product.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}