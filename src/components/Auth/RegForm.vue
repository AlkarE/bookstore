<template>
  <v-card-text @keyup.enter='submit'>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Name"
        v-model="name"
        :rules="nameRules"
        required
      ></v-text-field>
      <v-text-field
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="pass"
        :rules="passRules"
        required
      ></v-text-field>
      <v-layout>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >Регистрация</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="clear">Очистить</v-btn>
      </v-layout>
    </v-form>
  </v-card-text>
</template>

<script>
export default {
  name: 'RegForm',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length >= 4) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    pass: '',
    passRules: [
      v => (v && v.length >= 4)
    ]
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUp', {
          name: this.name,
          email: this.email,
          pass: this.pass
        })
        this.$emit('close', false)
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
