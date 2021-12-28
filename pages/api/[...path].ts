// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import httpProxy from 'http-proxy'
import Cookies from 'cookies'
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({})

export const config = {
  api: {
    bodyParser: false, // nextjs auto parse
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  //wrap in promise void warining "API resolved without sending a response for /api/profile, this may result in stalled requests."
  return new Promise((resolve) => {
    // convert cookie to header authorization
    const cookie = new Cookies(req, res)
    if (cookie.get('accessToken')) {
      req.headers.authorization = 'Bearer ' + cookie.get('accessToken')
    }

    // don't send cookies to API server

    req.headers.cookie = ''

    // https://js-post-api.herokuapp.com/api/................................
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false, // response proxy will do all
    })

    proxy.once('proxyRes', () => resolve(true))
  })
}
