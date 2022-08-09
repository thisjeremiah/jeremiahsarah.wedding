import cx from 'classnames'
import type { NextPage } from 'next'
import { ImageGallery } from '../components/ImageGallery'
import Layout from '../components/Layout'
import Section from '../components/Section'

const ZOLA_REGISTRY_KEY = 'jeremiahsarahwedding'
const ZOLA_REGISTRY_BASE = 'https://www.zola.com/registry'
const ZOLA_REGISTRY_URL = ZOLA_REGISTRY_BASE + '/' + ZOLA_REGISTRY_KEY

type RegistryPageProps = {
  items: RegistryItem[]
}

const Registry: NextPage<RegistryPageProps> = (props) => {
  return (
    <Layout className="text-berry-500">
      <Section bg="lemon" color="rose" rounded="tr" height="content">
        <h1 className="px-8 text-3xl font-medium text-center uppercase font-fairplex pt-16">
          Our Registry
        </h1>
        <div
          className={cx(
            'grid px-11 place-items-center pt-10 gap-10',
            '2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2',
            'items-start',
          )}
        >
          {props.items.map((item) => (
            <RegistryGridItem key={item.id} item={item} />
          ))}
        </div>
      </Section>
      <div className="bg-rose-400 w-full h-10" />
    </Layout>
  )
}

function RegistryGridItem(props: { item: RegistryItem }) {
  const price = props.item.cash
    ? 'Contribute what you wish'
    : `$${props.item.price}`

  return (
    <div className="w-64 lowercase">
      <a
        target="_blank"
        rel="noreferrer"
        href={collectionItemUrl(props.item.id)}
      >
        <ImageGallery
          className="w-full shadow-lemon-500/20"
          images={props.item.images.map((image) => image.medium)}
        />
        <div className="pt-1.5 flex flex-col w-fit">
          {props.item.brand.name ? (
            <p className="font-medium text-sm">{props.item.brand.name}</p>
          ) : undefined}
          <p className="text-sm">{props.item.name} ↗</p>
          <p className="text-md font-serif">{price}</p>
        </div>
      </a>
    </div>
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
  cash: boolean
  images: RegistryItemImage[]
  brand: { name?: string; description?: string; image_url?: string }
  description: string // TODO
}

export async function getStaticProps() {
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
    price: Math.round(item.price),
    cash: item.type === 'CASH',
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
    revalidate: 10,
  }
}

function collectionItemUrl(collectionItemId: string | number) {
  return `${ZOLA_REGISTRY_BASE}/collection-item/${collectionItemId}`
}

export default Registry
