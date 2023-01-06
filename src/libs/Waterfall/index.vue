<template>
    <div
        class="relative"
        ref="containerTarget"
        :style="{
            height: containerHeight + 'px',
        }"
    >
        <!-- 数据渲染 -->
        <template v-if="columnWidth && data.length">
            <div
                v-for="(item, index) in data"
                :key="nodeKey ? item[nodeKey] : index"
                class="waterfall-item absolute duration-300"
                :style="{
                    width: columnWidth + 'px',
                    left: item._style?.left + 'px',
                    top: item._style?.top + 'px',
                }"
            >
                <slot :item="item" :width="columnWidth" :index="index"></slot>
            </div>
        </template>
        <!-- 加载中 -->
        <div v-else>加载中...</div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue';
import {
    getImgElements,
    getAllImage,
    onCompleteImages,
    getMinHeightColumn,
    getMinHeight,
    getMaxHeight,
} from './utils';

const props = defineProps({
    // 数据源
    data: {
        type: Array,
        required: true,
    },
    // 唯一表示key
    nodeKey: {
        type: String,
    },
    // 列数
    column: {
        default: 2,
        type: [Number, String],
    },
    // 列间距
    columnSpacing: {
        default: 20,
        type: [Number, String],
    },
    // 行间距
    rowSpacing: {
        default: 20,
        type: [Number, String],
    },
    // 是否需要进行图片预读取
    preloading: {
        type: Boolean,
        default: true,
    },
});

// 容器的实例
const containerTarget = ref(null);
// 容器的总宽度 应该指的是内容 不应该包含padding margin border
const containerWidth = ref(0);
// 计算容器的总高度 = 最高的这一列的高度
const containerHeight = ref(0);
//  容器的左边距  计算 item 的left
const containerLeft = ref(0);
//  容器的左边距  计算 item 的left
const containerTop = ref(0);

/**
 * 计算容器的宽度
 */
const useContainerWidth = () => {
    const { paddingLeft, paddingRight, paddingTop } = window.getComputedStyle(
        containerTarget.value,
        null
    );
    // 容器的左边距和上边距
    containerLeft.value = parseFloat(paddingLeft);
    containerTop.value = parseFloat(paddingTop);
    // 容器的宽度
    containerWidth.value =
        containerTarget.value.offsetWidth -
        parseFloat(paddingLeft) -
        parseFloat(paddingRight);
};
// 每列的宽度  列宽 = (容器的宽度 - 所有的列间距宽度) / 列数
const columnWidth = ref(0);
// 列间距的合计
const columnSpacingTotal = computed(() => {
    return (props.column - 1) * props.columnSpacing;
});
/**
 * 计算列宽
 */
const useColumnWidth = () => {
    // 计算容器宽度
    useContainerWidth();
    // 计算列的宽度
    columnWidth.value =
        (containerWidth.value - columnSpacingTotal.value) / props.column;
};

onMounted(() => {
    // 计算列宽
    useColumnWidth();
});

// //////////////////////////////////////////////////////////////

// item高度集合
let itemHeights = [];

// 记录每列高度的容器 key所在的列 val列的高度
const columnHeightObj = ref({});
// 获取记录每列高度的对象
const useColumnHeightObj = () => {
    columnHeightObj.value = {};
    for (let i = 0; i < props.column; i++) {
        columnHeightObj.value[i] = 0;
    }
};

/**
 * 监听图片加载完成  需要预加载图片
 */

/**
 * 渲染位置
 */
const useItemLocation = () => {
    props.data.forEach((item, index) => {
        if (item._style) return;
        // 生成 style 属性
        item._style = {
            left: getItemLeft(),
            top: getItemTop(),
        };
        // 指定的列高度自增
        increasingHeight(index);
    });

    // 所有item计算完 计算容器的高度  容器的高度是最大的列高
    containerHeight.value = getMaxHeight(columnHeightObj.value);
};
// 返回下一个 item 的 left
const getItemLeft = () => {
    // 拿到最小高度的列
    const column = getMinHeightColumn(columnHeightObj.value);
    return (
        column * (columnWidth.value + props.columnSpacing) + containerLeft.value
    );
};
// 返回下一个 item 的 top
const getItemTop = () => {
    return getMinHeight(columnHeightObj.value);
};
// 指定的列高度自增
const increasingHeight = (index) => {
    // 最小高度所在的列自增
    const minHeightColumn = getMinHeightColumn(columnHeightObj.value);
    columnHeightObj.value[minHeightColumn] +=
        itemHeights[index] + props.rowSpacing;
};

/**
 * 监听图片加载完成
 */
const waitImgComplete = () => {
    itemHeights = [];
    // 拿到所有的元素
    let itemElements = [...document.getElementsByClassName('waterfall-item')];
    // 获取元素的img标签
    const imgElements = getImgElements(itemElements);
    // 获取 img 标签里面的图片
    const allImgs = getAllImage(imgElements);
    // 等待图片加载完成
    onCompleteImages(allImgs).then(() => {
        // 所有图片加载完成 渲染位置
        itemHeights = itemElements.map((el) => el.offsetHeight);
        // 渲染位置
        useItemLocation();
    });
};

/**
 * 不需要图片预加载
 */
const useItemHeight = () => {
    // 拿到所有的元素
    let itemElements = [...document.getElementsByClassName('waterfall-item')];
    // 拿到item的高度
    itemHeights = itemElements.map((el) => el.offsetHeight);
    useItemLocation();
};

/**
 * 触发计算
 */
watch(
    () => props.data,
    (newVal) => {
        nextTick(() => {
            // 每个都不存在的话 就构建
            const resetColumnHeight = newVal.every((item) => !item._style);
            if (resetColumnHeight) {
                // 重新构建
                useColumnHeightObj();
            }
            // 第一次获取数据时  构建高度记录容器
            if (props.preloading) {
                waitImgComplete();
            } else {
                useItemHeight();
            }
        });
    },
    {
        deep: true,
        immediate: true,
    }
);

/**
 * 监听列数变化，重新构建瀑布流
 */
const reset = () => {
    setTimeout(() => {
        // 重新计算列宽
        useColumnWidth();
        // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
        props.data.forEach((item) => {
            item._style = null;
        });
    }, 100);
};

// 监听列数的变化  重新渲染
watch(
    () => props.column,
    () => {
        if (props.preloading) {
            columnWidth.value = 0;
            // 数据改变之后 视图改变之前的回调
            nextTick(() => {
                // 重新计算列宽
                reset();
            });
        } else {
            reset();
        }
    }
);

// 在组件销毁的时候清除所有的_style
onUnmounted(() => {
    props.data.forEach((item) => {
        delete item._style;
    });
});
</script>

<style lang="scss" scoped></style>
