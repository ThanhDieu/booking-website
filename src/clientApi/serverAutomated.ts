import axios from "axios";

const serverAutomated = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_AUTOMATED_BASE_URL}/automate/v1/`
})

serverAutomated.interceptors.response.use((res) => res)

export default serverAutomated;
