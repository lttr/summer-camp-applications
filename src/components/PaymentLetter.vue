<template>
  <section class="content">
    <p>Vážení rodiče,</p>
    <p>
      na základě Vámi podané přihlášky Vám sděluji,
      že přihláška Vašeho syna na skautský tábor konaný
      ve Vranicích u Jarošova – Údolí ozvěny v termínu
      {{ eventStart }} až {{ eventEnd }} {{ year }} je registrována a považujeme je za závaznou.
    </p>
    <p>
      Prosím Vás o úhradu táborového poplatku ve výši
      <strong>{{ application.finalPrice }},- Kč</strong> bankovním převodem.
      Splatnost je do
      <strong>{{ dueDate }}</strong>.
      Číslo účtu je
      <strong>{{ accountNumber }}/{{ bankNumber }}</strong>
      (účet našeho skautského střediska), variabilní symbol
      <strong>{{ application.variableSymbol }}</strong>.
    </p>
    <p>
      Zaplatit můžete i přes Vaší bankovní aplikaci naskenováním tohoto QR kódu:
      <br>
      <img :src="qrcodeUrl">
    </p>
    <p>S pozdravem,</p>
    <p>Lukáš Trumm,</p>
    <p>vedoucí oddílu a tábora 24. skautského oddílu</p>
    <p>tel: 728 089 065</p>
    <p>e-mail: lukas.trumm@centrum.cz</p>
  </section>
</template>

<script>
import { URLSearchParams } from 'url'
export default {
  name: 'PaymentLetter',
  props: {
    application: Object,
  },
  data() {
    return {
      eventStart: '29. 6.',
      eventEnd: '14. 7.',
      year: '2019',
      dueDate: '30. května',
      accountNumber: '2501518851',
      bankNumber: '2010',
    }
  },
  computed: {
    qrcodeUrl() {
      const baseUrl = 'https://api.paylibo.com/paylibo/generator/czech/image'
      const attendeeName = `${this.application.attendee.name} ${this.application.attendee.surname}`
      const message = `Táborový poplatek ${attendeeName}`
      const searchParams = new window.URLSearchParams()
      searchParams.append('accountNumber', this.accountNumber)
      searchParams.append('bankCode', this.bankNumber)
      searchParams.append('amount', this.application.finalPrice)
      searchParams.append('currency', 'CZK')
      searchParams.append('vs', this.application.variableSymbol)
      searchParams.append('message', message)
      searchParams.append('compress', false)
      searchParams.append('branding', false)
      searchParams.append('size', 200)
      return `${baseUrl}?${searchParams.toString()}`
    },
  },
}
</script>
