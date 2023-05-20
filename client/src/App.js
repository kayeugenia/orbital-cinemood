import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { CssBaseline } from "@mui/material";
import { supabase } from "./components/Login.js";
  
  export default function App() {
    const [session, setSession] = useState(null);
  
    useEffect(() => {
      const subscription = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
      return () => subscription.data.subscription.unsubscribe();
    }, []);
  
    return (
      <div className="App">
        <CssBaseline />
        {session ? <Register /> : <Login />}
      </div>
    );
  }
  

