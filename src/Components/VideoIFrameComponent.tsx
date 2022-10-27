interface IVideoIFrameComponentProps {
    url: string;
}

const VideoIFrameComponent = ({ url }: IVideoIFrameComponentProps): JSX.Element => {

    return (
        <div className="iframe">
            <div className="iframe2">
                <iframe 
                    width="100%"
                    height="90%"
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
};

export default VideoIFrameComponent;
