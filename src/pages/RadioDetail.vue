<template>
  <q-list bordered>
    <q-item
      clickable
      v-ripple
      v-for="item in list"
      :key="item.id"
      class="flex"
      style="border-bottom:1px solid #eee;align-items:center;"
      @click="goPlay(item, item.id)"
    >
      <q-item-section>{{ item.name }}</q-item-section>
      <q-icon
        style="margin-right:10px;"
        name="album"
        @click.stop="addToList(item)"
      />
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
    this.$axios
      .get(`/dj/program?rid=${this.$route.params.id}&&limit=${this.limit}`)
      .then(response => {
        this.list = response.data.programs;
        this.$store.commit(
          "example/modifyTitle",
          response.data.programs[0].dj.brand
        );
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goPlay(song, id) {
      this.$store.commit("example/addSong", song);
      this.$router.push(`/player/${id}?type=program`);
    },
    addToList(song) {
      this.$store.commit("example/addSong", song);
    }
  }
};
</script>
