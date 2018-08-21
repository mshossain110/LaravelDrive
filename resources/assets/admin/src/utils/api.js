import axios from 'axios';

var token = document.head.querySelector('meta[name="csrf-token"]');

export default axios.create({
    headers: {
        'X-Requested-With':'XMLHttpRequest',
        'X-CSRF-TOKEN': token.content,
    }
})
