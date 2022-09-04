import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PhotoPage from "../pages/PhotoPage";
import VideoPage from "../pages/VideoPage";
import NotFound from "../pages/NotFound";

const Router = () => {
    console.log('Router')
    const arrYears = ['2007-08', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/photo:year" element={<PhotoPage arrYears={arrYears}/>} />
            <Route path="/video:year" element={<VideoPage arrYears={arrYears}/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
};

export default Router;
