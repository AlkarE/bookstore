<template>
  <v-container class="app-container" justify-centerfluid>
    <v-layout wrap justify-center>
      <BackBtn />
      <v-flex xs12 sm8 v-if="inCart">
        <h4>Вы собираетесь купить:</h4>
        <v-list>
          <template v-for="(book,i) in cart">
            <v-list-tile :key='i' v-if="book.quantity > 0">
              <span>{{book.book.Bookname}}</span>
              <v-spacer></v-spacer>
              <v-icon @click='removeFromCart(book.book.Bookname)' class="cur">remove</v-icon>
              <small v-if="book.quantity > 0">&nbsp;x{{book.quantity}}</small>
              <v-icon @click='addToCart(book.book.Bookname)' class="cur">add</v-icon>
              <v-icon @click='deleteFromCart(book.book.Bookname)' class="cur">delete_forever</v-icon>
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
          value="Cash"/> <label for="Cash">Оплата наличными</label>
        <br>
        <input id='BankCard'
          type="radio"
          v-model="userData.pay"
          value="BankCard"/> <label for="BankCard">Банковская карта</label>
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
    ...mapGetters(['inCart', 'cart', 'uid', 'allPrice'])
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
