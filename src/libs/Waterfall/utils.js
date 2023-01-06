/**
 * 从 itemElement 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements) => {
    const imgElements = [];
    itemElements.forEach((element) => {
        imgElements.push(...element.getElementsByTagName('img'));
    });

    return imgElements;
};

/**
 * 生成所有的图片链接数组
 */
export const getAllImage = (imgElements) => {
    return imgElements.map((el) => el.src);
};

/**
 * 监听图片数组加载完成（通过 promise 完成）
 */
export const onCompleteImages = (imgs) => {
    // promise 集合
    const promiseAll = imgs.map(
        (url, index) =>
            new Promise((resolve) => {
                // 处理 img 的加载情况
                const image = new Image();
                image.onload = () => {
                    resolve({
                        url,
                        index,
                    });
                };
                image.onerror = () => {
                    resolve({
                        error: true,
                    });
                };
                image.src = url;
            })
    );

    return Promise.all(promiseAll);
};

/**
 * 返回列高对象中的最小的高度
 */
export const getMinHeight = (columnHeightObj) => {
    return Math.min(...Object.values(columnHeightObj));
};

/**
 * 返回列高对象中的最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
    // 拿到最小的高度
    const minHeight = getMinHeight(columnHeightObj);
    return Object.keys(columnHeightObj).find(
        (key) => columnHeightObj[key] === minHeight
    );
};

export const getMaxHeight = (columnHeightObj) => {
    return Math.max(...Object.values(columnHeightObj));
};
