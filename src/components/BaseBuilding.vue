<template>
    <div class="building-wrapper" ref="wrapper">
        <div class="building">
            <img :src="background" alt=""/>
            <div class="title">{{ title }}</div>
            <div class="text">{{ text }}<span v-if="point" class="point">/{{ point }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: "BaseBuilding",
    data() {
        return {};
    },
    methods: {
        resetFontSize() {
            let wrapper = this.$refs.wrapper as HTMLElement
            // if (wrapper === null) {
            //     return;
            // }
            wrapper.style.fontSize = wrapper.offsetWidth / 10 + "px";
        }
    },
    mounted() {
        this.resetFontSize();
        window.addEventListener("resize", this.resetFontSize);
    },
    props: {
        background: {
            type: String,
            default: "/"
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
        }
    }
}
</script>

<style scoped lang="less">
.building-wrapper {
  width: 100%;
  height: 100%;
  font-size: 47.5px;
  color: #C0C0C0;
  position: relative;

  .building {
    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .title {
      position: absolute;
      top: 0.1em;
      left: 0.28em;
      font-size: 1.25em;
    }

    .text {
      position: absolute;
      bottom: 0;
      right: 0.42em;
      font-size: 1.5em;
      color: white;

      .point {
        color: #C9C9C9;
        font-size: 0.42em;
      }
    }
  }
}
</style>
