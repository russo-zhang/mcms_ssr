import { useCommonStore } from "@/stores/common";

const messages = {
    sc: {
        empty_data: "暂无数据",
    },
    en: {
        empty_data: "No data",
    },
};
const locale = useCommonStore().currentLang;
export default defineI18nConfig(() => {
    return {
        legacy: false,
        locale,
        messages,
        // silent i18n warning 开发环境显示警告
        // silentTranslationWarn: process.env.NODE_ENV === "production",
    };
});
