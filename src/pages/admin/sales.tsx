import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useAppSelector } from '@/hooks/redux';

export default function SalesPage() {
  const { sales } = useAppSelector(({ sales }) => sales);
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center justify-between space-x-4'>
              <h2 className='text-lg font-medium text-gray-900'>
                Sales Recapitulation
              </h2>
            </div>
            <div className='-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell'
                    >
                      Sold
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0'
                    >
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className='border-b border-gray-200'>
                      <td className='py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0'>
                        <div className='font-medium text-gray-900'>
                          {sale.title}
                        </div>
                        <div className='mt-0.5 text-gray-500'>
                          {sale.category}
                        </div>
                      </td>
                      <td className='hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell'>
                        $ {sale.price}
                      </td>
                      <td className='hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell'>
                        {sale.quantity}
                      </td>
                      <td className='py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0'>
                        $ {Number(sale.price) * sale.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope='row'
                      colSpan={3}
                      className='hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0'
                    >
                      Total
                    </th>
                    <th
                      scope='row'
                      className='pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden'
                    >
                      Total
                    </th>
                    <td className='pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0'>
                      ${' '}
                      {sales.reduce(
                        (acc, sale) => acc + Number(sale.price) * sale.quantity,
                        0
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
