const prefix = 'icon'

const regularIcons = [
  `${prefix}-bottle-red`,
  `${prefix}-bottle-blue`,
  `${prefix}-bottle-green`,
  `${prefix}-bottle-yellow`,
]

const plusIcons = regularIcons.map((it) => it + '-plus')
const startsIcons = regularIcons.map((it) => it + '-starts')

export default [
  ...regularIcons,
  ...plusIcons,
  ...startsIcons
]