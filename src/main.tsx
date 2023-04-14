import React from 'react'
import ReactDOM from 'react-dom/client'
import { renderWithQiankun, qiankunWindow, QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import App from './App'
import 'antd/dist/antd.min.css';
import './index.scss'
let root: ReactDOM.Root;

if ((qiankunWindow as any).__POWERED_BY_QIANKUN__) {
  (qiankunWindow as any).__webpack_public_path__ = (qiankunWindow as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

function render(props: any) {
  const { container } = props;
  root = root ?? ReactDOM.createRoot(
    container ? container.querySelector("#root") : document.querySelector("#root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>,
  )
}

// 本地开发时走下面，可以脱离平台子应用自己独立运行
if (!(qiankunWindow as any).__POWERED_BY_QIANKUN__) {
  render({});
}
renderWithQiankun({
  async bootstrap() {
    console.log("[subapp1] react app bootstraped");
    return await new Promise<void>((resolve) => {
      resolve();
    });
  },
  mount(props) {
    console.log("[subapp1] props from main framework", props);
    render(props);
  },
  update: function (props: QiankunProps): void | Promise<void> {
  console.log("[subapp1] props from main framework", props);
    throw new Error('Function not implemented.');
  },
  unmount() {
    if (root) {
      root.unmount();
    }
  },
});

export async function bootstrap() {
  console.log("[subapp1] react app bootstraped");
}

export async function mount(props: any) {
  console.log("[subapp1] props from main framework", props);
  render(props);
}

export async function unmount() {
  root?.unmount();
}