import React, { useEffect, useState } from 'react'
import HeadederMain from '../components/Layout/Header/Header'
const HustContainer = () => {

    return(
        <div>
            <HeadederMain />
            <div>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <img src={require("../assets/img/BK.jpg")} alt="Description" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
            </div>
        </div>
    );

}
export default HustContainer