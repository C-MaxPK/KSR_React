import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PhotoContentComponent from "../Components/PhotoContentComponent";
import FooterComponent from "../Components/FooterComponent";
import NotFound from "./NotFound";
import { IPhotoAlbumItem, selectError, selectPhotoAlbumList, selectStatus } from '../store/media/mediaSlice';
import { useAppSelector } from '../store/hooks';

interface IPhotoPageProps {
    arrYears: string[];
}

const PhotoPage = ({ arrYears }: IPhotoPageProps): JSX.Element => {
    const { year } = useParams();
    const albumList = useAppSelector(selectPhotoAlbumList);
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);

    const isInclude: boolean = arrYears.includes(typeof year === 'string' ? year : '404');
    
    useEffect(() => {
        if (isInclude) {
            document.title = `KSR - Фото ${year} г.`;
        } else {
            document.title = 'KSR - Page Not Found';
        }
    }, [year, isInclude]);

    return (
        <>
            {isInclude ?
                <>
                    <div className="wrapper__top">
                        <header className="header">
                            <div className="header__logo">
                                <Link to="/">
                                    <img className="header__logoImg" src='./img/ninjaKSR.png' alt="logo"/>
                                </Link>
                            </div>
                            <div className="header__nav">
                                <p className="header__title">ФотоАльбом {year}</p>
                                <nav className="nav">
                                    <ul className="nav__list">

                                        {albumList.map((album: IPhotoAlbumItem) => (
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
                            {status === 'loading' && <div className='photoContent__loading'>Загрузка...</div>}
                            {status === 'rejected' && <div><span className='photoContent__error'>Ошибка получения данных:</span> {error}</div>}
                            <ul className="photoContent__list">
                                {typeof year === 'string' && <PhotoContentComponent year={year}/>}
                            </ul>
                        </section>
                    </div>
                    
                    <div className="wrapper__bottom">
                        <div className="goToPage goToVideoPage">
                            <Link to={"/video" + year} className='goToVideoPage__link'>Видео -&gt;</Link>
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

export default PhotoPage;
