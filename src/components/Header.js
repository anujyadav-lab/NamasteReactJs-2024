import Logo from "../Img/Designer.png"
import { useState } from "react"

const Header = () => {

  const [btn,setBtn]   = useState('login');



    return (


      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={Logo}
          />
        </div>
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Cart</li>
            <button className="login" onClick={()=> btn === 'login' ? setBtn('logout') : setBtn('login')}>{btn}</button>
          </ul>
        </div>             
      </div>
    
    );
  };


export default Header;