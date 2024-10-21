<template>
    <div>
        <el-container>
            <el-header>
                <ul class="menu_list">
                    <li
                        v-for="(item, index) in cateList"
                        :key="index"
                        :class="{ active: item.id === commonStore.currentLang }"
                    >
                        <nuxt-link :to="localePath(`/cate/${item.id}`)">{{
                            item[`name_${commonStore.currentLang}`]
                        }}</nuxt-link>
                    </li>
                </ul>
                <el-dropdown @command="selectLang">
                    <span class="el-dropdown-link">
                        {{ commonStore.currentLangItem.label }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="(item, index) in commonStore.langList"
                                :key="index"
                                :command="item.code"
                                >{{ item.name }}</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <NuxtPage />
            </el-main>
            <el-footer>
                <div class="footer-content">
                    <p>© 2024 Russo Zhang. All rights reserved.</p>
                    <p>
                        技术支持： <a href="https://cn.vuejs.org" target="_blank">Vue</a> |
                        <a href="https://nuxt.com" target="_blank">Nuxt</a> |
                        <a href="https://element-plus.org/zh-CN" target="_blank">Element Plus</a>
                    </p>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCommonStore } from "@/stores/common";
import { baseURL } from "@/env/config";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const commonStore = useCommonStore();
commonStore.setLang(route.path.split("/")[1] || "en");
const localePath = useLocalePath();
const cateList = ref<any>([]);
const { data }: any = await useFetch(`/client/cate_list`, {
    baseURL,
    method: "post",
});
cateList.value = data.value.data;
const { setLocale } = useI18n();

const selectLang = (lang: string) => {
    commonStore.currentLang = lang;
    setLocale(lang);
};
</script>
<style leng="less" scoped>
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 10px 30px;
    background-color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    .menu_list {
        flex: 1;
        display: flex;
        justify-content: center;
        li {
            margin: 0 15px;
            list-style: none;
            a {
                font-size: 16px;
                color: #fff;
                text-decoration: none;
                padding: 8px 16px;
                border-radius: 4px;
                transition: background-color 0.3s, color 0.3s;
                &:hover {
                    background-color: #555;
                    color: #ffcc00;
                }
            }
        }
    }
    .el-dropdown {
        color: #fff;
        font-size: 16px;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
}
.el-main {
    min-height: calc(100vh - 60px - 80px);
}
.el-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background-color: #333;
    color: #fff;
    text-align: center;

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;

        p {
            margin: 5px 0;
        }
        a {
            color: #1e90ff;
            text-decoration: none;
            margin: 0 5px;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
