<template>
  <v-layout row>
    <v-flex xs12 md6 offset-md3>
  <v-card>
       <v-card-media
          class="black--text"
          height="300px"
          src="/static/VoteNow.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Thanks for using Pollster</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
    <v-card-title>
      <div>
        <p>You are invited to vote on any of the polls. If you wish to create your own polls,
          please register an account using the top right menus. You can only edit or delete your own polls.</p>
        <p>This app created using the VENM stack (Vue, Express, Node, Mongo). Although it is responsive 
          for small screens, it is more suited for tablets to desktops.</p>
        <p>Feedback Welcome.</p>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat class="orange--text" :to="{ path: '/polls' }">Go To Polls</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
  </v-layout>
</template>

<script></script>

<style scoped></style>
