<template>
  <div class="welcome">
    <h3>
      ¡<span> {{ username }} </span>! <br />
      Select the transaction you want to update:
    </h3>
  </div>
  <div class="transaction_creation">
    <div class="container_transaction_creation">
      <h2>Transaction edition</h2>

      <form v-on:submit.prevent="processUpdateTransaction(id_transaction)">
        <select type="number" v-model="id_transaction">
          <option v-for="transaction in transaction_list" :value="transaction.id">
            {{ transaction.id}} -{{ transaction.store_name }} - ${{ transaction.transaction_value }} -{{ transaction.credit_card.card_name }} 
            
          </option>
        </select>
        <br />
        <h7>Value to update:</h7>
        <input
          type="number"
          v-model="transaction.transaction_value"
          placeholder="Transaction value"
          
        />
        <br />
        <h7>Select new credit card:</h7>
        <br />
        <select type="number" v-model="transaction.id_credit_card">
          <option v-for="credit_card in credit_card" :value="credit_card.id">
            {{ credit_card.id }} - {{ credit_card.card_name }}
          </option>
        </select>
        <br />
        
        <h7>New Store's name:</h7>
        <input type="text" v-model="transaction.store_name" />

        <br />
        <button type="submit">Update transaction</button>
      </form>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "transactionupdate",
  data: function () {
    return {
      transaction: {
        transaction_date: new Date().toJSON().toString(),
        transaction_status: "E",
        transaction_value: 0,
        store_name: "",
        id_credit_card: 0,
      },
      credit_card: [],
      transaction_list: [],
      username: localStorage.getItem("username") || "none",
    };
  },

  methods: {
    getTransactions: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        console.log("Error al comparar tokens");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();

      axios
        .get(
          `https://p37-g4-be-compra-tg.herokuapp.com/transaction/list/${userId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log("Transacciones listadas");
          this.transaction_list = response.data;
        })
        .catch(() => {
          /*this.$emit("logOut");*/
          console.log("Error en el axios");
        });
    },
    getCreditCards: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        console.log("Error al comparar tokens");
        return;
      }

      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      
      axios
        .get(
          `https://p37-g4-be-compra-tg.herokuapp.com/creditCard/list/${userId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log("Tarjetas listadas");
          this.credit_card = response.data;
        })
        .catch(() => {
          /*this.$emit("logOut");*/
          console.log("Error en el axios");
        });
    },

    processUpdateTransaction: async function (id_transaction) {

      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      console.log(id_transaction);
      console.log(this.transaction);
      console.log(userId)

      axios
        .put(
          `https://p37-g4-be-compra-tg.herokuapp.com/transaction/update/${userId}/`+id_transaction+"/",
          this.transaction,
          {headers: { Authorization: `Bearer ${token}` },}
        )
        .then((result) => {
          alert("Transaction updated");
          this.transaction = result.data;
          this.$router.push({ name: "profile" });
        })
        .catch((error) => {
          /*this.$emit("logOut");*/
          console.log("Error en el axios");
          console.log(token)
        });
    },
    verifyToken: function () {
      return axios
        .post(
          "https://p37-g4-be-compra-tg.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("home");
          console.log("Error en el refresh token");
        });
    },
  },
  created: async function () {
    this.getCreditCards();
    this.getTransactions();
  },
};
</script>

<style>
.transaction_creation {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container_transaction_creation {

  width: 30%;
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.transaction_creation h2 {
  color: #283747;
}

.transaction_creation form {
  width: 70%;
}

.transaction_creation input {
  height: 40px;
  width: 100%;

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;

  border: 1px solid #283747;
}

.transaction_creation button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #173f6a;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
  align-content: center;
}

.transaction_creation button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>