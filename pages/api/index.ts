import { NextApiRequest, NextApiResponse } from 'next'

export default async function redirect(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url = null } = req.query

  if (url === null) {
    res.status(400).json({ error: 'Missing url parameter.' })
    return
  }
  if (typeof url !== 'string') {
    res.status(400).json({ error: 'url parameter must be string.' })
    return
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    res.send(response.body)

    return
  } catch (error) {
    res.status(500).json({ error })
    return
  }
}
