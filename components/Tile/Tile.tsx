import cx from 'classnames'
import Tile1 from './Tile1'
import Tile2 from './Tile2'
import Tile3 from './Tile3'
import Tile4 from './Tile4'
import Tile5 from './Tile5'
import Tile6 from './Tile6'
import Tile7 from './Tile7'

// invite envelope:
// 3 4 6 2 1
//
// card
// 7

const tiles = {
  '1': <Tile1 />,
  '2': <Tile2 />,
  '3': <Tile3 />,
  '4': <Tile4 />,
  '5': <Tile5 />,
  '6': <Tile6 />,
  '7': <Tile7 />,
}

type Props = {
  tile: keyof typeof tiles
  className?: string
}

function Tile(props: Props) {
  return (
    <div className={cx(props.className, 'fill-current')}>
      {tiles[props.tile]}
    </div>
  )
}

export default Tile
