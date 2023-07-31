# 森空岛小组件 H5

这个一个森空岛小组件，基于森空岛api和web实现。

可嵌入任何支持webview的程序中


**效果图**
![IMG_6883(20230731-125341)](https://github.com/aynakeya/skland-widget/assets/32156054/a41d94a0-665d-4f32-ba57-752257af71f7)

## 在线Demo


**随时关闭**
[https://scene.aynakeya.com:10001/](https://scene.aynakeya.com:10001/)

## Run & Build

**Installation**
```shell
yarn install
```

**Run**
```shell
yarn run dev
```

**Build**
```shell
yarn run build
```
## 食用方法


**http://YOUR_HOST/?col=<列数>&use=<使用哪些组件>&refresh=<自动刷新>#cred=<森空岛cred>&uid=<游戏uid>**


例子: 显示 理智 每日任务， 每行2个
```
https://localhost:5173/?use=ap,routinedaily&col=2#cred=your_cred&uid=1000000
```
![Screenshot_20230731_152650](https://github.com/aynakeya/skland-widget/assets/32156054/2dfa1df5-9079-4131-b3be-813099875504)

## 目前支持的组件列表

| WidgetID       | 组件      |
|----------------|---------|
| ap             | 理智      |
| campaignreward | 每周报酬合成玉 |
| hire           | 公招刷新    |
| recruit        | 公开招募    |
| routinedaily   | 每日任务    |
| routineweekly  | 每周任务    |
| towerreward1   | 数据增补条   |
| towerreward2   | 数据增补仪   |
| training       | 训练室     |
| dormitory      | 休息进度    |
| labor          | 无人机     |
| manufacture    | 制造进度    |
| meeting        | 线索收集    |
| tiredchars     | 干员疲劳    |
| trading        | 订单进度    |


## 获取森空岛Credential方法

**Method 1**

参考 [skland-api](https://github.com/aynakeya/skland-api) 项目中的实现，用代码请求获取credential

**Method 2**

1. 登陆 [https://www.skland.com/](https://www.skland.com/) 打开开发者工具
2. 手动复制请求header中的cred信息
![a58e3c84d7e499871740b4b27020d7ba](https://github.com/aynakeya/skland-widget/assets/32156054/73028726-fd48-40b1-a621-683846cb9a33)


## 效果图

![IMG_6885](https://github.com/aynakeya/skland-widget/assets/32156054/c33efa50-5143-4f89-852d-c25d7a8b6812)
![Screenshot_20230731_152712](https://github.com/aynakeya/skland-widget/assets/32156054/704279e4-6358-4098-aef9-efd05b749f2e)
![Screenshot_20230731_152734](https://github.com/aynakeya/skland-widget/assets/32156054/b916f946-50b2-4ad4-b7b6-359f26558f52)


## Credit

前端设计: @404207

前端逻辑: @aynakeya
