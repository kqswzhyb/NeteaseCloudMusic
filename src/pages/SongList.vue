<template>
  <q-list bordered>
    <q-item
      clickable
      v-ripple
      v-for="item in list"
      :key="item.id"
      style="border-bottom:1px solid #eee"
      @click="goDetail(item.id)"
    >
      <q-item-section avatar>
        <q-avatar>
          <img :src="item.coverImgUrl" alt />
        </q-avatar>
      </q-item-section>
      <q-item-section>{{ item.name }}</q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      limit: 100
    };
  },
  created() {
    this.$store.commit(
      "example/modifyTitle",
      `${JSON.parse(this.$q.localStorage.getItem("user")).nickname}的歌单`
    );
    this.$axios
      .get(`/user/playlist?uid=${this.$route.params.id}`)
      .then(response => {
        this.list = response.data.playlist;
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/songlistdetail/${id}`);
    }
  }
};
</script>
