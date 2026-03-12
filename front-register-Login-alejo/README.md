# Frontend Register and Login

Este proyecto es una aplicación frontend construida con **Angular** que se compila con **Node.js** y se sirve en producción usando **Nginx** dentro de un contenedor **Docker**.

El Dockerfile utiliza **multi-stage build** para reducir el tamaño final de la imagen.

---

# Requisitos

Antes de ejecutar el proyecto debes tener instalado:

* Docker
* Node.js (opcional si quieres ejecutar localmente)
* Git

Verificar Docker:

```bash
docker --version
```

---

# Paso 1: Clonar el repositorio

```bash
git clone https://github.com/emmanuel007-web/BackendAndFrontendDockerizados.git
```

Entrar al proyecto:

```bash
cd register-and-login-frontend
```

---

# Paso 2: Verificar el Dockerfile

El proyecto contiene el siguiente **Dockerfile**:

```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/register-and-login/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Este Dockerfile realiza dos etapas:

1. **Build**

   * Instala dependencias
   * Compila la aplicación Angular

2. **Producción**

   * Usa Nginx
   * Sirve los archivos estáticos generados en `dist`

---

# Paso 3: Construir la imagen Docker

En la raíz del proyecto ejecutar:

```bash
docker build -t register-login-frontend .
```

Esto hará:

1. Descargar la imagen **node:20-alpine**
2. Instalar dependencias
3. Ejecutar `npm run build`
4. Crear la imagen final con **nginx**

---

# Paso 4: Ejecutar el contenedor

```bash
docker run -p 80:80 register-login-frontend
```

Esto hará que la aplicación quede disponible en:

```
http://localhost
```

---

# Paso 5: Ver contenedores en ejecución

```bash
docker ps
```

---

# Paso 6: Detener el contenedor

Primero obtener el ID:

```bash
docker ps
```

Luego detenerlo:

```bash
docker stop ID_DEL_CONTENEDOR O NOMBRE
```

---

# Paso 7: Eliminar el contenedor (opcional)

```bash
docker rm ID_DEL_CONTENEDOR
```

---

# Arquitectura del contenedor

```
Usuario → Navegador → Nginx (Docker) → Archivos Angular compilados
```

---

# Puerto utilizado

```
80
```

---

# Autor

Emmanuel Tapasco Montoya

