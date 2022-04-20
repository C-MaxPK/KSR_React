import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lightbox from 'lightbox-react';
import VideoIFrameComponent from '../VideoIFrameComponent/VideoIFrameComponent';
import { addVideoList } from '../../store/actions/videoListAction';
import 'lightbox-react/style.css';

const VideoContentComponent = ({ year }) => {
    const dispatch = useDispatch();
    const videoList = useSelector(state => state.videoList);
    const [initLightbox, setInitLightbox] = useState({
        videoIndex: 0,
        isOpen: false,
    });

    useEffect(() => {
        fetch(`./json/videoList${year}.json`)
            .then(response => response.json())
            .then(data => dispatch(addVideoList(data)))
            .catch(error => console.log(error));
    }, [year, dispatch]);

    console.log('VideoContentComponent');

    return <>
            {videoList?.map((item, idx) => (
                <li className="videoContent__item" key={item.title}>
                    <Link to="" onClick={() => setInitLightbox({videoIndex: idx, isOpen: true})}>
                        <img className="videoContent__img" src={`./video/${year}/${idx + 1}.jpg`} alt="preview" />
                        <p className="videoContent__title">{item.title}</p>
                    </Link>
                </li>
            ))}

            {initLightbox.isOpen && (
                <Lightbox
                    mainSrc={<VideoIFrameComponent url={videoList[initLightbox.videoIndex].url}/>}
                    nextSrc={videoList[(initLightbox.videoIndex + 1) % videoList.length].url}
                    prevSrc={videoList[(initLightbox.videoIndex + videoList.length - 1) % videoList.length].url}
                    onCloseRequest={() => setInitLightbox(prevState => ({...prevState, isOpen: false}))}
                    onMovePrevRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            videoIndex: (initLightbox.videoIndex + videoList.length - 1) % videoList.length
                        }))
                    }
                    onMoveNextRequest={() =>
                        setInitLightbox(prevState => ({
                            ...prevState,
                            videoIndex: (initLightbox.videoIndex + 1) % videoList.length
                        }))
                    }
                    enableZoom={false}
                />
            )}
        </>
};

export default VideoContentComponent;
