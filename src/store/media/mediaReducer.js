import { ADD_GALLERY_LIST, CLEAR_DATA, SET_ERROR, SET_LOADING } from './mediaActions';

const initialState = {
    status: 'idle',
    error: null,
    photoAlbumList: [
        {id: '2007-08', url: '/photo2007-08', img: './KSR_React/img/fAlbum07-08.png'},
        {id: '2009', url: '/photo2009', img: './KSR_React/img/fAlbum09.png'},
        {id: '2010', url: '/photo2010', img: './KSR_React/img/fAlbum10.png'},
        {id: '2011', url: '/photo2011', img: './KSR_React/img/fAlbum11.png'},
        {id: '2012', url: '/photo2012', img: './KSR_React/img/fAlbum12.png'},
        {id: '2013', url: '/photo2013', img: './KSR_React/img/fAlbum13.png'},
        {id: '2014', url: '/photo2014', img: './KSR_React/img/fAlbum14.png'},
        {id: '2015', url: '/photo2015', img: './KSR_React/img/fAlbum15.png'},
        {id: '2016', url: '/photo2016', img: './KSR_React/img/fAlbum16.png'},
        {id: '2017', url: '/photo2017', img: './KSR_React/img/fAlbum17.png'}
    ],
    videoAlbumList: [
        {id: '2007-08', title: '2007-2008 г.', url: '/video2007-08', img: './KSR_React/img/vAlbum07-08.png'},
        {id: '2009', title: '2009 г.', url: '/video2009', img: './KSR_React/img/vAlbum09.png'},
        {id: '2010', title: '2010 г.', url: '/video2010', img: './KSR_React/img/vAlbum10.png'},
        {id: '2011', title: '2011 г.', url: '/video2011', img: './KSR_React/img/vAlbum11.png'},
        {id: '2012', title: '2012 г.', url: '/video2012', img: './KSR_React/img/vAlbum12.png'},
        {id: '2013', title: '2013 г.', url: '/video2013', img: './KSR_React/img/vAlbum13.png'},
        {id: '2014', title: '2014 г.', url: '/video2014', img: './KSR_React/img/vAlbum14.png'},
        {id: '2015', title: '2015 г.', url: '/video2015', img: './KSR_React/img/vAlbum15.png'},
        {id: '2016', title: '2016 г.', url: '/video2016', img: './KSR_React/img/vAlbum16.png'},
        {id: '2017', title: '2017 г.', url: '/video2017', img: './KSR_React/img/vAlbum17.png'}
    ],
    galleryList: []
};

const mediaReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LOADING:
            return {...state, status: 'loading', error: null}
        case SET_ERROR:
            return { ...state, status: 'rejected', error: payload}
        case ADD_GALLERY_LIST:
            return {...state, galleryList: payload, status: 'fulfilled', error: null};
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
};

export default mediaReducer;
