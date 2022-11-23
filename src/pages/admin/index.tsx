import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getAllProducts } from '@/redux/product';
import ProductAdminTable from '@/components/ProductAdminTable';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

export default function AdminPage() {
  const { products, loading } = useAppSelector(({ products }) => products);
  const { user } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    !user.admin && router.push('/');
    !products.length && dispatch(getAllProducts());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center justify-between space-x-4'>
              <h2 className='text-lg font-medium text-gray-900'>Products</h2>
            </div>
            <div className='mt-8 flex flex-col'>
              <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle'>
                  <div className='shadow-sm ring-1 ring-black ring-opacity-5'>
                    <table
                      className='min-w-full border-separate'
                      style={{ borderSpacing: 0 }}
                    >
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='sticky top-14 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                          >
                            Product
                          </th>
                          <th
                            scope='col'
                            className='sticky top-14 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                          >
                            Stock
                          </th>
                          <th
                            scope='col'
                            className='sticky top-14 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8'
                          >
                            <span className='sr-only'>Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {products.map(
                          (product, productIdx) =>
                            product.quantity > 0 && (
                              <ProductAdminTable
                                product={product}
                                productIdx={productIdx}
                                key={productIdx}
                                length={products.length}
                              />
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
