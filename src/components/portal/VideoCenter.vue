<template>
  <div>
    <header class="header">
      <span>
        <a>👈</a>
      </span>
      <span>3-3 Promethues 环境文件及存储解析</span>
    </header>
    <!--主体区域-->
    <div class="main_container">
      <!--视频区域-->
      <div class="demo">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
      <!--作者信息-->
      <span class="author_info">
        <a href="#" target="_blank">
          <img class="avatar" src="../../assets/avatar.jpg" />
        </a>
        <span class="author_name">Ring2</span>
        <span class="author_exp">架构师</span>
        <p style="font-size:12px;color:#ccc;">一名从业10年的IT老鸟，曾效力于阿里等多家知名公司，喜欢研究各种开源技术。</p>
      </span>
      <!--tab区域-->
      <div class="tabarea">
        <ul class="tab-ul">
          <li @click="openDrawer(1)">
            <img class="tab-img" src="../../assets/chapter.png" /> 章节
          </li>
          <li>
            <img class="tab-img" src="../../assets/knowleage.png" />
            <el-tooltip class="item" effect="dark" content="敬请期待！" placement="top">
              <span>问答</span>
            </el-tooltip>
          </li>
          <li>
            <img class="tab-img" src="../../assets/note.png" />
            <el-tooltip class="item" effect="dark" content="敬请期待！" placement="top">
              <span>笔记</span>
            </el-tooltip>
          </li>
          <li @click="evaluateVisible = true">
            <img class="tab-img" src="../../assets/evaluate.png" /> 评论
          </li>
        </ul>
      </div>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawerFlag"
      :with-header="false"
      direction="ltr"
      size="23%"
    >
      <div>
        <ul class="chapter-list" v-for="(item,index) in chapterList" :key="index">
          <li>{{item.courseName}}</li>
          <ul class="chapter-list1" v-for="(item,index) in item.children" :key="index">
            <li>
              <img
                src="../../assets/play.png"
                style="margin-top:1px;position:relative;"
                width="15px"
                height="15px"
              />
              <span class="chapter_hover">{{item.courseName}}</span>
            </li>
          </ul>
        </ul>
      </div>
    </el-drawer>
    <el-dialog title="我要评论" :visible.sync="evaluateVisible" width="30%">
      <el-form ref="form">
        <el-form-item>
          <el-input type="textarea" v-model="evaluate" placeholder="扯淡、吐槽、表扬、鼓励...想说啥说啥"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">发 表 评 论</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chapterList: [
        {
          id: 1,
          courseName: '第一章 课程介绍',
          children: [
            { id: 1, courseName: '1-1 课程引导' },
            { id: 1, courseName: '1-2 课程介绍' }
          ]
        },
        {
          id: 1,
          courseName: '第二章 微服务于云原生背景下的监控图景',
          children: [
            { id: 1, courseName: '2-1 微服务于云原生背景下的监控图景' },
            { id: 1, courseName: '2-2 微服务于云原生背景下的监控图景1' }
          ]
        }
      ],
      evaluate: '',
      drawerFlag: false,
      evaluateVisible: false,
      playerOptions: {
        // 播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        // 如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            // 类型
            type: 'video/mp4',
            // url地址
            src:
              'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'
          }
        ],
        // 你的封面地址
        poster: '',
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          // 全屏按钮
          fullscreenToggle: true
        }
      }
    }
  },
  methods: {
    openDrawer() {
      this.drawerFlag = true
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 40px;
  margin-top: 12px;
  > span {
    padding-left: 20px;
    font-weight: 700;
    font-size: 14px;
  }
}
.main_container {
  width: 100%;
  height: 700px;
  background-color: #1c1f21;
}
.demo {
  display: inline-block;
  width: 1000px;
  height: 556px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  background: #1c1f21;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-left: 180px;
  padding-top: 30px;
}

// .demo:hover {
//   display: block;
// }
.author_info {
  color: #fff;
  height: 500px;
  position: absolute;
  padding: 30px 30px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: relative;
}
.author_name {
  height: 50px;
  padding-left: 10px;
  line-height: 30px;
  position: absolute;
}
.author_exp {
  font-size: 12px;
  padding-left: 10px;
  color: #ccc;
}
//tab
.tabarea {
  margin: 10px 30%;
}
.tab-ul {
  list-style: none;
  display: inline-block;
  color: #ffffff;
  > li {
    float: left;
    padding-left: 20px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
  }
  :hover {
    cursor: pointer;
    color: #fff;
  }
}
.tab-img {
  width: 17px;
  height: 15px;
}

/deep/ .el-drawer__body {
  background-color: #1c1f21;
  color: #fff;
}
.chapter-list {
  list-style: none;
  font-size: 14px;
  > li {
    padding: 5px 0px;
  }
}
.chapter-list1 {
  list-style: none;
  font-size: 14px;
  > li {
    padding: 10px 0px;
    color: #ccc;
    font-size: 12px;
  }
}
.chapter_hover:hover {
  color: #eff314fb;
  cursor: pointer;
}
</style>
