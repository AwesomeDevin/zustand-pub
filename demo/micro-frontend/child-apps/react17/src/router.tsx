import React, { lazy, Suspense, useEffect } from "react";
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import Home from "./pages/home/home";
// import ReactPubStore from "zustand-pub/dist/react.mjs";
import ReactPubStore from './store'
import create from "zustand";

interface IState {
  appInfo: {
    name: string
  }
  value: number,
}

interface IAction {
  setAppName: (val: string) => void
  setValue: (val: number) => void
}

const Pub = new ReactPubStore('micro-app')

const pubStore = Pub.defineStore<IState & IAction>('platformStore', (set) => ({
  appInfo: { name: '' },
  value: 1,
  setAppName(val: string) {
    set({
      appInfo: {
        name: val
      }
    })
  },
  setValue(val: number) {
    set({
      value: val
    })
  }
}))
// const pubStore = Pub.getStore<{
//   setAppName: (val: string) => void;
//   setValue: (val: number) => void;
//   value: number;
// }>("platformStore");

const useStore = create(pubStore || {});


console.log('useStore',useStore.getState())

const Page2 = lazy(
  () => import(/* webpackChunkName: "page2" */ "./pages/page2/page2")
);

// 此组件用于监听基座下发的跳转指令
const NavigatorFromBaseApp = () => {
  const history = useHistory();
//@ts-ignore
  const setAppName = useStore((state) => state.setAppName);

  useEffect(() => {
    setAppName("ChildApp - React17");
  }, [setAppName]);

  useEffect(() => {
    window.microApp?.addDataListener((data: Record<string, unknown>) => {
      // 当基座下发path时进行跳转
      if (data.path && data.path !== history.location.pathname) {
        history.push(data.path as string);
      }
    });
  }, [history]);

  return null;
};

function App() {
  // 子应用内部跳转时，通知侧边栏改变菜单状态
  function onRouteChange(): void {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 发送全局数据，通知侧边栏修改菜单展示
      window.microApp.setGlobalData({ name: window.__MICRO_APP_NAME__ });
    }
  }
  //@ts-ignore
  const setValue = useStore((state) => state.setValue);
  //@ts-ignore
  const value = useStore((state) => state.value);

  return (
    // 因为child-react17子应用是hash路由，主应用为history路由，所以不需要设置基础路由__MICRO_APP_BASE_ROUTE__
    <HashRouter>
      <button
        onClick={() => {
          setValue(value - 1);
        }}
      >
        Reduce in ChildApp - React17
      </button>
      <div id="public-links" onClick={onRouteChange}>
        <Link to="/">Home</Link>&ensp;|&ensp;
        <Link to="/page2">Page2</Link>
      </div>
      <NavigatorFromBaseApp />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/page2">
          <Suspense fallback={<div>Loading...</div>}>
            <Page2 />
          </Suspense>
        </Route>
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}

export default App;
