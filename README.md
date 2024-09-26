# CadPlus | ERP Hospitalar

Esta é uma aplicação React e TypeScript; também utilizei Tailwind CSS, Axios, Formik e Yup.

#### Aqui está o [Back-end](https://github.com/filiperv7/cadPlus_back) desta aplicação.

CadPLus é um gerenciador hospitalar de funcionários e pacientes. Nele você pode:
- criar contas (se for Admin);
- editar contas (se for Admin);
- excluir cotas (se for Admin);
- editar seu próprio perfil; e
- evoluir pacientes (se for Médico(a) ou Enfermeiro(a));

## Regras de negócio
1. Somente o Perfil "Admin" pode dar entrada de um "Paciente".
3. O usuário de Perfil "Admin" pode editar tudo em qualquer usuário, exceto "EstadoSaude".
4. Somente Perfis "Médico(a)" ou "Enfermeiro(a)" podem evoluir um "Paciente".
5. Usuários podem editar tudo em si mesmos (exceto "EstadoSaude").

## Algumas decisões e observações
Decidi usar o Tailwind CSS somente por questão de velocidade na estilização, já que não é necessariamente o foco do projeto, para focar mais na funcionalidade e qualidade do código.
Além disso, também existe um usuário padrão que é criado no banco de dados ao rodar o projeto [Back-end](https://github.com/filiperv7/cadPlus_back), que pode ser editado depois de acessar a aplicação.
Email: admin@default.com, Senha: Adm!n123

## Como rodar a aplicação

##### - Clone o projeto
```bash
git clone https://github.com/filiperv7/cadPlus_front
```

##### - Acesse a pasta do projeto
```bash
cd cadPlus_front
```

##### - Faça a instalação dos pacotes

```bash
npm install
```

##### - Rode a aplicação

```bash
npm run dev
```

##### E pronto! A aplicação já está rodando
Agora é só acessar http://localhost:5173/ e, desde que a aplicação back-end também esteja de pé, você vai conseguir fazer login.
