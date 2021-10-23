<template>
  <div>
    <h1>
      ¡Welcome <span> {{ username }} </span>! These are your credit cards
    </h1>
  </div>
  <div>
    <h1>CREDIT CARDS</h1>
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Number</th>
          <th>Franchise</th>
          <th>Bank's Name</th>
        </tr>
        <tr v-for="credit_card in credit_card" >
          <td>
            {{ credit_card.id }}
          </td>
          <td>
            {{ credit_card.card_name }}
          </td>
          <td>
            {{ credit_card.card_number }}
          </td>
          <td>
            {{ credit_card.card_franchise }}
          </td>
          <td>
            {{ credit_card.bank_name }}
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div>
    <h1>Transactions</h1>
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Value</th>
          <th>Store name</th>
          <th>Credit card</th>
          <th>Action</th>
        </tr>
        <tr v-for="transaction in transaction" :key="transaction.id">
          <td>
            {{ transaction.id }}
          </td>
          <td>
            {{ transaction.transaction_date }}
          </td>
          <td>
            <span v-if="transaction.transaction_status == 'A'">Aprobada</span>
            <span v-if="transaction.transaction_status == 'D'">Denegada</span>
            <span v-if="transaction.transaction_status == 'R'">Reversado</span>
            <span v-if="transaction.transaction_status == 'E'">En proceso</span>
          </td>
          <td>
            {{ transaction.transaction_value }}
          </td>
          <td>
            {{ transaction.store_name }}
          </td>
          <td>
           {{ transaction.credit_card.card_name }}
            
          </td>
          <td>
            <button v-on:click="deleteTransaction(transaction.id)">X</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "Profile",

  data: function () {
    return {
      credit_card: [],
      username: localStorage.getItem("username") || "none",
      transaction: [],
    };
  },
  methods: {
    getData: async function () {
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
      axios
        .get(
          `https://p37-g4-be-compra-tg.herokuapp.com/transaction/list/${userId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log("Transacciones listadas");
          this.transaction = response.data;
        })
        .catch(() => {
          /*this.$emit("logOut");*/
          console.log("Error en el axios");
        });
    },
    deleteTransaction: async function (id_transaction) {
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
          `https://p37-g4-be-compra-tg.herokuapp.com/transaction/remove/${userId}/` +
            id_transaction +
            "/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          this.getData();
          alert("Transacción eliminada correctamente.");
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: No se pudo borrar.");
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
    this.getData();
  },
};
</script>

<style>
.information {
  margin: 0;
  padding: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.information h1 {
  font-size: 60px;
  color: #0f1316;
}
.information h2 {
  font-size: 40px;
  color: #283747;
}
.information span {
  color: crimson;
  font-weight: bold;
}
</style>