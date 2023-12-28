import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink';
// import React from 'react'
import { toast } from 'react-hot-toast';

const Header = () => {
    const auth = useAuth();
    const handleLogout = async() => {

        try {
            toast.loading('Logging out!',{id:"logout"})
            await auth?.logout()
            toast.success("Logged out Successfully",{id:"logout"})
        } catch (error) {
            console.log(error);
            toast.error("Logged out Failed",{id:"logout"});
        }
    }
  return (
    <AppBar sx={{ bgcolor: "transparent",position:"static",boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
            <Logo/>
            <div>
                {auth?.isLoggedIn ? (
                <>
                    <NavigationLink bg="#00fffc" to="/chat" text="Go to Chat" textColor='black' />
                    <NavigationLink bg='#51538f' textColor='white' to='/' text='Logout' onClick={handleLogout}/>
                </>) : (
                <>
                    <NavigationLink bg="#00fffc" to="/login" text="Login" textColor='black' />
                    <NavigationLink bg='#51538f' textColor='white' to='/signup' text='Signup'/>
                </>)}
            </div>
        </Toolbar>
    </AppBar>
    )
}

export default Header