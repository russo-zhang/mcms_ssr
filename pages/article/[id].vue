<template>
    <div v-show="!isEmpty" class="new_detail">
        <el-page-header @back="onBack"> </el-page-header>
        <!-- HTML标签结合数据 -->
        <h1>{{ newsDetail[`title_${commonStore.currentLang}`] }}</h1>
        <p class="published_at">{{ $t("published_at") }}: {{ timeFormat(newsDetail.created_at) }}</p>
        <el-divider></el-divider>
        <!-- 在article中插入内容 -->
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
const currentLang = commonStore.currentLang;
// 从接口获取数据
const { data }: any = await useFetch(`/client/news_detail`, {
    baseURL,
    method: "post",
    body: {
        lang: currentLang, // 当前语言
        id, // 文章的id
    },
});
if (data.value && data.value.data) {
     // 将数据赋值给 newsDetail，以便在模板中渲染
    newsDetail.value = data.value.data || {};
    isEmpty.value = false;
}
// 处理时间格式
const timeFormat = (time: number | string) => {
    if (!time) return "";
    if (typeof time === "number") {
        return dayjs(time * 1000).format("YYYY-MM-DD HH:mm:ss");
    } else {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    }
};
// 用于设置页面标题和描述的函数
useHead({
    // 设置页面标题
    title: newsDetail.value[`title_${currentLang}`],
    meta: [
        // 设置页面描述
        {
            name: "description",
            content: newsDetail.value[`description_${currentLang}`],
        },
        // 设置页面关键词
        {
            name: "keywords",
            content: newsDetail.value[`keyword_${currentLang}`],
        },
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
