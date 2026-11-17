/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "virtual:release" {
  const release: {
    version: string;
    images: string[];
    extensions: { name: string; displayName: string; description: string; version: string; icon: string; install: string; homepage: string }[];
  };
  export default release;
}
