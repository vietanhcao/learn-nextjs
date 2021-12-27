// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: any[] | string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ name: 'method not supported' })
  }

  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data: { data: any[] } = await response.json()

  res.status(200).json({ name: data.data })
}
