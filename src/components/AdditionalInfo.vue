<template>
  <section class="content">
    <ul>
      <li>
        Tábor je veden v duchu výchovných snah Junáka – českého skauta a všichni táborníci se řídí
        Táborovým řádem a skautskými zvyklostmi.
      </li>
      <li>
        Táborové finanční hospodaření je rozpočtováno pouze na základě
        táborových poplatků a je vyrovnané, příjmy odpovídají skutečným výdajům.
      </li>
      <li>Táborový poplatek pro letošní rok je {{ price }},- Kč.</li>
      <li>
        Zavazuji se, že při odjezdu na tábor odevzdám potvrzení o&nbsp;bezinfekčnosti
        a posudek o zdravotní způsobilosti dítěte.
      </li>
      <li>
        Souhlasím s evidencí osobních údajů dítěte pro vnitřní potřebu organizace
        Junák – český skaut, z. s. a pro potřeby zabezpečení letního tábora.
      </li>
      <li>
        Beru na vědomí, že fotografie pořízené na tomto táboře mohou být
        zveřejněny v rámci propagačních a informativních akcí provozovatele
        tábora.
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "AdditionalInfo",
  props: {},
  data: () => ({
    price: 20
  })
};
</script>
