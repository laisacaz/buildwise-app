<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list class="py-0 navigation-list">
        <div v-for="(item, i) in items" :key="i">
          <v-list-group
            v-if="item.children"
            v-model="item.expanded"
            class="parent-item"
            @click="
              () => {
                if (!item.expanded) {
                  miniMenu = false;
                }
              }
            "
          >
            <template #activator>
              <v-list-item-action>
                <v-tooltip right>
                  <template #activator="{ on, attrs }">
                    <v-icon
                      size="22"
                      class="list-icon"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ item.icon }}
                    </v-icon>
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  class="list-text normal-line-break"
                  v-text="item.title"
                />
              </v-list-item-content>
            </template>

            <template v-for="(child, y) in item.children">
              <v-divider v-if="child.divider" :key="y"></v-divider>

              <v-list-item
                v-else
                :key="y"
                :to="child.to"
                router
                class="item sub-item"
                active-class="item-active"
              >
                <v-list-item-action>
                  <v-tooltip right>
                    <template #activator="{ on, attrs }">
                      <v-icon class="list-icon" v-bind="attrs" v-on="on">
                        {{ child.icon }}
                      </v-icon>
                    </template>
                    <span class="py-2">{{ child.title }}</span>
                  </v-tooltip>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="list-text normal-line-break"
                    v-text="child.title"
                  />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <v-list-item
            v-else
            :key="i"
            :to="item.to"
            router
            class="item"
            active-class="item-active"
          >
            <v-list-item-action>
              <v-tooltip right>
                <template #activator="{ on, attrs }">
                  <v-icon size="22" class="list-icon" v-bind="attrs" v-on="on">
                    {{ item.icon }}
                  </v-icon>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                class="list-text normal-line-break"
                v-text="item.title"
              />
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <!-- <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon> -->
      <!-- </v-btn> -->
    </v-app-bar>
    <v-main class="page-background">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Menu",
          to: "/",
        },
        {
          icon: "mdi-cart",
          title: "Cadastros",
          children: [
            {
              icon: "mdi-account-group",
              title: "Pessoas",
              to: "/person",
            },
            {
              icon: "mdi-package-variant",
              title: "Produtos",
              to: "/product",
            },
            {
              icon: "mdi-package-variant",
              title: "Serviços",
              to: "/service",
            },
            {
              icon: "mdi-account-hard-hat-outline",
              title: "Obras",
              to: "/construction",
            },
          ],
        },
        {
          icon: "mdi-cart",
          title: "Vendas",
          to: "/sale",
        },
        {
          icon: "mdi-file-chart",
          title: "Relatórios",
          children: [
            {
              icon: "mdi-file-chart",
              title: "Ranking produtos",
              to: "/report-product-ranking",
            },
            {
              icon: "mdi-file-chart",
              title: "Vendas por período",
              to: "/report-sale-period",
            },
          ],
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "BuildWise",
    };
  },
};
</script>
