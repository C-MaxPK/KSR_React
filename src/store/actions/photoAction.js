import { ADD_PHOTO_THEME_LIST, ADD_PHOTO_URL_LIST } from "../types/types";

export const addPhotoThemeList = (data) => ({
    type: ADD_PHOTO_THEME_LIST,
    payload: data
});

export const addPhotoUrlList = (data) => ({
    type: ADD_PHOTO_URL_LIST,
    payload: data
});

export const getPhotoData = (year) => dispatch => {
    fetch(`./json/photoThemeList${year}.json`)
            .then(response => response.json())
            .then(data => dispatch(addPhotoThemeList(data)))
            .catch(error => console.log(error));

    fetch(`./json/photoUrl${year}.json`)
        .then(response => response.json())
        .then(data => dispatch(addPhotoUrlList(data)))
        .catch(error => console.log(error));
};
