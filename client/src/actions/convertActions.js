import axios from 'axios';

export const CONVERT_FILE_REQUEST = 'CONVERT_FILE_REQUEST';
export const CONVERT_FILE_SUCCESS = 'CONVERT_FILE_SUCCESS';
export const CONVERT_FILE_FAILURE = 'CONVERT_FILE_FAILURE';

export const convertFile = (file) => async (dispatch) => {
  dispatch({ type: CONVERT_FILE_REQUEST });
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/convert', formData, {
      responseType: 'blob',
    });

    dispatch({ type: CONVERT_FILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CONVERT_FILE_FAILURE, payload: error.message });
  }
};
