import httpStrapi from '@/clientApi/httpStrapi';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler (req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const response = await httpStrapi({
            url: req.url?.replace('/api/strapi', ''),
            method: req.method,
            data: req.body,
        });
        return res.status(200).json(response);
    } catch(err) {
        return res.status(500).json(err);
    }
};