// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies from 'cookies'
//
// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({})

type Data = {
  message: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // only post method
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' })
  }

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = ''

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      //Modify response
      let body = ''
      proxyRes.on('data', function (chunk) {// straeming data
        body += chunk
      })

      proxyRes.on('end', function () {
        try {
          const { accessToken, expiredAt } = JSON.parse(body)
          // convert token to cookie
          const cookie = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' })
          cookie.set('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt),
          })
          ;(res as NextApiResponse).status(200).json({ accessToken, expiredAt })
          // throw new Error('df')
        } catch (error) {
          ;(res as NextApiResponse).status(500).json({ message: 'server error' })
        }
      })

      resolve(true)
    }

    proxy.once('proxyRes', handleLoginResponse)

    // https://js-post-api.herokuapp.com/api/................................
    //setup proxy
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true, // control return data in next
    })
  })
}
