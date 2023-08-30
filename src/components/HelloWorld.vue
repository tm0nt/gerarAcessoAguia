<template>
  <v-container fill-height fluid class="black-background">
    <v-row align="center" justify="center">
      <!-- Buttons to generate codes -->
      <v-btn @click="gerarCurto" block color="white" light>Código curto</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="gerarCodigo" block color="white" light
        >Código mensal</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn @click="gerarInfinito" block color="white" light
        >Código infinito</v-btn
      >
    </v-row>
    <v-row align="center" justify="center">
      <v-card
        v-for="(codigo, index) in codigosFiltrados"
        :key="index"
        class="my-card mt-2"
      >
        <v-card-text
          :class="{ 'expired-card': isExpirado(codigo.dataExpiracao) }"
        >
          Código de acesso: {{ codigo.codigoGerado }} <br />Criado em:
          {{ codigo.dataCriacao }} <br />Expira em: {{ codigo.dataExpiracao }}
        </v-card-text>
        <v-btn icon @click="removerCodigo(index)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
    </v-row>
    <v-row align="center" justify="center">
      <v-card class="my-card" min-width="400">
        <h2 class="mt-2 text-center">Últimos códigos</h2>
        <v-card-text>
          <v-list>
            <v-list-item
              class="mt-n2"
              v-for="(codigo, index) in codigos.slice(0, maxCodigos)"
              :key="index"
            >
              {{ codigo.codigoGerado }}, criado em: {{ codigo.dataCriacao }},
              expira em: {{ codigo.dataExpiracao }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      codigos: [],
      maxCodigos: 5,
      duracaoCurto: 300000,
      duracaoMensal: 2592000000, // 30 days in milliseconds
      apiUrlCurto: "https://noticiasnews.top/gerar-codigo-curto",
      apiUrlMensal: "https://noticiasnews.top/gerar-codigo",
      apiUrlInfinito: "https://noticiasnews.top/gerar-codigo-infinito",
    };
  },
  computed: {
    codigosFiltrados() {
      return this.codigos.filter((codigo) => !codigo.fechado);
    },
  },
  created() {
    this.carregarCodigos();
  },
  methods: {
    removerCodigo(index) {
      this.codigos[index].fechado = true;
    },
    async gerarCurto() {
      try {
        const response = await axios.post(this.apiUrlCurto);
        const codigo = response.data.code;

        const dataCriacao = new Date().toLocaleDateString();
        const dataExpiracao = new Date(
          Date.now() + this.duracaoCurto
        ).toLocaleString();

        this.adicionarCodigo(codigo, dataCriacao, dataExpiracao);
      } catch (error) {
        console.error("Erro ao gerar o código curto:", error);
      }
    },

    async gerarCodigo() {
      try {
        const response = await axios.post(this.apiUrlMensal);
        const codigo = response.data.code;

        const dataCriacao = new Date().toLocaleDateString();
        const dataExpiracao = new Date(
          Date.now() + this.duracaoMensal
        ).toLocaleString();

        this.adicionarCodigo(codigo, dataCriacao, dataExpiracao);
      } catch (error) {
        console.error("Erro ao gerar o código mensal:", error);
      }
    },

    async gerarInfinito() {
      try {
        const response = await axios.post(this.apiUrlInfinito);
        const codigo = response.data.code;

        const dataCriacao = new Date().toLocaleDateString();
        const dataExpiracao = "Nunca expira";

        this.adicionarCodigo(codigo, dataCriacao, dataExpiracao);
      } catch (error) {
        console.error("Erro ao gerar o código infinito:", error);
      }
    },

    adicionarCodigo(codigoGerado, dataCriacao, dataExpiracao) {
      this.codigos.unshift({
        codigoGerado,
        dataCriacao,
        dataExpiracao,
        fechado: false, // Set as not closed initially
      });

      if (this.codigos.length > this.maxCodigos) {
        this.codigos.pop();
      }
    },

    carregarCodigos() {
      // Implement the logic to load previously generated codes
    },

    isExpirado(dataExpiracao) {
      if (dataExpiracao === "Nunca expira") {
        return false;
      }
      const dataExpiracaoTimestamp = new Date(dataExpiracao).getTime();
      const hojeTimestamp = new Date().getTime();
      return hojeTimestamp > dataExpiracaoTimestamp;
    },
  },
};
</script>

<style>
.expired-card {
  background-color: #ffdddd;
}

.black-background {
  background-color: #000000 !important;
}
</style>
