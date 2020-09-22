<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md" @submit.prevent="login" method="POST"
            >
              <q-input
                filled
                v-model="email"
                label="Email"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn label="Login" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
          login() {
            let self = this;
            axios.post(  this.$apiAdress + '/authentication', {
              strategy: "local",
              email: self.email,
              password: self.password,
            }).then(function (response) {
              self.email = '';
              self.password = '';
              localStorage.setItem("apiToken", response.data.accessToken);
              self.$router.push({ path: '/' });
            })
            .catch(function (error) {
              self.message = 'Incorrect E-mail or password';
              console.log(message);
            });
    
          }
        }
    }
</script>

<style>

  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
