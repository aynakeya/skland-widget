<template>
  <!--    <template v-for="i in this.useWidget.length" :span="Math.round(24 / perRow)">-->
  <!--        <live-data v-if="widgetsData[i-1].type === 'livedata'"-->
  <!--                   v-bind="widgetsData[i-1].data"/>-->
  <!--        <base-building v-else v-bind="widgetsData[i-1].data"></base-building>-->
  <!--    </template>-->
    <a-row :gutter="[16,16]">
        <a-col v-for="i in this.useWidget.length" :span="Math.round(24 / colNum)">
            <live-data v-if="widgetsData[i-1].type === 'livedata'"
                       v-bind="widgetsData[i-1].data"/>
            <base-building v-else v-bind="widgetsData[i-1].data"></base-building>
        </a-col>
    </a-row>
</template>

<script>
import LiveData from "@/components/LiveData.vue";
import BaseBuilding from "@/components/BaseBuilding.vue";
import axios from "axios";
import {formatTimeDifference, getCurrentTS, getNextDay4AMTimestamp, getNextMondayTimestamp} from "@/utils/utils";

export default {
    components: {
        BaseBuilding, LiveData
    },
    created() {
        this.updateCredFromFragment();
        this.updateIfRefresh();
        this.colNum = this.getColNum();
        this.resetUseWidget();
        this.updateUseWidget();
        this.updateGameData();
        if (this.refresh) {
            setInterval(
                this.updateGameData,
                this.refreshCooldown
            )
        }
    },
    data() {
        return {
            refreshCooldown: 10000,
            refresh: false,
            cred: "",
            uid: "",
            colNum: 3,
            useWidget: ["ap"],
            liveData: {
                ap: {
                    background: '/assets/livedata_assets_apbg.png',
                    title: '理智',
                    text: '0',
                    point: '0',
                    hint: 'placeholder'
                },
                campaignreward: {
                    background: '/assets/livedata_assets_campaignrewardbg.png',
                    title: '每周报酬合成玉',
                    text: '0',
                    point: '0',
                    hint: 'placeholder'
                },
                hire: {
                    background: '/assets/livedata_assets_hirebg.png',
                    title: '公招刷新',
                    text: '0',
                    point: '',
                    hint: 'placeholder'
                },
                recruit: {
                    background: '/assets/livedata_assets_recruitbg.png',
                    title: '公开招募',
                    text: '0',
                    point: '0',
                    hint: 'placeholder'
                },
                routinedaily: {
                    background: '/assets/livedata_assets_routinedailybg.png',
                    title: '每日任务',
                    text: '0',
                    point: '0',
                    hint: 'placeholder'
                },
                routineweekly: {
                    background: '/assets/livedata_assets_routineweeklybg.png',
                    title: '每周任务',
                    text: '0',
                    point: '0',
                    hint: 'placeholder'
                },
                towerreward1: {
                    background: '/assets/livedata_assets_towerrewardbg.png',
                    title: '数据增补条',
                    text: '0',
                    point: '0',
                    hint: 'placeholder'
                },
                towerreward2: {
                    background: '/assets/livedata_assets_towerrewardbg.png',
                    title: '数据增补仪',
                    text: '0',
                    point: '0',
                    hint: 'placeholder'
                },
                training: {
                    background: '/assets/livedata_assets_trainingbg.png',
                    title: '训练室',
                    text: '0',
                    point: '',
                    hint: 'placeholder'
                },
            },
            buildingData: {
                dormitory: {
                    background: '/assets/basebuilding_assets_dormitorybg.png',
                    title: '休息进度',
                    text: '0',
                    point: '0',
                },
                labor: {
                    background: '/assets/basebuilding_assets_laborbg.png',
                    title: '无人机',
                    text: '0',
                    point: '200',
                },
                manufacture: {
                    background: '/assets/basebuilding_assets_manufacturebg.png',
                    title: '制造进度',
                    text: '0',
                    point: '0',
                },
                meeting: {
                    background: '/assets/basebuilding_assets_meetingbg.png',
                    title: '线索收集',
                    text: '0',
                    point: '7',
                },
                tiredchars: {
                    background: '/assets/basebuilding_assets_tiredcharsbg.png',
                    title: '干员疲劳',
                    text: '0',
                    point: '',
                },
                trading: {
                    background: '/assets/basebuilding_assets_tradingbg.png',
                    title: '订单进度',
                    text: '0',
                    point: '0',
                },
            },
        }
    },
    computed: {
        layout() {
            let layout = []
            for (let i = 0; i < this.useWidget.length; i++) {
                layout.push(
                    {x: i % this.colNum, y: Math.round(i / this.colNum), w: 1, h: 1, i: i}
                )
            }
            console.log(layout)
            return layout
        },
        isLogin() {
            return this.cred !== "" && this.uid !== ""
        },
        liveDataKey() {
            return Object.keys(this.liveData);
        },
        buildingKey() {
            return Object.keys(this.buildingData);
        },
        numOfRow() {
            return Math.ceil(this.useWidget.length / this.colNum);
        },
        widgetsData() {
            let data = []
            for (let widgetName of this.useWidget) {
                if (this.liveDataKey.includes(widgetName)) {
                    data.push({
                        data: this.liveData[widgetName],
                        type: "livedata"
                    })
                } else {
                    data.push({
                        data: this.buildingData[widgetName],
                        type: "building"
                    })
                }
            }
            return data
        }
    },
    methods: {
        updateCredFromFragment() {
            let cred = "";
            let uid = ""
            this.$route.hash.split('&')
                .map(part => part.replace(/^#/, ''))
                .forEach(param => {
                    const parts = param.split('=');
                    if (parts[0] === "cred") {
                        cred = parts[1];
                    }
                    if (parts[0] === "uid") {
                        uid = parts[1];
                    }
                });
            this.cred = cred;
            this.uid = uid;
        },
        updateIfRefresh() {
            let refresh = this.$route.query.refresh;
            this.refresh = refresh === "1";
        },
        getColNum() {
            let row = this.$route.query.col;
            if (row === undefined) {
                return this.colNum;
            }
            let val = parseInt(row, 10);
            if (isNaN(val)) {
                return this.colNum;
            }
            return val;
        },
        resetUseWidget() {
            this.useWidget = this.liveDataKey.concat(this.buildingKey);
        },
        updateUseWidget() {
            let useStr = this.$route.query.use;
            if (useStr === undefined) {
                return;
            }
            let widgets = useStr.split(",")
            let _this = this;
            widgets = widgets.filter(
                function (val) {
                    return _this.buildingKey.includes(val) || _this.liveDataKey.includes(val)
                }
            )
            if (widgets.length === 0) {
                return;
            }
            this.useWidget = widgets;
        },
        async updateGameData() {
            if (!this.isLogin) {
                return;
            }
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://zonai.skland.com/api/v1/game/player/info?uid=${this.uid}&ts=${getCurrentTS()}`,
                headers: {
                    'cred': this.cred,
                    'os': 'iOS',
                    'platform': '2',
                    'manufacturer': 'Apple',
                    'nid': '1',
                    'vName': '0.1.1'
                }
            };
            let result = await axios.request(config);
            if (result.status !== 200 || result.data.code !== 0) {
                this.cred = ""
                return
            }
            let data = result.data.data;
            // ap data
            this.liveData.ap.text = (data.status.ap.current +
                Math.floor((data.currentTs - data.status.ap.lastApAddTime) / (60 * 6))).toString();
            this.liveData.ap.point = data.status.ap.max.toString();
            this.liveData.ap.hint = `${formatTimeDifference(data.currentTs, data.status.ap.completeRecoveryTime)}分钟后全部恢复`
            // campaignreward
            this.liveData.campaignreward.text = data.campaign.reward.current.toString();
            this.liveData.campaignreward.point = data.campaign.reward.total.toString();
            this.liveData.campaignreward.hint = `${formatTimeDifference(data.currentTs, getNextMondayTimestamp())}后刷新`
            // hire
            let refreshCount = data.building.hire.refreshCount;
            this.liveData.hire.text = refreshCount > 0 ? `${refreshCount}次` : "联络中"
            this.liveData.hire.hint = refreshCount > 0 ? "可进行公开招募标签刷新" : `${formatTimeDifference(data.building.hire.completeWorkTime, data.currentTs)}后获取刷新次数`
            // recruit
            let recruitFinish = data.recruit.filter(x => x.state !== 2).length;
            let maxFinishTs = Math.max(...data.recruit.map(item => item.finishTs))
            this.liveData.recruit.text = recruitFinish.toString();
            this.liveData.recruit.point = data.recruit.length.toString();
            this.liveData.recruit.hint = maxFinishTs === -1 ? "以全部完成" : `${formatTimeDifference(maxFinishTs, data.currentTs)}后全部完成`
            // routinedaily
            this.liveData.routinedaily.text = data.routine.daily.current.toString();
            this.liveData.routinedaily.point = data.routine.daily.total.toString();
            this.liveData.routinedaily.hint = `${formatTimeDifference(data.currentTs, getNextDay4AMTimestamp())}后刷新`
            // routineweeklly
            this.liveData.routineweekly.text = data.routine.weekly.current.toString();
            this.liveData.routineweekly.point = data.routine.weekly.total.toString();
            this.liveData.routineweekly.hint = `${formatTimeDifference(data.currentTs, getNextMondayTimestamp())}后刷新`
            // towerreward1
            this.liveData.towerreward1.text = data.tower.reward.lowerItem.current.toString();
            this.liveData.towerreward1.point = data.tower.reward.lowerItem.total.toString();
            this.liveData.towerreward1.hint = `${formatTimeDifference(data.currentTs, data.tower.reward.termTs)}后刷新`
            // towerreward2
            this.liveData.towerreward2.text = data.tower.reward.higherItem.current.toString();
            this.liveData.towerreward2.point = data.tower.reward.higherItem.total.toString();
            this.liveData.towerreward2.hint = `${formatTimeDifference(data.currentTs, data.tower.reward.termTs)}后刷新`
            // training
            let trainee = data.building.training.trainee;
            if (trainee !== null) {
                this.liveData.training.text = data.charInfoMap[trainee.charId].name;
            }else {
                this.liveData.training.text = "空闲中";
            }

            // dormitory
            let charDormCnt = 0;
            let charDormOkCnt = 0;
            for (const dorm of data.building.dormitories) {
                charDormCnt += dorm.chars.length;
                charDormOkCnt += dorm.chars.filter(char => char.ap === 8640000).length;
            }
            this.buildingData.dormitory.text = charDormOkCnt.toString();
            this.buildingData.dormitory.point = charDormCnt.toString();
            // labor
            this.buildingData.labor.text = data.building.labor.value.toString();
            this.buildingData.labor.point = data.building.labor.maxValue.toString();
            // manufacture
            let manufacFinish = 0;
            let manufacTotal = 0;

            for (const manufac of data.building.manufactures) {
                manufacFinish += manufac.complete;
                if (manufac.formulaId === "") {
                    continue;
                }
                manufacTotal += Math.floor(manufac.capacity / data.manufactureFormulaInfoMap[manufac.formulaId].weight);
            }
            this.buildingData.manufacture.text = manufacFinish.toString();
            this.buildingData.manufacture.point = manufacTotal.toString();
            // meeting
            this.buildingData.meeting.text = data.building.meeting.clue.board.length.toString();
            // tiredchars
            this.buildingData.tiredchars.text = data.building.tiredChars.length.toString();
            // trading
            let stockLimitSum = 0;
            let stockLengthSum = 0;

            for (const element of data.building.tradings) {
                stockLimitSum += element.stockLimit;
                stockLengthSum += element.stock.length;
            }
            this.buildingData.trading.text = stockLengthSum.toString();
            this.buildingData.trading.point = stockLimitSum.toString();
        }
    }
}
</script>

<style scoped lang="less">

</style>
