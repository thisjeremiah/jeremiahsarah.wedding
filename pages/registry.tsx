import cx from 'classnames'
import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
import { ImageGallery } from '../components/ImageGallery'
import Layout from '../components/Layout'

const ZOLA_REGISTRY_KEY = 'jeremiahsarahwedding'
const ZOLA_REGISTRY_BASE = 'https://www.zola.com/registry'
// const ZOLA_REGISTRY_URL = ZOLA_REGISTRY_BASE + '/' + ZOLA_REGISTRY_KEY

type RegistryPageProps = {
  items: RegistryItem[]
}

const registrySorts = {
  featured: {
    label: 'Featured',
  },
  priceLowToHigh: {
    label: 'Price: Low to High',
  },
  priceHighToLow: {
    label: 'Price: High to Low',
  },
}

type RegistrySort = keyof typeof registrySorts

const Registry: NextPage<RegistryPageProps> = (props) => {
  const [sort, setSort] = useState<RegistrySort>('featured')

  const items = useMemo(() => {
    if (sort === 'featured') {
      return props.items
    } else if (sort === 'priceLowToHigh') {
      const result = [...props.items]
      result.sort((a, b) => {
        if (a.cash) {
          if (b.cash) {
            return 1
          } else {
            return -1
          }
        }
        if (b.cash) {
          return 1
        }
        return b.price < a.price ? 1 : -1
      })
      return result
    } else {
      const result = [...props.items]
      result.sort((a, b) => {
        if (b.cash) {
          if (a.cash) {
            return 1
          } else {
            return -1
          }
        }
        if (a.cash) {
          return 1
        }
        return a.price < b.price ? 1 : -1
      })
      return result
    }
  }, [props.items, sort])

  return (
    <Layout
      title="Registry"
      navClassName="bg-terracotta-600"
      navBackdropClassName="bg-terracotta-400/50"
      className="bg-terracotta-500 text-white cursor-terracotta selection:bg-lemon-700"
    >
      <div className="pb-6 md:px-11 sm:px-6 sm:pt-10 px-6 pt-3">
        <div className="flex justify-end">
          <div className="flex pb-6 gap-2 items-center">
            <p className="text-base">Sort by:</p>
            <div className="relative">
              <select
                onChange={(e) => {
                  setSort(e.currentTarget.value as RegistrySort)
                }}
                className="[-webkit-appearance:none] [-moz-appearance:none] bg-transparent text-base border-[1.5px] rounded py-1 pl-2 pr-6 outline-none"
                value={sort}
              >
                {Object.entries(registrySorts).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
              <div className="absolute w-2 h-3 leading-[0.2rem] text-lg leading-none top-[calc(50%-0.33rem)] right-2.5">
                ⌄
              </div>
            </div>
          </div>
        </div>
        <div
          className={cx(
            'grid place-items-center items-start gap-6',
            '2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2',
          )}
        >
          {items.map((item) => (
            <RegistryGridItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

function RegistryGridItem(props: { item: RegistryItem }) {
  const price = props.item.cash
    ? 'Contribute what you wish'
    : `$${props.item.price}`

  return (
    <div className="lowercase">
      <a
        target="_blank"
        rel="noreferrer"
        href={collectionItemUrl(props.item.id)}
      >
        <div className="relative">
          <ImageGallery
            disabled={props.item.purchased}
            images={props.item.images.map((image) => image.medium)}
          />
          {props.item.purchased && (
            <div className="text-sm leading-none tracking-wide uppercase absolute top-2 right-2 bg-fuschia-600 py-1 px-2 rounded font-fairplex-wide font-bold select-none">
              Purchased
            </div>
          )}
        </div>
        <div className="pt-1.5 flex flex-col w-fit">
          {props.item.brand.name ? (
            <p className="font-medium text-base">{props.item.brand.name}</p>
          ) : undefined}
          <p className="text-base">{props.item.name}&nbsp;↗</p>
          <p className="text-base text-lemon-500">{price}</p>
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
  contributions: {
    fulfilled: boolean
    mark_fulfilled: boolean
    show_as_fulfilled: boolean
  }
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
  description: string
  requestedQuantity: number
  purchased: boolean
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

  const items: RegistryItem[] = data.default_collection
    // Filter out items that are out of stock
    .filter((item) => !item.stock_message)
    .map((item) => ({
      id: item.item_id,
      name: item.name,
      price: Math.round(item.price),
      cash: item.type === 'CASH',
      description: item.description,
      images: item.images,
      mostWanted: item.most_wanted,
      requestedQuantity: item.requested_quantity,
      purchased:
        item.contributions.fulfilled ||
        item.contributions.mark_fulfilled ||
        item.contributions.show_as_fulfilled,
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
