import { useEffect } from "react";
import { Link } from "react-router-dom";
import ninjaImg from '../assets/ninjaKSR.png';

const NotFound = () => {

    useEffect(() => {
        document.title = 'KSR - Page Not Found';
    }, []);
    
    return(
        <div>
            <div className='pageNotFound-title'>
                Страница не найдена
            </div>

            <img className="pageNotFound-img" src={ninjaImg} alt="logo"/>

            <Link to="/" className='pageNotFound-link'>
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFound;
