<template>
  <div style="text-align:center;">
    <img
      class="anim"
      :class="isPlay ? 'play' : 'pause'"
      :src="img"
      style="border-radius:50%;margin-top:30px;border:1px solid #eee;"
    />
    <p>{{ song }}</p>
    <p>{{ singer }}</p>
    <audio ref="player" style="width:100%;" :src="url" autoplay controls loop />
    <q-btn
      v-if="
        $route.query.type === 'program' &&
          $store.state.example.playlist.length !== 0
      "
      style="margin-right:20px;"
      color="primary"
      label="上一首"
      @click="previous"
    />
    <q-btn
      v-if="
        $route.query.type === 'program' &&
          $store.state.example.playlist.length !== 0
      "
      color="primary"
      label="下一首"
      @click="next"
    />
    <q-list bordered v-if="$store.state.example.playlist.length !== 0">
      <q-item
        clickable
        v-ripple
        v-for="item in $store.state.example.playlist"
        :key="item.id"
        style="border-bottom:1px solid #eee"
        @click="changeSong(item.id)"
      >
        <q-item-section>
          <span :style="{ color: item.id === ids ? '#e66457' : '#000' }">{{
            item.name
          }}</span>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      img: "",
      singer: "",
      song: "",
      isPlay: false,
      ids: ""
    };
  },
  watch: {
    ids: async function(val) {
      this.handleProgram(val);
    }
  },
  async created() {
    this.ids = this.$route.params.id;
    if (this.$route.query.type !== "program") {
      this.handleSong(this.$route.params.id);
    }
  },
  methods: {
    next() {
      let index = this.$store.state.example.playlist.findIndex(
        item => item.id === Number(this.ids)
      );
      if (index < this.$store.state.example.playlist.length - 1) {
        this.ids = this.$store.state.example.playlist[index + 1].id;
      }
    },
    previous() {
      let index = this.$store.state.example.playlist.findIndex(
        item => item.id === Number(this.ids)
      );
      if (index !== 0) {
        this.ids = this.$store.state.example.playlist[index -1].id;
      }
    },
    async handleProgram(ids) {
      let response = await this.$axios.get(`/dj/program/detail?id=${ids}`);
      const id = response.data.program.mainSong.id;
      this.img = response.data.program.coverUrl + "?param=200y200";
      this.song = response.data.program.name;
      this.$store.commit("example/modifyTitle", this.song);
      this.singer = response.data.program.dj.nickname;
      this.$axios.get(`/song/url?id=${id}`).then(response2 => {
        this.url = response2.data.data[0].url;
      });
    },
    async handleSong(ids) {
      let response = await this.$axios.get(`/song/url?id=${ids}`);
      this.url = response.data.data[0].url;
      this.$axios.get(`/song/detail?ids=${ids}`).then(res => {
        this.img = res.data.songs[0].al.picUrl + "?param=200y200";
        this.song = res.data.songs[0].name;
        this.$store.commit("example/modifyTitle", this.song);
        var singerarr = res.data.songs[0].ar;
        singerarr.forEach((item, i) => {
          if (i == singerarr.length - 1) {
            this.singer = this.singer.concat(item.name);
          } else {
            this.singer = this.singer.concat(item.name, "/");
          }
        });
      });
    },
    changeSong(id) {
      if (this.ids !== id) {
        this.ids = id;
      }
    }
  },
  mounted() {
    this.$refs.player.addEventListener("playing", () => {
      this.isPlay = true;
    });
    this.$refs.player.addEventListener("pause", () => {
      this.isPlay = false;
    });
  }
};
</script>
<style>
@keyframes mymove {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.anim {
  animation: mymove 30s infinite linear;
}
.pause {
  animation-play-state: paused;
}
.play {
  animation-play-state: running;
}
</style>
