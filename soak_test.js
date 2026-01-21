import http from 'k6/http'
import {sleep,check} from 'k6'


const BASE_URL=`https://dummyjson.com`;

export const options={
    stages: [
    { duration: '5m', target: 100 }, 
    { duration: '30m', target: 100 }, 
    { duration: '1m', target: 0 }, 
        
    ],
    ext: {
        loadimpact: {
        name: 'Soak Test',
        },
    },
}

export default function()
{
    const url=`${BASE_URL}/products/add`;

    const payload=JSON.stringify(
        {
            title: 'Perfume Oil',
            description: 'Mega Discount, Impression of A...',
            price: 13,
        }
    )

    const params={
        headers: { 'Content-Type': 'application/json' },
    }

    const res=http.post(url,payload,params)

    check(res,
        {
            "status code is": (r)=>r.status===201,
        }
    )
    sleep(1)

    console.log(`status code is ${res.status}`);
}