import axios from "axios";


const serverIQCheck = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_IQCHECK_API}/api/v2`
})


serverIQCheck.interceptors.response.use((res) => res)

export default serverIQCheck;
