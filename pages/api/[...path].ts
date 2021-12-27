// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import httpProxy from 'http-proxy'
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // don't send cookies to API server

  req.headers.cookie = ''

  // https://js-post-api.herokuapp.com/api/................................
  proxy.web(req, res, {
    target: process.env.API_URL,
    changeOrigin: true,
    selfHandleResponse: false,
  })

}
