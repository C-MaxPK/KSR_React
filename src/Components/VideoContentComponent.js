import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';
import VideoIFrameComponent from './VideoIFrameComponent';
import { clearData, getMediaData } from '../store/media/mediaActions';
import { selectGalleryList } from '../store/media/mediaSelectors';

const VideoContentComponent = ({ year }) => {
    console.log('VideoContentComponent')
    const dispatch = useDispatch();
    const galleryList = useSelector(selectGalleryList);
    const [initLightbox, setInitLightbox] = useState({
        videoIndex: 0,
        isOpen: false,
    });

    useEffect(() => {
        dispatch(getMediaData(year, 'video'));
        return () => {
            dispatch(clearData());
        }
    }, [year, dispatch]);

    return <>            
            {galleryList?.map((item, idx) => (
                <li className="videoContent__item" key={item.title}>
                    <Link to="" onClick={() => setInitLightbox({videoIndex: idx, isOpen: true})}>
                        <img className="videoContent__img" src={`./video/${year}/${idx + 1}.jpg`} alt="preview" />
                        <p className="videoContent__title">{item.title}</p>
                    </Link>
                </li>
            ))}

            {initLightbox.isOpen && (
                <Lightbox
                    mainSrc={<VideoIFrameComponent url={galleryList[initLightbox.videoIndex].url}/>}
                    nextSrc={galleryList[(initLightbox.videoIndex + 1) % galleryList.length].url}
                    prevSrc={galleryList[(initLightbox.videoIndex + galleryList.length - 1) % galleryList.length].url}
                    onCloseRequest={() => setInitLightbox(prevState => ({...prevState, isOpen: false}))}
                    onMovePrevRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            videoIndex: (initLightbox.videoIndex + galleryList.length - 1) % galleryList.length
                        }))
                    }
                    onMoveNextRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            videoIndex: (initLightbox.videoIndex + 1) % galleryList.length
                        }))
                    }
                    enableZoom={false}
                />
            )}
        </>
};

export default VideoContentComponent;
