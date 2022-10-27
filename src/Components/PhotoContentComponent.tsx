import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';
import { clearData, getMediaData, IGalleryItem, selectGalleryList } from '../store/media/mediaSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface IPhotoContentComponentProps {
    year: string;
}

interface IInitLightbox {
    photoIndex: number;
    photoThemeIndex: number;
    isOpen: boolean;
}

const spoiler = (idx: number): void => {
    $(`.spoilerLinks${idx}`).parent().children('.spoilerBody').toggle(400);
};

const getMarkupPhotos = (countPhotos: number, idx: number, year: string, setInitLightbox: Dispatch<SetStateAction<IInitLightbox>>): JSX.Element[]  => {
    const contentPhoto: JSX.Element[] = [];

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

const PhotoContentComponent = ({ year }: IPhotoContentComponentProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const galleryList = useAppSelector(selectGalleryList);
    const [initLightbox, setInitLightbox] = useState<IInitLightbox>({
        photoIndex: 0,
        photoThemeIndex: 0,
        isOpen: false,
    });

    useEffect(() => {
        dispatch(getMediaData({year, type: 'photo'}));
        $('.spoilerBody').toggle(false);
        
        return () => {
            dispatch(clearData());
        };
    }, [year, dispatch]);

    return <>
            {galleryList?.map((theme: IGalleryItem, idx: number) => (
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
        </>;
};

export default memo(PhotoContentComponent);
