import express, { Request, Response } from 'express'
import path from 'path'
import imageRoutes from './routes/api/index'

const app = express()
const port = 8080

/**
 * App usage and declarations
 */

app.set('views', path.resolve('views'))
app.set('view engine', 'ejs')

app.use(
  express.urlencoded({
    extended: false,
  })
)

app.use(express.static(path.resolve('assets')))

app.use(imageRoutes.routes)

/**
 * App Routes
 */

app.get('/', (_req: Request, res: Response): void => {
  res.status(200).render('index', {
    error: '',
    image: '',
    resizedImage: '',
  })
})

app.listen(port, (): void => {
  console.log(`Server is running on port ${port}`)
})

export default app
