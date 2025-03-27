<template>
    <div v-show="!isEmpty" class="new_detail">
        <el-page-header @back="onBack"> </el-page-header>
        <h1>{{ newsDetail[`title_${commonStore.currentLang}`] }}</h1>
        <p class="published_at">{{ $t("published_at") }}: {{ timeFormat(newsDetail.created_at) }}</p>
        <el-divider></el-divider>
        <article v-html="newsDetail[`content_${commonStore.currentLang}`]"></article>
    </div>
    <el-empty v-show="isEmpty" :description="$t('empty_data')" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { baseURL } from "@/env/config";
import { useCommonStore } from "@/stores/common";
import dayjs from "dayjs";
const commonStore = useCommonStore();
const route = useRoute();
const router = useRouter();
const newsDetail = ref<any>({});
const id = Number(route.params.id) || 0;
const isEmpty = ref(true);
const { data }: any = await useFetch(`/client/news_detail`, {
    baseURL,
    method: "post",
    body: {
        lang: commonStore.currentLang,
        id,
    },
});
if (data.value && data.value.data) {
    newsDetail.value = data.value.data || {};
    isEmpty.value = false;
}

const timeFormat = (time: number | string) => {
    if (!time) return "";
    if (typeof time === "number") {
        return dayjs(time * 1000).format("YYYY-MM-DD HH:mm:ss");
    } else {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    }
};
useHead({
    title: newsDetail.value[`title_${commonStore.currentLang}`],
    meta: [
        { name: "description", content: newsDetail.value[`description_${commonStore.currentLang}`] },
        { name: "keywords", content: newsDetail.value[`keyword_${commonStore.currentLang}`] },
    ],
});
const onBack = () => {
    router.back();
};
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
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .published_at {
        font-size: 14px;
        color: #999;
        text-align: right;
    }
}
</style>
<style lang="less">
.new_detail {
    .el-page-header__content {
        flex: 1;
    }
    article {
        p {
            font-size: 16px;
            white-space: pre-wrap;
            line-height: inherit;
            margin-top: 22px;
            margin-bottom: 22px;
        }
    }
}
</style>
