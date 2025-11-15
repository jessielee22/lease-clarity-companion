import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for mock session in localStorage for prototype
    const mockSessionStr = localStorage.getItem('mock-session');
    if (mockSessionStr) {
      try {
        const mockSession = JSON.parse(mockSessionStr);
        setSession(mockSession);
        setUser(mockSession.user);
      } catch (e) {
        console.error('Failed to parse mock session');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock authentication - accept any credentials for prototype
    const mockUser = {
      id: 'mock-user-id',
      email: email,
      aud: 'authenticated',
      role: 'authenticated',
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
    } as User;

    const mockSession = {
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh',
      user: mockUser,
    } as Session;

    setUser(mockUser);
    setSession(mockSession);
    localStorage.setItem('mock-session', JSON.stringify(mockSession));
    
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    // Same as signIn for prototype - just log them in
    return signIn(email, password);
  };

  const signOut = async () => {
    // Clear mock session
    localStorage.removeItem('mock-session');
    setUser(null);
    setSession(null);
    navigate('/');
    return { error: null };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
