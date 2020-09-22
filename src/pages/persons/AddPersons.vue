<template>
  <q-page class="q-pa-sm bg-white">
    <div class="text-h6 text-grey-8">
      Add Person
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-12">
              <q-item>
                <q-input dense outlined class="full-width" v-model="persons.name" label="Name *"/>
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-input dense outlined class="full-width" v-model="persons.phone_number" label="Phone Number *"/>
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-btn label="Save" class="float-right text-capitalize text-indigo-8 shadow-3" icon="check" @click="store()" /> &nbsp;
                <q-btn label="Back" class="float-right text-capitalize text-indigo-8 shadow-3" icon="arrow" @click="goBack()" />
              </q-item>
            </div>
          </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import axios from 'axios'
    export default {
        name: "AddPersons",
        data() {
            return {
                persons: []
            }
        },
        methods: {
          goBack() {
            this.$router.go(-1)
          },
          store() {
              const config = {
                headers: { Authorization: 'Bearer ' + localStorage.getItem("apiToken") }
              };
              let self = this;
              axios.post(  this.$apiAdress + '/persons',
                config,
                self.persons
              )
              .then(function (response) {
                  self.persons = {
                    name: '',
                    phone_number: '',
                  };
                  self.message = 'Successfully created sanitasi.';
              }).catch(function (error) {
                  console.log(error);
                  if(error.response.data.message == 'The given data was invalid.'){
                    self.message = '';
                    for (let key in error.response.data.errors) {
                      if (error.response.data.errors.hasOwnProperty(key)) {
                        self.message += error.response.data.errors[key][0] + '  ';
                      }
                    }
                    alert('error');
                  }else{
                    self.$router.push({ path: 'login' }); 
                  }
              });
          },
        },
        mounted: function(){
          
        }
    }
</script>

<style scoped>

</style>
