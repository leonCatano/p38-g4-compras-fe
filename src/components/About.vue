<template>
  <div class="greetings-2">
    <h1>
      Authors:
    </h1>

  </div>
  <div class="about">
    <h3>Johanna Zuluaga Quiros</h3>
    <br>
    <h3>Leon Andres Cataño</h3>
    <br>
    <h3>Sergio Pinta</h3>
    <br>
    <h3>Diana Mongua</h3>
    <br>
    <h3>Edder Ramos</h3>
    <br>
    <h3>Brayan Beltran</h3>
  </div>
</template>
<script>
export default {
  name: "About",
  data: function () {
    return {

    };
  },
};
</script>
<style>
.greetings-2 {
  margin: 0;
  padding: 0%;
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.about{
    text-align: center;
    font-size: 10px;
}
.greetings h1 {
  font-size: 40px;
  color: #163f6a;
}
.greetings span {
  color: #163f6a;
  font-weight: bold;
}
</style>
