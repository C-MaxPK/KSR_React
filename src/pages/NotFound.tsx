import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {

    useEffect(() => {
        document.title = 'KSR - Page Not Found';
    }, []);
    
    return(
        <div>
            <div className='pageNotFound-title'>
                Страница не найдена
            </div>

            <img className="pageNotFound-img" src='./img/ninjaKSR.png' alt="logo"/>

            <Link to="/" className='pageNotFound-link'>
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFound;
