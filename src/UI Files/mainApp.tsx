import React from 'react'
// import Heading from '../Heading'
import Footer from './footerControl'
import "../css/applicationStyle.css"
import Sidebar from './components/Sidebar';


export default function AppLayout({children}: {children:React.ReactNode}) {
    return (
        <div>
            <Sidebar>{children}</Sidebar>
        </div>
    )
};