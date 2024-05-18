import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute(props) {
    const { Component } = props;
    console.log("data",props);
    const nevigate = useNavigate()
    const {isLoggedIn} = useAuth()
    
    useEffect(()=>{
        if (!isLoggedIn) {
          nevigate('/login')
        }
    })
  return (
    <div><Component /></div>
  )
};
