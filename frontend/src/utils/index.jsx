import axios from 'axios'
// import { API_URL } from '../../config'
// const productionUrl = 'https://plushheaven.onrender.com';
// const productionUrl ='http://localhost:5000'
console.log(import.meta.env.VITE_API_URL );
export const customFetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    
    withCredentials: true,
});
export const formatPriceForStripe = (price) => {
    // Convert the price to paise (smallest currency unit for INR)
    const priceInPaise = price * 100;

    return priceInPaise;
}

export const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(price); // No need to convert to rupees from paise

    return formattedPrice;
}





export const generateAmountOptions =(number) =>{
    return Array.from({length:number},(_,index)=>{
        const amount = index+1
        return <option key={amount} value={amount}>{amount}</option>
    })
}
