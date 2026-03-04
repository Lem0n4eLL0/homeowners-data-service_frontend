interface ImportMetaEnv {
  readonly VITE_APP_STORE_URL: string;
  readonly VITE_GOOGLE_PLAY_URL: string;
  readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
