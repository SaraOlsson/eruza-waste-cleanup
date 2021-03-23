class HttpClient {
    private _apiBase: string
  
    constructor(baseUrl?: string) {
      this._apiBase = baseUrl || process.env.REACT_APP_API_BASE || ''
    }

    public uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  
    public async get(route: string): Promise<any> {
      let responseData
      const url = this._buildUrl(this._apiBase, route)
  
      try {
        const response = await fetch(url)
  
        responseData = await response.json()
      } catch (e) {
        console.error(e)
      }
  
      return responseData
    }

    public async postFormData(
      route: string,
      data: FormData,
      contentType: string
      //,
      //accessToken: string
    ): Promise<any> {
      let responseData
      const url = this._buildUrl(this._apiBase, route)
  
      console.log(url)
      try {
        const response = await fetch(url, {
          method: 'POST',
  
          // Let the browser set the Content-Type with correct boundary
          headers: {
            //Authorization: `Bearer ${accessToken}`
            ContentType: `${contentType}`
          },
  
          body: data
        })
  
        responseData = await response.json()
      } catch (e) {
        console.error(e)
      }
  
      return responseData
    }

    private _buildUrl(apiBase: string, route: string): string {
      const fixedRoute = this._ensureRouteBeginsWithForwardSlash(route)
      return apiBase + fixedRoute
    }

    private _ensureRouteBeginsWithForwardSlash(route: string): string {
      const regex = /^\//
      return route.match(regex) === null ? `/${route}` : route
    }
  
}

/**
 * Can be used to create an instance with a different api url
 * Implement headers when needed
 * @param baseUrl [string] e.g. localhost:7071/api
 */
export const createHttpClient = (baseUrl?: string): HttpClient => {
  return new HttpClient(baseUrl)
}
  
const defaultHttpClient = createHttpClient()
  
export default defaultHttpClient
  