# BarberXP – Plano de Especificação do Backend (v2)

## 1. Objetivo

Definir o plano de desenvolvimento do backend do BarberXP de forma pragmática, simples e orientada a TDD/DDD, alinhando estrutura, módulos, regras de negócio e critérios de aceite.

Princípios:
- DDD (Domain-Driven Design) em camadas claras (domain, application, infrastructure, shared)
- TDD (unit + integração) com ciclo Red → Green → Refactor
- Clean Code e SOLID (responsabilidade única e inversão de dependência)
- Estrutura de pastas simples baseada em `src/`

Stack:
- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Vitest

---

## 2. Estrutura do Projeto

```
src
| application
| └── clients
| └── barbers
| └── services
| └── appointments
| └── products
| └── sales
| └── points
| └── rewards
|
| domain
| └── clients
| └── barbers
| └── services
| └── appointments
| └── products
| └── sales
| └── points
| └── rewards
|
| infrastructure
| └── prismaClient.ts
|
| shared
| └── env.ts
|
| server.ts
| main.ts
```

Aliases TypeScript/Vitest:
- `@domain/*` → `src/domain/*`
- `@application/*` → `src/application/*`
- `@infrastructure/*` → `src/infrastructure/*`
- `@shared/*` → `src/shared/*`

Testes:
- Unitários no nível de domínio e casos de uso (Vitest)
- Integração via HTTP (Fastify) e DB (Prisma) quando aplicável

Critérios de Pronto (DoD) por feature:
- Regras de negócio validadas (unit)
- Fluxos principais testados por integração (HTTP)
- Erros mapeados para HTTP (400/404/409)
- Código com tipagem ok (typecheck) e scripts passando

---

## 3. Metodologia (TDD)

```
Red → Green → Refactor
```
- Red: escrever testes que falham (unit + integração).
- Green: implementar o mínimo para passar.
- Refactor: melhorar design, manter verde.

Cada módulo entrega:
- testes unitários
- testes de integração
- endpoints definidos

---

## 4. Cronograma por Fase

### Fase 1 – Setup do Projeto
Objetivo: base do backend em `src/`.
- TypeScript e aliases
- Fastify (server + rota /health)
- Prisma + PostgreSQL
- Vitest
- ESLint + Prettier

Entrega:
- Servidor dev e testes executando
- Conexão com DB validada (best-effort)

### Fase 2 – Domínio de Clientes
Objetivo: contexto de clientes.

Entidade:
- Client (name, phone [único], address?, dateOfBirth?)

UseCases:
- CreateClient
- GetClient
- UpdateClient
- ListClients
- DeleteClient

Regras:
- Nome obrigatório
- Telefone somente dígitos (10–13) e único
- dateOfBirth válida (não futura); address opcional

Endpoints:
- POST /clients
- GET /clients
- GET /clients/:id
- PATCH /clients/:id
- DELETE /clients/:id

Testes chave:
- Telefone único
- Validação de obrigatórios e formatos

### Fase 3 – Domínio de Barbeiros
Objetivo: gerenciar barbeiros.

Entidade:
- Barber (name, phone?, email?, status[active|inactive])

UseCases:
- CreateBarber
- GetBarber
- UpdateBarber
- ListBarbers
- DeleteBarber

Regras:
- Nome obrigatório; status enum
- Telefone/email válidos (se fornecidos)

Endpoints:
- POST /barbers
- GET /barbers
- GET /barbers/:id
- PATCH /barbers/:id
- DELETE /barbers/:id

Testes chave:
- Criação válida
- Atualização de status

### Fase 4 – Serviços
Objetivo: catálogo de serviços.

Entidade:
- Service (name[único], type[enum: Corte|Barba|Combo|Combo Master], price>0, duration>0)

UseCases:
- CreateService
- GetService
- UpdateService
- ListServices
- DeleteService

Endpoints:
- POST /services
- GET /services
- GET /services/:id
- PATCH /services/:id
- DELETE /services/:id

Testes chave:
- Preço/duração válidos
- Nome único

### Fase 5 – Agendamentos
Objetivo: reservas de horários.

Entidade:
- Appointment (barberId, clientId, serviceId, startTime, duration, status[scheduled|canceled|completed])

UseCases:
- CreateAppointment
- CancelAppointment
- ListAppointments
- GetAppointment

Regras:
- Sem conflito de horário para o mesmo barbeiro
- Horário futuro
- barberId/clientId/serviceId existentes

Endpoints:
- POST /appointments
- GET /appointments
- GET /appointments/:id
- PATCH /appointments/:id/cancel

Testes chave:
- Conflito de agenda (não permitir)
- Criação válida

### Fase 6 – Produtos
Objetivo: catálogo com estoque.

Entidade:
- Product (name[único], price>0, stock>=0)

UseCases:
- CreateProduct
- UpdateProductStock
- ListProducts
- GetProduct

Endpoints:
- POST /products
- GET /products
- GET /products/:id
- PATCH /products/:id/stock

Testes chave:
- Estoque não negativo
- Nome único

### Fase 7 – Vendas
Objetivo: registrar vendas de produtos.

Entidades:
- Sale (clientId?, total)
- SaleItem (saleId, productId, quantity, unitPrice)

UseCases:
- RegisterProductSale
- ListSales
- GetSale

Regras:
- Estoque suficiente por item
- Atualiza estoque ao registrar venda

Endpoints:
- POST /sales
- GET /sales
- GET /sales/:id

Testes chave:
- Impedir venda com estoque insuficiente
- Cálculo do total

### Fase 8 – Produto no Combo Master
Objetivo: associar produto a atendimento de tipo Combo Master.

UseCases:
- AddProductToAppointment

Regras:
- Apenas serviços do tipo Combo Master
- Produto com estoque

Endpoints:
- POST /appointments/:id/products

Testes chave:
- Rejeitar serviços não-Combo-Master
- Estoque suficiente

### Fase 9 – Pontos (Fidelização)
Objetivo: conceder e consultar pontos.

Entidades:
- PointsLedger (clientId, delta, source[appointmentId], createdAt)

UseCases:
- AddClientPoints
- GetClientPoints

Regras:
- Tabela: Corte 100, Barba 80, Combo 180
- Apenas após atendimento concluído

Endpoints:
- POST /clients/:id/points/earn
- GET /clients/:id/points

Testes chave:
- Cálculo por serviço
- Acúmulo e saldo

### Fase 10 – Recompensas
Objetivo: catálogo e resgates por pontos.

Entidade:
- Reward (name, cost>0)
- Redemption (clientId, rewardId, cost, createdAt)

UseCases:
- CreateReward
- ListRewards
- RedeemReward

Regras:
- Cliente com saldo suficiente
- Registrar histórico de resgates

Endpoints:
- POST /rewards
- GET /rewards
- POST /clients/:id/rewards/:rewardId/redeem

Testes chave:
- Impedir resgate sem pontos
- Registrar resgate

---

## 5. Regras Transversais

Erros e HTTP:
- 400: validação de entrada
- 404: recurso não encontrado
- 409: conflito (ex.: telefone duplicado, agenda)

Paginação:
- Listagens com `page` e `limit` (padrão configurável)

Observabilidade:
- Logger (pino) no Fastify
- Logs de requisição e erros

DTOs e Mapeamento:
- Camada HTTP isolada do domínio; mapeadores de DTO ↔ entidade

Transações:
- Operações de estoque, vendas e resgates atômicas (transações Prisma)

Autenticação (básica):
- POST /auth/login, POST /auth/refresh, GET /auth/me
- Proteção de rotas por papel (Admin/Atendente)

---

## 6. Entregáveis e Qualidade

Cada fase conclui com:
- Testes unitários e de integração passando
- Typecheck sem erros
- Endpoints documentados e funcionando
- Regras de negócio cobertas

MVP do backend ao final:
- API REST completa
- Gestão de clientes, barbeiros, serviços, agendamentos
- Produtos e vendas com estoque
- Pontos e recompensas
- Autenticação básica
- Testes automatizados
- Arquitetura simples em `src/`

