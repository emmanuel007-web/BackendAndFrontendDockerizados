# Backend Register and Login - Spring Boot

Este proyecto es un **backend desarrollado con Spring Boot** para gestionar el **registro e inicio de sesión de usuarios**.

La aplicación se compila utilizando **Maven** y se ejecuta dentro de un contenedor **Docker** utilizando una estrategia **multi-stage build**, lo que permite generar imágenes más pequeñas y seguras.

---

# Tecnologías utilizadas

* Java 21
* Spring Boot
* Maven
* Docker

---

# Requisitos

Antes de ejecutar el proyecto debes tener instalado:

* Docker
* Git
* (Opcional) Java 21 y Maven si deseas ejecutarlo sin Docker

Verificar Docker:

```bash
docker --version
```

---

# Paso 1: Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/register-login-backend.git
```

Entrar a la carpeta del proyecto:

```bash
cd register-login-backend
```

---

# Paso 2: Verificar el Dockerfile

El proyecto contiene el siguiente **Dockerfile**:

```dockerfile
# ---- BUILD STAGE ----
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copiar pom.xml primero (cache de dependencias)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar código fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests -B

# ---- RUN STAGE ----
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Usuario no-root por seguridad
RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# Copiar JAR desde el builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Este Dockerfile utiliza **dos etapas**:

1. **Builder**

   * Usa Maven y Java 21.
   * Descarga dependencias.
   * Compila el proyecto.
   * Genera el archivo `.jar`.

2. **Runtime**

   * Usa una imagen ligera con **Java 21 JRE**.
   * Copia el `.jar` generado.
   * Ejecuta la aplicación Spring Boot.

---

# Paso 3: Construir la imagen Docker

Desde la raíz del proyecto ejecutar:

```bash
docker build -t register-login-backend .
```

Este proceso:

1. Descarga la imagen de **Maven**
2. Compila el proyecto
3. Genera el archivo `.jar`
4. Crea una imagen ligera con **Java JRE**

---

# Paso 4: Ejecutar el contenedor

```bash
docker run -p 8080:8080 register-login-backend
```

La aplicación quedará disponible en:

```
http://localhost:8080
```

---

# Paso 5: Ver contenedores en ejecución

```bash
docker ps
```

---

# Paso 6: Detener el contenedor

Primero obtener el ID del contenedor:

```bash
docker ps
```

Luego detenerlo:

```bash
docker stop ID_DEL_CONTENEDOR
```

---

# Paso 7: Eliminar el contenedor (opcional)

```bash
docker rm ID_DEL_CONTENEDOR
```

---

# Estructura del proyecto

```
.
├── src
│   └── main
│       └── java
├── pom.xml
├── Dockerfile
└── README.md
```

---

# Puerto utilizado

La aplicación Spring Boot se ejecuta en el puerto:

```
8080
```

---

# Arquitectura

```
Cliente → API REST → Spring Boot → Base de datos
```

---

# Autor

**Emmanuel Tapasco Montoya**
