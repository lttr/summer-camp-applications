<template>
  <section class="section">
    <div class="columns is-variable is-4 has-text-left">
      <div class="column is-narrow">
        <div class="box">
          <h3 class="title is-6">Pořadatel</h3>
          <address class="info">Junák – český skaut,
            <br>středisko Rybárny, z. s.
            <br>Na Rybárně 1427
            <br>Hradec Králové
          </address>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <h3 class="title is-6">Údaje o táboru</h3>
          <div class="info">
            <span class="info-label">termín</span>
            {{ termin }}
            <br>
            <span class="info-label">místo konání</span> Vranice u Jarošova
            <br>
            <span class="info-label">vedoucí tábora</span> Lukáš Trumm
            <br>
            <span class="info-label">cena tábora</span> 2800,- Kč*
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { config } from "../config.js";

export default {
  name: "CampInfo",
  props: {
    title: String,
    subtitle: String
  },
  data: () => ({
    ...config
  })
};
</script>

<style>
.info {
  font-style: normal;
}
.info-label {
  width: 8em;
  display: inline-block;
  font-style: normal;
  font-weight: 500;
}
</style>
