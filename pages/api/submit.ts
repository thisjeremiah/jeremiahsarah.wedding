import { NextApiRequest, NextApiResponse } from 'next'

export default async function submit(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { form = null } = req.query
  if (form === 'rehearsal') {
    const { name = '' } = req.body
    const names = (name as string).split(/[\n,]/)
    // TODO submit names to airtable
    res.status(200).json({})
  }
}
