import assert from 'node:assert/strict'
import test from 'node:test'
import { getCloudinaryImageUrl, getImageDeliveryProps } from './imageDelivery.ts'

const source = 'https://res.cloudinary.com/izli/image/upload/v123/Products/tee-front.jpg'

test('Cloudinary delivery URLs retain the original and add automatic format/quality transforms', () => {
  assert.equal(
    getCloudinaryImageUrl(source, 600),
    'https://res.cloudinary.com/izli/image/upload/f_auto,q_auto,w_600,c_limit/v123/Products/tee-front.jpg',
  )
})

test('Cloudinary transformations replace old widths without duplicating the transform chain', () => {
  const existing = 'https://res.cloudinary.com/izli/image/upload/c_fill,w_300/v123/Products/tee-front.jpg'
  assert.equal(
    getCloudinaryImageUrl(existing, 800),
    'https://res.cloudinary.com/izli/image/upload/f_auto,q_auto,w_800,c_limit/v123/Products/tee-front.jpg',
  )
})

test('collection cards request sharper Cloudinary quality and high-density candidates', () => {
  const delivery = getImageDeliveryProps(source, 'collectionCard')
  assert.match(delivery.src, /q_auto:best/)
  assert.match(delivery.srcSet ?? '', /w_1600,c_limit/)
  assert.equal(delivery.sizes, '(max-width: 720px) 50vw, (max-width: 1100px) 33vw, 30vw')
})

test('Cloudinary presets generate responsive candidates and leave non-Cloudinary sources unchanged', () => {
  const delivery = getImageDeliveryProps(source, 'productCard', { width: 1600, height: 2000 })
  assert.equal(delivery.src, getCloudinaryImageUrl(source, 600))
  assert.match(delivery.srcSet ?? '', /w_320,c_limit/)
  assert.match(delivery.srcSet ?? '', /w_800,c_limit/)
  assert.equal(delivery.sizes, '(max-width: 560px) 50vw, (max-width: 900px) 50vw, (max-width: 1100px) 33vw, 25vw')

  const local = '/assets/izli-logo.png'
  const localDelivery = getImageDeliveryProps(local, 'productCard')
  assert.equal(localDelivery.src, local)
  assert.equal(localDelivery.srcSet, undefined)
  assert.equal(localDelivery.optimized, false)
})
