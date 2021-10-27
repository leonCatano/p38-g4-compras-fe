<template>
  <div class="greetings-2">
    <h1>
      Authors:
    </h1>

  </div>
  <div class="about">
      <h2>Johanna Zuluaga Quiros</h2>
    <br>
    <h2>Sebastian Castilla Matallana</h2>
    <br>
    <h2>Cristian Danilo gonzalez Pedraza</h2>
    <br>
    <h2>Miller Alexander Moreno</h2>
        <br>
            <h2>Carlos Hernan Cuesta Niño</h2>
    <br>
    <h2>Duban Castiblanco</h2>
    
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