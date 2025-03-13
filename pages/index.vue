<template>
    <div class="home">
        <main>
            <h1>{{ $t("all_news") }}</h1>
            <ul v-if="newsList.length">
                <li v-for="item in newsList" :key="item.id">
                    <el-card shadow="hover">
                        <nuxt-link class="title" :to="localePath(`/article/${item.id}?cid=${item.cid}`)">
                            {{ item[`title_${commonStore.currentLang}`] }}
                        </nuxt-link>
                        <p class="content">{{ item[`content_${commonStore.currentLang}`] }}</p>
                    </el-card>
                </li>
            </ul>
            <el-empty v-show="!newsList.length" :description="$t('empty_data')" />
        </main>
        <Pagination
            v-model:pageSize="page.pageSize"
            v-model:currentPage="page.currentPage"
            :total="page.total"
            @change="getNewsList"
        />
    </div>
</template>
<script lang="ts" setup>
import Pagination from "@/components/Pagination.vue";
import { baseURL } from "@/env/config";
import { useCommonStore } from "@/stores/common";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localePath = useLocalePath();
const commonStore = useCommonStore();
const route = useRoute();
const page = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
});
const newsList = ref<any>([]);
const getNewsList = async () => {
    const { data }: any = await useFetch(`/client/news_list`, {
        baseURL,
        method: "post",
        body: {
            title: route.query.title || "",
            lang: commonStore.currentLang,
            cid: 0,
            limit: page.value.pageSize,
            skip: page.value.currentPage,
        },
    });
    newsList.value = data.value.data;
};
getNewsList();
watch(
    () => route.query.title,
    () => {
        getNewsList();
    }
);
useHead({
    title: t("all_news"),
    meta: [
        { name: "description", content: t("all_news_description") },
        { name: "keywords", content: t("all_news_keywords") },
    ],
});
</script>

<style lang="less" scoped>
.home {
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    main {
        min-height: calc(100vh - 300px);
    }
    h1 {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
    }
    ul {
        li {
            margin-bottom: 20px;
            .title {
                display: block;
                font-size: 24px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 10px;
            }
            p {
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
