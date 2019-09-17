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
      <q-item-section avatar>
        <q-avatar>
          <img :src="item.picUrl" alt />
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
      list: []
    };
  },
  created() {
    this.$axios
      .get("/dj/hot")
      .then(response => {
        this.list = response.data.djRadios;
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goRadio(id) {
      this.$router.push(`/radio/${id}`);
    }
  }
};
</script>
