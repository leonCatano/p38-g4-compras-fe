<template>
  <div class="greetings-2">
    <h1>
      Authors:
    </h1>

  </div>
  <div class="about">
    <h2>Johanna Zuluaga Quiros</h2>
    <br>
    <h2>Leon Andres Cataño</h2>
    <br>
    <h2>Sergio Pinta</h2>
    <br>
    <h2>Diana Mongua</h2>
    <br>
    <h2>Edder Ramos</h2>
    <br>
    <h2>Brayan Beltran</h2>
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
