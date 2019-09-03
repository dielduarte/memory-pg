import {interval} from "rxjs";
import {map, take} from "rxjs/operators";

export const getRandomIconByInterval = (context) =>
  interval(context.interval).pipe(
    map(value => ('START')),
    take(context.sequenceCount)
  )