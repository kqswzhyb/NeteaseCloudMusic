<template>
  <q-page>
    <q-input class="bottom" standout="bg-teal text-white" v-model="phone" label="帐号" />
    <q-input
      class="bottom"
      type="password"
      standout="bg-teal text-white"
      v-model="password"
      label="密码"
    />
    <div class="center">
      <q-btn size="15px" label="登录" @click="login" color="primary" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      phone: "13961532693",
      password: "q465604612"
    };
  },
  created() {},
  methods: {
    login() {
      this.$axios
        .get(`/login/cellphone?phone=${this.phone}&password=${this.password}`)
        .then(response => {
          if (response.data.code === 200) {
            this.$q.localStorage.set(
              "user",
              JSON.stringify(response.data.profile)
            );
            this.$store.commit("example/changeLoginStatus", true);
            this.$q.notify("登录成功");
            this.$router.push({ path: "/radio" });
          } else {
            this.$q.notify("帐号或密码错误");
          }
        })
        .catch(() => {
          this.$q.notify("帐号或密码错误");
        });
    }
  }
};
</script>

<style>
.bottom {
  margin-bottom: 20px;
}
.center {
  width: 100%;
  text-align: center;
}
</style>
