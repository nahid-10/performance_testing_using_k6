import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://dummyjson.com';


export const options = {
    vus: 3,
    duration: '1m',
    ext: {
        loadimpact: {
        name: 'Smoke Test',
        },
    },
}

export default function () {

    const post_url=`${BASE_URL}/products/add`;

    const post_payload=JSON.stringify(
        {
            
            "title": "Perfume Oil",
            "description": "Mega Discount, Impression of A...",
            "price": 13

        }
    );

    let post_res = http.post(post_url, post_payload,
        {
        headers: { 'Content-Type': 'application/json' },
        }
    );

    check(post_res,
            { 
            'success new product': (r) => r.status === 201
            }
        )
    console.log(`Status Code: ${post_res.status}`)
    console.log(`response body is: ${post_res.body}`)
    sleep(1)
}