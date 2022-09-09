import { useEffect } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../Components/FooterComponent";

const HomePage = () => {

    useEffect(() => {
        document.title = 'Kursk Street Runners';
    }, []);

    return (
        <>
            <div className="wrapper__top">
                <header className="title">
                    Kursk Street Runners
                </header>
        
                <nav className="navMain">
                    <ul className="navMain__list">
                        <li><Link to="/photo2017">Фото</Link></li>
                        <li><Link to="/video2017">Видео</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="wrapper__bottom">
                <FooterComponent/>
            </div>
        </>
    );
};

export default HomePage;
