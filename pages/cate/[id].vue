<template>
    <div class="cate_detail">
        <h1>{{ cateDetail[`name_${commonStore.currentLang}`] }}</h1>
        <ul>
            <li v-for="(item, index) in newsList" :key="index">
                <el-card shadow="hover">
                    <nuxt-link class="title" :to="localePath(`/news/${item.id}`)">
                        {{ item[`title_${commonStore.currentLang}`] }}
                    </nuxt-link>
                    <p class="content">{{ item[`content_${commonStore.currentLang}`] }}</p>
                </el-card>
            </li>
        </ul>
        <Pagination
            v-model:pageSize="page.pageSize"
            v-model:currentPage="page.currentPage"
            :total="page.total"
            @change="getNewsList"
        />
    </div>
</template>
<script lang="ts" setup>
import { baseURL } from "@/env/config";
import { useCommonStore } from "@/stores/common";
import { useRouter, useRoute } from "vue-router";
import Pagination from "@/components/Pagination.vue";
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
if (!route.params.id) {
    router.push("/cate");
}
const commonStore = useCommonStore();
const newsList = ref<any>([]);
const page = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
});
const cid = Number(route.params.id) || 0;
const { data }: any = await useFetch(`/client/news_list`, {
    baseURL,
    method: "post",
    body: {
        cid,
        limit: page.value.pageSize,
        skip: page.value.currentPage,
    },
});
newsList.value = data.value.data;
const getNewsList = async () => {
    const { data }: any = await useFetch(`/client/news_list`, {
        baseURL,
        method: "post",
        body: {
            cid,
            limit: page.value.pageSize,
            skip: page.value.currentPage,
        },
    });
    newsList.value = data.value.data;
};
const cateDetail = ref<any>({});
const { data: cateData }: any = await useFetch(`/client/cate_detail`, {
    baseURL,
    method: "post",
    body: {
        id: cid,
    },
});
cateDetail.value = cateData.value.data;
</script>

<style lang="less" scoped>
.cate_detail {
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
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
