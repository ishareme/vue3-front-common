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
                注册账号
            </h3>
            <VeeForm @submit="onSubmit">
                <VeeField
                    type="text"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="username"
                    placeholder="用户名"
                    autocomplete="auto"
                    :rules="validateUsername"
                    v-model="regForm.username"
                />
                <VeeErrorMessage
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="username"
                />
                <VeeField
                    type="text"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="password"
                    placeholder="密码"
                    autocomplete="auto"
                    :rules="validatePassword"
                    v-model="regForm.password"
                />
                <VeeErrorMessage
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="password"
                />
                <VeeField
                    type="password"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="confirmPassword"
                    placeholder="确认密码"
                    autocomplete="auto"
                    rules="validateConfirmPassword:@password"
                    v-model="regForm.confirmPassword"
                />
                <VeeErrorMessage
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="confirmPassword"
                />
                <div class="pt-1 pb-3 leading-[0] text-right">
                    <a
                        class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
                        >去登录</a
                    >
                </div>

                <div class="text-center">
                    <a
                        class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300"
                        href="#"
                        target="__black"
                        >注册即同意《注册协议》</a
                    >
                </div>

                <HButton
                    :loading="loadingBtn"
                    class="w-full dark:bg-zinc-900 xl:dark:text-zinc-800"
                    >立即注册</HButton
                >
            </VeeForm>
            <!-- 第三方登录 -->
            <div class="flex justify-around mt-4">
                <SvgIcon class="w-4 cursor-pointer" name="qq" />
                <SvgIcon class="w-4 cursor-pointer" name="wexin" />
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
import { LOGIN_TYPE_USERNAME } from '@/constants';

import {
    Form as VeeForm,
    Field as VeeField,
    ErrorMessage as VeeErrorMessage,
    defineRule,
} from 'vee-validate';
import {
    validateUsername,
    validatePassword,
    validateConfirmPassword,
} from '../validate';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const loadingBtn = ref(false);

// 人类行为验证通过
const onSuccessCaptha = () => {};

const store = useStore();
const router = useRouter();

/**
 * 插入规则
 */
defineRule('validateConfirmPassword', validateConfirmPassword);

const regForm = ref({
    username: '',
    password: '',
    confirmPassword: '',
});

//表单校验 通过之后就会触发
const onSubmit = async () => {
    loadingBtn.value = true;
    const payload = {
        username: regForm.value.username,
        password: regForm.value.password,
    };
    try {
        await store.dispatch('user/register', {
            ...payload,
            ...router.query,
        });
        await store.dispatch('user/login', {
            ...payload,
            loginType: LOGIN_TYPE_USERNAME,
        });
    } catch (error) {
        await store.dispatch('user/login', {
            ...payload,
            loginType: LOGIN_TYPE_USERNAME,
        });
    } finally {
        loadingBtn.value = false;
    }
    router.push('/');
};
</script>

<style lang="scss" scoped></style>
