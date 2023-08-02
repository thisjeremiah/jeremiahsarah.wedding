import RegistryPage from './registry-page'
import { getRegistryItems } from './request'
import { theme } from '../../tailwind.config.js'
import { Metadata } from 'next'

export default async function Page() {
  const items = await getRegistryItems()

  return <RegistryPage items={items} />
}

export const metadata: Metadata = {
  themeColor: theme.extend.colors.terracotta[500],
}
