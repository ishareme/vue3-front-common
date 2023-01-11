<template>
    <div
        class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
    >
        <div
            class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
        >
            <!-- 移动端 navbar -->
            <NavBar
                sticky
                v-if="isMobileTerminal"
                :onLeftClick="onNavbarLeftClick"
                >个人资料</NavBar
            >
            <!-- pc端标题 -->
            <div
                v-else
                class="text-lg font-bold text-center mb-4 dark:text-zinc-300"
            >
                个人资料
            </div>

            <div
                class="h-full w-full xl:w-2/3 px-1 pb-4 text-sm mt-2 xl:text-center"
            >
                <!-- 头像部分 -->
                <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
                    <span
                        class="w-8 inline-block mb-2 font-black text-sm dark:text-zinc-300 xl:block xl:mx-auto"
                    >
                        我的头像
                    </span>
                    <div
                        class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-1/2 xl:translate-x-[-50%]"
                        @click="onAvatarClick"
                    >
                        <img
                            :src="$store.getters.userInfo.avatar"
                            class="rounded-full w-full h-full xl:inline-block"
                        />
                        <div
                            class="absolute top-0 left-0 rounded-full w-full h-full bg-black/40 opacity-0 xl:group-hover:opacity-100 duration-300"
                        >
                            <SvgIcon
                                name="change-header-image"
                                class="w-2 h-2 m-auto mt-2"
                            />
                            <div
                                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
                            >
                                点击更换图片
                            </div>
                        </div>
                    </div>
                    <input
                        v-show="false"
                        ref="inputFileTarget"
                        type="file"
                        accept=".png, .jpeg, .jpg, .gif"
                        @change="onSelectFile"
                    />
                    <p
                        class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10"
                    >
                        支持 jpg、png、jpeg 格式大小 5M 以内的图片
                    </p>
                </div>

                <!-- 用户名 -->
                <div class="py-1 xl:flex xl:items-center justify-start xl:my-1">
                    <span
                        class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
                        >用户名</span
                    >
                    <HInput
                        class="w-full"
                        max="20"
                        v-model="userInfo.nickname"
                    />
                </div>
                <!-- 职位 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span
                        class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
                        >职位</span
                    >
                    <HInput class="w-full" v-model="userInfo.title" />
                </div>
                <!-- 公司 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span
                        class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
                        >公司</span
                    >
                    <HInput class="w-full" v-model="userInfo.company" />
                </div>
                <!-- 个人主页 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span
                        class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
                        >个人主页</span
                    >
                    <HInput class="w-full" v-model="userInfo.homePage" />
                </div>
                <!-- 个人介绍 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span
                        class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
                        >个人介绍</span
                    >
                    <HInput
                        class="w-full"
                        type="textarea"
                        max="50"
                        v-model="userInfo.introduction"
                    />
                </div>
                <!-- 保存修改 -->
                <HButton
                    class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
                    @click="onChangeProfile"
                    :loading="changeLoading"
                >
                    保存修改
                </HButton>
                <!-- 移动端退出登录 -->
                <HButton
                    v-if="isMobileTerminal"
                    class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
                    @click="onLogout"
                >
                    退出登录
                </HButton>
            </div>
        </div>

        <!-- pc端 -->
        <Dialog v-if="!isMobileTerminal" v-model="isDialogVisible">
            <ChangeAvatar
                :blob="currentBlob"
                @close="isDialogVisible = false"
            />
        </Dialog>

        <!-- 移动端 -->
        <Popup
            v-else
            v-model="isDialogVisible"
            :class="{
                'h-screen': isDialogVisible,
            }"
        >
            <ChangeAvatar
                :blob="currentBlob"
                @close="isDialogVisible = false"
            />
        </Popup>
    </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js';
import { Confirm, Message } from '@/libs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { putProfile } from '@/api/sys.js';
import ChangeAvatar from './components/ChangeAvatar.vue';

const store = useStore();
const router = useRouter();

const onNavbarLeftClick = () => {
    store.commit('app/changeRouterType', 'back');
    router.back();
};

const onLogout = () => {
    Confirm('确定退出登录吗？').then(() => {
        store.dispatch('user/logout');
    });
};

const inputFileTarget = ref(null);
const isDialogVisible = ref(false);
const currentBlob = ref('');
const onAvatarClick = () => {
    inputFileTarget.value.click();
};
const onSelectFile = () => {
    // 选择选中的文件
    const imgFile = inputFileTarget.value.files[0];
    // 生成 blob 对象
    const blob = URL.createObjectURL(imgFile);
    isDialogVisible.value = true;
    currentBlob.value = blob;
};
watch(isDialogVisible, () => {
    // 解决两次选择相同文件 change 事件不会触发
    if (!isDialogVisible.value) {
        inputFileTarget.value.value = '';
    }
});

const userInfo = ref({
    ...store.getters.userInfo,
});
const changeLoading = ref(false);
const onChangeProfile = async () => {
    changeLoading.value = true;
    try {
        await putProfile(userInfo.value);
        store.commit('user/setUserInfo', userInfo);
        Message('success', '用户信息修改成功');
    } catch (error) {
        store.commit('user/setUserInfo', userInfo);
        Message('success', '用户信息修改成功');
    } finally {
        changeLoading.value = false;
    }
};
</script>

<style lang="scss" scoped></style>
