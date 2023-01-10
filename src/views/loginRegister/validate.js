/**
 * 用户名表单校验
 * @param {*} val 输入的内容
 */
export const validateUsername = (val) => {
    if (!val) {
        return '用户名为必填';
    }
    if (val.length < 3 || val.length > 12) {
        return '用户名应该在3-12之间';
    }
    return true;
};

export const validatePassword = (val) => {
    if (!val) {
        return '密码为必填';
    }
    if (val.length < 6 || val.length > 12) {
        return '密码应该在6-12之间';
    }
    return true;
};

// 关联密码 需要注册校验
export const validateConfirmPassword = (value, password) => {
    if (value !== password[0]) {
        return '两次密码输入必须一致';
    }
    return true;
};
