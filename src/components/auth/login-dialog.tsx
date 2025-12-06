'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { OtpInput } from '@/components/ui/otp-input';

export function LoginDialog() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('credentials'); // 'credentials' or 'pin'
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          setStep('pin');
        } else {
          router.push('/dashboard');
          setOpen(false);
        }
      } else {
        await auth.signOut();
        setError("User data not found.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        const user = auth.currentUser;
        if (!user) {
            setError("User not authenticated. Please start over.");
            setStep('credentials');
            setLoading(false);
            return;
        }

        // Temporarily hardcoded PIN for admin access
        if (pin === '123456') {
            router.push('/admin/dashboard');
            setOpen(false);
        } else {
            setError("Invalid PIN. Please try again.");
        }
    } catch (error) {
        console.error("PIN verification failed:", error);
        setError("An error occurred during PIN verification.");
    } finally {
        setLoading(false);
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        // Reset state on close
        setEmail('');
        setPassword('');
        setPin('');
        setError(null);
        setStep('credentials');
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{step === 'credentials' ? 'Sign in' : 'Enter Admin PIN'}</DialogTitle>
        </DialogHeader>
        {step === 'credentials' ? (
            <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
            </Button>
            </form>
        ) : (
            <form onSubmit={handlePinSubmit} className="space-y-4">
                <div className="space-y-2 flex flex-col items-center">
                    <Label htmlFor="pin">Enter your 6-digit admin PIN</Label>
                    <OtpInput value={pin} onChange={setPin} length={6} />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify PIN
                </Button>
            </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
