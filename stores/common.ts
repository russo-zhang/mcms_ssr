import { defineStore } from "pinia";

interface LangItem {
    code: string;
    name: string;
    label: string;
}
export const useCommonStore = defineStore("common", {
    state: () => {
        return {
            currentLang: "en",
            langList: [
                {
                    code: "en",
                    name: "English",
                    label: "Language Selection",
                },
                {
                    code: "sc",
                    name: "简体中文",
                    label: "语言选择",
                },
            ] as LangItem[],
        };
    },
    getters: {
        currentLangItem(): LangItem {
            return this.langList.find((item) => item.code === this.currentLang) || this.langList[0];
        },
    },
    actions: {
        setLang(lang: string) {
            this.currentLang = lang;
        },
    },
});
