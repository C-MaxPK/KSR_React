import { ADD_VIDEO_LIST } from "../types/types";

export const addVideoList = (data) => ({
    type: ADD_VIDEO_LIST,
    payload: data
});

export const getVideoList = (year) => dispatch => {
    fetch(`./json/videoList${year}.json`)
        .then(response => response.json())
        .then(data => dispatch(addVideoList(data)))
        .catch(error => console.log(error));
};
