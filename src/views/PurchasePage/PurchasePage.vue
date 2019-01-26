<template>
  <v-container class="app-container" justify-center fluid>
    <v-layout wrap justify-center>
      <BackBtn />
      <v-flex xs12 sm8 v-if="inCart">
        <h4>Вы собираетесь купить:</h4>
        <v-list>
          <template v-for="(book,i) in cart">
            <v-list-tile :key='i' v-if="book.quantity > 0">
              <span>{{book.book.Bookname}}</span>
              <v-spacer></v-spacer>
              <span @click='removeFromCart(book.book.Bookname)' class="cur icon-align">
                <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13H5v-2h14v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="remove" title='Удалить 1 шт'>
                <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13H5v-2h14v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="remove" title='Удалить 1 шт'>
              </span>
              <small v-if="book.quantity > 0">&nbsp;x{{book.quantity}}</small>
              <span @click='addToCart(book.book.Bookname)' class="cur icon-align">
                <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="add" title='Добавить еще'>
                <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="add" title='Добавить еще'>
              </span>
              <span @click='deleteFromCart(book.book.Bookname)' class="cur icon-align">
                <img v-if='themeMode === "theme--dark"' src="data:image/svg+xml,%3Csvg fill='%23FFFFFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="delete" title="Убрать из корзины">
                <img v-else src="data:image/svg+xml,%3Csvg fill='%23000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E" alt="delete" title="Убрать из корзины">
              </span>
              <span>{{book.book.price}} руб.</span>
            </v-list-tile>
          </template>
          <v-layout justify-center>
            <span>Выбрано книг на сумму {{allPrice}} руб.</span>
          </v-layout>
        </v-list>

        <br/>
        <section class="contacts">
          <h4>Контакты:</h4>
          <v-form v-model="contactValid" ref="contatcsForm" lazy-validation>
            <span>Ваше имя:</span>
            <v-text-field
              label="Имя"
              v-model="userData.name"
              :rules="nameRules"
              required
            ></v-text-field>

            <span>Email:</span>
            <v-text-field
              label="Email"
              v-model="userData.email"
              :rules="emailRules"
              required
            ></v-text-field>

            <span>Телефон:</span>
            <v-text-field
              label="Phone"
              v-model.lazy="userData.phone"
              :rules="phoneRules"
              required
              maxlength='12'
              :mask="'+7-###-###-##-##'"
            ></v-text-field>
          </v-form>

          <h4>Куда доставить?</h4>
          <v-form v-model="deliveryValid" ref="deliveryForm" lazy-validation>
            <span>Город</span>
            <v-text-field
              placeholder="Город"
              v-model.lazy="userData.address.city"
              :rules="cityRules"
              required
            ></v-text-field>

            <span>Улица</span>
            <v-text-field
              placeholder="Улица"
              v-model.lazy="userData.address.str"
              :rules="strRules"
              required
            ></v-text-field>

            <span>Дом:</span>
            <v-text-field
              label="Например 12 или 12-а"
              v-model.lazy="userData.address.building"
              :rules="[b => /^\d+(-[аА])?/.test(b) || 'Неверно написан номер дома']"
              required
            ></v-text-field>

            <span>Квартира</span>
            <v-text-field
              placeholder="Квартира"
              v-model.lazy.number="userData.address.flat"
              :rules="[f => /^\d+/.test(f) || 'Неверно написан номер квартиры']"
              required
              maxlength='4'
            ></v-text-field>

            <span>Корпус</span>
            <v-text-field
              placeholder="Корпус"
              label="Если есть"
              v-model.lazy="userData.address.block"
              :rules="[f => /^\d+/.test(f) || 'Неверно написан корпус дома']"
              maxlength='2'
            ></v-text-field>
          </v-form>
        </section>
      <!-- end contacts  -->
      <br/>

      <h4>Способ оплаты:</h4>
      <section class="paymethod">
        <input id='Cash'
          type="radio"
          v-model="userData.pay"
          value="Cash"
        /><label for="Cash">Оплата наличными</label>
        <br>
        <input id='BankCard'
          type="radio"
          v-model="userData.pay"
          value="BankCard"
        /><label for="BankCard">Банковская карта</label>
      </section>
      <v-btn @click='buy'>Заказать</v-btn>
      <br/>
      <p>Мы Вам перезвоним в течение 10 минут и уточним детали заказа. Спасибо, что пользуйтесь нашим сервисом (:</p>
      </v-flex>

      <section xs3 v-else>
        <p>Нечего заказывать (:</p>
        <span>Пожалуй, стоит сначала <router-link to='/'>выбрать</router-link>, что купить</span>
      </section>
    </v-layout>
  </v-container>
</template>

<script>
import BackBtn from '@/components/BackBtn'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PurchasePage',
  components: {
    BackBtn
  },
  data: () => ({
    contactValid: true,
    deliveryValid: true,
    userData: {
      pay: '',
      name: undefined,
      email: undefined,
      phone: '+7',
      address: {
        city: undefined,
        str: undefined,
        building: undefined,
        flat: undefined,
        block: ''
      }
    },
    nameRules: [
      n => !!n || 'Name is required',
      n => /^([а-яА-ЯЁё]{3,10})/.test(n) || 'Name is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    phoneRules: [
      p => !!p || 'Phone is required'
    ],
    cityRules: [
      c => /^([Ёёа-яА-Я-\s]{2,29})/.test(c) || 'Неверно написан город'
    ],
    strRules: [
      s => /^([Ёёа-яА-Я-\s.]{2,29})/.test(s) || 'Укажите правильно улицу'
    ]
  }),
  computed: {
    ...mapGetters(['inCart', 'cart', 'uid', 'allPrice', 'themeMode'])
  },
  methods: {
    buy () {
      if (this.$refs.deliveryValid.validate() && this.$refs.contatcsForm.validate()) {
        return alert('Это всего лишь демо-версия (: ')
      }
      let st
      for (let key in this.userData) {
        if (this.userData[key] === undefined || this.userData[key] === '' || this.userData[key] === null) {
          st = false
          return alert('Все поля обязательны к заполнению')
        }
      }

      for (let v in this.userData.address) {
        if (this.userData.address[v] === undefined || this.userData.address[v] === '') {
          st = false
          return alert('Все поля обязательны к заполнению')
        }
      }

      if (this.userData.phone.length !== 12) {
        return alert('Все поля обязательны к заполнению')
      }

      if (st !== false) {
        alert('Это всего лишь демо-версия (: ')
      }
    },
    ...mapMutations(['removeFromCart', 'addToCart', 'deleteFromCart'])
  }
}
</script>
