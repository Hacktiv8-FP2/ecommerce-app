import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getAllProducts } from '@/redux/product';
import NextImage from '@/components/NextImage';
import { useRouter } from 'next/router';
import { addToCart } from '@/redux/cart';
import { Products } from '@/types';

export default function HomePage() {
  const { products } = useAppSelector(({ products }) => products);
  const { user } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const addToCartHandler = (product: Products) => {
    user.token ? dispatch(addToCart(product)) : router.push('/login');
  };

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
                  className='group relative transform rounded-l transition-all duration-200 ease-in-out hover:scale-110 hover:p-2 hover:shadow-lg'
                >
                  <div className='h-[360px]'>
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
                  <div className='absolute inset-x-0 bottom-0 mt-6'>
                    <div
                      className='relative flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200'
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to Cart
                      <span className='sr-only'>, {product.title}</span>
                    </div>
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
