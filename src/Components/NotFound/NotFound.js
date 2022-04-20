import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

    useEffect(() => {
        document.title = 'KSR - Page Not Found';
    }, []);
    
    console.log('NotFound');
    
    return(
        <div>
            <div>
                Страница не найдена
            </div>

            <br/>

            <Link to="/">
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFound;
