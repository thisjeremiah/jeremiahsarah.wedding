import { promisify } from 'util'
import { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

const AIRTABLE_API_KEY = String(process.env.AIRTABLE_API_KEY)

const BASE_ID = 'appmheV8RAljBPMU5'

const REHEARSAL_TABLE_ID = 'tblC69ZDRtjIn7bT4'
const WEDDING_TABLE_ID = 'tblNy1UqbeiFB8rLE'

export default async function submit(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { form = null } = req.query
  if (form === 'rehearsal') {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID)

    const create = promisify(base(REHEARSAL_TABLE_ID).create)

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
  } else if (form === 'wedding') {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID)

    const create = promisify(base(WEDDING_TABLE_ID).create)

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
