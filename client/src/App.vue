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
          <v-btn text v-for="item in HorizontalMenuItems" :key="item.title" :to="item.link">
            <v-icon class="hidden-sm-and-down" left>{{item.icon}}</v-icon>
            {{item.title}}
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
export default {
  name: 'App',

  data: () => ({
    sideNav: false,
    HorizontalMenuItems: [
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
    ],
    sideNavItems: [
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
    ],
  }),
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
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
