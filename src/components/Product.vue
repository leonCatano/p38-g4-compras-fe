<template>
    <div class="product">
      <div class="container_product">
        <h2>Product</h2>
        <h7 >Code:</h7>
        <input class="in" id="code">
        <h7>Store:</h7>
        <select v-model="productByUserId.namestoreproduct" class="combo" id="store" >
          <option v-for="storeByUserId in storeByUserId" :value="store">{{storeByUserId.name}}</option>
        </select>
        <h7>Name:</h7>
        <input  class="in" id="name">
        <h7>Price:</h7>
        <input  class="in" id="price"><br />
        <h7>Category:</h7>
        <input  class="in" id="category">
        <div v-bind="ventana" v-if="ventana">
        <label for="creCar" >Select a credit card</label>
          <select v-model="default" class="form-combo" id="creCar" @change="onChange($event)">
            <option disabled value="">Select credit card</option>
            <option v-for="creditCardByUserId in creditCardByUserId" :value="creCar">{{creditCardByUserId.card_name}}</option>
          </select>
        </div>
        <br />
        <button class="bu" v-on:click="createProduct()">Create</button>
        <button class="bu" v-on:click="updateProduct()">Update</button>
        <button class="bu" v-on:click="deleteProduct()">Delete</button>
        <button class="bu" v-on:click="clean()">Clean</button>

        <table class="table">
          <tr>
            <th>Code</th>
            <th>Store</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Select</th>
            <th>Buy</th>
        </tr>
        <tr v-for="productByUserId in productByUserId" :key="productByUserId.Code">
          <td>
            {{ productByUserId.codeproduct }}
          </td>
          <td>
            {{ productByUserId.namestoreproduct }}
          </td>
          <td>
            {{ productByUserId.productname }}
          </td>
          <td>
            {{ productByUserId.precio }}
          </td>
          <td>
            {{ productByUserId.categoria }}
          </td>
          <td>
          <button v-on:click="enviar(productByUserId.codeproduct, productByUserId.namestoreproduct, productByUserId.productname, productByUserId.precio, productByUserId.categoria)" style="cursor: pointer; font-size: 10px; padding: 5px 8px;  border-radius: 50%;  background: #005aaf; color: white"><strong>_</strong></button>
          </td>
          <td>
          <button v-on:click="buy(productByUserId.codeproduct, productByUserId.namestoreproduct, productByUserId.productname, productByUserId.precio, productByUserId.categoria)" style="cursor: pointer; font-size: 10px; padding: 5px 8px;  border-radius: 50%;  background: #07701d; color: white"><strong>+</strong></button>
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
  name: "Product",
  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      productByUserId: [],
      creditCardByUserId: [],
      storeByUserId: [],
      ventana: false,
      default: "",
    }
  },
  apollo: {
    productByUserId: {
      query: gql`
      query ProductByUserId($userId: Int!) {
      productByUserId(userId: $userId) {
        codeproduct
        namestoreproduct
        productname
        precio
        categoria
        userId
      }
    }
    `,
    variables() {
      return {
        userId: this.userId,
      };
    },
  },
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
    this.$apollo.queries.productByUserId.refetch();
  },
  methods: {

  deleteProduct: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation DeleteProduct($userId: Int!, $codeproduct: String!) {
                            deleteProduct(userId: $userId, codeproduct: $codeproduct)
                          }
                          `,
                          variables: {
                          userId: this.userId,
                          codeproduct: document.getElementById('code').value
                          }
                      }
                  )
                  .then((result) => {
                      //console.log(result);
                      alert("Producto eliminado con exito")
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.productByUserId.refetch();

  },
  createProduct: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation CreateProduct($userId: Int!, $productInput: ProductInput) {
                            createProduct(userId: $userId, productInput: $productInput) {
                              codeproduct
                              namestoreproduct
                              productname
                              precio
                              categoria
                              userId
                            }
                          }
                          `,
                          variables: {
                          userId: this.userId,
                              productInput: {
                              codeproduct: document.getElementById('code').value,
                              namestoreproduct: document.getElementById('store').value,
                              productname: document.getElementById('name').value,
                              precio: parseInt(document.getElementById('price').value),
                              categoria: document.getElementById('category').value,
                              userId: this.userId
                              }
                            }
                      }
                  )
                  .then((result) => {
                      alert("Producto creado con exito")
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.productByUserId.refetch();
                  this.clean();

  },
  updateProduct: async function(){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation UpdateProduct($userId: Int!, $productInput: ProductInput) {
                            updateProduct(userId: $userId, productInput: $productInput) {
                              codeproduct
                              namestoreproduct
                              productname
                              precio
                              categoria
                              userId
                            }
                          }
                          `,
                          variables: {
                          userId: this.userId,
                          productInput: {
                            codeproduct: document.getElementById('code').value,
                            namestoreproduct: document.getElementById('store').value,
                            productname: document.getElementById('name').value,
                            precio: parseInt(document.getElementById('price').value),
                            categoria: document.getElementById('category').value,
                            userId: this.userId
                            }
                          }

                      }
                  )
                  .then((result) => {
                      //console.log(result);
                      alert("Actualizados los datos del producto")
                      this.clean();
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.$apollo.queries.storeByUserId.refetch();

  },
  createTransaction: async function(creditCard){
                  await this.$apollo.mutate(
                      {
                          mutation: gql`
                          mutation CreateTransaction($userId: Int!, $transactionInput: TransactionInput) {
                            createTransaction(userId: $userId, transactionInput: $transactionInput)
                          }
                          `,
                          variables: {
                            userId: 1,
                            transactionInput: {
                              transaction_status: "A",
                              transaction_value: parseInt(document.getElementById('price').value),
                              store_name: document.getElementById('store').value,
                              id_credit_card: parseInt(creditCard),
                              transaction_date: this.oDate()
                            }
                          }
                      }
                  )
                  .then((result) => {
                      alert("Compra realizada con exito")
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                  this.clean();
                  this.ventana = false;
                  this.default = "";


  },

  enviar(code, store, name, price, category){
    document.getElementById('code').value = code;
    document.getElementById('store').value = store;
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('category').value = category;
  },
  clean(){
    document.getElementById('code').value = '';
    document.getElementById('store').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
  },
  oDate(){
    var today = new Date();
    return today.toISOString();
  },
  buy(code, store, name, price, category){
    this.enviar(code, store, name, price, category);
    this.ventana = true;

  },
  onChange(event) {
            var tarSel = event.target.value;
            var CredId = 0;
            for (const x in this.creditCardByUserId) {
              if (this.creditCardByUserId[x].card_name == tarSel) {
                CredId = this.creditCardByUserId[x].id;
              }
            }
            this.createTransaction(CredId);
        },
  }
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
  width: 200px;
  height: 40px;
  color: #e5e7e9;
  background: #5078a8;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}

.bu:hover {
  color: #e5e7e9;
  background: rgb(20, 190, 220);
  border: 1px solid #283747;
}
.combo{
  width: 200px;
  margin: 25px;
}
</style>
