import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import VideoContentComponent from "../Components/VideoContentComponent";
import FooterComponent from "../Components/FooterComponent";
import NotFound from "./NotFound";
import { selectVideoAlbumList, selectError, selectStatus } from '../store/media/mediaSelectors';
import ninjaImg from '../assets/ninjaKSR.png';

const VideoPage = ({ arrYears }) => {
    console.log('VideoPage')
    const { year } = useParams();
    const videoAlbumList = useSelector(selectVideoAlbumList);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
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
                                    <img className="header__logoImg" src={ninjaImg} alt="logo"/>
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
                            {status === 'loading' && <div className="videoContent__loading">Загрузка...</div>}
                            {status === 'rejected' && <div><span className="videoContent__error">Ошибка получения данных:</span> {error}</div>}
                            <ul className="videoContent__list">
                                <VideoContentComponent year={year}/>
                            </ul>
                        </section>
                    </div>
                    <div className="wrapper__bottom">
                        <div className="goToPage goToPhotoPage">
                            <Link to={"/photo" + year} className='goToPhotoPage__link'>&lt;- Фото</Link>
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

export default VideoPage;
