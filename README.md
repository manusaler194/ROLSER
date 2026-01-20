# ROLSER
Repositorio dedicado al proyecto intermodular de ROLSER
## Para fusionar las ramas sin liarla
Trabaja en tu rama y añade cambios

### Asegúrate de estar en tu rama:

git checkout "nombre"-"apellido"


Haz tus cambios y luego:

git add .

git commit -m "Descripción de los cambios"


Puedes hacer todos los commits que quieras aquí.

### 2️⃣ Actualiza main con tu rama

Cuando tus cambios estén listos y quieras pasarlos a main:

Opción recomendada (flujo normal)

git checkout main

git pull origin main

git merge tu-rama


Si hay conflictos, los resuelves y haces el commit del merge.

Luego subes main:

git push origin main

### 3️⃣ (Opcional) Mantener tu rama actualizada

Después del merge, si quieres seguir trabajando en la misma rama:

git checkout tu-rama
git merge main
