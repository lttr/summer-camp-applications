<template>
  <section class="content letter">
    <a target="_blank" :href="mailto">Připravit email</a>
    <hr />
    <h2>Adresáti</h2>
    <p>{{ emails }}</p>
    <hr />
    <h2>Předmět</h2>
    <p>{{ subject }}</p>
    <hr />
    <h2>Dopis</h2>

    <p>Vážení rodiče,</p>
    <p>
      předně bych Vás chtěl poprosit, abyste mi obratem potvrdili, zda počítáte s účastí Vašeho syna
      (Vašich synů) na táboře 24. skautského oddílu.
    </p>
    <p>
      Na základě Vámi podané přihlášky na skautský tábor konaný ve Vranicích u Jarošova – Údolí
      ozvěny v termínu {{ eventStart }} až {{ eventEnd }} {{ year }} Vám zasílám informace k platbě.
    </p>
    <p>
      Prosím Vás o úhradu táborového poplatku ve výši
      <strong>{{ application.finalPrice }},- Kč</strong> bankovním převodem. Splatnost je do
      <strong>{{ dueDate }}</strong
      >. Číslo účtu je
      <strong>{{ accountNumber }}/{{ bankNumber }}</strong>
      (účet našeho skautského střediska), variabilní symbol
      <strong>{{ application.variableSymbol }}</strong
      >.
    </p>
    <p>
      Zaplatit můžete i přes Vaši bankovní aplikaci naskenováním tohoto QR kódu:
      <br />
      <img :src="qrcodeUrl" />
    </p>
    <p>S pozdravem,</p>
    <p>Lukáš Trumm</p>
    <p>
      vedoucí 24. skautského oddílu
      <br />tel: 728 089 065 <br />e-mail: lukas.trumm@centrum.cz
    </p>

    <hr />
  </section>
</template>

<script>
export default {
  name: 'PaymentLetter',
  props: {
    application: Object,
  },
  data() {
    return {
      eventStart: '4. 7.',
      eventEnd: '19. 7.',
      year: '2020',
      dueDate: '15. června',
      accountNumber: '2501518851',
      bankNumber: '2010',
      subject: 'skaut - informace k platbě táborového poplatku',
    }
  },
  computed: {
    qrcodeUrl() {
      const baseUrl = 'https://api.paylibo.com/paylibo/generator/czech/image'
      const attendeeName = `${this.application.attendee.name} ${this.application.attendee.surname}`
      const message = `Táborový poplatek ${attendeeName}`
      const searchParams = new URLSearchParams()
      searchParams.append('accountNumber', this.accountNumber)
      searchParams.append('bankCode', this.bankNumber)
      searchParams.append('amount', this.application.finalPrice)
      searchParams.append('currency', 'CZK')
      searchParams.append('vs', this.application.variableSymbol)
      searchParams.append('message', message)
      searchParams.append('compress', false)
      searchParams.append('branding', false)
      searchParams.append('size', 230)
      return `${baseUrl}?${searchParams.toString()}`
    },
    emails() {
      const mother = this.application.attendee.motherEmail
      const father = this.application.attendee.fatherEmail
      return [mother, father].filter(x => x).join(', ')
    },
    mailto() {
      return `mailto:${this.emails}?subject=${this.subject}`
    },
  },
}
</script>

<style scoped>
.letter p {
  font: Arial, Helvetica, sans-serif;
  font-size: medium;
  line-height: 1.5;
}
</style>
