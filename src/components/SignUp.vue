<template>

    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Sign up</h2>
                
            <form v-on:submit.prevent="processSignUp" >
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                    
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                    
                <input type="text" v-model="user.name" placeholder="Name">
                <br>
                    
                <input type="email" v-model="user.email" placeholder="Email">
                <br>

                <input type="text" v-model="user.credit_card.card_name" placeholder="Credit Card name">
                <br>

                <input type="number" v-model="user.credit_card.card_number" placeholder="Credit Card number">
                <br>

                <input type="text" v-model="user.credit_card.card_franchise" placeholder="Franchise">
                <br>

                <input type="text" v-model="user.credit_card.bank_name" placeholder="Bank name">
                <br>


                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SignUp",

    data: function(){
        return {
            user: {
                username: "",
                password: "",
                name: "",
                email: "",
                credit_card: {
                    card_name: "",
                    card_number: 0,
                    card_franchise: "",
                    bank_name:""
                }
            }
        }
    },

methods: {
    processSignUp: function(){
        axios.post(
            "https://p37-g4-be-compra-tg.herokuapp.com/user/",
            this.user,
            {headers: {}}
        )
            .then((result) => {
                let dataSignUp = {
                    username: this.user.username,
                    token_access: result.data.access,
                    token_refresh: result.data.refresh,
                }

                this.$emit('completedSignUp', dataSignUp)
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo en el registro.");
            });
        }
    }
}
</script>

<style>
    .signUp_user{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
  
    }

    .container_signUp_user {

        width: 25%;
        height: 60%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .signUp_user h2{
        color: #283747;
    }
    
    .signUp_user form{
        width: 70%;
    }

    .signUp_user input{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
    }

    .signUp_user button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }

    .signUp_user button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>