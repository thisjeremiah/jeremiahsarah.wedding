'use client'

import cx from 'classnames'
import { useMemo, useState } from 'react'
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import { ImageGallery } from '../../components/ImageGallery'
import Layout from '../../components/Layout'
import { theme } from '../../tailwind.config.js'
import { collectionItemUrl, getRegistryItems, RegistryItem } from './request'

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

const client = new QueryClient()

const emptyArr: [] = []

export default function RegistryPage(props: { items: RegistryItem[] }) {
  return (
    <QueryClientProvider client={client}>
      <RegistryPageInner {...props} />
    </QueryClientProvider>
  )
}

function RegistryPageInner(props: { items: RegistryItem[] }) {
  const result = useQuery('getRegistryItems', getRegistryItems, {
    refetchOnWindowFocus: true,
    refetchInterval: 60_000,
    refetchOnMount: 'always',
    initialData: props.items,
  })
  const items = result.data ?? emptyArr

  const [sort, setSort] = useState<RegistrySort>('featured')

  const sortedItems = useMemo(() => {
    if (sort === 'featured') {
      return items
    } else if (sort === 'priceLowToHigh') {
      const result = [...items]
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
      const result = [...items]
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
  }, [items, sort])

  return (
    <Layout
      title="Registry"
      navClassName="bg-terracotta-600"
      navBackdropClassName="bg-terracotta-400/50"
      className="bg-terracotta-500 text-white cursor-terracotta selection:bg-lemon-700"
      themeColor={theme.extend.colors.terracotta[500]}
      buttonClassName="text-terracotta-500 bg-white"
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
                className="bg-transparent text-base border-[1.5px] rounded py-1 pl-2 pr-6 outline-none border-white focus:ring-transparent focus:border-white text-white bg-none"
                value={sort}
              >
                {Object.entries(registrySorts).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
              <div className="absolute w-2 h-3 leading-[0.2rem] text-lg top-[calc(50%-0.33rem)] right-2.5">
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
          {sortedItems.map((item) => (
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
            <div className="text-sm leading-none tracking-wide uppercase absolute top-2 right-2 bg-fuschia-600 py-1 px-2 text-fuschia-50 rounded font-fairplex-wide font-bold select-none">
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
