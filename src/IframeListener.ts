const ACTION = 'ZUSTAND_PUB'


class IframeListener{
  private symbolKey: string
  private storeSymbol: symbol
  private unsubscribes: (()=> void)[] = []
  constructor(symbolKey: string){
    if(typeof window === 'undefined') return
    this.symbolKey= symbolKey
    this.storeSymbol = Symbol.for(symbolKey)
    this.init()
    this.proxyStore()
  }

  handleMessage(e: MessageEvent){
    if(e?.data?.action === ACTION){
      const { symbolKey, childKey, newState } = e.data as ({symbolKey: string, childKey: string, newState: any })

      const storeSymbol = Symbol.for(symbolKey)
      const oldUnit = window[storeSymbol] && window[storeSymbol][childKey]
      if(oldUnit){
        const oldStore = oldUnit.value
        oldStore.setState(newState)

      }else if(window[storeSymbol]){
        window[storeSymbol][childKey] = oldUnit
      } else{
        window[storeSymbol] = {}
        window[storeSymbol][childKey] = oldUnit
      }
    }
  }

  childIframesPost(childKey: string, newState: any){
    const childIframes = document.getElementsByTagName('iframe')
    if(childIframes.length){
      Array.from(childIframes).forEach(iframe=>{
        iframe.contentWindow.postMessage({
          action: ACTION,
          data: {
            symbolKey: this.symbolKey,
            childKey,
            newState: JSON.stringify(newState),
          }
        }, '*')
      })
    }
  }

  parentIframePost(childKey: string, newState: any){
    const parentIframe = window.parent
    if(parentIframe){
      parentIframe.postMessage({
        action: ACTION,
        data: {
          symbolKey: this.symbolKey,
          childKey,
          newState: JSON.stringify(newState),
        }
      },'*')
    }
  }

  proxyStore(){
    let origin = window[this.storeSymbol]

    if(!origin){
      return
    }

    const childKeys = Object.keys(origin)
    childKeys.forEach(childKey=>{
      const store = origin[childKey].value
      this.unsubscribes.push(store.subscribe((newState)=>{
        this.childIframesPost(childKey,newState)
        this.parentIframePost(childKey,newState)
      }))
    })
   
  }

  init(){
    window.addEventListener('message', this.handleMessage)
  }

  destory(){
    window.removeEventListener('message', this.handleMessage)
    this.unsubscribes.forEach(unsubscribe=>unsubscribe())
  }
}

export default IframeListener