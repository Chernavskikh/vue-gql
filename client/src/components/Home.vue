<template>
  <v-container>
    <h1 class="text-left">Home</h1>
    <ul v-for="post in getPosts" :key="post._id">
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
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            title
            description
           }
        }`
    },
  },
}
</script>
