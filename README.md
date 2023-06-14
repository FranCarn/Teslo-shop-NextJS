# Next.js Teslo Shop App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

MongoDB URL Local:

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

```
mongodb://localhost:27017/teslodb
```

## Instalar las dependencias y levantar proyecto

```
npm i
npm run dev
```

## Llenar la base de datos con informacion de prueba

Llamar:

```
http://localhost:3000/api/seed
```
