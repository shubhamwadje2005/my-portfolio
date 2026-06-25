import React from 'react'
import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <Navbar />
        {children}
        <Footer />
    </>
}

export default layout