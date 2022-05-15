import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from "jquery";
import Lightbox from 'lightbox-react';
import { getPhotoData } from '../../store/actions/photoAction';
import 'lightbox-react/style.css';

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
    const dispatch = useDispatch();
    const imagesUrl = useSelector(state => state.imagesUrl);
    const themeList = useSelector(state => state.themeList);
    const [initLightbox, setInitLightbox] = useState({
        photoIndex: 0,
        photoThemeIndex: 0,
        isOpen: false,
    });

    useEffect(() => {
        dispatch(getPhotoData(year));
        $('.spoilerBody').toggle(false);
    }, [year, dispatch]);

    return <>
            {themeList?.map((theme, idx) => (
                <li className="photoContent__item" key={theme.title}>
                    <Link to="" className={`spoilerLinks${idx}`} onClick={() => spoiler(idx)}>
                        {theme.title}
                    </Link>
                    <div className="spoilerBody">
                        {getMarkupPhotos(theme.count, idx, year, setInitLightbox)}
                    </div>
                </li>
            ))}

            {initLightbox.isOpen && (
                <Lightbox
                    mainSrc={imagesUrl[initLightbox.photoThemeIndex][initLightbox.photoIndex]}
                    nextSrc={imagesUrl[initLightbox.photoThemeIndex][(initLightbox.photoIndex + 1) % imagesUrl[initLightbox.photoThemeIndex].length]}
                    prevSrc={imagesUrl[initLightbox.photoThemeIndex][(initLightbox.photoIndex + imagesUrl[initLightbox.photoThemeIndex].length - 1) % imagesUrl[initLightbox.photoThemeIndex].length]}
                    onCloseRequest={() => setInitLightbox(prevState => ({...prevState, isOpen: false}))}
                    onMovePrevRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            photoIndex: (initLightbox.photoIndex + imagesUrl[initLightbox.photoThemeIndex].length - 1) % imagesUrl[initLightbox.photoThemeIndex].length
                        }))
                    }
                    onMoveNextRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            photoIndex: (initLightbox.photoIndex + 1) % imagesUrl[initLightbox.photoThemeIndex].length
                        }))
                    }
                />
            )}
        </>
};

export default memo(PhotoContentComponent);
