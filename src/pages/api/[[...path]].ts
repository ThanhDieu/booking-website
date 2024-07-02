import type { NextApiRequest, NextApiResponse } from 'next';
import axiosHttp from '@/clientApi/http';
/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Lấy thông tin người dùng bằng ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công. Trả về thông tin người dùng.
 *       404:
 *         description: Không tìm thấy người dùng.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await axiosHttp({
      method: req.method,
      data: req.body,
      url: req.url?.replace('/api/booking/v1', '').replace(/\/$/, '').replace(/\/(?=\?)/, ''),
    });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err)
  }

}
