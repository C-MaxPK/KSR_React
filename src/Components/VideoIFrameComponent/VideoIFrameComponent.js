const VideoIFrameComponent = ({ url }) => {

    console.log('VideoIFrameComponent');

    return (
        <div className="iframe">
            <div className="iframe2">

                    <iframe 
                        width="100%"
                        height="100%"
                        src={ url } 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        >
                    </iframe>

            </div>
        </div>
    );
}

export default VideoIFrameComponent;
