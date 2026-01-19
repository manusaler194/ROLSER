# ROLSER
Repositorio dedicado al proyecto intermodular de ROLSER
## Para fusionar las ramas sin liarla
### PASO 1️⃣ Comprueba si main tiene cambios nuevos
git checkout main
git pull origin main
### PASO 2️⃣ Lleva main a tu rama (ruben-sanchez)
git checkout ruben-sanchez
git merge main
### PASO 3️⃣ Fusiona tu rama en main
git checkout main
git merge ruben-sanchez
### PASO 4️⃣ Sube main actualizado
git push origin main
