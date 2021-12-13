<template>
    <div class="store">
      <div class="container_store">
        <h2>Store</h2>
        <h7 >Store's name:</h7>
        <input class="in" id="name">
        <h7>Store's detail :</h7>
        <input class="in" id="detail">
        <h7>Store's adress:</h7>
        <input  class="in" id="adress"><br />
        <button class="bu" v-on:click="createStore()">Create</button>
        <button class="bu" v-on:click="updateStore()">Update</button>
        <button class="bu" v-on:click="deleteStore()">Delete</button>
        <button class="bu" v-on:click="clean()">Clean</button>

        <table class="table">
          <tr>
            <th>Store's name</th>
            <th>Store's detail</th>
            <th>Store's adress</th>
            <th>Select</th>

        </tr>
        <tr v-for="storeByUserId in storeByUserId" :key="storeByUserId.name">
          <td>
            {{ storeByUserId.name }}
          </td>
          <td>
            {{ storeByUserId.detail }}
          </td>
          <td>
            {{ storeByUserId.adress }}
          </td>
          <td>
          <button v-on:click="enviar(storeByUserId.name, storeByUserId.detail, storeByUserId.adress)" style="cursor: pointer; font-size: 10px; padding: 5px 8px;  border-radius: 50%;  background: #005aaf; color: white"><strong>_</strong></button>
          </td>
        </tr>
        </table>

      </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "Store",
  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      storeByUserId: [],
    }
  },
  apollo: {
    storeByUserId: {
      query: gql`
      query StoreByUserId($userId: Int!) {
      storeByUserId(userId: $userId) {
        name
        detail
        adress
        idcliente
      }
    }
    `,
    variables() {
      return {
        userId: this.userId,
      };
    },
  },
},
  created: function () {
    this.$apollo.queries.storeByUserId.refetch();
  },
  methods: {

  deleteStore: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation DeleteStore($userId: Int!, $storename: String!) {
                            deleteStore(userId: $userId, storename: $storename)
                          }
                          `,
                          variables: {
                          userId: this.userId,
                          storename: document.getElementById('name').value,
                          }
                      }
                  )
                  .then((result) => {
                      //console.log(result);
                      alert("Tienda eliminada con exito")
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.storeByUserId.refetch();

  },
  createStore: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation CreateStore($userId: Int!, $storeInput: StoreInput) {
                            createStore(userId: $userId, storeInput: $storeInput) {
                            name
                            detail
                            adress
                            idcliente
                          }
                          }
                          `,
                          variables: {
                          userId: this.userId,
                            storeInput: {
                            name: document.getElementById('name').value,
                            detail: document.getElementById('detail').value,
                            adress: document.getElementById('adress').value,
                            idcliente: this.userId,

                            }
                          }
                      }
                  )
                  .then((result) => {
                      alert("Tienda creada con exito")
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.storeByUserId.refetch();

  },
  updateStore: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation UpdateStore($userId: Int!, $storeInput: StoreInput) {
                            updateStore(userId: $userId, storeInput: $storeInput) {
                              name
                              detail
                              adress
                              idcliente
                              }
                            }
                          `,
                          variables: {
                          userId: this.userId,
                            storeInput: {
                            name: document.getElementById('name').value,
                            detail: document.getElementById('detail').value,
                            adress: document.getElementById('adress').value,
                            idcliente: this.userId,

                            }
                          }
                      }
                  )
                  .then((result) => {
                      //console.log(result);
                      alert("Actualizados los datos de la tienda")
                      this.clean();
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.storeByUserId.refetch();

  },

  enviar(name, adress, detail){
    document.getElementById('name').value = name;
    document.getElementById('detail').value = adress;
    document.getElementById('adress').value = detail;

  },
  clean(){
    document.getElementById('name').value = '';
    document.getElementById('detail').value = '';
    document.getElementById('adress').value = '';
  },
  },
};
</script>
<style>
.greetings {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.greetings h1 {
  font-size: 50px;
  color: #163f6a;
}
.greetings span {
  color: #163f6a;
  font-weight: bold;
}
.in{
  margin: 15px;
}

h2 {
  text-align:center;
  margin-top: 20px;
}

.bu {
 background-color: #008CBA;
 margin: 25px;

}

</style>
