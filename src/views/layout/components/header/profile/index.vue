<template>
    <Popover placement="bottom-left" class="flex items-center">
        <template #reference>
            <div
                class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
            >
                <img
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220415_2e4bd.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675515403&t=3e7768a1fd37e2a38d6343bb5ee73cb9"
                    class="w-3 h-3 rounded-sm"
                />
                <SvgIcon
                    class="h-1.5 w-1.5 ml-0.5"
                    name="down-arrow"
                    fillClass="fill-zinc-900"
                />
                <SvgIcon
                    class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
                    name="vip"
                />
            </div>
        </template>

        <div class="w-[140] overflow-hidden">
            <div
                v-for="item in profileMenu"
                :key="item.id"
                class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
            >
                <SvgIcon
                    :name="item.icon"
                    class="w-1.5 h-1.5 mr-1"
                    fillClass="fill-zinc-900"
                />
                <span class="text-zinc-800 text-sm">{{ item.title }}</span>
            </div>
        </div>
    </Popover>
</template>

<script setup>
const profileMenu = [
    {
        id: 0,
        icon: 'profile',
        title: '个人资料',
        path: '/profile',
    },
    {
        id: 1,
        icon: 'vip-profile',
        title: '升级VIP',
        path: '/profile',
    },
    {
        id: 2,
        icon: 'logout',
        title: '退出登录',
    },
];
</script>

<style lang="scss" scoped></style>
