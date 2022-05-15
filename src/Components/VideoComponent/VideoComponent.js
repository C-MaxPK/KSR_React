import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import VideoContentComponent from "../VideoContentComponent/VideoContentComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import NotFound from "../NotFound/NotFound";

const VideoComponent = () => {
    const { year } = useParams();
    const arrYears = useSelector(state => state.arrYears);
    const videoAlbumList = useSelector(state => state.videoAlbumList);
    const isInclude = arrYears.includes(year);

    useEffect(() => {
        if (isInclude) {
            document.title = `KSR - Видео ${year} г.`;
        } else {
            document.title = 'KSR - Page Not Found';
        }
    }, [year, isInclude]);

    return (
        <>
            {isInclude ?
                <>
                    <div className="wrapper__top">
                        <header className="header headerVideo">
                            <div className="header__logo">
                                <Link to="/">
                                    <img className="header__logoImg" src="./img/ninjaKSR.png" alt="logo"/>
                                </Link>
                            </div>
                            <div className="header__nav">
                                <p className="header__title">ВидеоАльбом {year}</p>
                                <nav className="nav">
                                    <ul className="nav__list">
                                        
                                        {videoAlbumList.map(album => (
                                            year === album.id ?
                                                <li className="nav__item" key={album.id}>
                                                    <img className="nav__itemImg nav__itemImg-opacity" src={album.img} alt={album.id} />
                                                </li>
                                            :
                                                <li className="nav__item" key={album.id}>
                                                    <Link to={album.url}>
                                                        <div className="nav__itemContent">{album.title}</div>
                                                        <img className="nav__itemImg" src={album.img} alt={album.id}/>
                                                    </Link>
                                                </li>
                                        ))}

                                    </ul>
                                </nav>
                            </div>                    
                        </header>

                        <section className="videoContent">
                            <ul className="videoContent__list">
                                <VideoContentComponent year={year}/>
                            </ul>
                        </section>
                    </div>
                    <div className="wrapper__bottom">
                        <div className="goToPage goToPhotoPage">
                            <Link to={"/photo" + year}>&lt;- Фото</Link>
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

export default VideoComponent;
