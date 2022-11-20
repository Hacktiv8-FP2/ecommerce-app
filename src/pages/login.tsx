import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { adminLogin, userLogin } from '@/redux/user';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function LoginPage() {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const { user } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    user.token && router.push('/');
  }, [user.token]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const admin = {
      username: 'admin@bukapedia.com',
      password: 'admin123',
    };
    if (
      usernameRef.current?.value === admin.username &&
      passwordRef.current?.value === admin.password
    ) {
      dispatch(adminLogin());
      return router.push('/admin');
    }
    if (usernameRef.current && passwordRef.current) {
      dispatch(
        userLogin({
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
        })
      );
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img
              className='h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
          </div>

          <div className='mt-8'>
            <div className='mt-6'>
              <form className='space-y-6' onSubmit={onSubmitHandler}>
                <div>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Username
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={usernameRef}
                      id='username'
                      name='username'
                      type='username'
                      autoComplete='username'
                      required
                      className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='space-y-1'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={passwordRef}
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 block text-sm text-gray-900'
                    >
                      Remember me
                    </label>
                  </div>

                  <div className='text-sm'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
          alt=''
        />
      </div>
    </div>
  );
}
