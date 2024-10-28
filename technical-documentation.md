# Documentación Técnica - Calorie Tracker App

## 1. Visión General de la Arquitectura

### 1.1 Stack Tecnológico Principal

**Frontend Mobile:**
- React Native con Expo
- TypeScript
- React Query para manejo de estado
- React Navigation para navegación

**Backend:**
- AWS CDK para infraestructura como código
- Node.js con TypeScript
- AWS Lambda para funciones serverless
- AWS DynamoDB para base de datos
- AWS API Gateway para APIs REST

### 1.2 Diagrama de Arquitectura

```
Cliente Mobile (React Native + Expo)
            ↓
      API Gateway
            ↓
    Lambda Functions
            ↓
        DynamoDB
```

## 2. Estructura del Proyecto

```
proyecto/
├── src/                    # Frontend React Native
│   ├── components/        # Componentes reusables
│   ├── screens/          # Pantallas de la app
│   ├── services/         # Llamadas a API
│   ├── types/           # Tipos TypeScript
│   └── utils/           # Funciones utilitarias
│
├── backend/
│   ├── src/             # Código del backend   // Aquí va el código de las funciones Lambda
│   │   ├── handlers/    # Funciones Lambda
│   │   ├── services/    # Lógica de negocio
│   │   └── types/      # Tipos compartidos
│   │
│   └── infrastructure/  # Código AWS CDK       // Aquí va todo lo relacionado con CDK
│       ├── bin/        # Punto de entrada CDK
│       └── lib/        # Stacks de CDK
│
├── ios/                  # Configuración nativa iOS
├── android/             # Configuración nativa Android
└── [archivos de configuración]
```

## 3. Justificación Técnica

### 3.1 Elecciones Tecnológicas

**React Native + Expo:**
- Desarrollo multiplataforma (iOS/Android) con un solo código base
- Expo simplifica el desarrollo y despliegue inicial
- Gran ecosistema de librerías y componentes
- Fuerte tipado con TypeScript para prevenir errores

**AWS CDK:**
- Infraestructura como código en TypeScript (mejor que YAML)
- Validación de tipos y autocompletado
- Mejor integración nativa con servicios AWS
- Facilita testing y reutilización de código

**Arquitectura Serverless:**
- Escalabilidad automática
- Pago por uso (más económico para startups)
- Menos mantenimiento de infraestructura
- Free tier generoso de AWS

**DynamoDB:**
- Base NoSQL ideal para aplicaciones móviles
- Escalabilidad automática
- Baja latencia
- Modelo de datos flexible

## 4. Configuración del Entorno

### 4.1 Requisitos Previos

```bash
# Herramientas necesarias
- Node.js (v18+)
- Yarn
- AWS CLI
- Expo CLI
- Xcode (para iOS)
- Android Studio (para Android)
- VS Code (recomendado)

# Instalación global de herramientas
yarn global add expo-cli
yarn global add aws-cdk
```

### 4.2 Configuración del Proyecto

```bash
# Clonar el repositorio
git clone [repo-url]

# Instalar dependencias frontend
yarn install

# Instalar dependencias backend
cd backend
yarn install

# Configurar AWS
aws configure
```

### 4.3 Variables de Entorno

```
# Frontend (.env)
API_URL=https://your-api-url.execute-api.region.amazonaws.com/dev

# Backend (.env)
AWS_REGION=us-east-1
DYNAMODB_TABLE=meals-table
```

## 5. Despliegue

### 5.1 Backend (AWS)

```bash
# Primera vez
cd backend
cdk bootstrap

# Desplegar cambios
cdk deploy
```

### 5.2 Frontend (Expo)

```bash
# Desarrollo
yarn start

# Build para producción
expo build:android
expo build:ios
```

## 6. Mejores Prácticas

### 6.1 Código
- Usar TypeScript estricto
- ESLint + Prettier para formato consistente
- Tests unitarios con Jest
- Commits semánticos

### 6.2 Seguridad
- Nunca commitear .env
- Usar variables de entorno
- Implementar autenticación
- Seguir principio de mínimo privilegio en IAM

## 7. Próximos Pasos

1. Implementar autenticación con Cognito
2. Configurar CI/CD con GitHub Actions
3. Agregar monitoreo y logging
4. Implementar tests E2E
5. Configurar diferentes ambientes (dev/prod)

## 8. Recursos

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [AWS CDK Docs](https://docs.aws.amazon.com/cdk/)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
