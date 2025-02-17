<template>
    <div class="new_detail">
        <h1>{{ newsDetail[`title_${commonStore.currentLang}`] }}</h1>
        <article v-html="newsDetail[`content_${commonStore.currentLang}`]"></article>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { baseURL } from "@/env/config";
import { useCommonStore } from "@/stores/common";
const commonStore = useCommonStore();
const route = useRoute();
const newsDetail = ref<any>({});
const id = Number(route.params.id) || 0;
const { data }: any = await useFetch(`/client/news_detail`, {
    baseURL,
    method: "post",
    body: {
        id,
    },
});
newsDetail.value = data.value.data;

useHead({
    title: newsDetail.value[`title_${commonStore.currentLang}`],
    meta: [
        { name: "description", content: newsDetail.value[`description_${commonStore.currentLang}`] },
        { name: "keywords", content: newsDetail.value[`keyword_${commonStore.currentLang}`] },
    ],
});
</script>

<style lang="less" scoped>
.new_detail {
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    h1 {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 60px;
    }
    p {
        font-size: 16px;
        white-space: pre-wrap;
        line-height: inherit;
        margin-top: 22px;
        margin-bottom: 22px;
    }
}
</style>
