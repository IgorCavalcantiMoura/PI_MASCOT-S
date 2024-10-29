
# Mascot’s Clínica Vet - Sistema de Gestão para Clínica Veterinária

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/maintenance-active-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/platform-NestJS-red?style=for-the-badge&logo=nestjs"/>
  <img src="https://img.shields.io/badge/docs-available-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Project%20Status-Active-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/code%20style-prettier-brightgreen?style=for-the-badge"/>
</p>

Este projeto é um sistema integrado para a clínica veterinária Mascot’s Clínica Vet, com o objetivo de centralizar e organizar as operações diárias, como gerenciamento de consultas, internações, prescrições, exames e controle de estoque. O sistema visa melhorar a eficiência e a comunicação interna da clínica.

## 🚀 Funcionalidades Principais

- **Cadastro de Consultas**: Registro completo de consultas, com descrição do estado do animal, diagnósticos e tratamentos sugeridos.
- **Gerenciamento de Internações**: Controle de internações, com administração de medicamentos e possibilidade de marcar como administrado.
- **Controle de Estoque**: Cadastro e monitoramento de materiais e medicamentos, com alertas para reposição.
- **Anexação de Arquivos**: Upload e acesso a arquivos, como resultados de exames e prescrições.
- **Solicitação e Gerenciamento de Exames**: Acompanhamento do status dos exames e armazenamento dos resultados.

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework back-end para construção do servidor e API.
- **TypeORM**: ORM para comunicação com o banco de dados MySQL.
- **MySQL**: Banco de dados para armazenamento de informações.
- **TypeScript**: Linguagem de programação utilizada no projeto.
- **Swagger**: Documentação da API.
- **Jest**: Testes.

## ⚙️ Instalação
<details>
  <summary>1. Clone o repositório:</summary>
  
   ```bash
   git clone https://github.com/seu-usuario/mascots-clinica-vet.git
   ```
</details>
<details>
  <summary>2. Navegue até o diretório do projeto:</summary>
  
   ```bash
   cd mascots-clinica-vet
   ```
</details>
<details>
<summary>3. Instale as dependências:</summary>
  

   ```bash
   npm install
   ```
</details>
<details>
<summary>4. Configure o banco de dados MySQL no arquivo .env:</summary>

   ```bash
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua-senha
   DB_NAME=db_clinica_vet
   ```
</details>
<details>
  <summary>5. Execute a aplicação:</summary>

   ```bash
   npm run start
   ```
</details>

> [!Note]\
> Ao acessar a API no navegador você terá acesso a uma documentação das rotas construida com o [Swagger](http://localhost:3000)

## 🤝 Contribuição
- Faça um fork do projeto.
- Crie uma branch para a sua feature (git checkout -b feature/nova-feature).
- Faça o commit das suas alterações (git commit -m "feat: adiciona nova feature").
- Faça o push para a branch (git push origin feature/nova-feature).
- Abra um Pull Request.

## 📜 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📧 Contato
<a href="https://www.linkedin.com/in/igor-cavalcanti-moura" target="_blank"><img align ="right" loading="lazy" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
Para mais informações, entre em contato com icavalcantimoura@gmail.com
