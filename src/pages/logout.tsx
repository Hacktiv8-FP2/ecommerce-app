import { useAppDispatch } from '@/hooks/redux';
import { logout } from '@/redux/user';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function LogoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    dispatch(logout());
    router.push('/');
  }, []);

  return <></>;
}
