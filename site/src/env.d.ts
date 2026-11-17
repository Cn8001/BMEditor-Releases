/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "virtual:release" {
  const release: { version: string; sections: { title: string; items: string[] }[]; images: string[] };
  export default release;
}
