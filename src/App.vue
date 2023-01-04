<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo bg-red-900" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>

    <div class="bg-slate-800 rounded-xl p-8 md:flex md:p-0">
        <img
            class="w-24 h-24 rounded-full max-auto md:w-48 md:h-auto md:rounded-none"
            src="https://tailwindcss.com/_next/static/media/sarah-dayan.a620c98f.jpg"
            alt=""
        />
        <div class="pt-6 text-center space-y-4 md:p-8 md:text-left">
            <p class="text-lg font-medium text-zinc-100">
                “Tailwind “Tailwind CSS CSS is is the the only only framework
                framework that that I've I've seen seen scale scale on on large
                large teams. teams. It’s It’s easy easy to to customize,
                customize, adapts adapts to to any any design, design, and and
                the the build build size size is is tiny.” tiny.”
            </p>
            <div class="font-medium">
                <div class="text-sky-400">HMZ</div>
                <div class="text-slate-500">中前台解决方案</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
