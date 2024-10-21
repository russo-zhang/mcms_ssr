<template>
    <div class="Pagination">
        <a href="javascript:;" class="arrow left_arrow" :class="{ not_allow: prevNotAllow }" @click="toPrevious">
            <LeftArrow></LeftArrow>
        </a>
        <ul>
            <li
                v-for="(item, index) in totalPage"
                :key="index"
                :class="{ active: currentPage === item }"
                @click="toPage(item)"
            >
                {{ item }}
            </li>
        </ul>
        <a href="javascript:;" class="arrow right_arrow" :class="{ not_allow: nextNotAllow }" @click="toNext">
            <LeftArrow></LeftArrow>
        </a>
    </div>
</template>
<script lang="ts" setup>
import LeftArrow from "@/components/icons/LeftArrow.vue";
const props = defineProps<{
    currentPage: number;
    pageSize: number;
    total: number;
}>();
const emit = defineEmits(["change", "update:currentPage", "update:pageSize"]);
const toPage = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPage.value) {
        return;
    }
    emit("update:currentPage", pageNum);
    emit("change", pageNum);
};
const toPrevious = () => {
    toPage(props.currentPage - 1);
};
const toNext = () => {
    toPage(props.currentPage + 1);
};
const totalPage = computed(() => {
    if (props.total === 0) {
        return 1;
    }
    return Math.ceil(props.total / props.pageSize);
});
const prevNotAllow = computed(() => {
    return props.currentPage === 1;
});
const nextNotAllow = computed(() => {
    return props.currentPage >= totalPage.value;
});
</script>
<style lang="less" scoped>
.Pagination {
    display: flex;
    .arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 34px;
        line-height: 34px;
        border-radius: 50%;
        background-color: #d6f2ff;
        color: #02aeff;
        &.left_arrow {
            margin-right: 10px;
        }
        &.right_arrow {
            margin-left: 10px;
            transform: rotate(180deg);
        }
        &.not_allow {
            cursor: not-allowed;
        }
    }
    ul {
        display: flex;
        li {
            width: 34px;
            height: 34px;
            margin: 0 10px;
            text-align: center;
            line-height: 34px;
            border-radius: 50%;
            cursor: pointer;
            background-color: #d6f2ff;
            color: #333;
            font-size: 13px;
            &:hover {
                color: #499eff;
            }
            &.active {
                background-color: #36aafd;
                color: #fff;
            }
        }
    }
}
</style>
