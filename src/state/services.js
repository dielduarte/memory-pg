import {interval} from "rxjs";
import {map, take} from "rxjs/operators";
import { sample } from "lodash";

import IconsMap from './iconsMap'

export const getRandomIconByInterval = (context) =>
  interval(context.interval).pipe(
    map(value => ('ADD_RANDOM_ICON')),
    take(context.sequenceCount)
  )

export const getRandomIcon = (context) => {
  const nextIcon = sample(IconsMap)
  if(context.currentSequence.includes(nextIcon)) {
    return getRandomIcon(context)
  }

  return nextIcon
}