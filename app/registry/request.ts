const ZOLA_REGISTRY_KEY = 'jeremiahsarahwedding'
const ZOLA_REGISTRY_BASE = 'https://www.zola.com/registry'

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
  stock_message?: string
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

export type RegistryItem = {
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

export async function getRegistryItems() {
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
      next: {
        revalidate: 10,
      },
    },
  )

  const data: { default_collection: ServerRegistryItem[] } = await res.json()

  const items: RegistryItem[] = data.default_collection
    // Filter out items that are out of stock
    //  remove out of stock and discontinued
    //  keep available to ship for later
    .filter((item) => {
      // no need to filter, if purchased
      if (
        item.contributions.fulfilled ||
        item.contributions.mark_fulfilled ||
        item.contributions.show_as_fulfilled
      )
        return true

      if (item.stock_message) {
        let msg = item.stock_message.toLowerCase()
        if (msg.includes('out of stock')) return false
        if (msg.includes('discontinued')) return false
      }

      return true
    })
    .map((item) => ({
      id: item.item_id,
      name: item.name,
      price: Math.round(item.price),
      cash: item.type === 'CASH' && item.button_cta === 'Contribute',
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

  return items
}

export function collectionItemUrl(collectionItemId: string | number) {
  return `${ZOLA_REGISTRY_BASE}/collection-item/${collectionItemId}`
}
