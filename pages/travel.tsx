import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Title from '../components/Title'

const airports = [
  { airport: 'Santa Barbara Airport (SBA)', info: '9 miles from venue' },
  { airport: 'Burbank Airport (BUR)', info: '90 miles (2 hours) from venue' },
  {
    airport: 'Los Angeles Airport (LAX)',
    info: '98 miles (2 hours) from venue',
  },
]
const hotels = [
  {
    name: 'Agave Inn',
    link: 'https://www.agaveinnsb.com/',
    cost: '$',
  },
  {
    name: 'Best Western',
    link: 'https://www.bestwestern.com/en_US/book/hotels-in-santa-barbara/best-western-plus-santa-barbara/propertyCode.05206.html',
    cost: '$',
  },
  {
    name: 'Hotel Milo',
    link: 'https://www.hotelmilosantabarbara.com/',
    cost: '$$',
  },
  {
    name: 'Palihouse Santa Barbara',
    link: 'https://www.palisociety.com/hotels/santa-barbara',
    cost: '$$',
  },
  {
    name: 'Kimpton Canary Hotel',
    link: 'https://www.canarysantabarbara.com/?&utm_source=Google%20My%20Business&utm_medium=organic&utm_campaign=GMB&utm_term=canary',
    cost: '$$',
  },
  {
    name: 'El Encanto',
    link: 'https://www.belmond.com/hotels/north-america/usa/ca/santa-barbara/belmond-el-encanto/',
    cost: '$$$',
  },
]

const Travel: NextPage = () => {
  return (
    <Layout
      navBackdropClassName="bg-lemon-400/50"
      navClassName="bg-lemon-700"
      className="bg-lemon-700 text-white cursor-lemon"
    >
      <div className="mx-16 h-full">
        <Title className="pb-8">Travel</Title>
        <div className="flex sm:flex-row flex-col gap-10 sm:gap-24 text-left w-full justify-center">
          <div>
            <h2 className="font-serif text-2xl mb-2">Airports</h2>
            <ul className="list-none text-left">
              {airports.map((airport) => (
                <li key={airport.airport} className="mb-2">
                  <p className="text-lg">{airport.airport}</p>
                  <p className="text-sm">{airport.info}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl mb-2">Hotels</h2>
            <ul className="list-none text-left text-lg">
              {hotels.map((hotel) => (
                <li key={hotel.name} className="mb-2">
                  <p className="text-lg">
                    <a target="_blank" href={hotel.link} rel="noreferrer">
                      {hotel.name}
                      {' ↗'}
                    </a>
                  </p>
                  <p className="text-sm">Price: {hotel.cost}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Travel
