import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getAllProducts } from '@/redux/product';
import NextImage from '@/components/NextImage';
import { useRouter } from 'next/router';

export default function HomePage() {
  const { products } = useAppSelector(({ products }) => products);
  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center justify-between space-x-4'>
              <h2 className='text-lg font-medium text-gray-900'>Products</h2>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4'>
              {products.map((product) => (
                <div
                  key={product.id}
                  className='group relative flex flex-col justify-between'
                >
                  <div>
                    <div className='aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100'>
                      <NextImage
                        useSkeleton
                        className='w-52 group-hover:opacity-75'
                        src={product.image}
                        width='180'
                        height='180'
                        imgClassName=''
                        alt={product.description}
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
                    <div className='mt-4 flex items-center justify-between space-x-8 text-gray-900'>
                      <h3 className='w-2/3'>
                        <a
                          href='#'
                          className='text-base font-medium line-clamp-2 hover:line-clamp-none'
                        >
                          <span
                            aria-hidden='true'
                            className='absolute inset-0'
                            onClick={() =>
                              router.push(`/product/${product.id}`)
                            }
                          />
                          {product.title}
                        </a>
                      </h3>
                      <p className='items-center'>${product.price}</p>
                    </div>
                    <p className='mt-1 text-sm text-gray-500'>
                      {product.category}
                    </p>
                  </div>
                  <div className='mt-6 '>
                    <a
                      href={product.image}
                      className='relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200'
                    >
                      Add to bag
                      <span className='sr-only'>, {product.title}</span>
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
