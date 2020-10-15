import { aspectRatio } from './canvas'

const figure = {
  radius: 1,
  points: [
    {
      angle: 0,
      color: {
        r: 1,
        g: 0,
        b: 0,
      },
    },
    {
      angle: Math.PI * 2 / 3,
      color: {
        r: 0,
        g: 1,
        b: 0,
      },
    },
    {
      angle: Math.PI * 4 / 3,
      color: {
        r: 0,
        g: 0,
        b: 1,
      },
    },
  ],
}

export const getFigure = () => {
  const now = Date.now() / 400

  const growth = Math.floor(now) % 2 == 0
  const rem = now - Math.floor(now)
  const radius = .8 + (growth ? rem : 1 - rem) * .4

  const combineVertex = vertex => {
    const angle = now + vertex.angle

    const point = [
      radius * Math.cos(angle) / aspectRatio,
      radius * Math.sin(angle),
    ]

    return [...point, ...Object.values(vertex.color)]
  }

  return figure.points.map(combineVertex).flat()
}
