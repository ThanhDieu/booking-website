import { AxiosResponse } from "axios";

export interface AxiosResponseCustomType extends AxiosResponse {
    code?: number;
    folios?: any;
    payments?: any;
    balance?: any;
    errors?: any;
};
