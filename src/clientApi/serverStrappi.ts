import { serviceOptions } from "@/service/cmsStrapiService";
import axios from "axios";


const serverStrapi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_STRAPI_API}/api/`
})


serverStrapi.interceptors.response.use((res) => res)

serviceOptions.axios = serverStrapi;

export default serverStrapi;