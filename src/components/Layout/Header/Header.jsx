import React, { useState } from 'react'
import { link1, link2 } from '../../../constants/links';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants/routes';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../redux/selector';
import UserArea from './UserArea';
import DropDownMenu from './DropDownMenu';

const Header = () => {

    const {isLogin} = useSelector(authSelector);
    const [height, setHeight] = useState(0);

    const handleChangeHeight = () => {
        setHeight(height === 0 ? "auto" : 0)
    }

    return (
        <div className='app-header'>
            
             <Link className="app-logo" to={ROUTE.HOME} >
                <img src={require("../../../assets/img/logo1.png")} alt="" />
   
            </Link>
            <div className="title-header">
                <h1 className='title-header' style={{fontSize:'30px',fontFamily: 'Great Vibes'}}>
                    Hệ thống quản trị đại học trực tuyến.<br/>
                    
                </h1>
                <h2 className='title-header'style={{fontSize:'26px', fontFamily: 'Great Vibes'}} >
                    Đại học bách khoa Hà Nội - Trường công nghệ thông tin và truyền thông
                </h2>
                
            </div>
            <div className="nav-links" >
                {isLogin ?
                    <>{link2.map(link => (
                        <div className={link.className}
                            key={link.title}
                        >
                            <UserArea handleChangeHeight={handleChangeHeight} />
                            <DropDownMenu height={height} setHeight={handleChangeHeight}/>
                        </div>
                    ))}
                    </>
                    :
                    <>{link1.map(link => (
                        <Link
                            className={`nav-links__item ${link.className}`}
                            key={link.title}
                            to={link.path}
                        >
                            {link.name}
                        </Link>
                    ))}</>
                }
            </div>
        </div>
    )
}

export default Header