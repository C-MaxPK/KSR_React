import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IPhotoAlbumItem {
    id: string;
    url: string;
    img: string;
}

export interface IVideoAlbumItem extends IPhotoAlbumItem {
    title: string;
}

export interface IGalleryItem {
    title: string;
    url: string; // | string[]
}

interface IMediaState {
    status: string;
    error: null | string;
    photoAlbumList: IPhotoAlbumItem[];
    videoAlbumList: IVideoAlbumItem[];
    galleryList: [] | IGalleryItem[];
}

interface IGetMediaDataProps {
    year: string;
    type: string;
}

const initialState: IMediaState = {
    status: 'idle',
    error: null,
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
    ],
    galleryList: []
};

export const getMediaData = createAsyncThunk(
    '@@media/getMediaData',
    async ({year, type}: IGetMediaDataProps): Promise<IGalleryItem[]> => {
        const response = await fetch(`./json/${type}GalleryList${year}.json`);
        const data: IGalleryItem[] = await response.json();
        return data;
    }
);

const mediaSlice = createSlice({
	name: '@@media',
	initialState,
	reducers: {
		// setLoading: (state) => {
		// 	state.status = 'loading';
		// },
		// setError: (state, action) => {
		// 	state.status = 'rejected';
		// 	state.error = action.payload;
		// },
		// addGalleryList: (state, action) => {
		// 	state.status = 'fulfilled';
		// 	state.error = null;
		// 	state.galleryList = action.payload;
		// },
		clearData: (): IMediaState => {
            return initialState;
		}
	},
    extraReducers: (builder): void => {
        builder
            .addCase(getMediaData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMediaData.fulfilled, (state, action: PayloadAction<IGalleryItem[]>) => {
                state.status = 'fulfilled';
                state.error = null;
                state.galleryList = action.payload;
            })
            .addCase(getMediaData.rejected, (state, {error}) => {
                state.status = 'rejected';
                if (typeof error.message === 'string') {
                    state.error = error.message;
                }
            });
    },
});

export const { clearData } = mediaSlice.actions;

export const selectPhotoAlbumList = (state: RootState) => state.photoAlbumList;
export const selectVideoAlbumList = (state: RootState) => state.videoAlbumList;
export const selectGalleryList = (state: RootState) => state.galleryList;
export const selectStatus = (state: RootState) => state.status;
export const selectError = (state: RootState) => state.error;

// export const getMediaData = ({year, type}) => (dispatch) => {
//     dispatch(setLoading());
//     setTimeout(() => {
//         fetch(`./json/${type}GalleryList${year}.json`)
//             .then(response => response.json())
//             .then(data => dispatch(addGalleryList(data)))
//             .catch(error => {
//                 dispatch(setError(error.message));
//                 throw new Error("Ошибка получения данных");
//             });
//     }, 500);
// };

export default mediaSlice.reducer;
