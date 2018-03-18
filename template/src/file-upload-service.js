import axios from '@/axios';

function upload(url, formData) {
    return axios
        .post(url, formData)
        // get data
        .then(x => x.data);
}

export { upload };
