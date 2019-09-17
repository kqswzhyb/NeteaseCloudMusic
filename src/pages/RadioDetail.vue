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
      list: [],
      limit: 100
    };
  },
  created() {
    this.$axios
      .get(`/dj/program?rid=${this.$route.params.id}&&limit=${this.limit}`)
      .then(response => {
        this.list = response.data.programs;
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