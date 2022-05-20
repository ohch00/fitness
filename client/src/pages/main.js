import React from "react"
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to="/calculators" activeStyle>
                Calculators
                </NavLink>
                <NavLink to="/daily-workout" activeStyle>
                Daily Workout
                </NavLink>
                <NavLink to="/workouts" activeStyle>
                Workouts
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
            </NavBtn>
            <NavLink to=""> 
            <h1>Logo</h1>
            </NavLink>
        </Nav>
        </>
    );
}