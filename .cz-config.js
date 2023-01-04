module.exports = {
    // 可选类型
    types: [
        { value: ':sparkles: feat', name: '✨ feat:     新功能' },
        { value: ':bug: fix', name: '🐛 fix:      修复' },
        { value: ':zap: perf', name: '⚡ perf:     性能优化' },
        {
            value: ':rocket: chore',
            name: '🚀 chore:    构建过程或辅助工具的变动'
        },
        { value: ':tada: init', name: '🎉 init:     初始化' },
        { value: ':memo: docs', name: '📝 docs:     文档变更' },
        {
            value: ':lipstick: style',
            name: '💄 style:    代码格式(不影响代码运行的变动)'
        },
        {
            value: ':recycle: refactor',
            name: '♻️ refactor: 重构(既不是增加feature，也不是修复bug)'
        },
        { value: ':white_check_mark: test', name: '✅ test:     增加测试' },
        { value: ':rewind: revert', name: '⏪️ revert:   回退' },
        { value: ':package: build', name: '📦️ build:    打包' }
    ],
    messages: {
        type: '请选择提交类型:',
        customScope: '请输入修改范围(可选):',
        subject: '请简要描述提交(必填):',
        body: '请输入详细描述(可选):',
        footer: '请输入要关闭的issue(可选):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
    },
    // 跳过问题
    skipQuestions: ['body', 'footer'],
    // subject文字长度默认是72
    subjectLimit: 72
};
