import { promisify } from 'util'
import { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

const AIRTABLE_API_KEY = String(process.env.AIRTABLE_API_KEY)
const BASE_ID = 'appmheV8RAljBPMU5'
const TABLE_ID = 'tblC69ZDRtjIn7bT4'

export default async function submit(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { form = null } = req.query
  if (form === 'rehearsal') {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID)

    const create = promisify(base(TABLE_ID).create)

    await create([
      {
        // @ts-ignore
        fields: {
          Name: req.body.name,
          Coming: req.body.coming,
        },
      },
    ])

    console.log('submitted form')

    res.status(200).json({})
  }
}
