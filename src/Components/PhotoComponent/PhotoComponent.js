import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PhotoContentComponent from "../PhotoContentComponent/PhotoContentComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import NotFound from "../NotFound/NotFound";

const PhotoComponent = () => {
    const { year } = useParams();
    const arrYears = useSelector(state => state.arrYears);
    const photoAlbumList = useSelector(state => state.photoAlbumList);
    const isInclude = arrYears.includes(year);
    
    useEffect(() => {
        if (isInclude) {
            document.title = `KSR - Фото ${year} г.`;
        } else {
            document.title = 'KSR - Page Not Found';
        }
    }, [year, isInclude]);
    
    console.log('PhotoComponent' + year);

    return (
        <>
            {isInclude ?
                <>
                    <div className="wrapper__top">
                        <header className="header">
                            <div className="header__logo">
                                <Link to="/">
                                    <img className="header__logoImg" src="./img/ninjaKSR.png" alt="logo"/>
                                </Link>
                            </div>
                            <div className="header__nav">
                                <p className="header__title">ФотоАльбом {year}</p>
                                <nav className="nav">
                                    <ul className="nav__list">

                                        {photoAlbumList.map(album => (
                                            year === album.id ?
                                                <li className="nav__item" key={album.id}>
                                                    <img className="nav__itemImg nav__itemImg-opacity" src={album.img} alt={album.id} />
                                                </li>
                                            :
                                                <li className="nav__item" key={album.id}>
                                                    <Link to={album.url}>
                                                        <img className="nav__itemImg" src={album.img} alt={album.id}/>
                                                    </Link>
                                                </li>
                                        ))}

                                    </ul>
                                </nav>
                            </div>                    
                        </header>

                        <section className="photoContent">
                            <ul className="photoContent__list">
                                <PhotoContentComponent year={year}/>
                            </ul>
                        </section>
                    </div>
                    
                    <div className="wrapper__bottom">
                        <div className="goToPage goToVideoPage">
                            <Link to={"/video" + year}>Видео -&gt;</Link>
                        </div>
                        <FooterComponent/>
                    </div>
                </>
                :
                <NotFound/>
            }
        </>
    );
};

export default PhotoComponent;
