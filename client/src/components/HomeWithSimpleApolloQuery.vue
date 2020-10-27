<template>
  <v-container>
    <h1 class="text-left">Home</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <ul v-else v-for="post in getPosts" :key="post._id">
      <li>
        {{post.title}}
        {{post.description}}
      </li>
    </ul>
  </v-container>
</template>

<script>
import { gql } from 'apollo-boost';
export default {
  name: 'Home',
  data() {
    return {
      posts: [],
    };
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            description
           }
        }`,
      result({data, loading, networkStatus}) {
        if (!loading) {
          this.posts = data.getPosts;
        }
      },
      error(err) {
        console.error(err, '[ERROR]');
      },
    },
  },
}
</script>
