import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://dummyjson.com'



export const options = {
    stages: [
        { duration: '30s', target: 10 },   
        { duration: '1m', target: 100 },   
        { duration: '1m', target: 150 },   
        { duration: '10m', target: 200 },   
        { duration: '1m', target: 30 }, 
    ],
    ext: {
        loadimpact: {
        name: 'Stress Test',
        },
    },
}

export default function () {


    const login_url=`${BASE_URL}/products/add`;

    const login_payload = JSON.stringify(
        {
            "title": "Perfume Oil",
            "description": "Mega Discount, Impression of A...",
            "price": 13
    }

    );

    
    const login_res = http.post(login_url, login_payload, 
        {
            headers: { 'Content-Type': 'application/json' },
        },
    )



    check(login_res,
        {
            "status code is": (r)=> r.status===201,
        }
    )
        
    console.log(`login_res - Status Code: ${login_res.status} `);
}
