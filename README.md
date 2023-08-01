# Greenbowl

✨ **Monorepo for greenbowl admin panel** ✨

### Schema
- Schemas are the core part of the application.
- We are using zod to build schemas in libs ```gb-schema```, schemas and types are exposed and deployed on npm.
- Schemas exposed by gb-schema are used to build ```sequelize``` models in express. And types generated from schema are used in angular admin.
- The goal of this approach is to keep single source of truth for data models.

### Tech stack
- Angular 16
- Express js, sequelize
- Zod
- Nx
- Typescript
- mysql
