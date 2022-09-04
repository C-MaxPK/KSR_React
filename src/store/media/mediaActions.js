export const ADD_GALLERY_LIST = 'MEDIA::ADD_GALLERY_LIST';
export const CLEAR_DATA = 'MEDIA::CLEAR_DATA';
export const SET_LOADING = 'MEDIA::SET_LOADING';
export const SET_ERROR = 'MEDIA::SET_ERROR';

const setLoading = () => ({
    type: SET_LOADING
});

const setError = (error) => ({
    type: SET_ERROR,
    payload: error
});

const addGalleryList = (data) => ({
    type: ADD_GALLERY_LIST,
    payload: data
});

export const clearData = () => ({
    type: CLEAR_DATA
});

export const getMediaData = (year, type) => dispatch => {
    dispatch(setLoading());

    setTimeout(() => {
        fetch(`./json/${type}GalleryList${year}.json`)
            .then(response => response.json())
            .then(data => dispatch(addGalleryList(data)))
            .catch(error => {
                dispatch(setError(error.message));
                throw new Error("Ошибка получения данных");
            });
    }, 1000);
};
