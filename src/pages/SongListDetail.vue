<template>
  <q-list bordered>
    <q-item
      clickable
      v-ripple
      v-for="item in list"
      :key="item.id"
      style="border-bottom:1px solid #eee"
      @click="goRadio(item.id)"
    >
      <q-item-section>{{item.name}}</q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.$axios
      .get(`/playlist/detail?id=${this.$route.params.id}`)
      .then(response => {
        this.list = response.data.playlist.tracks;
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
    goRadio(id){
      console.log(id)
    }
  }
};
</script>