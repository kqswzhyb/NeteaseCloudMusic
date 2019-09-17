<template>
  <q-list bordered>
    <q-item
      clickable
      v-ripple
      v-for="item in list"
      :key="item.id"
      class="flex"
      style="border-bottom:1px solid #eee;align-items:center;"
      @click="goPlay(item.id)"
    >
      <q-item-section>{{ item.name }}</q-item-section>
      <q-icon v-if="subscribed" name="add" @click.stop="addToMine(item)" />
      <q-icon v-else name="delete" @click.stop="reduce(item)" />
    </q-item>
  </q-list>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      subscribed: false
    };
  },
  created() {
    this.$axios
      .get(`/playlist/detail?id=${this.$route.params.id}`)
      .then(response => {
        this.subscribed = response.data.playlist.subscribed;
        this.list = response.data.playlist.tracks;
        this.$store.commit("example/modifyTitle", response.data.playlist.name);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goPlay(id) {
      this.$router.push(`/player/${id}?type=song`);
    },
    addToMine(song) {
      this.$axios
        .get(`/playlist/tracks?op=add&pid=993589082&tracks=${song.id}`)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    reduce(item) {
      this.$axios
        .get(`/playlist/tracks?op=del&pid=993589082&tracks=${item.id}`)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
