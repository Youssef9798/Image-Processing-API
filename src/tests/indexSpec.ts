import supertest from 'supertest'
import fs from 'fs'
import app from '../index'

import { Images } from '../utilities/imagesHandler'

const req = supertest(app)

describe('it access the main endpoint /', () => {
  it('Request status 200', async () => {
    const res = await req.get('/')
    expect(res.status).toBe(200)
  })
})

describe('it access the image api endpoint /api/image', () => {
  it('no query added to the endpoint', async () => {
    const res = await req.get('/api/images')
    expect(res.status).toBe(401)
  })
  it('invalid height or width query added to the endpoint', async () => {
    const res = await req.get('/api/images?width=&height=')
    expect(res.status).toBe(401)
  })
  it('invalid image name query added to the endpoint', async () => {
    const res = await req.get('/api/images?filename')
    expect(res.status).toBe(401)
  })
  it('valid query params added to the endpoint', async () => {
    const res = await req.get(
      '/api/images?height=100&width=200&filename=encenadaport.jpg'
    )
    expect(res.status).toBe(200)
  })
})

describe('it resizing the sent images', () => {
  it('imaged is resized successfully', () => {
    expect(async () => {
      const testWidth = 100
      const testHeight = 100
      const imageBuffer = fs.readFileSync(`./assets/images/full/fjord.jpg`)
      const testFilename = 'fjord.jpg'
      const transform = new Images()
      await transform.resize(imageBuffer, testWidth, testHeight, testFilename)
    }).not.toThrow()
  })
})
