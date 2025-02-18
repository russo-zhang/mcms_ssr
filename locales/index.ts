import { useCommonStore } from "@/stores/common";
import en from "./en.json";
import sc from "./sc.json";

const messages = {
    sc: sc,
    en: en,
};
const locale = useCommonStore().currentLang;
export default defineI18nConfig(() => {
    return {
        legacy: false,
        locale,
        messages,
    };
});
