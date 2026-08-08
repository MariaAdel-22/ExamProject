# Refugio de exámenes — Angular 21

Esta versión está preparada específicamente para **Angular 21.2.19** y para funcionar con **Node.js 22.17.0**.

## 1. Comprueba Node y npm

```powershell
node -v
npm -v
```

Node 22.17.0 es compatible con Angular 21 (Angular 21 requiere Node ^22.12.0 dentro de la rama 22).

## 2. No necesitas Angular CLI global para arrancar el proyecto

La forma más segura es usar la CLI local del proyecto mediante npm:

```powershell
cd C:\Users\maria\Documents\ExamProject\frontend
npm install
npm start
```

`npm start` ejecuta la versión local de Angular CLI incluida en `package.json` y evita conflictos si tienes otra versión instalada globalmente.

Después abre:

http://localhost:4200

## 3. Si quieres instalar Angular CLI 21 globalmente

Opcional:

```powershell
npm uninstall -g @angular/cli
npm install -g @angular/cli@21
ng version
```

Después puedes usar:

```powershell
ng serve --open
```

## 4. Si vienes de una instalación anterior de Angular 22

Antes de ejecutar el proyecto nuevo, elimina dependencias antiguas si copiaste archivos encima de la carpeta existente:

```powershell
cd C:\Users\maria\Documents\ExamProject\frontend
rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm install
npm start
```

En PowerShell, si `rmdir /s /q` no funciona, usa:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm start
```

## 5. Estructura

- `frontend/`: Angular 21.
- `backend/`: base preparada para FastAPI.
- `backend/data/db.json`: almacenamiento JSON sencillo para funcionalidades futuras.

Por ahora la portada funciona sin arrancar el backend.

## Panda tamagotchi interactivo

La portada incluye ahora dos vídeos WebM con transparencia real en `frontend/public/videos/`:

- `panda-idle.webm`: se reproduce automáticamente en bucle.
- `panda-saludo.webm`: se reproduce una vez al tocar/clicar el panda.

Al tocar el panda aparece el mensaje **«¿Cómo vas mi pichoncita?»**. Cuando termina el saludo, la portada vuelve automáticamente al vídeo idle.
