<template>
    <div
        class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
    >
        <LoginHeader />
        <!-- 表单 -->
        <div
            class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
        >
            <h3
                class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"
            >
                登录账号
            </h3>
            <VeeForm @submit="onLoginSubmit">
                <VeeField
                    type="text"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="username"
                    placeholder="用户名"
                    autocomplete="auto"
                    :rules="validateUsername"
                    v-model="loginForm.username"
                />
                <VeeErrorMessage
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="username"
                />
                <VeeField
                    type="password"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="password"
                    placeholder="password"
                    autocomplete="auto"
                    :rules="validatePassword"
                    v-model="loginForm.password"
                />
                <VeeErrorMessage
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="password"
                />
                <div class="pt-1 pb-3 leading-[0] text-right">
                    <a
                        class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
                        @click="onToReg"
                        >去注册</a
                    >
                </div>

                <HButton
                    :loading="loadingBtn"
                    class="w-full dark:bg-zinc-900 xl:dark:text-zinc-800"
                    >登录</HButton
                >
            </VeeForm>
            <!-- 第三方登录 -->
            <div class="flex justify-around mt-4">
                <!-- <SvgIcon class="w-4 cursor-pointer" name="qq" /> -->
                <QQLogin />
                <WeixinLogin />
            </div>
        </div>

        <SliderCaptcha
            v-if="isSliderCaptchaVisible"
            @close="isSliderCaptchaVisible = false"
            @success="onSuccessCaptha"
        />
    </div>
</template>

<script setup>
import LoginHeader from '../components/LoginHeader.vue';
import QQLogin from './QQLogin.vue';
import WeixinLogin from './WeixinLogin.vue';
import SliderCaptcha from './SliderCaptcha';
import {
    Form as VeeForm,
    Field as VeeField,
    ErrorMessage as VeeErrorMessage,
} from 'vee-validate';
import { validateUsername, validatePassword } from '../validate';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { LOGIN_TYPE_USERNAME } from '@/constants';
import { useRouter } from 'vue-router';

const isSliderCaptchaVisible = ref(false);
const loadingBtn = ref(false);

//表单校验 通过之后就会触发
const onLoginSubmit = () => {
    isSliderCaptchaVisible.value = true;
};

// 人类行为验证通过
const onSuccessCaptha = () => {
    isSliderCaptchaVisible.value = false;
    onLogin();
};

const store = useStore();
const router = useRouter();
const loginForm = ref({
    username: '',
    password: '',
});
const onLogin = async () => {
    loadingBtn.value = true;
    try {
        await store.dispatch('user/login', {
            ...loginForm.value,
            loginType: LOGIN_TYPE_USERNAME,
        });
        router.push('/');
    } catch (error) {
        router.push('/');
    } finally {
        loadingBtn.value = false;
    }
};

const onToReg = () => {
    router.push('/register');
};
</script>

<style lang="scss" scoped></style>
