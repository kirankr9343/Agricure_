'use client';
import { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase';

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAdminStatus = async () => {
        if (loading) {
          return; // Wait until user state is loaded
        }
        if (!user) {
          router.push('/login-admin');
          return;
        }

        try {
          // Check the user's document in Firestore for the admin role
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            // Not an admin, redirect
            setIsAdmin(false);
            router.push('/');
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          router.push('/login-admin'); // Redirect on error
        }
      };

      checkAdminStatus();
    }, [user, loading, router]);

    if (loading || isAdmin === null) {
      return <div>Loading...</div>; // Or a proper loader component
    }

    if (!isAdmin) {
      return null; // Or a "not authorized" component
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
};

export default withAdminAuth;
