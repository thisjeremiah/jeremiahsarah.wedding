import type { NextPage } from 'next'
import Head from 'next/head'
import Section from '../components/Section'

// const ZOLA_REGISTRY_KEY = 'j-s-1645330787898'
const ZOLA_REGISTRY_KEY = 'jeremiahsarahwedding'
const ZOLA_REGISTRY_URL = 'https://www.zola.com/registry/jeremiahsarahwedding'
// 'https://www.zola.com/wedding/j-s-1645330787898/registry/'

type RegistryPageProps = {
  items: RegistryItem[]
}

const Registry: NextPage<RegistryPageProps> = (props) => {
  return (
    <div className="h-screen">
      <Head>
        <title>Jeremiah & Sarah</title>
        <meta name="description" content="Jeremiah & Sarah" />
      </Head>

      <nav className="w-full justify-end text-rose-700 text-sm font-medium flex gap-6 p-4">
        {
          //<a href="/photos">Photos</a>
          // <a href="/things-to-do">Things To Do</a>
        }
        <a href="/registry">Registry</a>
      </nav>

      <main className="">
        <Section color="rose" rounded="t" height="screen">
          <div className="p-8 grid grid-cols-3">
            {props.items.map((item) => (
              <RegistryGridItem key={item.id} item={item} />
            ))}
          </div>
        </Section>
        <div className="w-full h-10" />
      </main>
    </div>
  )
}

function RegistryGridItem(props: { item: RegistryItem }) {
  const name = props.item.brand.name
    ? `${props.item.name} | ${props.item.brand.name}`
    : props.item.name

  return (
    <a target="_blank" href={ZOLA_REGISTRY_URL}>
      <img className="w-32" src={props.item.images[0].small} />
      <p>{name}</p>
      <p>${props.item.price}</p>
    </a>
  )
}

type ServerRegistryItem = {
  object_id: string
  sku_object_id: string
  product_id: string
  name: string
  type: string
  price: number
  images: any[]
  requested_quantity: number
  contributions: any[]
  personal_note: any
  button_cta: string
  most_wanted: boolean
  actions: any[]
  brand: any
  description: string
  detail_items: any[]
  product_look_id: string
  msrp: number
  sku_attributes: any[]
  arrival_date_range: any[]
  custom_shipping_message: any
  ship_method: string
  shippable: boolean
  return_policy: string
  delivery_surcharge: number
  discontinued: boolean
  stock_message: any
  free_shipping: boolean
  badge_uuid: any
  shipping_zones: any[]
  review_statistics: any[]
  store_name: any
  product_url: any
  cash_fund: boolean
  item_id: string
}

type RegistryItemImage = {
  thumb: string
  small: string
  medium: string
  large: string
  full: string
}

type RegistryItem = {
  id: string
  name: string
  price: number
  images: RegistryItemImage[]
  brand: { name?: string; description?: string; image_url?: string }
  description: string // TODO
}

export async function getServerSideProps() {
  const res = await fetch(
    'https://www.zola.com/web-api/v1/registry-collection/search',
    {
      method: 'POST',
      body: JSON.stringify({
        registry_key: ZOLA_REGISTRY_KEY,
        filters: {},
        flattened_view: true,
        grouped_by_collection: false,
        show_single_option_facets: false,
      }),
      headers: {
        ['Content-Type']: 'application/json',
      },
    },
  )

  const data: { default_collection: ServerRegistryItem[] } = await res.json()

  const items: RegistryItem[] = data.default_collection.map((item) => ({
    id: item.item_id,
    name: item.name,
    price: item.price,
    description: item.description,
    images: item.images,
    brand: {
      name: item.brand?.name ?? null,
      description: item.brand?.description ?? null,
      image_url: item.brand?.image_url ?? null,
    },
  }))

  return {
    props: {
      items,
    },
  }
}

export default Registry
