<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          v-if="$route.meta.back"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-btn flat dense round @click="goBack" v-else aria-label="Menu">
          <q-icon name="arrow_left" size="30px" />
        </q-btn>

        <q-toolbar-title>{{ this.$route.meta.title || title }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="$route.meta.back"
      content-class="bg-grey-2"
    >
      <q-item>
        <q-item-section avatar>
          <img style="width:60px;border-radius:50%;" :src="user.avatarUrl" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ user.userId ? user.nickname : "未登录" }}
          </q-item-label>
        </q-item-section>
        <q-btn
          color="primary"
          :label="isLogin ? '退出' : '去登录'"
          @click="control"
        />
      </q-item>
      <q-item clickable @click="goRadio" style="border-bottom:1px solid #eee;">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>热门电台</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="songList(user.userId)" v-if="isLogin">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>我的歌单</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

import { mapState } from "vuex";
export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: false,
      user: {
        avatarUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568626009251&di=1d0eb68f635f54c2226d7a0b3c99eaef&imgtype=0&src=http%3A%2F%2Fn1.image.hjfile.cn%2Fmh%2F2016%2F07%2F11%2Fd3bdabd45943655e6d2cf282081c47eb.png",
        userId: ""
      }
    };
  },
  methods: {
    openURL,
    control() {
      if (this.isLogin) {
        this.$q.localStorage.set("user", "");
        this.user = {
          avatarUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568626009251&di=1d0eb68f635f54c2226d7a0b3c99eaef&imgtype=0&src=http%3A%2F%2Fn1.image.hjfile.cn%2Fmh%2F2016%2F07%2F11%2Fd3bdabd45943655e6d2cf282081c47eb.png",
          userId: ""
        };
        this.$store.commit("example/changeLoginStatus", false);
        this.$router.push({ path: "/radio" });
      } else {
        this.$router.push({ path: "/login" });
      }
      this.leftDrawerOpen = false;
    },
    goRadio() {
      this.$router.push({ path: "/radio" });
      this.leftDrawerOpen = false;
    },
    songList(id) {
      this.$router.push(`/songlist/${id}`);
      this.leftDrawerOpen = false;
    },
    goBack() {
      this.$router.go(-1);
      this.leftDrawerOpen = false;
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.example.isLogin
    }),
    ...mapState({
      title: state => state.example.title
    })
  },
  watch: {
    "$store.state.example.isLogin": function(val) {
      if (val) {
        this.user = JSON.parse(this.$q.localStorage.getItem("user"));
      }
    }
  },
  created() {
    if (this.$q.localStorage.getItem("user")) {
      this.$store.commit("example/changeLoginStatus", true);
      this.user = JSON.parse(this.$q.localStorage.getItem("user"));
    }
  }
};
</script>

<style></style>
