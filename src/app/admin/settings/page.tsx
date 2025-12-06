'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuth, updateEmail, updatePassword, onAuthStateChanged, User } from "firebase/auth";
import { app } from '@/firebase/firebase'; // Assuming you have a firebase config file

export default function AdminSettingsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  const handleUpdateEmail = async () => {
    if (currentUser && newEmail) {
      try {
        await updateEmail(currentUser, newEmail);
        setMessage('Email updated successfully!');
        setError('');
      } catch (error: any) {
        setError(error.message);
        setMessage('');
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (currentUser && newPassword && newPassword === confirmPassword) {
      try {
        await updatePassword(currentUser, newPassword);
        setMessage('Password updated successfully!');
        setError('');
      } catch (error: any) {
        setError(error.message);
        setMessage('');
      }
    } else if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Settings</h1>
      
      {currentUser && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Admin ID:</strong> {currentUser.uid}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email</Label>
            <Input 
              id="new-email" 
              type="email" 
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)} 
            />
          </div>
          <Button onClick={handleUpdateEmail}>Update Email</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input 
              id="new-password" 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>
          <Button onClick={handleUpdatePassword}>Update Password</Button>
        </CardContent>
      </Card>

      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
