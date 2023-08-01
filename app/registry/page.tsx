import RegistryPage from './registry-page'
import { getRegistryItems } from './request'

export default async function Page() {
  const items = await getRegistryItems()

  return <RegistryPage items={items} />
}
