<template>
    <el-container>
        <el-header>
            <el-page-header content="关于我们" />
        </el-header>
        <el-main>
            <el-card>
                <h2>关于本网站</h2>
                <p>
                    本网站是一个由 Nuxt.js 生成的服务端渲染（SSR）示例项目。Nuxt.js 是一个基于 Vue.js
                    的框架，旨在简化开发服务端渲染应用程序。
                </p>
                <h3>什么是服务端渲染（SSR）？</h3>
                <p>
                    服务端渲染（SSR）是指在服务器端生成 HTML
                    内容，并将其发送到客户端进行显示。与客户端渲染（CSR）相比，SSR 可以提高页面加载速度和 SEO 性能。
                </p>
                <el-divider />
                <el-image
                    src="https://nuxtjs.org/design-kit/colored-text.svg"
                    fit="contain"
                    style="width: 100%; height: auto"
                />
            </el-card>
        </el-main>
    </el-container>
</template>

<script setup>
import { ElContainer, ElHeader, ElMain, ElCard, ElPageHeader, ElDivider, ElImage } from "element-plus";
</script>

<style scoped>
h2 {
    color: #409eff;
    margin-bottom: 20px;
}

p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}
</style>
