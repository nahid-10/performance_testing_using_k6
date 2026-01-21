import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'https://dummyjson.com';

export const options = {
    stages: [
        { duration: '2m', target: 20 },
        { duration: '5m', target: 20 },
        { duration: '5m', target: 0 },
    ],
    ext: {
        loadimpact: {
            name: 'Load Test',
        },
    },
};

export default function () {
    const url = `${BASE_URL}/products/add`;

    const payload = JSON.stringify({
        title: 'Perfume Oil',
        description: 'Mega Discount, Impression of A...',
        price: 13,
    });

    const res = http.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    sleep(1);

    check(res, {
        'status code is 201': (r) => r.status === 201,
    });

    console.log(`status code is ${res.status}`);
}
