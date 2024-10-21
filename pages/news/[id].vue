<template>
    <div class="new_detail">
        <h1>{{ newsDetail[`title_${commonStore.currentLang}`] }}</h1>
        <p>{{ newsDetail[`content_${commonStore.currentLang}`] }}</p>
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
        line-height: 24px;
    }
}
</style>
