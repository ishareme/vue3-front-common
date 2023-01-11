import OSS from 'ali-oss';
import { getSts } from '@/api/sys';
import { OSS_REGION, OSS_BUCKET } from '@/constants';

export const getOSSClient = async () => {
    try {
        const res = await getSts();
        return new OSS({
            // bucket 所在区域
            region: OSS_REGION,
            // id
            accessKeyId: res.Credentials.AccessKeyId,
            // secret
            accessKeySecret: res.Credentials.AccessKeySecret,
            // token
            stsToken: res.Credentials.SecurityToken,
            // bucket 名字
            bucket: OSS_BUCKET,
            // 刷新 token，在 token 过期后自动调用（但是并不生效，可能会在后续的版本中修复）
            refreshSTSToken: async () => {
                try {
                    // 向您搭建的STS服务获取临时访问凭证。
                    const res = await getSts();
                    return {
                        accessKeyId: res.Credentials.AccessKeyId,
                        accessKeySecret: res.Credentials.AccessKeySecret,
                        stsToken: res.Credentials.SecurityToken,
                    };
                } catch (error) {
                    //
                }
            },
            // 刷新临时访问凭证的时间间隔，单位为毫秒。
            refreshSTSTokenInterval: 5 * 1000,
        });
    } catch (error) {
        const res = {
            RequestId: 'E03B702D-5B84-50BC-B578-EF87A71B5C45',
            AssumedRoleUser: {
                Arn: 'acs:ram::1211026263114215:role/imoocfrontramoss/imooc-front@1211026263114215.onaliyun.com',
                AssumedRoleId:
                    '315679564736224577:imooc-front@1211026263114215.onaliyun.com',
            },
            Credentials: {
                SecurityToken:
                    'CAISmAJ1q6Ft5B2yfSjIr5fPCcvii+pzxISdSXPVtzUjVN1c2Y/Nhzz2IHlJenZhBO4asf8xnmpU6/kdloByTphCTgnKd8x28rwOq1r4O9Cf4ZLutOVY0sT4X2+VAhr6zdLUJe7+SYs0r3hH9xeW+BVoyJ7WKB+APTX8Q7Dr5LdjatMIJHraCRNNGNZRICZ7tcYeLgG/HP2xMxns8AGyZQgSzWgas25k7rmlycCx8wfXiEaAqtUYvIPsOJOpHaIOVdVdK47vhbUuLPSbjnUJskQQrfpM4fYaqWudjLa0GEJM5hiKCe3Q/+B0IRVxDqpAQPcZ8qetyKMk5beNzd6rlkkSJ5lUViPYT466x83YAuqsMc0iZTkQu61lFyvlGoABHlwxfFetftswlD0BiZfn5mL0XtAGRYWuUGt24CnPgofaTlK3YeVES3zoI8vrjVtC1SHoWxPJgChkfANeuCgxtFAj29U4A3jzFnXYt07oT/u4zqrE5bzwNMf3HvjZ4j9DZXxIPwXyxf0RegWrrdZx0zNqyYbu0MgMJw7sgO7Up34=',
                AccessKeyId: 'STS.NTzBqVf5RsFvKUdS5vXRp6Jfe',
                AccessKeySecret: 'Du8TGFWGtgswmaQXt8Vquw6j1eSy56318vMTLmmDcFxz',
                Expiration: '2022-02-28T12:41:45Z',
            },
        };
        return new OSS({
            // bucket 所在区域
            region: OSS_REGION,
            // id
            accessKeyId: res.Credentials.AccessKeyId,
            // secret
            accessKeySecret: res.Credentials.AccessKeySecret,
            // token
            stsToken: res.Credentials.SecurityToken,
            // bucket 名字
            bucket: OSS_BUCKET,
            // 刷新 token，在 token 过期后自动调用（但是并不生效，可能会在后续的版本中修复）
            refreshSTSToken: async () => {
                try {
                    // 向您搭建的STS服务获取临时访问凭证。
                    const res = await getSts();
                    return {
                        accessKeyId: res.Credentials.AccessKeyId,
                        accessKeySecret: res.Credentials.AccessKeySecret,
                        stsToken: res.Credentials.SecurityToken,
                    };
                } catch (error) {
                    //
                }
            },
            // 刷新临时访问凭证的时间间隔，单位为毫秒。
            refreshSTSTokenInterval: 5 * 1000,
        });
    }
};
