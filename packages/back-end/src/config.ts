const config = {
  http: {
    host: process.env.EXPRESS_HOST || '10.0.0.120',
    port: parseInt(process.env.EXPRESS_PORT, 10) || 50000,
  }
}

export default config
