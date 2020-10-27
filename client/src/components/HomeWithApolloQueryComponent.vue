<template>
  <v-container>
    <h1 class="text-left">Home</h1>
    <ApolloQuery :query="getPostsQuery" notifyOnNetworkStatusChange>
      <template slot-scope="{ result: { loading, data, error }}">
        <div v-if="loading">...loading</div>
        <div v-else-if="error">Error! {{error.message}}</div>
        <ul v-else v-for="post in data.getPosts" :key="post._id">
          <li>{{post.title}}</li>
          <li>{{post.description}}</li>
        </ul>
      </template>
    </ApolloQuery>
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
