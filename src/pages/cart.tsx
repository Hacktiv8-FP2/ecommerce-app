import CartList from '@/components/CartList';
import Layout from '@/components/layout/Layout';
import Modal from '@/components/Modal';
import Seo from '@/components/Seo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { clearCart } from '@/redux/cart';
import { updateProducts } from '@/redux/product';
import { addToSales } from '@/redux/sales';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector(({ user }) => user);
  const { cart } = useAppSelector(({ cart }) => cart);
  const dispatch = useAppDispatch();
  const subTotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const tax = subTotal * 0.1;
  const shipping = 5;
  const total = subTotal + tax + shipping;

  useEffect(() => {
    !user.token && router.push('/login');
  }, []);

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cart.length) {
      dispatch(addToSales(cart));
      dispatch(updateProducts(cart));
      dispatch(clearCart());

      setIsOpen(true);
    }
  };

  return (
    <Layout>
      <Seo />
      <main>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        <section className='bg-white'>
          <div className='mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Shopping Cart
            </h1>

            <form className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
              {cart.length ? (
                <section
                  aria-labelledby='cart-heading'
                  className='lg:col-span-7'
                >
                  <h2 id='cart-heading' className='sr-only'>
                    Items in your shopping cart
                  </h2>

                  <ul
                    role='list'
                    className='divide-y divide-gray-200 border-t border-b border-gray-200'
                  >
                    {cart.map((product, productIdx) => (
                      <CartList
                        product={product}
                        productIdx={productIdx}
                        key={productIdx}
                      />
                    ))}
                  </ul>
                </section>
              ) : (
                <div className='lg:col-span-7'>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    Your cart is empty
                  </h2>
                  <p className='text-gray-500'>
                    Add something to make me happy :)
                  </p>
                </div>
              )}

              {/* Order summary */}
              <section
                aria-labelledby='summary-heading'
                className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'
              >
                <h2
                  id='summary-heading'
                  className='text-lg font-medium text-gray-900'
                >
                  Order summary
                </h2>

                <dl className='mt-6 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm text-gray-600'>Subtotal</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      $ {subTotal}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <dt className='flex items-center text-sm text-gray-600'>
                      <span>Shipping estimate</span>
                    </dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      $ {shipping}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <dt className='flex text-sm text-gray-600'>
                      <span>Tax estimate</span>
                    </dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      $ {tax.toFixed(2)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <dt className='text-base font-medium text-gray-900'>
                      Order total
                    </dt>
                    <dd className='text-base font-medium text-gray-900'>
                      $ {total.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className='mt-6'>
                  <button
                    type='submit'
                    className='w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
}
