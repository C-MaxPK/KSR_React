import { Routes, Route } from "react-router-dom";
import HomeComponent from "../HomeComponent/HomeComponent";
import PhotoComponent from "../PhotoComponent/PhotoComponent";
import VideoComponent from "../VideoComponent/VideoComponent";
import NotFound from "../NotFound/NotFound";

const Router = () => {

    console.log('Router');

    return (
        <Routes>
            <Route path="/" element={<HomeComponent/>} />
            <Route path="/photo:year" element={<PhotoComponent/>} />
            <Route path="/video:year" element={<VideoComponent/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
};

export default Router;
