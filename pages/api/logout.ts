// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Cookies from 'cookies'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' })
  }

  const cookie = new Cookies(req, res)
  cookie.set('accessToken') //clear access token

  res.status(200).json({ message: 'OK' })
}
