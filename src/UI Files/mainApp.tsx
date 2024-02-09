import React from 'react'
// import Heading from '../Heading'
import Footer from './footerControl'
import TopBar from './components/TopBar';
import "../css/app.css"


export default function AppLayout({children}: {children:React.ReactNode}) {
    return (
        <div>
            <TopBar>{children}</TopBar>
            <div className = "bg-black-900">
            <Footer></Footer>
            </div>
        </div>
    )
};