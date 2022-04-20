const initialState = {
    arrYears: ['2007-08', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
    photoAlbumList: [
        {id: '2007-08', url: '/photo2007-08', img: './img/fAlbum07-08.png'},
        {id: '2009', url: '/photo2009', img: './img/fAlbum09.png'},
        {id: '2010', url: '/photo2010', img: './img/fAlbum10.png'},
        {id: '2011', url: '/photo2011', img: './img/fAlbum11.png'},
        {id: '2012', url: '/photo2012', img: './img/fAlbum12.png'},
        {id: '2013', url: '/photo2013', img: './img/fAlbum13.png'},
        {id: '2014', url: '/photo2014', img: './img/fAlbum14.png'},
        {id: '2015', url: '/photo2015', img: './img/fAlbum15.png'},
        {id: '2016', url: '/photo2016', img: './img/fAlbum16.png'},
        {id: '2017', url: '/photo2017', img: './img/fAlbum17.png'}
    ],
    videoAlbumList: [
        {id: '2007-08', title: '2007-2008 г.', url: '/video2007-08', img: './img/vAlbum07-08.png'},
        {id: '2009', title: '2009 г.', url: '/video2009', img: './img/vAlbum09.png'},
        {id: '2010', title: '2010 г.', url: '/video2010', img: './img/vAlbum10.png'},
        {id: '2011', title: '2011 г.', url: '/video2011', img: './img/vAlbum11.png'},
        {id: '2012', title: '2012 г.', url: '/video2012', img: './img/vAlbum12.png'},
        {id: '2013', title: '2013 г.', url: '/video2013', img: './img/vAlbum13.png'},
        {id: '2014', title: '2014 г.', url: '/video2014', img: './img/vAlbum14.png'},
        {id: '2015', title: '2015 г.', url: '/video2015', img: './img/vAlbum15.png'},
        {id: '2016', title: '2016 г.', url: '/video2016', img: './img/vAlbum16.png'},
        {id: '2017', title: '2017 г.', url: '/video2017', img: './img/vAlbum17.png'}
    ]
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ADD_PHOTO_THEME_LIST':
            return {...state, themeList: payload};
        case 'ADD_PHOTO_URL_LIST':
            return {...state, imagesUrl: payload};
        case 'ADD_VIDEO_LIST':
            return {...state, videoList: payload};
        default:
            return state;
    }
};

export default reducer;