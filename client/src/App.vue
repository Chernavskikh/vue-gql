<template>
  <v-app>
    <!-- Sidebar-->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat height="48">
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <v-btn to="/share" text>
          Vue Share
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{item.title}}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal navbar-->
    <v-card
        color="grey lighten-4"
        flat
        tile
    >
      <v-toolbar dense color="primary" fixed dark>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/share" tag="span">
            Vue Share
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Search-->
        <v-text-field flex prepend-icon="search" placeholder="Search posts" color="accent" single-line hide-details></v-text-field>

        <v-spacer></v-spacer>

        <!-- Horizontal navbar links-->
        <v-toolbar-items>
          <v-btn text v-for="item in horizontalMenuItems" :key="item.title" :to="item.link">
            <v-icon class="hidden-sm-and-down" left>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>

          <v-btn text to="/profile" v-if="user">
            <v-icon class="hidden-sm-only" left>account_box</v-icon>
            <v-badge right color="blue darken-2">
<!--              <span slot="badge">1</span>-->
              Profile
            </v-badge>
          </v-btn>

          <v-btn text v-if="user" @click="handleSignout">
            <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
            Signout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',

  data: () => ({
    sideNav: false,
  }),
  computed: {
    sideNavItems() {
      let items = [
        {
          icon: 'chat',
          title: 'Posts',
          link: '/posts',
        },
        {
          icon: 'lock_open',
          title: 'Sign In',
          link: '/signin',
        },
        {
          icon: 'create',
          title: 'Sign Up',
          link: '/signup',
        }
      ]

      if (this.user) {
        items = [
          {
            icon: 'chat',
            title: 'Posts',
            link: '/posts',
          },
          {
            icon: 'stars',
            title: 'Create Post',
            link: '/post/add',
          },
          {
            icon: 'account',
            title: 'Profile',
            link: '/profile',
          },
        ]

        return items
      }
    },
    horizontalMenuItems() {
      let items = [
        {
          icon: 'chat',
          title: 'Posts',
          link: '/posts',
        },
        {
          icon: 'lock_open',
          title: 'Sign In',
          link: '/signin',
        },
        {
          icon: 'create',
          title: 'Sign Up',
          link: '/signup',
        }
      ]

      if (this.user) {
        items = [
          {
            icon: 'chat',
            title: 'Posts',
            link: '/posts',
          },
        ]
      }

      return items
    },
    ...mapGetters(['user'])
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignout() {
      this.$store.dispatch('signoutUser')
    },
  },
};
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter-active,
  .fade-enter {
    opacity: 0;
  }
</style>
