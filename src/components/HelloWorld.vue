<template>
  <v-container fill-height fluid class="black-background">
    <v-layout align-center justify-center class="flex-column">
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-img src="../assets/logo.png"></v-img>
        </v-col>
      </v-row>
      <v-btn @click="gerarCodigo" color="white" light>Gerar Código</v-btn>
      <v-card v-for="(codigo, index) in codigos" :key="index" class="my-card">
        <v-card-text
          :class="{ 'expired-card': isExpirado(codigo.dataExpiracao) }"
        >
          Código de acesso: {{ codigo.codigoGerado }} <br />Criado em:
          {{ codigo.dataCriacao }} <br />Expira em: {{ codigo.dataExpiracao }}
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      codigoGerado: null,
      dataCriacao: null,
      dataExpiracao: null,
      codigos: [],
      ativo: true,
      maxCodigos: 5, // Limite de códigos armazenados
      duracaoBalao: 20000, // Tempo de duração do balão em milissegundos (20 segundos)
    };
  },
  created() {
    // Carregar os códigos do Firebase na inicialização do componente
    this.carregarCodigos();
  },
  methods: {
    gerarCodigo() {
      // Gerar código de 6 dígitos
      const codigo = Math.floor(100000 + Math.random() * 900000).toString();

      // Definir a data de criação
      const dataCriacao = new Date().toLocaleDateString();

      // Calcular a data de expiração (20 segundos após a criação)
      const dataExpiracao = new Date(
        Date.now() + this.duracaoBalao
      ).toLocaleString();

      // Atualizar o estado do componente para exibir o código gerado
      this.codigoGerado = codigo;
      this.dataCriacao = dataCriacao;
      this.dataExpiracao = dataExpiracao;

      // Adicionar o código gerado ao array de códigos
      this.codigos.unshift({
        codigoGerado: this.codigoGerado,
        dataCriacao: this.dataCriacao,
        dataExpiracao: this.dataExpiracao,
      });

      // Limitar a quantidade de códigos armazenados ao valor máximo definido
      if (this.codigos.length > this.maxCodigos) {
        this.codigos.pop();
      }

      // Limpar o código gerado após o intervalo de tempo definido (20 segundos)
      setTimeout(() => {
        this.removerCodigo(codigo);
      }, this.duracaoBalao);
    },
    carregarCodigos() {
      // Simulação do carregamento de códigos do Firebase
      // Aqui você pode realizar a lógica para carregar os códigos armazenados previamente no banco de dados
    },
    isExpirado(dataExpiracao) {
      const dataExpiracaoTimestamp = new Date(dataExpiracao).getTime();
      const hojeTimestamp = new Date().getTime();
      return hojeTimestamp > dataExpiracaoTimestamp;
    },
    removerCodigo(codigo) {
      // Remove o código da lista quando o tempo de duração expira
      this.codigos = this.codigos.filter(
        (item) => item.codigoGerado !== codigo
      );
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
