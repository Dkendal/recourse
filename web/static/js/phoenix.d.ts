declare namespace phoenix {
  class Socket {
    constructor(path: string, params: any)
    connect(): void
  }
}

interface Window { userToken: any }

declare module "phoenix" {
  export = phoenix;
}
