<template>
    <div class="store">
      <div class="container_store">
        <h2>Credit Card</h2>
        <h7>Id:</h7>
        <input class="in" id="id">
        <h7>Card name</h7>
        <input class="in" id="name">
        <h7>Card number</h7>
        <input class="in" id="number"><br />
        <h7>Card franchise</h7>
        <input class="in" id="franchise">
        <h7>Bank name</h7>
        <input class="in" id="bank_name"><br />

        <button class="bu" v-on:click="createCreditCard()">Create</button>
        <button class="bu" v-on:click="updateCreditCard()">Update</button>
        <button class="bu" v-on:click="deleteCreditCard()">Delete</button>
        <button class="bu" v-on:click="clean()">Clean</button>

        <table class="table">
          <tr>
            <th>id</th>
            <th>card_name</th>
            <th>card_number</th>
            <th>card_franchise</th>
            <th>bank_name</th>
            <th>Select</th>


        </tr>
        <tr v-for="creditCardByUserId in creditCardByUserId" :key="creditCardByUserId.id">
          <td>
            {{ creditCardByUserId.id }}
          </td>
          <td>
            {{ creditCardByUserId.card_name }}
          </td>
          <td>
            {{ creditCardByUserId.card_number }}
          </td>
          <td>
            {{ creditCardByUserId.card_franchise }}
          </td>
          <td>
            {{ creditCardByUserId.bank_name }}
          </td>
          <td>
          <button v-on:click="enviar(creditCardByUserId.id, creditCardByUserId.card_name, creditCardByUserId.card_number, creditCardByUserId.card_franchise, creditCardByUserId.bank_name)" style="cursor: pointer; font-size: 10px; padding: 5px 8px;  border-radius: 50%;  background: #005aaf; color: white"><strong>_</strong></button>
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
  name: "CreditCard",
  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      creditCardByUserId: [],
    }
  },
  apollo: {
    creditCardByUserId: {
      query: gql`
      query CreditCardByUserId($userId: Int!) {
        creditCardByUserId(userId: $userId) {
          id
          card_name
          card_number
          card_franchise
          bank_name
          id_user
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
    this.$apollo.queries.creditCardByUserId.refetch();
  },
  methods: {
  deleteCreditCard: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation DeleteCreditCard($userId: Int!, $creditCardId: Int!) {
                            deleteCreditCard(userId: $userId, creditCardId: $creditCardId)
                          }
                          `,
                          variables: {
                          userId: this.userId,
                          creditCardId: parseInt(document.getElementById('id').value)
                          }
                      }
                  )
                  .then((result) => {
                      //console.log(result);
                      alert("Tarjeta eliminada con exito")
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.creditCardByUserId.refetch();

  },
  createCreditCard: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation CreateCreditCard($creditCardInput: CreditCardInput) {
                            createCreditCard(creditCardInput: $creditCardInput)
                          }
                          `,
                            variables: {
                              creditCardInput: {
                              card_name: document.getElementById('name').value,
                              card_number: parseInt(document.getElementById('number').value),
                              card_franchise: document.getElementById('franchise').value,
                              bank_name: document.getElementById('bank_name').value,
                              id_user: this.userId
                              }
                          }
                      }
                  )
                  .then((result) => {
                      //console.log(result);
                      alert("Tarjeta creada con exito")
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.creditCardByUserId.refetch();

  },
  updateCreditCard: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation UpdateCreditCard($creditCardId: Int!, $creditCardInput: CreditCardInput) {
                            updateCreditCard(creditCardId: $creditCardId, creditCardInput: $creditCardInput) {
                            card_name
                            card_number
                            card_franchise
                            bank_name
                            id_user
                            }
                            }
                          `,
                          variables: {
                          creditCardId: parseInt(document.getElementById('id').value),
                            creditCardInput: {
                              card_name: document.getElementById('name').value,
                              card_number: parseInt(document.getElementById('number').value),
                              card_franchise: document.getElementById('franchise').value,
                              bank_name: document.getElementById('bank_name').value,
                              id_user: this.userId
                          }


                            }

                      }
                  )
                  .then((result) => {
                      alert("Actualizados los datos de la tarjeta")
                      this.clean();
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.creditCardByUserId.refetch();

  },

  enviar(id, name, number, franchise, ban){
    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('number').value = number;
    document.getElementById('franchise').value = franchise;
    document.getElementById('bank_name').value = ban;
  },
  clean(){
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('number').value = '';
    document.getElementById('franchise').value = '';
    document.getElementById('bank_name').value = '';
    },
  }
};

</script><style>
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
</style>
