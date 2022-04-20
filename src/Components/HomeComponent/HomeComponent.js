import { useEffect } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../FooterComponent/FooterComponent";

const HomeComponent = () => {

    useEffect(() => {
        document.title = 'Kursk Street Runners';
    }, []);

    console.log('HomeComponent');

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

export default HomeComponent;
