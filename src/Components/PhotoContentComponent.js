import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from "jquery";
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';
import { clearData, getMediaData } from '../store/media/mediaActions';
import { selectGalleryList } from '../store/media/mediaSelectors';

const spoiler = (idx) => {
    $(`.spoilerLinks${idx}`).parent().children('.spoilerBody').toggle('normal');
};

const getMarkupPhotos = (countPhotos, idx, year, setInitLightbox) => {
    let contentPhoto = [];

    for (let i = 0; i < countPhotos; i++) {
        contentPhoto.push(
            <img 
                src={`./photo/${year}/small/${idx + 1}/${i + 1}.jpg`}
                alt="preview"
                onClick={() => setInitLightbox({photoIndex: i, photoThemeIndex: idx, isOpen: true})}
                key={i}
            />
        );
    }

    return contentPhoto;
};

const PhotoContentComponent = ({ year }) => {
    console.log('PhotoContentComponent')
    const dispatch = useDispatch();
    const galleryList = useSelector(selectGalleryList);
    const [initLightbox, setInitLightbox] = useState({
        photoIndex: 0,
        photoThemeIndex: 0,
        isOpen: false,
    });

    useEffect(() => {
        dispatch(getMediaData(year, 'photo'));
        $('.spoilerBody').toggle(false);
        
        return () => {
            dispatch(clearData());
        }
    }, [year, dispatch]);

    return <>
            {galleryList?.map((theme, idx) => (
                <li className="photoContent__item" key={theme.title}>
                    <Link to="" className={`spoilerLinks${idx}`} onClick={() => spoiler(idx)}>
                        {theme.title}
                    </Link>
                    <div className="spoilerBody">
                        {getMarkupPhotos(theme.url.length, idx, year, setInitLightbox)}
                    </div>
                </li>
            ))}
            
            {initLightbox.isOpen && (
                <Lightbox
                    mainSrc={galleryList[initLightbox.photoThemeIndex].url[initLightbox.photoIndex]}
                    nextSrc={galleryList[initLightbox.photoThemeIndex].url[(initLightbox.photoIndex + 1) % galleryList[initLightbox.photoThemeIndex].url.length]}
                    prevSrc={galleryList[initLightbox.photoThemeIndex].url[(initLightbox.photoIndex + galleryList[initLightbox.photoThemeIndex].url.length - 1) % galleryList[initLightbox.photoThemeIndex].url.length]}
                    onCloseRequest={() => setInitLightbox(prevState => ({...prevState, isOpen: false}))}
                    onMovePrevRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            photoIndex: (initLightbox.photoIndex + galleryList[initLightbox.photoThemeIndex].url.length - 1) % galleryList[initLightbox.photoThemeIndex].url.length
                        }))
                    }
                    onMoveNextRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            photoIndex: (initLightbox.photoIndex + 1) % galleryList[initLightbox.photoThemeIndex].url.length
                        }))
                    }
                />
            )}
        </>
};

export default memo(PhotoContentComponent);
