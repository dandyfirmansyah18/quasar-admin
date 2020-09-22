<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          List Person
          <q-btn label="Add New" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person" @click="createPersons()" />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          title="Persons"
          :data="data2"
          :columns="columns3"
          row-key="_id"
          :filter="filter"
        >
          <template v-slot:body-cell-Action="props">
            <q-td :props="props">
              <q-btn icon="edit" size="sm" flat dense @click="editPersons( props.key )" />
              <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="deletePersons( props.key )" />
            </q-td>
          </template>
          <template v-slot:top-right>
            <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>

            <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
          </template>


        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
    name: "Tables",
    data() {
        return {
            filter: '',
            show_filter: false,
            columns3: [
                {name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true},
                {name: 'phone_number', align: 'left', label: 'Phone Number', field: 'phone_number', sortable: true},
                {name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center'}
            ],
            data2: [],
        }
    },
    methods: {
      createPersons () {
        this.$router.push({path: 'Persons/create'});
      },
      editLink (id) {
        return `Persons/${id.toString()}/edit`
      },
      deletePersons ( id ) {
        let self = this;
        axios.post(  this.$apiAdress + '/persons/' + id + '?token=' + localStorage.getItem("api_token"), {
          _method: 'DELETE'
        })
        .then(function (response) {
            self.message = 'Successfully deleted persons.';
            alert(message);
            self.getPersons();
        }).catch(function (error) {
          console.log(error);
          self.$router.push({ path: '/login' });
        });
      },
      getPersons (){
        const config = {
          headers: { Authorization: 'Bearer ' + localStorage.getItem("apiToken") }
        };
        const bodyParameters = {};

        let self = this;
        axios.get( this.$apiAdress + '/persons', config )
        .then(function (response) {
          self.data2 = response.data.data;
        }).catch(function (error) {
          self.$router.push({ path: '/Login' });
        });
      },
      editPersons ( id ) {
        const editLink = this.editLink( id );
        console.log(editLink);
        // this.$router.push({path: editLink});
      },
    },
    mounted: function(){
      this.getPersons();

    }
}
</script>

<style>

  .table-bg {
    background-color: #162b4d;
  }
</style>
