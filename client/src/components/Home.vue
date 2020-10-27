<template>
  <v-container>
    <v-layout row>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70"
                color="secondary" :width="7"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>


    <v-flex xs12>
      <v-carousel v-if="!loading && posts.length > 0">
        <v-carousel-item
            v-for="post in posts"
            :key="post._id"
            :src="post.imageUrl">
          <h1>{{post.title}}</h1>
          <p>{{post.description}}</p>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  created() {
    this.handleGetPosts();
  },
  methods: {
    handleGetPosts() {
      this.$store.dispatch('getPosts');
    },

  },
  computed: {
    ...mapGetters(['loading', 'posts']),
  },
}
</script>
<style scoped>
>>> .v-responsive__content {
  padding: 40px;
}
</style>
