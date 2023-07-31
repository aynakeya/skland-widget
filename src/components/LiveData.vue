<template>
    <div class="livedata-wrapper"
         ref="wrapper">
        <div class="livedata">
            <img :src="background" alt=""/>
            <div class="title">{{ title }}</div>
            <div class="text">{{ text }}
                <span v-if="point" class="point">/ {{ point }}</span>
            </div>
        </div>
        <div class="hint">
            <div class="hint-text">
                <img src="/assets/battery.png" alt=""/>{{ hint }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: "LiveData",
    data() {
        return {};
    },
    methods: {
        resetFontSize() {
            let wrapper = this.$refs.wrapper as HTMLElement;
            // if (wrapper === undefined) {
            //     return;
            // }
            wrapper.style.fontSize =wrapper.offsetWidth / 10 + "px";
        }
    },
     mounted() {
        this.resetFontSize();
        // setTimeout(this.resetFontSize,500);
        window.addEventListener("resize", this.resetFontSize);
    },
    props: {
        background: {
            type: String,
            default: "/a.png"
        },
        title: {
            type: String,
            default: "Title"
        },
        text: {
            type: String,
            default: "100"
        },
        point: {
            type: String,
            default: "100"
        },
        hint: {
            type: String,
            default: "hint"
        }
    }
}
</script>

<style scoped lang="less">
.livedata-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  //font-size: 42px;

  .livedata {

    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .title {
      position: absolute;
      top: 0.72em;
      left: 0.72em;
      color: white;
      font-size: 0.72em;
    }

    .text {
      position: absolute;
      top: 1.3em;
      left: 0.42em;
      margin-bottom: 0;
      font-size: 1.2em;
      color: #5FAFE7;

      .point {
        color: #C9C9C9;
        font-size: 0.6em;
      }
    }
  }

  .hint {
    .hint-text {
      color: #6E6E6E;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.42em;

      img {
        width: 2em;
        height: 2em;
      }
    }
  }
}
</style>
