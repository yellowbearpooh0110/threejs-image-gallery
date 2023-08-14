import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

const basicImages = [
  { width: 2560, height: 2027, url: './images/Starry_Night.jpg', name: 'Starry Night' },
  { width: 2302, height: 2048, url: './images/Whistlers_Mother.jpg', name: 'Whistlers Mother' },
  { width: 5610, height: 5269, url: './images/Water_Lilies.jpg', name: 'Water Lilies' },
  { width: 4596, height: 2720, url: './images/Guernica.jpg', name: 'Guernica' },
  { width: 1607, height: 2047, url: './images/The_Scream.jpg', name: 'The Scream' },
  { width: 2105, height: 1600, url: './images/The_Persistence_of_Memory.jpg', name: 'The Persistence of Memory' },
  { width: 1909, height: 2138, url: './images/Girl_with_a_Pearl_Earring.jpg', name: 'Girl with a Pearl Earring' },
  { width: 5381, height: 2926, url: './images/The_Last_Supper.jpg', name: 'The Last Supper' }
]

const radius = 4
const yDelta = -3

const degs = basicImages.map((item) => Math.asin(item.width / item.height / 2 / radius))

const alpha = (Math.PI - degs.reduce((value, item) => value + item, 0) * 2) / (basicImages.length - 1)

const updatedDegs = []

for (var index = 0; index < degs.length; index++) {
  if (index === 0) updatedDegs.push(degs[index])
  else updatedDegs.push(alpha + degs[index] + degs[index - 1] + updatedDegs[index - 1])
}

const images = [
  // Front
  { position: [0, 0, -2 - yDelta], rotation: [0, 0, 0], width: 2835, height: 4289, url: './images/Mona_Lisa.jpg', name: 'Mona Lisa' },
  ...basicImages.map((item, index) => ({
    position: [-Math.cos(updatedDegs[index]) * radius, 0, -Math.sin(updatedDegs[index]) * radius - yDelta],
    rotation: [0, Math.PI / 2 - updatedDegs[index], 0],
    ...item
  }))
]

createRoot(document.getElementById('root')).render(<App images={images} />)
