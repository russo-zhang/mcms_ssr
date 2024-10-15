// import { createResolver } from "@nuxt/kit";
// const { resolve } = createResolver(import.meta.url);
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@element-plus/nuxt", "@pinia/nuxt", "@nuxtjs/i18n"],
    css: ["~/assets/css/base.less"],
    i18n: {
        locales: [
            { code: "en", language: "en-US", name: "English" },
            { code: "sc", language: "zh", name: "Simplified Chinese" },
        ],
        defaultLocale: "en",
        strategy: "prefix", // 使路径前缀区分语言
        vueI18n: "./locales/index.ts", // if you are using custom path, default
    },
});
