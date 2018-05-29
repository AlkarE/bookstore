<template>
  <v-layout column class='mt-3'>
    <v-layout>
      <v-flex xs4>
          <v-subheader class="pt-2">Сменить пароль:</v-subheader>
        </v-flex>
      <v-flex xs8>
        <v-text-field
          label="Password"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs4>
        <v-subheader class="pt-2">Сменить аватар:</v-subheader>
      </v-flex>
      <v-flex xs8 class="mt-3">
        <input type="file" id="fileinput" accept="image/*" title='Сменить аватар' />
      </v-flex>
    </v-layout>
    <br>
    <v-btn>Cохранить изменения</v-btn>
  </v-layout>
</template>

<script>
export default {}
</script>
