# spec.config.md

# Cronograma de Desenvolvimento – Backend (BarberXP)

## 1. Objetivo

Este documento define o **cronograma de desenvolvimento do backend** do projeto **BarberXP**, seguindo os princípios de:

* DDD (Domain Driven Design)
* TDD (Test Driven Development)
* Clean Code
* SOLID
* inversão de dependência
* princípio da responsabidade unica
* a estrutura de pastas deve ser o mais simples possivel

Stack tecnológica:

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* PostgreSQL

O desenvolvimento será organizado em **etapas incrementais**, garantindo que cada módulo seja entregue com testes e regras de negócio bem definidas.

---

# 2. Metodologia de Desenvolvimento

O projeto seguirá o ciclo de **TDD**:

```
Red → Green → Refactor
```

### Red

Escrever testes que falham.

### Green

Implementar o código mínimo necessário para passar nos testes.

### Refactor

Melhorar a estrutura do código mantendo os testes funcionando.

Cada funcionalidade deve possuir:

* testes unitários
* testes de integração

---

# 3. Estrutura Inicial do Backend

Primeira etapa do projeto:

```
apps/api
packages/domain
packages/application
packages/infrastructure
packages/shared
```

Configurações iniciais:

* Fastify server
* Prisma ORM
* PostgreSQL
* ESLint
* Prettier
* vitest
* tsup

---

# 4. Cronograma de Desenvolvimento

## Fase 1 – Setup do Projeto

Objetivo: criar a base do projeto.

Atividades:

* use a pasta backend
* configurar TypeScript
* configurar Fastify
* configurar Prisma ORM
* configurar PostgreSQL
* configurar ESLint e Prettier
* configurar vitest
* criar estrutura DDD

Entrega esperada:

* servidor rodando
* conexão com banco funcionando
* ambiente de testes configurado

Tempo estimado:

```
2 dias
```

---

# Fase 2 – Domínio de Clientes

Objetivo: implementar o contexto de clientes.

Funcionalidades:

* cadastro de cliente
* atualização de cliente
* listagem de clientes

Entidades:

```
Client
```

UseCases:

```
CreateClient
UpdateClient
ListClients
```

Testes:

* validação de telefone único
* validação de dados obrigatórios

Tempo estimado:

```
3 dias
```

---

# Fase 3 – Domínio de Barbeiros

Objetivo: gerenciar barbeiros.

Funcionalidades:

* cadastro de barbeiros
* listagem de barbeiros

Entidades:

```
Barber
```

UseCases:

```
CreateBarber
ListBarbers
```

Tempo estimado:

```
2 dias
```

---

# Fase 4 – Sistema de Serviços

Objetivo: definir os serviços oferecidos.

Funcionalidades:

* cadastro de serviços
* listagem de serviços

Tipos de serviço:

```
Corte
Barba
Combo
Combo Master
```

Entidades:

```
Service
```

Tempo estimado:

```
2 dias
```

---

# Fase 5 – Sistema de Agendamento

Objetivo: permitir reservas de horários.

Funcionalidades:

* criar reserva
* cancelar reserva
* listar reservas

Regras de negócio:

* não permitir dois agendamentos no mesmo horário com o mesmo barbeiro

Entidades:

```
Appointment
```

UseCases:

```
CreateAppointment
CancelAppointment
ListAppointments
```

Testes importantes:

* conflito de agenda
* criação de reserva válida

Tempo estimado:

```
4 dias
```

---

# Fase 6 – Sistema de Produtos

Objetivo: gerenciar produtos da barbearia.

Funcionalidades:

* cadastro de produtos
* atualização de estoque
* listagem de produtos

Entidades:

```
Product
```

UseCases:

```
CreateProduct
UpdateProductStock
ListProducts
```

Tempo estimado:

```
3 dias
```

---

# Fase 7 – Vendas de Produtos

Objetivo: registrar vendas de produtos.

Funcionalidades:

* registrar venda
* atualizar estoque automaticamente

Entidades:

```
Sale
```

UseCases:

```
RegisterProductSale
```

Testes:

* impedir venda com estoque insuficiente

Tempo estimado:

```
3 dias
```

---

# Fase 8 – Produto no Combo Master

Objetivo: permitir adicionar produto ao atendimento.

Funcionalidades:

* adicionar produto ao serviço "Combo Master"

Regras:

* somente Combo Master pode adicionar produto
* produto precisa ter estoque

UseCases:

```
AddProductToAppointment
```

Tempo estimado:

```
2 dias
```

---

# Fase 9 – Sistema de Pontos

Objetivo: implementar fidelização.

Funcionalidades:

* adicionar pontos após atendimento
* consultar saldo de pontos

Regras:

```
Corte → 100 pontos
Barba → 80 pontos
Combo → 180 pontos
```

Entidades:

```
Points
```

UseCases:

```
AddClientPoints
GetClientPoints
```

Tempo estimado:

```
3 dias
```

---

# Fase 10 – Sistema de Recompensas

Objetivo: permitir troca de pontos.

Funcionalidades:

* cadastrar recompensas
* trocar pontos por recompensa

Entidades:

```
Reward
```

UseCases:

```
CreateReward
RedeemReward
```

Testes:

* impedir troca sem pontos suficientes

Tempo estimado:

```
3 dias
```

---

# 5. Estimativa Total

Tempo estimado para MVP backend:

```
27 dias de desenvolvimento
```

---

# 6. Entregáveis do Backend

Ao final do cronograma, o backend deve possuir:

* API REST completa
* autenticação básica
* sistema de agendamentos
* gestão de clientes
* gestão de produtos
* sistema de fidelização
* testes automatizados
* arquitetura DDD organizada

---

