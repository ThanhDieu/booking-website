
export type LocationGlobalType = {
    countryCode: string;
    countryName: string;
}

/** fetch all bundle payload type */
export interface FetchAllBundlePayload {
    arrival?: number;
    departure?: number
}