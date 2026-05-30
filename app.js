let examQuestions = [];
let examAnswers = {};
let examMode = false;
let score = 0;
let currentExamMode = false;
let currentExamQuestions = [];
let currentExamIndex = 0;
let currentExamRevealed = false;
let currentExamAnswers = {};
let timer;
let timeLeft = 7200;
let questions = [
  {
    "question": "Cada empleado de su empresa tiene una cuenta de Google. Su equipo operativo necesita administrar una gran cantidad de instancias en Compute Engine. Cada miembro de este equipo solo necesita permisos administrativos de acceso a los servidores. Su equipo de seguridad quiere garantizar que la implementación de credenciales sea operativamente eficiente y debe poder determinar quién accedió a una instancia determinada. ¿Qué debe hacer?",
    "options": [
      "Genera un nuevo par de claves SSH. Entrega la clave privada a cada miembro de tu equipo. Configura la clave pública en los metadatos de cada instancia.",
      "Pida a cada miembro del equipo que genere un nuevo par de claves SSH y que le envíe su clave pública. Utilice una herramienta de gestión de configuración para implementar esas claves en cada instancia.",
      "Pida a cada miembro del equipo que genere un nuevo par de claves SSH y que añada la clave pública a su cuenta de Google. Asigne el rol «compute.osAdminLogin» al grupo de Google correspondiente a este equipo.",
      "Genera un nuevo par de claves SSH. Entrega la clave privada a cada miembro de tu equipo. Configura la clave pública como una clave SSH pública para todo el proyecto en tu proyecto de Cloud Platform y permite claves SSH públicas para todo el proyecto en cada instancia."
    ],
    "answer": "Pida a cada miembro del equipo que genere un nuevo par de claves SSH y que añada la clave pública a su cuenta de Google. Asigne el rol «compute.osAdminLogin» al grupo de Google correspondiente a este equipo."
  },
  {
    "question": "Necesitas crear una VPC personalizada con una única subred. El rango de la subred debe ser lo más amplio posible. ¿Qué rango deberías usar?",
    "options": [
      "0.0.0.0/0",
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16"
    ],
    "answer": "10.0.0.0/8"
  },
  {
    "question": "Desea seleccionar y configurar una solución rentable para datos relacionales en Google Cloud Platform. Trabaja con un pequeño conjunto de datos operativos en una ubicación geográfica. Necesita admitir la recuperación a un punto en el tiempo. ¿Qué debería hacer?",
    "options": [
      "Seleccione Cloud SQL (MySQL). Verifique que esté seleccionada la opción de habilitar el registro binario.",
      "Seleccione Cloud SQL (MySQL). Seleccione la opción crear réplicas de conmutación por error.",
      "Seleccione Cloud Spanner. Configure su instancia con 2 nodos.",
      "Seleccione Cloud Spanner. Configure su instancia como multirregional."
    ],
    "answer": "Seleccione Cloud SQL (MySQL). Verifique que esté seleccionada la opción de habilitar el registro binario."
  },
  {
    "question": "Desea configurar la recuperación automática para el equilibrio de carga de red para un grupo de instancias de Compute Engine que se ejecutan en varias zonas, utilizando la menor cantidad de pasos posible. Necesita configurar la recreación de máquinas virtuales si no responden después de 3 intentos de 10 segundos cada uno. ¿Qué debe hacer?",
    "options": [
      "Cree un balanceador de carga HTTP con una configuración de backend que haga referencia a un grupo de instancias existente. Establezca la comprobación de estado en saludable (HTTP).",
      "Cree un balanceador de carga HTTP con una configuración de backend que haga referencia a un grupo de instancias existente. Defina un modo de balanceo y establezca el RPS máximo en 10.",
      "Cree un grupo de instancias administradas. Establezca la comprobación de estado de Autocuración en saludable (HTTP).",
      "Cree un grupo de instancias administradas. Verifique que la configuración de escalado automático esté activada."
    ],
    "answer": "Cree un grupo de instancias administradas. Establezca la comprobación de estado de Autocuración en saludable (HTTP)."
  },
  {
    "question": "Estás utilizando varias configuraciones para gcloud. Quieres revisar el clúster de Kubernetes Engine configurado para una configuración inactiva con el menor número de pasos posible. ¿Qué debes hacer?",
    "options": [
      "Utilice gcloud config configurations describe para revisar la salida.",
      "Utilice gcloud config configurations activate y gcloud config list para revisar la salida.",
      "Utilice kubectl config get­contexts para revisar la salida.",
      "Utilice kubectl config use­context y kubectl config view para revisar la salida."
    ],
    "answer": "Utilice kubectl config use­context y kubectl config view para revisar la salida."
  },
  {
    "question": "Su empresa utiliza el almacenamiento en la nube para guardar los archivos de copia de seguridad de las aplicaciones con fines de recuperación ante desastres. Quieres seguir las prácticas recomendadas por Google. ¿Qué opción de almacenamiento deberías usar?",
    "options": [
      "Almacenamiento multirregional",
      "Almacenamiento regional",
      "Almacenamiento Nearline",
      "Almacenamiento en línea fría"
    ],
    "answer": "Almacenamiento en línea fría"
  },
  {
    "question": "Varios empleados de su empresa han estado creando proyectos con Cloud Platform y pagándolos con sus tarjetas de crédito personales, importe que la empresa reembolsa. La empresa desea centralizar todos estos proyectos en una única cuenta de facturación. ¿Qué debería hacer?",
    "options": [
      "Comuníquese con [email protected] con los datos de su cuenta bancaria y solicite una cuenta de facturación corporativa para su empresa.",
      "Crea una solicitud de soporte con Google Support y espera a que te llamen para compartir los datos de tu tarjeta de crédito por teléfono.",
      "En la consola de la plataforma de Google, vaya a Administrador de recursos y mueva todos los proyectos a la organización raíz.",
      "En la consola de Google Cloud Platform, cree una nueva cuenta de facturación y configure un método de pago."
    ],
    "answer": "En la consola de Google Cloud Platform, cree una nueva cuenta de facturación y configure un método de pago."
  },
  {
    "question": "Tienes una aplicación que busca su servidor de licencias en la IP 10.0.3.21. Necesitas implementar el servidor de licencias en Compute Engine. No quieres modificar la configuración de la aplicación y deseas que esta pueda acceder al servidor de licencias. ¿Qué debes hacer?",
    "options": [
      "Reserve la IP 10.0.3.21 como una dirección IP interna estática usando gcloud y asígnela a la licencia. servidor.",
      "Reserve la IP 10.0.3.21 como una dirección IP pública estática usando gcloud y asígnela a la licencia. servidor.",
      "Utilice la IP 10.0.3.21 como una dirección IP efímera personalizada y asígnela al servidor de licencias.",
      "Inicie el servidor de licencias con una dirección IP efímera automática y, a continuación, cámbiele a una dirección IP interna estática."
    ],
    "answer": "Reserve la IP 10.0.3.21 como una dirección IP interna estática usando gcloud y asígnela a la licencia. servidor."
  },
  {
    "question": "Estás implementando una aplicación en App Engine. Quieres que el número de instancias se ajuste según la tasa de solicitudes. Necesitas al menos 3 instancias libres en todo momento. ¿Qué tipo de escalado deberías usar?",
    "options": [
      "Escalado manual con 3 instancias.",
      "Escalado básico con min_instances establecido en 3.",
      "Escalado básico con max_instances establecido en 3.",
      "Escalado automático con min_idle_instances establecido en 3."
    ],
    "answer": "Escalado automático con min_idle_instances establecido en 3."
  },
  {
    "question": "Tienes un proyecto de desarrollo con los roles de IAM adecuados definidos. Estás creando un proyecto de producción y quieres tener los mismos roles de IAM en el nuevo proyecto, utilizando la menor cantidad de pasos posible. ¿Qué deberías hacer?",
    "options": [
      "Utilice gcloud iam roles copy y especifique el proyecto de producción como proyecto de destino.",
      "Utilice gcloud iam roles copy y especifique su organización como organización de destino.",
      "En la consola de Google Cloud Platform, utilice la función \"crear rol a partir de un rol\".",
      "En la consola de Google Cloud Platform, utilice la función \"crear rol\" y seleccione todos los permisos aplicables."
    ],
    "answer": "Utilice gcloud iam roles copy y especifique el proyecto de producción como proyecto de destino."
  },
  {
    "question": "Necesitas un método dinámico para aprovisionar máquinas virtuales en Compute Engine. Las especificaciones exactas estarán en un archivo de configuración específico. Quieres seguir las prácticas recomendadas por Google. ¿Qué método deberías usar? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Gestor de despliegue",
      "Cloud Composer",
      "Grupo de instancias administradas",
      "Grupo de instancias no administradas"
    ],
    "answer": "Gestor de despliegue"
  },
  {
    "question": "Tienes un Dockerfile que necesitas desplegar en Kubernetes Engine. ¿Qué debes hacer?",
    "options": [
      "Utilice kubectl app deploy .",
      "Utilice gcloud app deploy.",
      "Crea una imagen de Docker a partir del Dockerfile y súbela al Container Registry. Crea un archivo YAML de implementación que apunte a esa imagen. Usa kubectl para crear la implementación con ese archivo.",
      "Crea una imagen de Docker a partir del Dockerfile y súbela a Cloud Storage. Crea un archivo YAML de implementación que apunte a esa imagen. Usa kubectl para crear la implementación con ese archivo."
    ],
    "answer": "Crea una imagen de Docker a partir del Dockerfile y súbela al Container Registry. Crea un archivo YAML de implementación que apunte a esa imagen. Usa kubectl para crear la implementación con ese archivo."
  },
  {
    "question": "Tu equipo de desarrollo necesita un nuevo servidor Jenkins para su proyecto. Debes desplegar el servidor con la menor cantidad de pasos posible. ¿Qué debes hacer?",
    "options": [
      "Descargue e implemente el archivo WAR de Java de Jenkins en App Engine Standard.",
      "Cree una nueva instancia de Compute Engine e instale Jenkins a través de la interfaz de línea de comandos.",
      "Cree un clúster de Kubernetes en Compute Engine y cree un despliegue con la imagen Docker de Jenkins.",
      "Utilice GCP Marketplace para lanzar la solución Jenkins."
    ],
    "answer": "Utilice GCP Marketplace para lanzar la solución Jenkins."
  },
  {
    "question": "Necesitas actualizar una implementación en el Administrador de implementaciones sin que se produzca ninguna interrupción del servicio. ¿Qué comando debes usar? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "gcloud deployment­manager deployments create ­­config",
      "gcloud deployment­manager deployments update ­­config",
      "gcloud deployment­manager resources create ­­config",
      "gcloud deployment­manager resources update ­­config"
    ],
    "answer": "gcloud deployment­manager deployments update ­­config"
  },
  {
    "question": "Necesitas ejecutar una consulta importante en BigQuery, pero esperas que devuelva muchos registros. Quieres Averigua cuánto costará ejecutar la consulta. Estás utilizando precios bajo demanda. ¿Qué deberías hacer? ¿hacer?",
    "options": [
      "Coordina el cambio a precios de tarifa plana para esta consulta y luego vuelve a los precios bajo demanda.",
      "Utilice la línea de comandos para ejecutar una consulta de prueba y estimar la cantidad de bytes leídos. Luego, convierta esa estimación de bytes a dólares utilizando la Calculadora de precios.",
      "Utilice la línea de comandos para ejecutar una consulta de prueba y estimar la cantidad de bytes devueltos. Luego, convierta esa estimación de bytes a dólares utilizando la Calculadora de precios.",
      "Ejecuta una consulta SELECT COUNT (*) para tener una idea de cuántos registros examinará tu consulta. Luego, convierte esa cantidad de filas a dólares usando la Calculadora de precios."
    ],
    "answer": "Utilice la línea de comandos para ejecutar una consulta de prueba y estimar la cantidad de bytes leídos. Luego, convierta esa estimación de bytes a dólares utilizando la Calculadora de precios."
  },
  {
    "question": "Tienes una única aplicación binaria que quieres ejecutar en Google Cloud Platform. Decidiste escalar automáticamente la aplicación en función del uso de CPU de la infraestructura subyacente. Las políticas de tu organización requieren que uses máquinas virtuales directamente. Necesitas asegurarte de que el escalado de la aplicación sea operativamente eficiente y se complete lo más rápido posible. ¿Qué deberías hacer? ¿hacer?",
    "options": [
      "Cree un clúster de Google Kubernetes Engine y utilice el escalado automático horizontal de pods para escalar la aplicación.",
      "Cree una plantilla de instancia y utilice dicha plantilla en un grupo de instancias administradas con escalado automático configurado.",
      "Cree una plantilla de instancia y utilice dicha plantilla en un grupo de instancias administradas que se ajuste automáticamente según la hora del día.",
      "Utilice un conjunto de herramientas de terceros para automatizar el escalado de la aplicación, tanto hacia arriba como hacia abajo, basándose en la monitorización del uso de la CPU de Stackdriver."
    ],
    "answer": "Cree una plantilla de instancia y utilice dicha plantilla en un grupo de instancias administradas con escalado automático configurado."
  },
  {
    "question": "Estás analizando los costos del servicio de Google Cloud Platform de tres proyectos diferentes. Quieres Utilice esta información para crear estimaciones de costos de servicio por tipo de servicio, diarias y mensuales, para los próximos seis meses utilizando la sintaxis de consulta estándar. ¿Qué debería hacer?",
    "options": [
      "Exporta tu factura a un depósito de Cloud Storage y, a continuación, impórtala a Cloud Bigtable para su análisis.",
      "Exporta tu factura a un depósito de Cloud Storage y luego impórtala a Google Sheets para su análisis.",
      "Exporte sus transacciones a un archivo local y realice un análisis con una herramienta de escritorio.",
      "Exporta tu factura a un conjunto de datos de BigQuery y, a continuación, escribe consultas SQL basadas en ventanas de tiempo para su análisis."
    ],
    "answer": "Exporta tu factura a un conjunto de datos de BigQuery y, a continuación, escribe consultas SQL basadas en ventanas de tiempo para su análisis."
  },
  {
    "question": "Debes configurar una política para que los vídeos almacenados en un bucket regional específico de Cloud Storage se muevan a Coldline después de 90 días y se eliminen un año después de su creación. ¿Cómo debes configurar esta política?",
    "options": [
      "Utilice la administración del ciclo de vida de objetos de almacenamiento en la nube mediante condiciones de antigüedad con las acciones SetStorageClass y Delete. Establezca la acción SetStorageClass en 90 días y la acción Delete en 275 días (365 (ג€\" 90",
      "Utilice la administración del ciclo de vida de objetos de almacenamiento en la nube con condiciones de antigüedad mediante las acciones SetStorageClass y Delete. Establezca la acción SetStorageClass en 90 días y la acción Delete en 365 días.",
      "Utilice gsutil rewrite y establezca la acción de eliminación en 275 días (365­90).",
      "Utilice gsutil rewrite y configure la acción de eliminación en 365 días."
    ],
    "answer": "Utilice la administración del ciclo de vida de objetos de almacenamiento en la nube con condiciones de antigüedad mediante las acciones SetStorageClass y Delete. Establezca la acción SetStorageClass en 90 días y la acción Delete en 365 días."
  },
  {
    "question": "Tienes una máquina virtual Linux que necesita conectarse a Cloud SQL. Creaste una cuenta de servicio con los permisos de acceso adecuados. Quieres asegurarte de que la máquina virtual use esta cuenta de servicio en lugar de la cuenta de servicio predeterminada de Compute Engine. ¿Qué debes hacer?",
    "options": [
      "Al crear la máquina virtual a través de la consola web, especifique la cuenta de servicio en la sección \"Identidad y acceso a la API\".",
      "Descargue una clave privada JSON para la cuenta de servicio. En los metadatos del proyecto, agregue ese JSON como valor para la clave compute­engine­service­account.",
      "Descargue una clave privada JSON para la cuenta de servicio. En los metadatos personalizados de la máquina virtual, agregue ese JSON como valor para la clave compute­engine­service­account.",
      "Descargue una clave privada JSON para la cuenta de servicio. Después de crear la máquina virtual, conéctese a ella mediante ssh y guarde el archivo JSON en ~/.gcloud/compute­engine­service­account.json."
    ],
    "answer": "Al crear la máquina virtual a través de la consola web, especifique la cuenta de servicio en la sección \"Identidad y acceso a la API\"."
  },
  {
    "question": "Has creado una instancia de SQL Server 2017 en Compute Engine para probar las características de la nueva versión. Quieres conectarte a esta instancia con el menor número de pasos posible. ¿Qué debes hacer?",
    "options": [
      "Instale un cliente RDP en su ordenador de escritorio. Verifique que exista una regla de firewall para el puerto 3389.",
      "Instale un cliente RDP en su escritorio. Configure un nombre de usuario y una contraseña de Windows en la consola de GCP. Use las credenciales para iniciar sesión en la instancia.",
      "Establezca una contraseña de Windows en la consola de GCP. Verifique que exista una regla de firewall para el puerto 22. Haga clic Haga clic en el botón RDP en la consola de GCP e introduzca las credenciales para iniciar sesión.",
      "Configure un nombre de usuario y una contraseña de Windows en la consola de GCP. Verifique que exista una regla de firewall para el puerto 3389. Haga clic en el botón RDP en la consola de GCP e ingrese las credenciales para iniciar sesión."
    ],
    "answer": "Configure un nombre de usuario y una contraseña de Windows en la consola de GCP. Verifique que exista una regla de firewall para el puerto 3389. Haga clic en el botón RDP en la consola de GCP e ingrese las credenciales para iniciar sesión."
  },
  {
    "question": "Tienes una cuenta de GCP ejecutándose en tu región y zona predeterminadas y otra cuenta ejecutándose en una región y zona no predeterminadas. Desea iniciar una nueva instancia de Compute Engine en estas dos cuentas de Google Cloud Platform mediante la interfaz de línea de comandos. ¿Qué debe hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree dos configuraciones usando gcloud config configurations create [NOMBRE]. Ejecute gcloud config configurations activate [NOMBRE] para cambiar entre cuentas al ejecutar los comandos para iniciar las instancias de Compute Engine.",
      "Cree dos configuraciones usando gcloud config configurations create [NOMBRE]. Ejecute gcloud configurations list para iniciar las instancias de Compute Engine.",
      "Active dos configuraciones usando gcloud configurations activate [NOMBRE]. Ejecute gcloud config list para iniciar las instancias de Compute Engine.",
      "Active dos configuraciones usando gcloud configurations activate [NOMBRE]. Ejecute gcloud configurations list para iniciar las instancias de Compute Engine."
    ],
    "answer": "Cree dos configuraciones usando gcloud config configurations create [NOMBRE]. Ejecute gcloud config configurations activate [NOMBRE] para cambiar entre cuentas al ejecutar los comandos para iniciar las instancias de Compute Engine."
  },
  {
    "question": "Has modificado significativamente una plantilla compleja del Gestor de Despliegues y quieres confirmar que las dependencias de todos los recursos definidos se cumplen correctamente antes de incorporarla al proyecto. Quieres obtener una retroalimentación rápida sobre tus cambios. ¿Qué deberías hacer?",
    "options": [
      "Utilice instrucciones de registro granular dentro de una plantilla de Administrador de despliegue creada en Python.",
      "Supervise la actividad de la ejecución del Administrador de despliegue en la página de registro de Stackdriver de la consola de GCP.",
      "Ejecute la plantilla del Administrador de despliegue en un proyecto independiente con la misma configuración y supervise si se producen fallos.",
      "Ejecute la plantilla del Administrador de despliegue utilizando la opción de vista previa en el mismo proyecto y observe el estado de los recursos interdependientes."
    ],
    "answer": "Ejecute la plantilla del Administrador de despliegue utilizando la opción de vista previa en el mismo proyecto y observe el estado de los recursos interdependientes."
  },
  {
    "question": "Estás creando una canalización para procesar datos de series temporales. ¿Qué servicios de Google Cloud Platform deberías colocar en las casillas 1, 2, 3 y 4? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cloud Pub/Sub, Cloud Dataflow, Cloud Datastore, BigQuery",
      "Firebase Messages, Cloud Pub/Sub, Cloud Spanner, BigQuery",
      "Cloud Pub/Sub, Cloud Storage, BigQuery, Cloud Bigtable",
      "Cloud Pub/Sub, Cloud Dataflow, Cloud Bigtable, BigQuery"
    ],
    "answer": "Cloud Pub/Sub, Cloud Dataflow, Cloud Bigtable, BigQuery"
  },
  {
    "question": "Tienes un proyecto para tu aplicación de App Engine que funciona como entorno de desarrollo. Las pruebas requeridas se han completado con éxito y quieres crear un nuevo proyecto para tu entorno de producción. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice gcloud para crear el nuevo proyecto y, a continuación, implemente su aplicación en el nuevo proyecto.",
      "Utilice gcloud para crear el nuevo proyecto y copiar la aplicación desplegada al nuevo proyecto.",
      "Cree un archivo de configuración de Deployment Manager que copie la implementación actual de App Engine en un nuevo proyecto.",
      "Implemente su aplicación nuevamente usando gcloud y especifique el parámetro project con el nuevo nombre del proyecto para crear el nuevo proyecto."
    ],
    "answer": "Utilice gcloud para crear el nuevo proyecto y, a continuación, implemente su aplicación en el nuevo proyecto."
  },
  {
    "question": "Necesitas configurar el registro de auditoría de acceso de IAM en BigQuery para auditores externos. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer?",
    "options": [
      "Agregue el grupo de auditores a los roles de IAM predefinidos 'logging.viewer' y 'bigQuery.dataViewer'.",
      "Añada el grupo de auditores a dos nuevos roles personalizados de IAM.",
      "Agregue las cuentas de usuario del auditor a los roles de IAM predefinidos 'logging.viewer' y 'bigQuery.dataViewer'.",
      "Agregue las cuentas de usuario del auditor a dos nuevos roles personalizados de IAM."
    ],
    "answer": "Agregue el grupo de auditores a los roles de IAM predefinidos 'logging.viewer' y 'bigQuery.dataViewer'."
  },
  {
    "question": "Necesitas configurar permisos para un conjunto de instancias de Compute Engine para que puedan escribir datos en un bucket específico de Cloud Storage. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer?",
    "options": [
      "Cree una cuenta de servicio con un ámbito de acceso. Utilice el ámbito de acceso 'https://www.googleapis.com/auth/devstorage.write_only'.",
      "Cree una cuenta de servicio con un ámbito de acceso. Utilice el ámbito de acceso 'https://www.googleapis.com/auth/cloud­platform'.",
      "Cree una cuenta de servicio y agréguela al rol de IAM 'storage.objectCreator' para ese bucket.",
      "Cree una cuenta de servicio y agréguela al rol de IAM 'storage.objectAdmin' para ese bucket."
    ],
    "answer": "Cree una cuenta de servicio y agréguela al rol de IAM 'storage.objectCreator' para ese bucket."
  },
  {
    "question": "Tienes datos confidenciales almacenados en tres depósitos de Cloud Storage y has habilitado el registro de acceso a datos. Quieres verificar las actividades de un usuario específico en estos depósitos, con el menor número de pasos posible. Necesitas verificar la adición de etiquetas de metadatos y qué archivos se han visualizado desde esos depósitos. ¿Qué debes hacer?",
    "options": [
      "Utilizando la consola de GCP, filtre el registro de actividad para ver la información.",
      "Utilizando la consola de GCP, filtre el registro de Stackdriver para ver la información.",
      "Visualice el bucket en la sección Almacenamiento de la consola de GCP.",
      "Crea un rastreo en Stackdriver para ver la información."
    ],
    "answer": "Utilizando la consola de GCP, filtre el registro de Stackdriver para ver la información."
  },
  {
    "question": "Eres el responsable de un proyecto de GCP y quieres delegar el control a tus compañeros para que administren los buckets y archivos en Cloud Storage. Quieres seguir las prácticas recomendadas por Google. ¿Qué roles de IAM deberías otorgarles? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Editor del proyecto",
      "Administración de almacenamiento",
      "Administración de objetos de almacenamiento",
      "Creador de objetos de almacenamiento"
    ],
    "answer": "Administración de almacenamiento"
  },
  {
    "question": "Tienes un objeto en un bucket de Cloud Storage que quieres compartir con una empresa externa de el objeto contiene datos confidenciales. Desea que el acceso al contenido se elimine después de cuatro horas. La empresa externa no tiene una cuenta de Google a la que pueda otorgar privilegios de acceso específicos. Desea utilizar el método más seguro que requiera la menor cantidad de pasos. ¿Qué debe hacer?",
    "options": [
      "Crea una URL firmada con una caducidad de cuatro horas y comparte la URL con la empresa.",
      "Establezca el acceso al objeto en 'público' y utilice la gestión del ciclo de vida del objeto para eliminar el objeto después de cuatro horas.",
      "Configure el depósito de almacenamiento como un sitio web estático y proporcione la URL del objeto a la empresa. Elimine el objeto del depósito de almacenamiento después de cuatro horas.",
      "Cree un nuevo depósito de Cloud Storage específicamente para que la empresa externa pueda acceder a él. Copie el objeto a ese depósito. Elimine el depósito transcurridos cuatro horas."
    ],
    "answer": "Crea una URL firmada con una caducidad de cuatro horas y comparte la URL con la empresa."
  },
  {
    "question": "Estás creando un clúster de Google Kubernetes Engine (GKE) con la función de escalado automático habilitada. Debes asegurarte de que cada nodo del clúster ejecute un pod de monitorización que envíe métricas de contenedores a una solución de monitorización de terceros. ¿Qué debes hacer?",
    "options": [
      "Implemente el pod de monitoreo en un objeto StatefulSet.",
      "Implemente el pod de monitorización en un objeto DaemonSet.",
      "Haga referencia al pod de monitorización en un objeto Deployment.",
      "Haga referencia al pod de monitorización en un inicializador de clúster en el momento de la creación del clúster de GKE."
    ],
    "answer": "Implemente el pod de monitorización en un objeto DaemonSet."
  },
  {
    "question": "Desea enviar y consumir mensajes de Cloud Pub/Sub desde su aplicación App Engine de la API de Cloud Pub/Sub está actualmente deshabilitada. Deberá usar una cuenta de servicio para autenticar su aplicación en la API. Desea asegurarse de que su aplicación pueda usar Cloud Pub/Sub. ¿Qué debe hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Habilite la API de Cloud Pub/Sub en la Biblioteca de API de la consola de GCP.",
      "Confíe en la habilitación automática de la API de Cloud Pub/Sub cuando la cuenta de servicio acceda a él.",
      "Utilice el Administrador de despliegue para desplegar su aplicación. Confíe en la habilitación automática de todas las API utilizadas por la aplicación que se está desplegando.",
      "Asigne a la cuenta de servicio predeterminada de App Engine el rol de administrador de Cloud Pub/Sub. Haga que su aplicación habilite la API en la primera conexión a Cloud Pub/Sub."
    ],
    "answer": "Habilite la API de Cloud Pub/Sub en la Biblioteca de API de la consola de GCP."
  },
  {
    "question": "Necesitas supervisar los recursos que están distribuidos en diferentes proyectos en Google Cloud Platform. ¿Quieres consolidar los informes en el mismo panel de control de StackdriverMonitoring? ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice una VPC compartida para conectar todos los proyectos y vincule Stackdriver a uno de los proyectos.",
      "Para cada proyecto, cree una cuenta de Stackdriver. En cada proyecto, cree una cuenta de servicio para ese proyecto y asígnele el rol de Editor de cuenta de Stackdriver en todos los demás proyectos.",
      "Configure una única cuenta de Stackdriver y vincule todos los proyectos a esa misma cuenta.",
      "Configure una única cuenta de Stackdriver para uno de los proyectos. En Stackdriver, cree un grupo y añada los nombres de los demás proyectos como criterios para ese grupo."
    ],
    "answer": "Configure una única cuenta de Stackdriver y vincule todos los proyectos a esa misma cuenta."
  },
  {
    "question": "Estás implementando una aplicación en una máquina virtual de Compute Engine dentro de un grupo de instancias administradas de la aplicación debe estar en ejecución en todo momento, pero solo debe ejecutarse una instancia de la máquina virtual por proyecto de GCP. ¿Cómo debes configurar el grupo de instancias? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Configure el escalado automático en Activado, establezca el número mínimo de instancias en 1 y, a continuación, establezca el número máximo de instancias en 1.",
      "Desactive el escalado automático, establezca el número mínimo de instancias en 1 y, a continuación, establezca el número máximo de instancias en 1.",
      "Active el escalado automático, establezca el número mínimo de instancias en 1 y, a continuación, establezca el número máximo de instancias en 2.",
      "Desactive el escalado automático, establezca el número mínimo de instancias en 1 y, a continuación, establezca el número máximo de instancias en 2."
    ],
    "answer": "Configure el escalado automático en Activado, establezca el número mínimo de instancias en 1 y, a continuación, establezca el número máximo de instancias en 1."
  },
  {
    "question": "Desea verificar los usuarios y roles de IAM asignados dentro de un proyecto de GCP llamado my­project. ¿Deberías hacerlo? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Ejecute gcloud iam roles list. Revise la sección de resultados.",
      "Ejecute gcloud iam service­accounts list. Revise la sección de resultados.",
      "Navegue hasta el proyecto y luego a la sección IAM en la consola de GCP. Revise los miembros y roles.",
      "Navegue al proyecto y luego a la sección Roles en la consola de GCP. Revise los roles y estado."
    ],
    "answer": "Navegue hasta el proyecto y luego a la sección IAM en la consola de GCP. Revise los miembros y roles."
  },
  {
    "question": "Necesitas crear una nueva cuenta de facturación y luego vincularla con un proyecto existente de Google Cloud Platform. ¿Qué debes hacer?",
    "options": [
      "Verifique que usted sea el administrador de facturación del proyecto de GCP. Actualice el proyecto existente para vincularlo a la cuenta de facturación existente.",
      "Verifique que usted sea el administrador de facturación del proyecto de GCP. Cree una nueva cuenta de facturación y vincúlela al proyecto existente.",
      "Verifique que usted sea el administrador de facturación de la cuenta de facturación. Cree un nuevo proyecto y vincúlelo a la cuenta de facturación existente.",
      "Verifique que usted sea el administrador de facturación de la cuenta de facturación. Actualice el proyecto existente para vincularlo a la cuenta de facturación existente."
    ],
    "answer": "Verifique que usted sea el administrador de facturación del proyecto de GCP. Cree una nueva cuenta de facturación y vincúlela al proyecto existente."
  },
  {
    "question": "Tienes un proyecto llamado proj­sa donde administras todas tus cuentas de servicio. Quieres poder usar una cuenta de servicio de este proyecto para tomar instantáneas de máquinas virtuales que se ejecutan en otro proyecto. llamado proj­vm. ¿Qué debes hacer?",
    "options": [
      "Descargue la clave privada de la cuenta de servicio y agréguela a los metadatos personalizados de cada máquina virtual.",
      "Descargue la clave privada de la cuenta de servicio y agréguela a las claves SSH de cada máquina virtual.",
      "Otorgue a la cuenta de servicio el rol de IAM de administrador de almacenamiento de computación en el proyecto llamado proj­ vm.",
      "Al crear las máquinas virtuales, configure el ámbito de la API de la cuenta de servicio para Compute Engine en lectura/escritura."
    ],
    "answer": "Otorgue a la cuenta de servicio el rol de IAM de administrador de almacenamiento de computación en el proyecto llamado proj­ vm."
  },
  {
    "question": "Has creado un proyecto de Google Cloud Platform con una aplicación de App Engine dentro del proyecto. Inicialmente configuraste la aplicación para que se sirviera desde la región us­central. Ahora quieres que se sirva desde la región asia­ northeast1. ¿Qué debes hacer?",
    "options": [
      "Cambie la configuración de la propiedad de región predeterminada en el proyecto de GCP existente a asia­northeast1.",
      "Cambie la configuración de la propiedad de región en la aplicación existente de App Engine de us­central a asia­northeast1.",
      "Cree una segunda aplicación de App Engine en el proyecto de GCP existente y especifique asia­northeast1 como la región en la que se ejecutará su aplicación.",
      "Crea un nuevo proyecto de GCP y crea una aplicación de App Engine dentro de este nuevo proyecto. Especifica asia­northeast1 como la región donde se ejecutará tu aplicación."
    ],
    "answer": "Crea un nuevo proyecto de GCP y crea una aplicación de App Engine dentro de este nuevo proyecto. Especifica asia­northeast1 como la región donde se ejecutará tu aplicación."
  },
  {
    "question": "Necesitas otorgar acceso a tres usuarios para que puedan ver y editar los datos de una tabla en una instancia de Cloud Spanner. ¿Qué debes hacer?",
    "options": [
      "Ejecute gcloud iam roles describe roles/spanner.databaseUser. Agregue los usuarios al rol.",
      "Ejecute gcloud iam roles describe roles/spanner.databaseUser. Agregue los usuarios a un nuevo grupo. Agregue el grupo al rol.",
      "Ejecuta gcloud iam roles describe roles/spanner.viewer ­ ­project my­project. Agrega los usuarios al rol.",
      "Ejecuta gcloud iam roles describe roles/spanner.viewer ­ ­project my­project. Agrega los usuarios a un nuevo grupo. Agrega el grupo al rol."
    ],
    "answer": "Ejecute gcloud iam roles describe roles/spanner.databaseUser. Agregue los usuarios a un nuevo grupo. Agregue el grupo al rol."
  },
  {
    "question": "Creas un nuevo clúster de Google Kubernetes Engine (GKE) y quieres asegurarte de que siempre ejecute una versión compatible y estable de Kubernetes. ¿Qué debes hacer?",
    "options": [
      "Habilite la función de reparación automática de nodos para su clúster GKE.",
      "Habilite la función de actualización automática de nodos para su clúster GKE.",
      "Seleccione la versión de clúster más reciente disponible para su clúster GKE.",
      "Seleccione \"Container­Optimized OS (cos)\" como imagen de nodo para su clúster GKE."
    ],
    "answer": "Habilite la función de actualización automática de nodos para su clúster GKE."
  },
  {
    "question": "Tienes un grupo de instancias al que deseas aplicar balanceo de carga. Quieres que el balanceador de carga finalice la sesión SSL del cliente. El grupo de instancias se utiliza para servir una aplicación web pública a través de HTTPS. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer?",
    "options": [
      "Configure un balanceador de carga HTTP(S).",
      "Configure un balanceador de carga TCP interno.",
      "Configure un balanceador de carga proxy SSL externo.",
      "Configure un balanceador de carga proxy TCP externo."
    ],
    "answer": "Configure un balanceador de carga HTTP(S)."
  },
  {
    "question": "Tienes 32 GB de datos en un solo archivo que necesitas subir a un bucket de Nearline Storage. La conexión WAN que utilizas tiene una velocidad de 1 Gbps y eres el único usuario conectado. Quieres aprovechar al máximo los 1 Gbps disponibles para transferir el archivo rápidamente. ¿Cómo deberías subir el archivo? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice la consola de GCP para transferir el archivo en lugar de gsutil.",
      "Habilitar cargas compuestas paralelas usando gsutil en la transferencia de archivos.",
      "Disminuya el tamaño de la ventana TCP en la máquina que inicia la transferencia.",
      "Cambie la clase de almacenamiento del bucket de Nearline a Multi­Regional."
    ],
    "answer": "Habilitar cargas compuestas paralelas usando gsutil en la transferencia de archivos."
  },
  {
    "question": "Has desplegado un microservicio llamado myapp1 en un clúster de Google Kubernetes Engine utilizando el archivo YAML especificado a continuación: Debes refactorizar esta configuración para que la contraseña de la base de datos sea No se almacena en texto plano. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Almacene la contraseña de la base de datos dentro de la imagen Docker del contenedor, no en el archivo YAML.",
      "Almacene la contraseña de la base de datos dentro de un objeto Secret. Modifique el archivo YAML para completar la variable de entorno DB_PASSWORD a partir del Secret.",
      "Almacene la contraseña de la base de datos dentro de un objeto ConfigMap. Modifique el archivo YAML para completar la variable de entorno DB_PASSWORD desde el ConfigMap.",
      "Almacene la contraseña de la base de datos en un archivo dentro de un volumen persistente de Kubernetes y utilice una solicitud de volumen persistente para montar el volumen en el contenedor."
    ],
    "answer": "Almacene la contraseña de la base de datos dentro de un objeto Secret. Modifique el archivo YAML para completar la variable de entorno DB_PASSWORD a partir del Secret."
  },
  {
    "question": "Estás ejecutando una aplicación en varias máquinas virtuales dentro de un grupo de instancias administradas y tienes habilitado el escalado automático. La política de escalado automático está configurada para que se agreguen instancias adicionales al grupo si la utilización de la CPU de las instancias supera el 80 %. Se agregan máquinas virtuales hasta que el grupo de instancias alcanza su límite máximo de cinco máquinas virtuales o hasta que la utilización de la CPU de las instancias disminuye. al 80%. El retraso inicial para las comprobaciones de estado HTTP en las instancias se establece en 30 segundos. Las instancias de máquinas virtuales tardan alrededor de tres minutos en estar disponibles para los usuarios. Observas que Cuando el grupo de instancias se autoescala, agrega más instancias de las necesarias para soportar los niveles de tráfico de los usuarios finales. Es importante mantener correctamente el tamaño de los grupos de instancias durante el autoescalado. ¿Qué se debe hacer? ¿tú haces? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Establezca el número máximo de instancias en 1.",
      "Disminuir el número máximo de instancias a 3.",
      "Utilice una comprobación de estado TCP en lugar de una comprobación de estado HTTP.",
      "Aumentar el retraso inicial de la comprobación de estado HTTP a 200 segundos."
    ],
    "answer": "Aumentar el retraso inicial de la comprobación de estado HTTP a 200 segundos."
  },
  {
    "question": "Necesitas seleccionar y configurar recursos informáticos para un conjunto de trabajos de procesamiento por lotes. Estos trabajos tardan aproximadamente 2 horas en completarse y se ejecutan todas las noches. Quieres minimizar los costos del servicio. ¿Qué deberías hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Seleccione Google Kubernetes Engine. Utilice un clúster de un solo nodo con un tipo de instancia pequeña.",
      "Seleccione Google Kubernetes Engine. Utilice un clúster de tres nodos con tipos de instancias micro.",
      "Seleccione Compute Engine. Utilice instancias de máquinas virtuales interrumpibles del tipo de máquina estándar apropiado.",
      "Seleccione Compute Engine. Utilice tipos de instancias de VM que admitan micro ráfagas."
    ],
    "answer": "Seleccione Compute Engine. Utilice instancias de máquinas virtuales interrumpibles del tipo de máquina estándar apropiado."
  },
  {
    "question": "Recientemente implementaste una nueva versión de una aplicación en App Engine y luego descubriste un error en la versión. Necesitas revertir inmediatamente a la versión anterior de la aplicación. ¿Qué deberías hacer? ¿hacer?",
    "options": [
      "Ejecuta gcloud app restore.",
      "En la página de App Engine de la consola de GCP, seleccione la aplicación que necesita ser revertida y Haz clic en Revertir.",
      "En la página Versiones de App Engine de la consola de GCP, dirija el 100% del tráfico a la versión anterior.",
      "Implementa la versión original como una aplicación independiente. Luego, ve a la configuración de App Engine y divide el tráfico entre las aplicaciones para que la versión original atienda el 100 % de las solicitudes."
    ],
    "answer": "En la página Versiones de App Engine de la consola de GCP, dirija el 100% del tráfico a la versión anterior."
  },
  {
    "question": "Implementaste una aplicación de App Engine usando `gcloud app deploy`, pero no se implementó en el proyecto previsto. Quieres saber por qué sucedió esto y dónde se implementó la aplicación. ¿Qué deberías hacer?",
    "options": [
      "Revisa el archivo app.yaml de tu aplicación y verifica la configuración del proyecto.",
      "Compruebe el archivo web­application.xml de su aplicación y verifique la configuración del proyecto.",
      "Vaya al Administrador de despliegue y revise la configuración para el despliegue de aplicaciones.",
      "Vaya a Cloud Shell y ejecute gcloud config list para revisar la configuración de Google Cloud utilizada para la implementación."
    ],
    "answer": "Vaya a Cloud Shell y ejecute gcloud config list para revisar la configuración de Google Cloud utilizada para la implementación."
  },
  {
    "question": "Desea configurar 10 instancias de Compute Engine para garantizar su disponibilidad durante las tareas de mantenimiento. Sus requisitos establecen que estas instancias deben intentar reiniciarse automáticamente si fallan. Además, las instancias deben tener alta disponibilidad, incluso durante el mantenimiento del sistema. ¿Qué debería hacer?",
    "options": [
      "Cree una plantilla de instancia para las instancias. Active la opción \"Reinicio automático\". Configure \"Mantenimiento en el host\" en \"Migrar instancia de VM\". Agregue la plantilla de instancia a un grupo de instancias.",
      "Cree una plantilla de instancia para las instancias. Desactive la opción \"Reinicio automático\". Configure \"Mantenimiento en el host\" en \"Terminar instancias de VM\". Agregue la plantilla de instancia a un grupo de instancias.",
      "Cree un grupo de instancias para las instancias. Establezca la comprobación de estado 'Autocuración' en saludable (HTTP).",
      "Cree un grupo de instancias para la instancia. Verifique que la configuración de \"Opciones de creación avanzadas\" para \"No volver a intentar la creación de la máquina\" esté desactivada."
    ],
    "answer": "Cree una plantilla de instancia para las instancias. Active la opción \"Reinicio automático\". Configure \"Mantenimiento en el host\" en \"Migrar instancia de VM\". Agregue la plantilla de instancia a un grupo de instancias."
  },
  {
    "question": "Usted aloja un sitio web estático en Cloud Storage. Recientemente, comenzó a incluir enlaces a archivos PDF en este sitio. Actualmente, cuando los usuarios hacen clic en los enlaces a estos archivos PDF, sus navegadores les solicitan que guarden el archivo en su sistema local. En cambio, usted desea que los archivos PDF en los que se hizo clic se muestren dentro de La ventana del navegador abre el archivo directamente, sin solicitar al usuario que lo guarde localmente. ¿Qué debería hacer?",
    "options": [
      "Habilitar Cloud CDN en el frontend del sitio web.",
      "Habilite la opción 'Compartir públicamente' en los objetos de archivo PDF.",
      "Establezca los metadatos Content­Type en application/pdf en los objetos de archivo PDF.",
      "Agregue una etiqueta al depósito de almacenamiento con una clave de Content­Type y un valor de application/pdf."
    ],
    "answer": "Establezca los metadatos Content­Type en application/pdf en los objetos de archivo PDF."
  },
  {
    "question": "Tienes una máquina virtual configurada con 2 vCPU y 4 GB de memoria. Se está quedando sin memoria. Quieres actualizarla a 8 GB. ¿Qué debes hacer?",
    "options": [
      "Confíe en la migración en vivo para trasladar la carga de trabajo a una máquina con más memoria.",
      "Utilice gcloud para agregar metadatos a la máquina virtual. Establezca la clave en required­memory­size y el valor en 8 GB.",
      "Detenga la máquina virtual, cambie el tipo de máquina a n1­standard­8 e inicie la máquina virtual.",
      "Detenga la máquina virtual, aumente la memoria a 8 GB e inicie la máquina virtual."
    ],
    "answer": "Detenga la máquina virtual, aumente la memoria a 8 GB e inicie la máquina virtual."
  },
  {
    "question": "Tienes cargas de trabajo de producción y de prueba que quieres implementar en Compute Engine. Las máquinas virtuales de producción deben estar en una subred diferente a la de las máquinas virtuales de prueba. Todas las máquinas virtuales deben poder acceder entre sí. otras a través de IP interna sin crear rutas adicionales. Necesitas configurar la VPC y las 2 subredes. ¿Qué configuración cumple con estos requisitos? Discusión sobre el tema 51 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una única VPC personalizada con 2 subredes. Cree cada subred en una región diferente y con un rango CIDR diferente.",
      "Cree una única VPC personalizada con 2 subredes. Cree cada subred en la misma región y con el mismo rango CIDR.",
      "Cree 2 VPC personalizadas, cada una con una única subred. Cree cada subred en una región diferente y con un rango CIDR diferente.",
      "Cree 2 VPC personalizadas, cada una con una única subred. Cree cada subred en la misma región y con el mismo rango CIDR."
    ],
    "answer": "Cree una única VPC personalizada con 2 subredes. Cree cada subred en una región diferente y con un rango CIDR diferente."
  },
  {
    "question": "Necesitas crear un grupo de instancias administradas con escalado automático para una aplicación web HTTPS. Quieres asegurarte de que las máquinas virtuales con problemas se vuelvan a crear. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una comprobación de estado en el puerto 443 y utilícela al crear el grupo de instancias administradas.",
      "Seleccione Multizona en lugar de Zona única al crear el grupo de instancias administradas.",
      "En la plantilla de instancia, agregue la etiqueta 'health­check'.",
      "En la plantilla de instancia, agregue un script de inicio que envíe una señal de actividad al servidor de metadatos."
    ],
    "answer": "Cree una comprobación de estado en el puerto 443 y utilícela al crear el grupo de instancias administradas."
  },
  {
    "question": "Su empresa tiene un proyecto de Google Cloud Platform que utiliza BigQuery para el almacenamiento de datos de el equipo de ciencia de datos cambia con frecuencia y tiene pocos miembros. Necesitas permitir que los miembros de este equipo realicen consultas. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. Cree una entrada de IAM para la cuenta de usuario de cada científico de datos. 2. Asigne el rol de usuario de trabajo de BigQuery al grupo.",
      "1. Cree una entrada de IAM para cada cuenta de usuario del científico de datos. 2. Asigne el dataViewer de BigQuery. rol de usuario para el grupo.",
      "1. Cree un grupo de Google dedicado en Cloud Identity. 2. Agregue la cuenta de usuario de cada científico de datos a el grupo. 3. Asigne el rol de usuario de trabajo de BigQuery al grupo.",
      "1. Cree un grupo de Google dedicado en Cloud Identity. 2. Agregue la cuenta de usuario de cada científico de datos a el grupo. 3. Asigne el rol de usuario BigQuery dataViewer al grupo."
    ],
    "answer": "1. Cree un grupo de Google dedicado en Cloud Identity. 2. Agregue la cuenta de usuario de cada científico de datos a el grupo. 3. Asigne el rol de usuario de trabajo de BigQuery al grupo."
  },
  {
    "question": "Su empresa tiene una solución de 3 niveles que se ejecuta en Compute Engine. La configuración de la infraestructura actual se muestra a continuación. Cada nivel tiene una cuenta de servicio asociada a todas las instancias. dentro de él. Debe habilitar la comunicación en el puerto TCP 8080 entre niveles de la siguiente manera: * Las instancias en el nivel #1 deben comunicarse con el nivel #2. * Las instancias en el nivel #2 deben comunicarse con el nivel #3. ¿Qué debe hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias • Filtro de origen: rangos de IP (con el rango establecido en 10.0.2.0/24) • Protocolos: permitir todos 2. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias • Filtro de origen: IP rangos (con el rango establecido en 10.0.1.0/24) • Protocolos: permitir todos",
      "1. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias con cuenta de servicio de nivel 2 • Filtro de origen: todas las instancias con cuenta de servicio de nivel 1 • Protocolos: permitir TCP:8080 2. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias con cuenta de servicio de nivel n.° 3 • Filtro de origen: todas las instancias con cuenta de servicio de nivel n.° 2 Protocolos: permitir TCP: 8080",
      "1. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias con cuenta de servicio de nivel 2 • Filtro de origen: todas las instancias con cuenta de servicio de nivel 1 • Protocolos: permitir 2. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias con cuenta de servicio de nivel 3 • Filtro de origen: todas las instancias con cuenta de servicio de nivel 2 • Protocolos: permitir todo",
      "1. Cree una regla de firewall de salida con la siguiente configuración: • Destinos: todas las instancias • Filtro de origen: rangos de IP (con el rango establecido en 10.0.2.0/24) • Protocolos: permitir TCP: 8080 2. Crear una regla de firewall de salida con la siguiente configuración: • Destinos: todas las instancias • Filtro de origen: rangos de IP (con el rango establecido en 10.0.1.0/24) • Protocolos: permitir TCP: 8080"
    ],
    "answer": "1. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias con cuenta de servicio de nivel 2 • Filtro de origen: todas las instancias con cuenta de servicio de nivel 1 • Protocolos: permitir TCP:8080 2. Cree una regla de firewall de entrada con la siguiente configuración: • Destinos: todas las instancias con cuenta de servicio de nivel n.° 3 • Filtro de origen: todas las instancias con cuenta de servicio de nivel n.° 2 Protocolos: permitir TCP: 8080"
  },
  {
    "question": "Se le asigna un proyecto con una única nube privada virtual (VPC) y una única subred en la región us­central1. En esta subred hay una instancia de Compute Engine que aloja una aplicación. Necesitas implementar una nueva instancia en el mismo proyecto en la región europe­west1. Esta nueva instancia necesita acceso a la aplicación. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. Cree una subred en la misma VPC, en europe­west1. 2. Cree la nueva instancia en la nueva subred y utilice la dirección privada de la primera instancia como punto final.",
      "1. Cree una VPC y una subred en europe­west1. 2. Exponga la aplicación con un balanceador de carga interno. 3. Cree la nueva instancia en la nueva subred y utilice la dirección del balanceador de carga como punto final.",
      "1. Cree una subred en la misma VPC, en europe­west1. 2. Utilice Cloud VPN para conectar las dos subredes. 3. Cree la nueva instancia en la nueva subred y utilice la dirección privada de la primera instancia como punto final.",
      "1. Cree una VPC y una subred en europe­west1. 2. Interconecte las 2 VPC. 3. Cree la nueva instancia en la nueva subred y utilice la dirección privada de la primera instancia como punto final."
    ],
    "answer": "1. Cree una subred en la misma VPC, en europe­west1. 2. Cree la nueva instancia en la nueva subred y utilice la dirección privada de la primera instancia como punto final."
  },
  {
    "question": "El mes pasado, tus proyectos generaron más gastos de los previstos. Tu investigación revela que un contenedor de desarrollo de GKE generó una gran cantidad de registros, lo que resultó en mayores costos. Quieres desactivar los registros rápidamente con el mínimo de pasos. ¿Qué debes hacer?",
    "options": [
      "1. Vaya a la ventana de ingesta de registros en Stackdriver Logging y desactive la fuente de registro para el recurso de contenedor GKE.",
      "1. Vaya a la ventana de ingesta de registros en Stackdriver Logging y desactive la fuente de registro para el recurso Operaciones de clúster de GKE.",
      "1. Vaya a la consola de GKE y elimine los clústeres existentes. 2. Cree un nuevo clúster. 3. Desactive la opción para habilitar el registro heredado de Stackdriver.",
      "1. Vaya a la consola de GKE y elimine los clústeres existentes. 2. Cree un nuevo clúster. 3. Desactive la opción para habilitar la monitorización de Stackdriver heredada."
    ],
    "answer": "1. Vaya a la ventana de ingesta de registros en Stackdriver Logging y desactive la fuente de registro para el recurso de contenedor GKE."
  },
  {
    "question": "Tienes un sitio web alojado en el entorno estándar de App Engine. Quieres que el 1% de tus usuarios vean Una nueva versión de prueba del sitio web. Quieres minimizar la complejidad. ¿Qué deberías hacer?",
    "options": [
      "Implemente la nueva versión en la misma aplicación y utilice la opción ­­migrate.",
      "Implemente la nueva versión en la misma aplicación y utilice la opción ­­splits para asignar un peso de 99 a la versión actual y un peso de 1 a la nueva versión.",
      "Crea una nueva aplicación de App Engine en el mismo proyecto. Implementa la nueva versión en esa aplicación. Usa la biblioteca de App Engine para redirigir el 1% de las solicitudes a la nueva versión.",
      "Crea una nueva aplicación de App Engine en el mismo proyecto. Implementa la nueva versión en esa aplicación. Configura tu balanceador de carga de red para que envíe el 1 % del tráfico a esa nueva aplicación."
    ],
    "answer": "Implemente la nueva versión en la misma aplicación y utilice la opción ­­splits para asignar un peso de 99 a la versión actual y un peso de 1 a la nueva versión."
  },
  {
    "question": "Tienes una aplicación web implementada como un grupo de instancias administradas. Necesitas implementar gradualmente una nueva versión de la aplicación. Actualmente, tu aplicación web recibe tráfico web en tiempo real. Quieres asegurarte de que la capacidad disponible no disminuya durante la implementación. ¿Qué debes hacer?",
    "options": [
      "Realizar una actualización de inicio de acción continua con maxSurge establecido en 0 y maxUnavailable establecido en 1.",
      "Realizar una actualización de inicio de acción continua con maxSurge establecido en 1 y maxUnavailable establecido en 0.",
      "Cree un nuevo grupo de instancias administradas con una plantilla de instancia actualizada. Agregue el grupo al servicio de backend del balanceador de carga. Cuando todas las instancias del nuevo grupo de instancias administradas estén en buen estado, elimine el grupo de instancias administradas anterior.",
      "Cree una nueva plantilla de instancia con la nueva versión de la aplicación. Actualice el grupo de instancias administradas existente con la nueva plantilla de instancia. Elimine las instancias del grupo de instancias administradas para que este pueda recrearlas utilizando la nueva plantilla."
    ],
    "answer": "Realizar una actualización de inicio de acción continua con maxSurge establecido en 1 y maxUnavailable establecido en 0."
  },
  {
    "question": "Estás desarrollando una aplicación que almacena datos relacionales de usuarios. Usuarios de todo el mundo utilizarán esta aplicación. Tu director de tecnología (CTO) está preocupado por los requisitos de escalabilidad, ya que se desconoce el tamaño de la base de usuarios. Necesitas implementar una solución de base de datos que pueda escalar al ritmo del crecimiento de usuarios con cambios mínimos en la configuración. ¿Qué solución de almacenamiento deberías utilizar?",
    "options": [
      "SQL en la nube",
      "Llave inglesa de nubes",
      "Almacenamiento en la nube",
      "Almacén de datos en la nube"
    ],
    "answer": "Llave inglesa de nubes"
  },
  {
    "question": "Usted es el administrador de la organización y facturación de su empresa. El equipo de ingeniería tiene el rol de Creador de Proyectos en la organización. No desea que el equipo de ingeniería pueda vincular proyectos a la cuenta de facturación. Solo el equipo de finanzas debería poder vincular un proyecto a una cuenta de facturación, pero no debería poder realizar ningún otro cambio en los proyectos. ¿Qué debería hacer?",
    "options": [
      "Asigne al equipo de finanzas únicamente el rol de Usuario de Cuenta de Facturación en la cuenta de facturación.",
      "Asigne al equipo de ingeniería únicamente el rol de Usuario de Cuenta de Facturación en la cuenta de facturación.",
      "Asigne al equipo de finanzas el rol de Usuario de cuenta de facturación en la cuenta de facturación y el rol de Gerente de facturación de proyectos en la organización.",
      "Asigne al equipo de ingeniería el rol de Usuario de cuenta de facturación en la cuenta de facturación y el rol de Gerente de facturación de proyecto en la organización."
    ],
    "answer": "Asigne al equipo de finanzas el rol de Usuario de cuenta de facturación en la cuenta de facturación y el rol de Gerente de facturación de proyectos en la organización."
  },
  {
    "question": "Tienes una aplicación ejecutándose en Google Kubernetes Engine (GKE) con el escalado automático del clúster habilitado de la aplicación expone un punto final TCP. Existen varias réplicas de esta aplicación. Tienes una instancia de Compute Engine en la misma región, pero en otra nube privada virtual (VPC), llamada gce­ network, que no tiene rangos de IP superpuestos con la primera VPC. Esta instancia necesita conectarse a la aplicación en GKE. Quieres minimizar el esfuerzo. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 61 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. En GKE, cree un Servicio de tipo LoadBalancer que utilice los Pods de la aplicación como backend. 2. Establezca la política de tráfico externo del servicio en Clúster. 3. Configure la instancia de Compute Engine para que utilice la dirección del balanceador de carga que se ha creado.",
      "1. En GKE, cree un Servicio de tipo NodePort que utilice los Pods de la aplicación como backend. 2. Cree una instancia de Compute Engine llamada proxy con dos interfaces de red, una en cada VPC. 3. Use iptables en esta instancia para reenviar el tráfico de gce­network a los nodos de GKE. 4. Configure la instancia de Compute Engine para que use la dirección de proxy en gce­network como punto final.",
      "1. En GKE, cree un Servicio de tipo LoadBalancer que utilice los Pods de la aplicación como backend. 2. Agregue una anotación a este servicio: cloud.google.com/load­balancer­type: Internal 3. Interconecte las dos VPC. 4. Configure la instancia de Compute Engine para que utilice la dirección del balanceador de carga que se ha creado.",
      "1. En GKE, cree un Servicio de tipo LoadBalancer que utilice los Pods de la aplicación como backend. 2. Agregue una política de seguridad de Cloud Armor al balanceador de carga que incluya en la lista blanca las IP internas de MIG. instancias. 3. Configure la instancia de Compute Engine para que utilice la dirección del balanceador de carga que tiene ha sido creado."
    ],
    "answer": "1. En GKE, cree un Servicio de tipo LoadBalancer que utilice los Pods de la aplicación como backend. 2. Agregue una anotación a este servicio: cloud.google.com/load­balancer­type: Internal 3. Interconecte las dos VPC. 4. Configure la instancia de Compute Engine para que utilice la dirección del balanceador de carga que se ha creado."
  },
  {
    "question": "Su organización es una empresa financiera que necesita almacenar archivos de registro de auditoría durante 3 años. Su organización cuenta con cientos de proyectos en Google Cloud. Necesita implementar una estrategia rentable para la retención de archivos de registro. ¿Qué debería hacer?",
    "options": [
      "Cree una exportación al destino que guarde los registros de Cloud Audit en BigQuery.",
      "Cree una exportación al destino que guarde los registros de Cloud Audit en un bucket de Coldline Storage.",
      "Escriba un script personalizado que utilice la API de registro para copiar los registros de Stackdriver a BigQuery.",
      "Exporte estos registros a Cloud Pub/Sub y cree una canalización de Cloud Dataflow para almacenar los registros en Cloud SQL."
    ],
    "answer": "Cree una exportación al destino que guarde los registros de Cloud Audit en un bucket de Coldline Storage."
  },
  {
    "question": "Desea ejecutar un único proxy inverso HTTP con caché en GCP para un sitio web con baja latencia. Este proxy inverso en particular consume muy poca CPU. Necesita una caché en memoria de 30 GB y 2 GB adicionales de memoria para el resto de los procesos. Su objetivo es minimizar los costos. ¿Cómo debería configurar este proxy inverso?",
    "options": [
      "Cree una instancia de Cloud Memorystore para Redis con una capacidad de 32 GB.",
      "Ejecútelo en Compute Engine y elija un tipo de instancia personalizada con 6 vCPU y 32 GB de memoria.",
      "Empaquételo en una imagen de contenedor y ejecútelo en Kubernetes Engine, utilizando instancias n1­standard­32. como nodos.",
      "Ejecútelo en Compute Engine, elija el tipo de instancia n1­standard­1 y agregue una unidad persistente SSD. disco de 32 GB."
    ],
    "answer": "Cree una instancia de Cloud Memorystore para Redis con una capacidad de 32 GB."
  },
  {
    "question": "Estás alojando una aplicación en servidores bare­metal en tu propio centro de datos. La aplicación necesita acceso al almacenamiento en la nube. Sin embargo, las políticas de seguridad impiden que los servidores que alojan la aplicación tener direcciones IP públicas o acceso a internet. Desea seguir las prácticas recomendadas por Google para que la aplicación tenga acceso a Cloud Storage. ¿Qué debe hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. Utilice nslookup para obtener la dirección IP de storage.googleapis.com. 2. Negocie con el equipo de seguridad para poder asignar una dirección IP pública a los servidores. 3. Permita únicamente el tráfico saliente de esos servidores hacia las direcciones IP de storage.googleapis.com.",
      "1. Utilizando Cloud VPN, cree un túnel VPN a una nube privada virtual (VPC) en Google Cloud. 2. En esta VPC, cree una instancia de Compute Engine e instale el servidor proxy Squid en dicha instancia. 3. Configure sus servidores para que utilicen esa instancia como proxy para acceder a Cloud Storage.",
      "1. Utilice Migrate for Compute Engine (anteriormente conocido como Velostrata) para migrar esos servidores a Compute Engine. 2. Cree un balanceador de carga interno (ILB) que utilice storage.googleapis.com como backend. 3. Configure sus nuevas instancias para que utilicen este ILB como proxy.",
      "1. Usando Cloud VPN o Interconnect, cree un túnel a una VPC en Google Cloud. 2. Use Cloud Router para crear un anuncio de ruta personalizado para 199.36.153.4/30. Anuncie esa red a su red local a través del túnel VPN. 3. En su red local, configure su DNS. El servidor debe resolver *.googleapis.com como un CNAME a restricted.googleapis.com."
    ],
    "answer": "1. Usando Cloud VPN o Interconnect, cree un túnel a una VPC en Google Cloud. 2. Use Cloud Router para crear un anuncio de ruta personalizado para 199.36.153.4/30. Anuncie esa red a su red local a través del túnel VPN. 3. En su red local, configure su DNS. El servidor debe resolver *.googleapis.com como un CNAME a restricted.googleapis.com."
  },
  {
    "question": "Quieres implementar una aplicación en Cloud Run que procese mensajes de un tema de Cloud Pub/Sub. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer?",
    "options": [
      "1. Crea una función en la nube que utilice un activador de Cloud Pub/Sub en ese tema. 2. Llama a tu aplicación en Cloud Run desde la función en la nube para cada mensaje.",
      "1. Otorgue el rol de suscriptor de Pub/Sub a la cuenta de servicio utilizada por Cloud Run. 2. Cree una suscripción de Cloud Pub/Sub para ese tema. 3. Configure su aplicación para que extraiga mensajes de esa suscripción.",
      "1. Cree una cuenta de servicio. 2. Asigne el rol de Invocador de Cloud Run a esa cuenta de servicio para su aplicación de Cloud Run. 3. Cree una suscripción de Cloud Pub/Sub que utilice esa cuenta de servicio y su aplicación de Cloud Run como punto final de envío.",
      "1. Implemente su aplicación en Cloud Run en GKE con la conectividad configurada como Interna. 2. Cree una suscripción a Cloud Pub/Sub para ese tema. 3. En el mismo clúster de Google Kubernetes Engine que su aplicación, implemente un contenedor que tome los mensajes y los envíe a su aplicación."
    ],
    "answer": "1. Cree una cuenta de servicio. 2. Asigne el rol de Invocador de Cloud Run a esa cuenta de servicio para su aplicación de Cloud Run. 3. Cree una suscripción de Cloud Pub/Sub que utilice esa cuenta de servicio y su aplicación de Cloud Run como punto final de envío."
  },
  {
    "question": "Necesitas implementar una aplicación, empaquetada en una imagen de contenedor, en un nuevo proyecto. La aplicación expone un punto final HTTP y recibe muy pocas solicitudes al día. Quieres minimizar los costos. ¿Qué deberías hacer?",
    "options": [
      "Implemente el contenedor en Cloud Run.",
      "Implemente el contenedor en Cloud Run en GKE.",
      "Implemente el contenedor en App Engine Flexible.",
      "Implemente el contenedor en GKE con el escalado automático del clúster y el escalado automático horizontal de pods habilitados."
    ],
    "answer": "Implemente el contenedor en Cloud Run."
  },
  {
    "question": "Su empresa ya cuenta con una organización de GCP con cientos de proyectos y una cuenta de facturación. Su empresa adquirió recientemente otra compañía que también cuenta con cientos de proyectos y su propia cuenta de facturación. Desea consolidar todos los costos de GCP de ambas organizaciones en una sola factura. Desea consolidar todos los costos a partir de mañana. ¿Qué debe hacer?",
    "options": [
      "Vincula los proyectos de la empresa adquirida a la cuenta de facturación de tu empresa.",
      "Configure la cuenta de facturación de la empresa adquirida y la cuenta de facturación de su empresa para exportar los datos de facturación al mismo conjunto de datos de BigQuery.",
      "Migre los proyectos de la empresa adquirida a la organización de GCP de su empresa. Vincule los proyectos migrados a la cuenta de facturación de su empresa.",
      "Cree una nueva organización de GCP y una nueva cuenta de facturación. Migre los proyectos de la empresa adquirida y los proyectos de su empresa a la nueva organización de GCP y vincule los proyectos a la nueva cuenta de facturación."
    ],
    "answer": "Vincula los proyectos de la empresa adquirida a la cuenta de facturación de tu empresa."
  },
  {
    "question": "Has creado una aplicación en Google Cloud que utiliza Cloud Spanner. Tu equipo de soporte necesita supervisar el entorno, pero no debería tener acceso a los datos de las tablas. Necesitas una solución optimizada de para otorgar los permisos correctos a su equipo de soporte y desea seguir las recomendaciones de Google. prácticas. ¿Qué deberías hacer?",
    "options": [
      "Agregue el grupo del equipo de soporte al rol roles/monitoring.viewer.",
      "Agregue el grupo del equipo de soporte al rol roles/spanner.databaseUser.",
      "Agregue el grupo del equipo de soporte al rol roles/spanner.databaseReader.",
      "Agregue el grupo del equipo de soporte al rol roles/stackdriver.accounts.viewer."
    ],
    "answer": "Agregue el grupo del equipo de soporte al rol roles/monitoring.viewer."
  },
  {
    "question": "Para fines de análisis, necesita enviar todos los registros de todas sus instancias de Compute Engine a un conjunto de datos de BigQuery llamado platform­logs. Ya ha instalado el agente de Cloud Logging en todas las instancias. Desea minimizar los costos. ¿Qué debería hacer?",
    "options": [
      "1. Asigne el rol de Editor de datos de BigQuery en el conjunto de datos platform­logs a las cuentas de servicio utilizadas por sus instancias. 2. Actualice los metadatos de sus instancias para agregar el siguiente valor: logs­destination: bq://platform­ logs.",
      "1. En Cloud Logging, cree una exportación de registros con un tema de Cloud Pub/Sub llamado logs como destino. 2. Cree una función en la nube que se active mediante mensajes en el tema de registros. 3. Configure esa función en la nube para que descarte los registros que no provengan de Compute Engine e inserte los registros de Compute Engine en el conjunto de datos platform­logs.",
      "1. En Registro en la nube, cree un filtro para ver solo los registros de Compute Engine. 2. Haga clic en Crear exportación. 3. Seleccione BigQuery como servicio de destino y el conjunto de datos platform­logs como destino final.",
      "1. Cree una función en la nube que tenga el rol de usuario de BigQuery en el conjunto de datos platform­logs. 2. Configure esta función de Cloud para crear un trabajo de BigQuery que ejecute esta consulta: INSERT INTO dataset.platform­ logs (timestamp, log) SELECT timestamp, log FROM compute.logs WHERE timestamp > DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) 3. Use Cloud Scheduler para activar esta función de Cloud una vez al día."
    ],
    "answer": "1. En Registro en la nube, cree un filtro para ver solo los registros de Compute Engine. 2. Haga clic en Crear exportación. 3. Seleccione BigQuery como servicio de destino y el conjunto de datos platform­logs como destino final."
  },
  {
    "question": "Estás usando Deployment Manager para crear un clúster de Google Kubernetes Engine. Con la misma implementación de Deployment Manager, también quieres crear un DaemonSet en el espacio de nombres kube­system del clúster. Buscas una solución que utilice la menor cantidad de servicios posible. ¿Qué deberías hacer?",
    "options": [
      "Agregue la API del clúster como un nuevo proveedor de tipos en el Administrador de despliegue y utilice el nuevo tipo para crear el DaemonSet.",
      "Utilice el Configurador de tiempo de ejecución del Administrador de despliegue para crear un nuevo recurso de configuración que contenga la definición de DaemonSet.",
      "Con Deployment Manager, cree una instancia de Compute Engine con un script de inicio que utilice kubectl para crear el DaemonSet.",
      "En la definición del clúster en Deployment Manager, agregue un metadato que tenga kube­system como clave y el manifiesto de DaemonSet como valor."
    ],
    "answer": "Agregue la API del clúster como un nuevo proveedor de tipos en el Administrador de despliegue y utilice el nuevo tipo para crear el DaemonSet."
  },
  {
    "question": "Estás desarrollando una aplicación que se ejecutará en tu centro de datos. La aplicación utilizará servicios de Google Cloud Platform (GCP), como AutoML. Has creado una cuenta de servicio con los permisos necesarios para AutoML. Necesitas habilitar la autenticación para las API desde tu entorno local. ¿Qué debes hacer?",
    "options": [
      "Utilice las credenciales de la cuenta de servicio en su aplicación local.",
      "Utilice gcloud para crear un archivo de clave para la cuenta de servicio que tenga los permisos adecuados.",
      "Configure una interconexión directa entre su centro de datos y Google Cloud Platform para habilitar Autenticación para sus aplicaciones locales.",
      "Acceda a la consola de administración de IAM, otorgue a la cuenta de usuario permisos similares a los de la cuenta de servicio y utilice esta cuenta de usuario para la autenticación desde su centro de datos."
    ],
    "answer": "Utilice gcloud para crear un archivo de clave para la cuenta de servicio que tenga los permisos adecuados."
  },
  {
    "question": "Estás utilizando Container Registry para almacenar centralmente las imágenes de contenedores de tu empresa en un proyecto separado. En otro proyecto, quieres crear un clúster de Google Kubernetes Engine (GKE). Quieres Para garantizar que Kubernetes pueda descargar imágenes desde Container Registry, ¿qué debe hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "En el proyecto donde se almacenan las imágenes, asigne el rol de IAM de Visor de objetos de almacenamiento a la cuenta de servicio utilizada por los nodos de Kubernetes.",
      "Al crear el clúster de GKE, seleccione la opción \"Permitir acceso completo a todas las API de Cloud\" en \"Ámbitos de acceso\".",
      "Cree una cuenta de servicio y otórguele acceso a Cloud Storage. Cree una clave P12 para esta cuenta de servicio y úsela como imagePullSecrets en Kubernetes.",
      "Configure las ACL de cada imagen en Cloud Storage para otorgar acceso de solo lectura a la cuenta de servicio predeterminada de Compute Engine."
    ],
    "answer": "En el proyecto donde se almacenan las imágenes, asigne el rol de IAM de Visor de objetos de almacenamiento a la cuenta de servicio utilizada por los nodos de Kubernetes."
  },
  {
    "question": "Implementaste una nueva aplicación en tu clúster de Google Kubernetes Engine usando el archivo YAML que se especifica a continuación. Verificas el estado de los pods implementados y observas que uno de ellos aún está en estado PENDIENTE. Quieres averiguar por qué el pod está atascado en estado pendiente. ¿Qué debes hacer?",
    "options": [
      "Revise los detalles del objeto de servicio myapp­service y compruebe si hay mensajes de error.",
      "Revise los detalles del objeto de implementación myapp­deployment y compruebe si hay mensajes de error.",
      "Revise los detalles del Pod myapp­deployment­58ddbbb995­lp86m y compruebe si hay mensajes de advertencia.",
      "Consulte los registros del contenedor en el pod myapp­deployment­58ddbbb995­lp86m y compruebe si hay mensajes de advertencia."
    ],
    "answer": "Revise los detalles del Pod myapp­deployment­58ddbbb995­lp86m y compruebe si hay mensajes de advertencia."
  },
  {
    "question": "Estás configurando una máquina virtual de Windows en Compute Engine y quieres asegurarte de poder iniciar sesión en ella mediante RDP. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Una vez creada la máquina virtual, utilice las credenciales de su cuenta de Google para iniciar sesión en ella.",
      "Una vez creada la máquina virtual, utilice gcloud compute reset­windows­password para recuperar las credenciales de inicio de sesión de la máquina virtual.",
      "Al crear la máquina virtual, agregue metadatos a la instancia utilizando 'windows­password' como clave y una contraseña como valor.",
      "Una vez creada la máquina virtual, descargue la clave privada JSON de la cuenta de servicio predeterminada de Compute Engine. Utilice las credenciales del archivo JSON para iniciar sesión en la máquina virtual."
    ],
    "answer": "Una vez creada la máquina virtual, utilice gcloud compute reset­windows­password para recuperar las credenciales de inicio de sesión de la máquina virtual."
  },
  {
    "question": "Desea configurar una conexión SSH a una única instancia de Compute Engine para los usuarios del grupo dev1. Esta instancia es el único recurso en este proyecto específico de Google Cloud Platform al que los usuarios dev1 deberían poder conectarse. ¿Qué debe hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Establezca los metadatos en enable­oslogin=true para la instancia. Otorgue al grupo dev1 el rol compute.osLogin. Indíqueles que utilicen Cloud Shell para conectarse mediante SSH a esa instancia.",
      "Establezca los metadatos en enable­oslogin=true para la instancia. Establezca la cuenta de servicio en ninguna cuenta de servicio para esa instancia. Indíqueles que utilicen Cloud Shell para conectarse a esa instancia mediante SSH.",
      "Habilite las claves de bloque para todo el proyecto en la instancia. Genere una clave SSH para cada usuario del grupo dev1. Distribuya las claves a los usuarios de dev1 e indíqueles que utilicen sus herramientas de terceros para conectarse.",
      "Habilitar claves de bloque para todo el proyecto para la instancia. Generar una clave SSH y asociar la clave con ese caso. Distribuye la clave a los usuarios dev1 y dirígelos a que utilicen sus herramientas de terceros para conectar."
    ],
    "answer": "Establezca los metadatos en enable­oslogin=true para la instancia. Otorgue al grupo dev1 el rol compute.osLogin. Indíqueles que utilicen Cloud Shell para conectarse mediante SSH a esa instancia."
  },
  {
    "question": "Necesitas generar una lista de las API de Google Cloud Platform habilitadas para un proyecto de GCP usando la línea de comandos gcloud en Cloud Shell. El nombre del proyecto es my­project. ¿Qué debes hacer?",
    "options": [
      "Ejecute gcloud projects list para obtener el ID del proyecto y luego ejecute gcloud services list ­­project .",
      "Ejecute gcloud init para establecer el proyecto actual en my­project y luego ejecute gcloud services list ­­ disponible. .",
      "Ejecute gcloud info para ver el valor de la cuenta y, a continuación, ejecute gcloud services list ­­account.",
      "Ejecute gcloud projects describe para verificar el valor del proyecto y, a continuación, ejecute gcloud services list ­­ disponible."
    ],
    "answer": "Ejecute gcloud projects list para obtener el ID del proyecto y luego ejecute gcloud services list ­­project ."
  },
  {
    "question": "Estás creando una nueva versión de una aplicación alojada en un entorno de App Engine. Quieres probar la nueva versión con el 1 % de los usuarios antes de migrar completamente tu aplicación a la nueva versión. ¿Qué deberías hacer?",
    "options": [
      "Implemente una nueva versión de su aplicación en Google Kubernetes Engine en lugar de App Engine y luego use la consola de GCP para dividir el tráfico.",
      "Implemente una nueva versión de su aplicación en una instancia de Compute Engine en lugar de App Engine y luego use la consola de GCP para dividir el tráfico.",
      "Implementa una nueva versión como una aplicación independiente en App Engine. Luego, configura App Engine mediante la consola de GCP para dividir el tráfico entre las dos aplicaciones.",
      "Implementa una nueva versión de tu aplicación en App Engine. Luego, ve a la configuración de App Engine en la consola de GCP y distribuye el tráfico entre la versión actual y las versiones recién implementadas según corresponda."
    ],
    "answer": "Implementa una nueva versión de tu aplicación en App Engine. Luego, ve a la configuración de App Engine en la consola de GCP y distribuye el tráfico entre la versión actual y las versiones recién implementadas según corresponda."
  },
  {
    "question": "Necesitas proporcionar una estimación de costos para un clúster de Kubernetes utilizando la calculadora de precios de GCP para Kubernetes. Tu carga de trabajo requiere un alto rendimiento de E/S por segundo (IOPS) y también utilizarás instantáneas de disco. Comienzas ingresando el número de nodos, las horas promedio y los días promedio. ¿Qué debe hacer a continuación?",
    "options": [
      "Complete la unidad SSD local. Complete el almacenamiento de disco persistente y el almacenamiento de instantáneas.",
      "Complete la información del SSD local. Añada el coste estimado de la gestión del clúster.",
      "Seleccione Agregar GPU. Complete el almacenamiento en disco persistente y el almacenamiento de instantáneas.",
      "Seleccione Agregar GPU. Agregue el costo estimado para la administración del clúster."
    ],
    "answer": "Complete la unidad SSD local. Complete el almacenamiento de disco persistente y el almacenamiento de instantáneas."
  },
  {
    "question": "Estás utilizando Google Kubernetes Engine con el escalado automático habilitado para alojar una nueva aplicación. Quieres exponer esta nueva aplicación al público mediante HTTPS en una dirección IP pública. ¿Qué debes hacer?",
    "options": [
      "Cree un servicio de Kubernetes de tipo NodePort para su aplicación y un Ingress de Kubernetes para exponer este servicio a través de un Cloud Load Balancer.",
      "Cree un servicio de Kubernetes de tipo ClusterIP para su aplicación. Configure el nombre DNS público de su aplicación utilizando la IP de este servicio.",
      "Cree un servicio de Kubernetes de tipo NodePort para exponer la aplicación en el puerto 443 de cada nodo. del clúster de Kubernetes. Configure el nombre DNS público de su aplicación con la IP de cada nodo del clúster para lograr el equilibrio de carga.",
      "Cree un pod HAProxy en el clúster para equilibrar la carga del tráfico entre todos los pods de la aplicación. Reenvía el tráfico público a HAProxy con una regla de iptables. Configura el nombre DNS de tu aplicación usando la IP pública del nodo donde se ejecuta HAProxy."
    ],
    "answer": "Cree un servicio de Kubernetes de tipo NodePort para su aplicación y un Ingress de Kubernetes para exponer este servicio a través de un Cloud Load Balancer."
  },
  {
    "question": "Necesitas habilitar el tráfico entre varios grupos de instancias de Compute Engine que actualmente ejecutan dos proyectos diferentes de GCP. Cada grupo de instancias de Compute Engine se ejecuta en su propia VPC. ¿Qué debes hacer?",
    "options": [
      "Verifique que ambos proyectos estén en una organización de GCP. Cree una nueva VPC y agregue todas las instancias.",
      "Verifique que ambos proyectos estén en una organización de GCP. Comparta la VPC de un proyecto y solicite que las instancias de Compute Engine en el otro proyecto utilicen esta VPC compartida.",
      "Verifique que usted sea el administrador del proyecto de ambos proyectos. Cree dos nuevas VPC y agregue todas las instancias.",
      "Verifique que usted sea el administrador del proyecto de ambos proyectos. Cree una nueva VPC y agregue todas las instancias."
    ],
    "answer": "Verifique que ambos proyectos estén en una organización de GCP. Comparta la VPC de un proyecto y solicite que las instancias de Compute Engine en el otro proyecto utilicen esta VPC compartida."
  },
  {
    "question": "Desea agregar un nuevo auditor a un proyecto de Google Cloud Platform. El auditor debe tener permisos para leer, pero no para modificar, todos los elementos del proyecto. ¿Cómo debe configurar los permisos del auditor? Discusión sobre el tema 1 de la pregunta 81 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un rol personalizado con permisos de solo lectura para el proyecto. Agregue la cuenta del usuario al rol personalizado.",
      "Cree un rol personalizado con permisos de servicio de solo lectura. Agregue la cuenta del usuario al rol personalizado.",
      "Seleccione el rol integrado de Visor de proyectos de IAM. Agregue la cuenta del usuario a este rol.",
      "Seleccione el rol de Visor del servicio IAM integrado. Agregue la cuenta del usuario a este rol."
    ],
    "answer": "Seleccione el rol integrado de Visor de proyectos de IAM. Agregue la cuenta del usuario a este rol."
  },
  {
    "question": "Usted administra un clúster de Google Kubernetes Engine (GKE) para su empresa donde diferentes equipos pueden ejecutar cargas de trabajo que no son de producción. Su equipo de aprendizaje automático (ML) necesita acceso a GPU Nvidia Tesla P100 para entrenar sus modelos. Desea minimizar el esfuerzo y el costo. ¿Qué debería hacer? ¿tú haces? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Pida a su equipo de ML que añada la anotación ג€accelerator: gpuג€ a la especificación de su pod.",
      "Recrear todos los nodos del clúster GKE para habilitar las GPU en todos ellos.",
      "Crea tu propio clúster de Kubernetes sobre Compute Engine con nodos que tengan GPU. Dedica este clúster a tu equipo de aprendizaje automático.",
      "Agregue un nuevo grupo de nodos habilitados para GPU al clúster de GKE. Pida a su equipo de ML que agregue el selector de nodos cloud.google.com/gke ­accelerator: nvidia­tesla­p100 a la especificación de su pod."
    ],
    "answer": "Agregue un nuevo grupo de nodos habilitados para GPU al clúster de GKE. Pida a su equipo de ML que agregue el selector de nodos cloud.google.com/gke ­accelerator: nvidia­tesla­p100 a la especificación de su pod."
  },
  {
    "question": "Sus máquinas virtuales se ejecutan en una subred con máscara de subred 255.255.255.240. La subred actual no tiene más direcciones IP libres y necesita 10 direcciones IP adicionales para nuevas máquinas virtuales. Las máquinas virtuales existentes y las nuevas deberían poder comunicarse entre sí sin rutas adicionales. ¿Qué debería ¿tú haces?",
    "options": [
      "Utilice gcloud para ampliar el rango de IP de la subred actual.",
      "Elimine la subred y vuelva a crearla utilizando un rango más amplio de direcciones IP.",
      "Crea un nuevo proyecto. Usa una VPC compartida para compartir la red actual con el nuevo proyecto.",
      "Cree una nueva subred con la misma IP inicial pero un rango más amplio para sobrescribir la subred actual."
    ],
    "answer": "Utilice gcloud para ampliar el rango de IP de la subred actual."
  },
  {
    "question": "Tu organización utiliza G Suite para la comunicación y la colaboración. Todos los usuarios de tu organización tienen una cuenta de G Suite. Quieres otorgar acceso a algunos usuarios de G Suite a tu proyecto de Cloud Platform. ¿Qué debes hacer?",
    "options": [
      "Habilite la función Identidad en la nube en la consola de GCP para su dominio.",
      "Otórgueles los roles de IAM necesarios utilizando su dirección de correo electrónico de G Suite.",
      "Crea una hoja de cálculo CSV con las direcciones de correo electrónico de todos los usuarios. Utiliza la herramienta de línea de comandos gcloud para convertirlas en cuentas de Google Cloud Platform.",
      "En la consola de G Suite, agregue a los usuarios a un grupo especial llamado [email protected]. Confíe en el comportamiento predeterminado de la plataforma en la nube para otorgar acceso a los usuarios que sean miembros de este grupo."
    ],
    "answer": "Otórgueles los roles de IAM necesarios utilizando su dirección de correo electrónico de G Suite."
  },
  {
    "question": "Tienes una cuenta de Google Cloud Platform con acceso a proyectos de producción y desarrollo. Necesitas crear un proceso automatizado para listar diariamente todas las instancias de computación en los proyectos de desarrollo y producción. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Crea dos configuraciones usando gcloud config. Escribe un script que active las configuraciones individualmente. Para cada configuración, usa gcloud compute instances list para obtener una lista de instancias de cómputo. recursos.",
      "Crea dos configuraciones usando gsutil config. Escribe un script que establezca las configuraciones como activas, individualmente. Para cada configuración, usa gsutil compute instances list para obtener una lista de instancias de computación. recursos.",
      "Acceda a Cloud Shell y exporte esta información a Cloud Storage diariamente.",
      "Acceda a la consola de GCP y exporte esta información a Cloud SQL diariamente."
    ],
    "answer": "Crea dos configuraciones usando gcloud config. Escribe un script que active las configuraciones individualmente. Para cada configuración, usa gcloud compute instances list para obtener una lista de instancias de cómputo. recursos."
  },
  {
    "question": "Tienes un archivo AVRO de 5 TB almacenado en un bucket de Cloud Storage. Tus analistas solo dominan SQL y necesitan acceder a los datos de este archivo. Quieres encontrar una forma rentable de atender su solicitud lo antes posible. ¿Qué deberías hacer?",
    "options": [
      "Cargue los datos en Cloud Datastore y ejecute una consulta SQL sobre ellos.",
      "Crea una tabla en BigQuery y carga los datos en BigQuery. Ejecuta una consulta SQL en esta tabla y elimínala una vez que hayas completado tu solicitud.",
      "Cree tablas externas en BigQuery que apunten a depósitos de Cloud Storage y ejecute una consulta SQL en estas tablas externas para completar su solicitud.",
      "Cree un clúster de Hadoop y copie el archivo AVRO a NDFS comprimiéndolo. Cargue el archivo en una tabla de Hive y otorgue acceso a sus analistas para que puedan ejecutar consultas SQL."
    ],
    "answer": "Cree tablas externas en BigQuery que apunten a depósitos de Cloud Storage y ejecute una consulta SQL en estas tablas externas para completar su solicitud."
  },
  {
    "question": "Debes verificar que se haya creado una cuenta de servicio de Google Cloud Platform en un momento determinado. ¿Qué deberías hacer?",
    "options": [
      "Filtre el registro de actividad para ver la categoría Configuración. Filtre el tipo de recurso a Cuenta de servicio.",
      "Filtre el registro de actividad para ver la categoría Configuración. Filtre el tipo de recurso a Proyecto de Google.",
      "Filtre el registro de actividad para ver la categoría Acceso a datos. Filtre el tipo de recurso a Cuenta de servicio.",
      "Filtre el registro de actividad para ver la categoría Acceso a datos. Filtre el tipo de recurso a Proyecto de Google."
    ],
    "answer": "Filtre el registro de actividad para ver la categoría Configuración. Filtre el tipo de recurso a Cuenta de servicio."
  },
  {
    "question": "Has implementado un servidor LDAP en Compute Engine al que se puede acceder mediante TLS a través del puerto 636 usando UDP. Quieres asegurarte de que los clientes puedan acceder a él a través de ese puerto. ¿Qué debes hacer?",
    "options": [
      "Agregue la etiqueta de red allow­udp­636 a la instancia de máquina virtual que ejecuta el servidor LDAP.",
      "Cree una ruta llamada allow­udp­636 y configure el siguiente salto para que sea la instancia de VM que ejecuta el servidor LDAP.",
      "Agregue una etiqueta de red de su elección a la instancia. Cree una regla de firewall para permitir el acceso entrante al puerto UDP 636 para esa etiqueta de red.",
      "Agregue una etiqueta de red de su elección a la instancia que ejecuta el servidor LDAP. Cree una regla de firewall. para permitir la salida por el puerto UDP 636 para esa etiqueta de red."
    ],
    "answer": "Agregue una etiqueta de red de su elección a la instancia. Cree una regla de firewall para permitir el acceso entrante al puerto UDP 636 para esa etiqueta de red."
  },
  {
    "question": "Debes configurar una alerta presupuestaria para el uso de los servicios de Compute Engineer en uno de los tres proyectos de Google Cloud Platform que administras. Los tres proyectos están vinculados a una única cuenta de facturación. ¿Qué deberías hacer?",
    "options": [
      "Verifique que usted sea el administrador de facturación del proyecto. Seleccione la cuenta de facturación asociada y cree un presupuesto y una alerta para el proyecto correspondiente.",
      "Verifique que usted sea el administrador de facturación del proyecto. Seleccione la cuenta de facturación asociada y cree un presupuesto y una alerta personalizada.",
      "Verifique que usted es el administrador del proyecto. Seleccione la cuenta de facturación asociada y cree un presupuesto para el proyecto correspondiente.",
      "Verifique que usted es el administrador del proyecto. Seleccione la cuenta de facturación asociada y cree un presupuesto y una alerta personalizada."
    ],
    "answer": "Verifique que usted sea el administrador de facturación del proyecto. Seleccione la cuenta de facturación asociada y cree un presupuesto y una alerta para el proyecto correspondiente."
  },
  {
    "question": "Está migrando una aplicación local crítica para la producción que requiere 96 vCPU para funcionar. Su tarea. Quieres asegurarte de que la aplicación se ejecute en un entorno similar en GCP. ¿Qué debes hacer?",
    "options": [
      "Al crear la máquina virtual, utilice el tipo de máquina n1­standard­96.",
      "Al crear la máquina virtual, utilice Intel Skylake como plataforma de CPU.",
      "Cree la máquina virtual utilizando la configuración predeterminada de Compute Engine. Use gcloud para modificar la instancia en ejecución para que tenga 96 vCPU.",
      "Inicie la máquina virtual con la configuración predeterminada de Compute Engine y ajústela según sea necesario, siguiendo las recomendaciones de dimensionamiento."
    ],
    "answer": "Al crear la máquina virtual, utilice el tipo de máquina n1­standard­96."
  },
  {
    "question": "Desea configurar una solución para archivar datos en un bucket de Cloud Storage. La solución debe ser Rentable. Los datos con múltiples versiones deben archivarse después de 30 días. Se accede a las versiones anteriores una vez al mes para la elaboración de informes. Estos datos archivados también se actualizan ocasionalmente a fin de mes. ¿Qué deberías hacer?",
    "options": [
      "Agregue una regla de ciclo de vida del bucket que archive los datos con versiones más recientes después de 30 días en Coldline Storage.",
      "Agregue una regla de ciclo de vida del bucket que archive los datos con versiones más recientes después de 30 días en Nearline Storage.",
      "Agregue una regla de ciclo de vida del bucket que archive los datos del almacenamiento regional después de 30 días en Coldline Storage.",
      "Agregue una regla de ciclo de vida del bucket que archive los datos del almacenamiento regional después de 30 días en Nearline Storage."
    ],
    "answer": "Agregue una regla de ciclo de vida del bucket que archive los datos con versiones más recientes después de 30 días en Nearline Storage."
  },
  {
    "question": "La infraestructura de su empresa se encuentra en sus propias instalaciones, pero todas las máquinas están funcionando a su máxima capacidad. Quieres migrar a Google Cloud. Las cargas de trabajo en Google Cloud deben poder comunicarse directamente con las cargas de trabajo locales mediante un rango de direcciones IP privadas. ¿Qué debes hacer?",
    "options": [
      "En Google Cloud, configure la VPC como host para VPC compartida.",
      "En Google Cloud, configure la VPC para el emparejamiento de redes VPC.",
      "Cree servidores bastión tanto en su entorno local como en Google Cloud. Configure ambos como servidores proxy utilizando sus direcciones IP públicas.",
      "Configure una VPN en la nube entre la infraestructura local y Google Cloud."
    ],
    "answer": "Configure una VPN en la nube entre la infraestructura local y Google Cloud."
  },
  {
    "question": "Desea seleccionar y configurar una solución para almacenar y archivar datos en Google Cloud Platform. Necesita cumplir con los objetivos de cumplimiento normativo para datos de una ubicación geográfica específica. Estos datos se archivan después de 30 días y se debe acceder a ellos anualmente. ¿Qué debe hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Seleccione Almacenamiento multirregional. Agregue una regla de ciclo de vida del bucket que archive los datos después de 30 días en Coldline Storage.",
      "Seleccione Almacenamiento multirregional. Agregue una regla de ciclo de vida del bucket que archive los datos después de 30 días en Almacenamiento Nearline.",
      "Seleccione Almacenamiento regional. Agregue una regla de ciclo de vida del bucket que archive los datos después de 30 días en Almacenamiento Nearline.",
      "Seleccione Almacenamiento regional. Agregue una regla de ciclo de vida del bucket que archive los datos después de 30 días en Coldline. Almacenamiento."
    ],
    "answer": "Seleccione Almacenamiento regional. Agregue una regla de ciclo de vida del bucket que archive los datos después de 30 días en Coldline. Almacenamiento."
  },
  {
    "question": "Tu empresa utiliza BigQuery para el almacenamiento de datos. Con el tiempo, diversas unidades de negocio han creado más de 1000 conjuntos de datos en cientos de proyectos. Tu director de informática (CIO) te pide que examines todos los conjuntos de datos para encontrar tablas que contengan la columna employee_ssn. Quieres minimizar el esfuerzo necesario para realizar esta tarea. ¿Qué deberías hacer?",
    "options": [
      "Vaya al Catálogo de datos y busque employee_ssn en el cuadro de búsqueda.",
      "Escribe un script de shell que utilice la herramienta de línea de comandos bq para recorrer todos los proyectos de tu organización.",
      "Escriba un script que recorra todos los proyectos de su organización y ejecute una consulta en la vista INFORMATION_SCHEMA.COLUMNS para encontrar la columna employee_ssn.",
      "Escriba un trabajo de Cloud Dataflow que recorra todos los proyectos de su organización y ejecute una consulta en la vista INFORMATION_SCHEMA.COLUMNS para encontrar la columna employee_ssn."
    ],
    "answer": "Vaya al Catálogo de datos y busque employee_ssn en el cuadro de búsqueda."
  },
  {
    "question": "Usted crea un despliegue con 2 réplicas en un clúster de Google Kubernetes Engine que tiene un único grupo de nodos preemptivos. Después de unos minutos, usa kubectl para examinar el estado de su Pod y observa que uno de ellos todavía está en estado Pendiente: ¿Cuál es la causa más probable? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Las solicitudes de recursos del Pod pendientes son demasiado grandes para caber en un solo nodo del clúster.",
      "Ya hay demasiados Pods en ejecución en el clúster y no quedan suficientes recursos para programar el Pod pendiente.",
      "El grupo de nodos está configurado con una cuenta de servicio que no tiene permiso para descargar la imagen del contenedor utilizada por el Pod pendiente.",
      "El Pod pendiente se programó originalmente en un nodo que fue interrumpido entre la creación del Deployment y la verificación del estado de los Pods. Actualmente se está reprogramando en un nuevo nodo."
    ],
    "answer": "Ya hay demasiados Pods en ejecución en el clúster y no quedan suficientes recursos para programar el Pod pendiente."
  },
  {
    "question": "¿Quieres saber cuándo se agregaron usuarios a los roles de Cloud Spanner Identity Access Management (IAM) en tu proyecto de Google Cloud Platform (GCP)? ¿Qué debes hacer en la consola de GCP?",
    "options": [
      "Abra la consola de Cloud Spanner para revisar las configuraciones.",
      "Abra la consola de administración de IAM para revisar las políticas de IAM para los roles de Cloud Spanner.",
      "Acceda a la consola de Stackdriver Monitoring y revise la información de Cloud Spanner.",
      "Acceda a la consola de registro de Stackdriver, revise los registros de actividad del administrador y fíltrelos por roles de IAM de Cloud Spanner."
    ],
    "answer": "Acceda a la consola de registro de Stackdriver, revise los registros de actividad del administrador y fíltrelos por roles de IAM de Cloud Spanner."
  },
  {
    "question": "Su empresa implementó BigQuery como almacén de datos empresarial. Usuarios de diversas unidades de negocio realizan consultas en este almacén de datos. Sin embargo, observa que los costos de las consultas en BigQuery son muy elevados y necesita controlarlos. ¿Qué dos métodos debería utilizar? (Elige dos.)",
    "options": [
      "Dividir a los usuarios de las unidades de negocio en varios proyectos.",
      "Aplique una cuota de consulta personalizada a nivel de usuario o de proyecto para el almacén de datos BigQuery.",
      "Cree copias separadas de su almacén de datos BigQuery para cada unidad de negocio.",
      "Divida su almacén de datos BigQuery en varios almacenes de datos para cada unidad de negocio.",
      "Cambie su modelo de consulta de BigQuery de bajo demanda a tarifa plana. Asigne la cantidad adecuada de ranuras a cada proyecto."
    ],
    "answer": "Aplique una cuota de consulta personalizada a nivel de usuario o de proyecto para el almacén de datos BigQuery. | Cambie su modelo de consulta de BigQuery de bajo demanda a tarifa plana. Asigne la cantidad adecuada de ranuras a cada proyecto."
  },
  {
    "question": "Estás desarrollando un producto sobre Google Kubernetes Engine (GKE). Tienes un único clúster de GKE. Para cada uno de tus clientes, se ejecuta un Pod en ese clúster, y tus clientes pueden ejecutar código arbitrario dentro de su Pod. Quieres maximizar el aislamiento entre los Pods de tus clientes. ¿Qué deberías hacer?",
    "options": [
      "Utilice la autorización binaria y añada a la lista blanca únicamente las imágenes de contenedor utilizadas por los Pods de sus clientes.",
      "Utilice la API de análisis de contenedores para detectar vulnerabilidades en los contenedores utilizados por los Pods de sus clientes.",
      "Cree un grupo de nodos de GKE con un tipo de entorno aislado configurado en gvisor. Agregue el parámetro runtimeClassName: gvisor según la especificación de los Pods de sus clientes.",
      "Utilice la imagen cos_containerd para sus nodos GKE. Añada un nodeSelector con el valor cloud.google.com/gke­os­ distribution: cos_containerd a la especificación de los Pods de sus clientes."
    ],
    "answer": "Cree un grupo de nodos de GKE con un tipo de entorno aislado configurado en gvisor. Agregue el parámetro runtimeClassName: gvisor según la especificación de los Pods de sus clientes."
  },
  {
    "question": "Su cliente ha implementado una solución que utiliza Cloud Spanner y ha detectado problemas de rendimiento relacionados con la latencia de lectura en una tabla. Esta tabla solo es accesible para sus usuarios mediante una clave primaria. El esquema de la tabla se muestra a continuación. Desea solucionar el problema. ¿Qué debería hacer?",
    "options": [
      "Eliminar el campo profile_picture de la tabla.",
      "Agregue un índice secundario en la columna person_id.",
      "Modifique la clave primaria para que no tenga valores monótonamente crecientes.",
      "Cree un índice secundario utilizando el siguiente lenguaje de definición de datos (DDL):"
    ],
    "answer": "Modifique la clave primaria para que no tenga valores monótonamente crecientes."
  },
  {
    "question": "Tu equipo de finanzas quiere ver el informe de facturación de tus proyectos. Quieres asegurarte de que no obtengan permisos adicionales para acceder al proyecto. ¿Qué debes hacer?",
    "options": [
      "Agregue el grupo para el equipo de finanzas al rol de usuario de facturación/roles.",
      "Agregue el grupo para el equipo de finanzas al rol de administrador de facturación/roles.",
      "Agregue el grupo para el equipo de finanzas al rol de visualización de facturación/roles.",
      "Agregue el grupo para el equipo de finanzas a roles/proyecto de facturación/rol de gerente."
    ],
    "answer": "Agregue el grupo para el equipo de finanzas al rol de visualización de facturación/roles."
  },
  {
    "question": "Tu organización tiene requisitos estrictos para controlar el acceso a los proyectos de Google Cloud. Necesitas que tus ingenieros de confiabilidad del sitio (SRE) aprueben las solicitudes del equipo de soporte de Google Cloud cuando un SRE abra un caso de soporte. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 101 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Agregue sus SRE al rol roles/iam.roleAdmin.",
      "Agregue sus SRE al rol roles/accessapproval.approver.",
      "Agregue sus SRE a un grupo y luego agregue este grupo a roles/iam.roleAdmin.role.",
      "Agregue sus SRE a un grupo y luego agregue este grupo al rol roles/accessapproval.approver."
    ],
    "answer": "Agregue sus SRE a un grupo y luego agregue este grupo al rol roles/accessapproval.approver."
  },
  {
    "question": "Necesitas alojar una aplicación en una instancia de Compute Engine en un proyecto compartido con otros equipos. Quieres evitar que los demás equipos provoquen accidentalmente tiempos de inactividad en esa aplicación. ¿Qué función deberías usar? Discusión sobre el tema 1 de la pregunta 102 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice una máquina virtual protegida.",
      "Utilice una máquina virtual interrumpible.",
      "Utilice un nodo de inquilino único.",
      "Habilitar la protección contra eliminación en la instancia."
    ],
    "answer": "Habilitar la protección contra eliminación en la instancia."
  },
  {
    "question": "Su organización necesita otorgar a los usuarios acceso para consultar conjuntos de datos en BigQuery, pero evitar que los eliminen accidentalmente. Busca una solución que siga las prácticas recomendadas por Google. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 103 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Agregue usuarios solo al rol de usuario de roles/bigquery, en lugar de roles/bigquery dataOwner.",
      "Agregue usuarios solo al rol roles/bigquery dataEditor, en lugar de roles/bigquery dataOwner.",
      "Cree un rol personalizado eliminando los permisos de eliminación y agregue usuarios solo a ese rol.",
      "Cree un rol personalizado eliminando los permisos de eliminación. Agregue usuarios al grupo y luego agregue el grupo al rol personalizado."
    ],
    "answer": "Cree un rol personalizado eliminando los permisos de eliminación. Agregue usuarios al grupo y luego agregue el grupo al rol personalizado."
  },
  {
    "question": "Tienes un portátil de desarrollador con el SDK de Cloud instalado en Ubuntu. El SDK de Cloud se instaló desde el repositorio de paquetes de Google Cloud para Ubuntu. Quieres probar tu aplicación localmente en tu portátil con Cloud Datastore. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 104 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Exportar datos de Cloud Datastore usando gcloud datastore export.",
      "Cree un índice de Cloud Datastore usando gcloud datastore indexes create.",
      "Instale el componente google­cloud­sdk­datastore­emulator usando el comando apt get install.",
      "Instale el componente cloud­datastore­emulator usando el comando gcloud components install."
    ],
    "answer": "Instale el componente google­cloud­sdk­datastore­emulator usando el comando apt get install."
  },
  {
    "question": "Tu empresa ha implementado una compleja estructura organizativa en Google Cloud. Esta estructura incluye cientos de carpetas y proyectos. Solo unos pocos miembros del equipo deberían poder ver la estructura jerárquica. Necesitas asignarles permisos mínimos y seguir las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 105 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Agregar los usuarios a roles/roles de navegador.",
      "Agregue los usuarios al rol roles/iam.roleViewer.",
      "Agregue los usuarios a un grupo y agregue este grupo a roles/navegador.",
      "Agregue los usuarios a un grupo y agregue este grupo al rol roles/iam.roleViewer."
    ],
    "answer": "Agregue los usuarios a un grupo y agregue este grupo a roles/navegador."
  },
  {
    "question": "Su empresa cuenta con un proveedor de identidad de inicio de sesión único (SSO) que admite la integración del lenguaje de marcado de aserción de seguridad (SAML) con proveedores de servicios. Su empresa tiene usuarios en Cloud Identity. Desea que los usuarios se autentiquen mediante el proveedor de SSO de su empresa. ¿Qué debe hacer? Discusión sobre el tema 1 de la pregunta 106 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "En Cloud Identity, configure el inicio de sesión único (SSO) con Google como proveedor de identidad para acceder a las aplicaciones SAML personalizadas.",
      "En Cloud Identity, configure el inicio de sesión único (SSO) con un proveedor de identidad de terceros y con Google como proveedor de servicios.",
      "Obtenga las credenciales de OAuth 2.0, configure la pantalla de consentimiento del usuario y configure OAuth 2.0 para aplicaciones móviles y de escritorio.",
      "Obtener las credenciales de OAuth 2.0, configurar la pantalla de consentimiento del usuario y configurar OAuth 2.0 para aplicaciones de servidor web."
    ],
    "answer": "En Cloud Identity, configure el inicio de sesión único (SSO) con un proveedor de identidad de terceros y con Google como proveedor de servicios."
  },
  {
    "question": "Su organización cuenta con una persona dedicada a crear y administrar todas las cuentas de servicio para los proyectos de Google Cloud. Debe asignarle a esta persona el rol mínimo para los proyectos. ¿Qué debe hacer?",
    "options": [
      "Agregue el usuario al rol roles/iam.roleAdmin.",
      "Agregue el usuario al rol roles/iam.securityAdmin.",
      "Agregue el usuario al rol roles/iam.serviceAccountUser.",
      "Agregue el usuario al rol roles/iam.serviceAccountAdmin."
    ],
    "answer": "Agregue el usuario al rol roles/iam.serviceAccountAdmin."
  },
  {
    "question": "Estás creando una solución de archivado para tu almacén de datos y has seleccionado el almacenamiento en la nube para archivar tus datos. Tus usuarios necesitan acceder a estos datos archivados una vez al trimestre para cumplir con ciertos requisitos normativos. Quieres elegir una opción rentable. ¿Qué opción de almacenamiento deberías usar? Discusión sobre el tema 1 de la pregunta 108 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Almacenamiento en frío",
      "Almacenamiento Nearline",
      "Almacenamiento regional",
      "Almacenamiento multirregional"
    ],
    "answer": "Almacenamiento en frío"
  },
  {
    "question": "Un equipo de científicos de datos necesita usar ocasionalmente un clúster de Google Kubernetes Engine (GKE) que usted administra. Requieren GPU para algunas tareas de larga duración que no se pueden reiniciar. Usted desea minimizar los costos. ¿Qué debería hacer?",
    "options": [
      "Habilitar el aprovisionamiento automático de nodos en el clúster GKE.",
      "Cree un VerticalPodAutscaler para esas cargas de trabajo.",
      "Cree un grupo de nodos con máquinas virtuales interrumpibles y GPU conectadas a esas máquinas virtuales.",
      "Cree un grupo de nodos de instancias con GPU y habilite el escalado automático en este grupo de nodos con un tamaño mínimo de 1."
    ],
    "answer": "Habilitar el aprovisionamiento automático de nodos en el clúster GKE."
  },
  {
    "question": "Su organización tiene identidades de usuario en Active Directory. Su organización desea utilizar Active Directory como fuente principal de identidades. Su organización desea tener control total sobre las cuentas de Google que utilizan los empleados para todos los servicios de Google, incluida su organización de Google Cloud Platform (GCP). ¿Qué debería hacer?",
    "options": [
      "Utilice Google Cloud Directory Sync (GCDS) para sincronizar los usuarios en Cloud Identity.",
      "Utilice las API de identidad en la nube y escriba un script para sincronizar los usuarios con Cloud Identity.",
      "Exporte los usuarios de Active Directory como un archivo CSV e impórtelos a Cloud Identity a través de la consola de administración.",
      "Pida a cada empleado que cree una cuenta de Google mediante el registro automático. Exija que cada empleado utilice su dirección de correo electrónico y contraseña de la empresa."
    ],
    "answer": "Utilice Google Cloud Directory Sync (GCDS) para sincronizar los usuarios en Cloud Identity."
  },
  {
    "question": "Has creado correctamente un entorno de desarrollo para una aplicación en un proyecto. Esta aplicación utiliza Compute Engine y Cloud SQL. Ahora necesitas crear un entorno de producción para la misma. El equipo de seguridad ha prohibido la existencia de rutas de red entre estos dos entornos y te ha pedido que sigas las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 111 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un nuevo proyecto, habilite las API de Compute Engine y Cloud SQL en ese proyecto y replique la configuración que ha creado en el entorno de desarrollo.",
      "Cree una nueva subred de producción en la VPC existente y una nueva instancia de Cloud SQL de producción en su proyecto existente, e implemente su aplicación utilizando esos recursos.",
      "Cree un nuevo proyecto, modifique su VPC existente para que sea una VPC compartida, comparta esa VPC con su nuevo proyecto y replique la configuración que tiene en el entorno de desarrollo en ese nuevo proyecto. la VPC compartida.",
      "Solicita al equipo de seguridad que te asigne el rol de Editor de proyecto en un proyecto de producción existente utilizado por otra división de tu empresa. Una vez que te lo asignen, replica la configuración que tienes en el entorno de desarrollo en ese proyecto."
    ],
    "answer": "Cree un nuevo proyecto, habilite las API de Compute Engine y Cloud SQL en ese proyecto y replique la configuración que ha creado en el entorno de desarrollo."
  },
  {
    "question": "La dirección ha solicitado a un auditor externo que revise todos los recursos de un proyecto específico de el equipo de seguridad ha habilitado la política de organización denominada Uso compartido restringido por dominio en el nodo de la organización, especificando únicamente el dominio de Cloud Identity. Desea que el auditor solo pueda ver, pero no modificar, los recursos de ese proyecto. ¿Qué debe hacer?",
    "options": [
      "Pídele al auditor su cuenta de Google y asígnale el rol de Visor en el proyecto.",
      "Pídele al auditor su cuenta de Google y asígnale el rol de Revisor de Seguridad en el proyecto.",
      "Cree una cuenta temporal para el auditor en Cloud Identity y asígnele a esa cuenta el rol de Visor en el proyecto.",
      "Cree una cuenta temporal para el auditor en Cloud Identity y asígnele a esa cuenta el rol de Revisor de seguridad en el proyecto."
    ],
    "answer": "Cree una cuenta temporal para el auditor en Cloud Identity y asígnele a esa cuenta el rol de Visor en el proyecto."
  },
  {
    "question": "Tienes una carga de trabajo crítica para tu negocio ejecutándose en Compute Engine. Quieres asegurarte de que los datos del disco de arranque de esta carga de trabajo se respalden periódicamente. Necesitas poder restaurar una copia de seguridad lo más rápido posible en caso de desastre. También quieres que las copias de seguridad antiguas se eliminen automáticamente para ahorrar costes. Quieres seguir las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Cree una función en la nube para crear una plantilla de instancia.",
      "Cree una programación de instantáneas para el disco utilizando el intervalo deseado.",
      "Cree una tarea programada (cron job) para crear un nuevo disco a partir del disco utilizando gcloud.",
      "Cree una tarea en la nube para crear una imagen y exportarla al almacenamiento en la nube."
    ],
    "answer": "Cree una programación de instantáneas para el disco utilizando el intervalo deseado."
  },
  {
    "question": "Debes asignar un rol de Cloud Identity and Access Management (Cloud IAM) a un auditor externo. El auditor debe tener permisos para revisar los registros de auditoría de Google Cloud Platform (GCP) y también los registros de acceso a datos. ¿Qué debes hacer?",
    "options": [
      "Asigne al auditor el rol de IAM roles/logging.privateLogViewer. Realice la exportación de registros a Cloud Storage.",
      "Asigne al auditor el rol de IAM roles/logging.privateLogViewer. Indíquele que también revise los registros para detectar cambios en la política de Cloud IAM.",
      "Asigne al usuario IAM del auditor un rol personalizado que tenga el permiso logging.privateLogEntries.list. Realice la exportación de registros a Cloud Storage.",
      "Asigne al usuario de IAM del auditor un rol personalizado con el permiso logging.privateLogEntries.list. Indique al auditor que revise también los registros para detectar cambios en la política de Cloud IAM."
    ],
    "answer": "Asigne al auditor el rol de IAM roles/logging.privateLogViewer. Indíquele que también revise los registros para detectar cambios en la política de Cloud IAM."
  },
  {
    "question": "Usted administra varios proyectos de Google Cloud Platform (GCP) y necesita acceso a todos los registros para el En los últimos 60 días, deseas explorar y analizar rápidamente el contenido de los registros. Quieres seguir las prácticas recomendadas por Google para obtener los registros combinados de todos los proyectos. ¿Qué debes hacer?",
    "options": [
      "Navegue a Stackdriver Logging y seleccione resource.labels.project_id=\"*\"",
      "Cree una exportación de registro de Stackdriver con un destino Sink a un conjunto de datos de BigQuery. Configure la caducidad de la tabla a 60 días.",
      "Cree una exportación de registro de Stackdriver con un destino Sink a Cloud Storage. Cree una regla de ciclo de vida para eliminar objetos después de 60 días.",
      "Configure una tarea de Cloud Scheduler para leer los datos de Stackdriver y almacenar los registros en BigQuery. Configure la caducidad de la tabla a 60 días."
    ],
    "answer": "Cree una exportación de registro de Stackdriver con un destino Sink a un conjunto de datos de BigQuery. Configure la caducidad de la tabla a 60 días."
  },
  {
    "question": "Necesitas reducir los costos de servicio de GCP para una división de tu empresa con el menor número de pasos posible. Debes desactivar todos los servicios configurados en un proyecto de GCP existente. ¿Qué debes hacer?",
    "options": [
      "1. Verifique que se le haya asignado el rol de IAM de Propietarios del proyecto para este proyecto. 2. Localice el proyecto en la consola de GCP, haga clic en Apagar y luego ingrese el ID del proyecto.",
      "1. Verifique que se le haya asignado el rol de IAM de Propietarios del proyecto para este proyecto. 2. Cambie al proyecto en la consola de GCP, localice los recursos y elimínelos.",
      "1. Verifique que se le haya asignado el rol de Administrador de IAM de la organización para este proyecto. 2. Localiza el proyecto en la consola de GCP, introduce el ID del proyecto y, a continuación, haz clic en Apagar.",
      "1. Verifique que se le haya asignado el rol de IAM de Administradores de la organización para este proyecto. 2. Acceda al proyecto en la consola de GCP, localice los recursos y elimínelos."
    ],
    "answer": "1. Verifique que se le haya asignado el rol de IAM de Propietarios del proyecto para este proyecto. 2. Localice el proyecto en la consola de GCP, haga clic en Apagar y luego ingrese el ID del proyecto."
  },
  {
    "question": "Estás configurando cuentas de servicio para una aplicación que abarca varios proyectos. Las máquinas virtuales (VM) que se ejecutan en el proyecto web­applications necesitan acceso a los conjuntos de datos de BigQuery en crm­databases­ proj. Quieres seguir las prácticas recomendadas por Google para otorgar acceso a la cuenta de servicio en el proyecto web­applications. ¿Qué debes hacer?",
    "options": [
      "Otorgar al \"propietario del proyecto\" para las aplicaciones web los roles apropiados a crm­databases­proj.",
      "Otorgar el rol de \"propietario del proyecto\" a crm­databases­proj y al proyecto web­applications.",
      "Otorgar el rol de \"propietario del proyecto\" a crm­databases­proj y el rol de bigquery.dataViewer a web­applications.",
      "Asigne el rol bigquery.dataViewer a crm­databases­proj y los roles apropiados a web­applications."
    ],
    "answer": "Asigne el rol bigquery.dataViewer a crm­databases­proj y los roles apropiados a web­applications."
  },
  {
    "question": "Un empleado fue despedido, pero su acceso a Google Cloud no se eliminó hasta dos semanas después. Necesitas averiguar si este empleado accedió a información confidencial de clientes tras su despido. ¿Qué debes hacer?",
    "options": [
      "Consulte los registros de eventos del sistema en Cloud Logging. Busque el correo electrónico del usuario como principal.",
      "Ver registros de eventos del sistema en Registro en la nube. Busque la cuenta de servicio asociada con el usuario.",
      "Consulte los registros de auditoría de acceso a datos en Cloud Logging. Busque el correo electrónico del usuario como principal.",
      "Consulte el registro de actividad del administrador en Registro en la nube. Busque la cuenta de servicio asociada al usuario."
    ],
    "answer": "Consulte los registros de auditoría de acceso a datos en Cloud Logging. Busque el correo electrónico del usuario como principal."
  },
  {
    "question": "Necesitas crear un rol de IAM personalizado para usarlo con un servicio de GCP. Todos los permisos del rol deben ser adecuados para su uso en producción. También quieres compartir claramente con tu organización el estado del rol personalizado. Esta será la primera versión del rol personalizado. ¿Qué debes hacer?",
    "options": [
      "Utilice permisos en su rol que utilicen el nivel de soporte 'admitido' para permisos de rol. Establezca la etapa del rol en ALPHA mientras prueba los permisos de rol.",
      "Utilice permisos en su rol que utilicen el nivel de soporte \"compatible\" para permisos de rol. Establezca la etapa del rol en BETA mientras prueba los permisos de rol.",
      "Utilice permisos en su rol que utilicen el nivel de soporte 'testing' para permisos de rol. Establezca la etapa del rol en ALPHA mientras prueba los permisos de rol.",
      "Utilice permisos en su rol que utilicen el nivel de soporte 'testing' para permisos de rol. Establezca la etapa del rol en BETA mientras prueba los permisos de rol."
    ],
    "answer": "Utilice permisos en su rol que utilicen el nivel de soporte 'admitido' para permisos de rol. Establezca la etapa del rol en ALPHA mientras prueba los permisos de rol."
  },
  {
    "question": "Tu empresa maneja una gran cantidad de datos no estructurados en diferentes formatos de archivo. Quieres realizar transformaciones ETL en estos datos. Necesitas que estén disponibles en Google Cloud para que un trabajo de Dataflow pueda procesarlos. ¿Qué debes hacer?",
    "options": [
      "Cargue los datos a BigQuery utilizando la herramienta de línea de comandos bq.",
      "Cargue los datos al almacenamiento en la nube utilizando la herramienta de línea de comandos gsutil.",
      "Cargue los datos en Cloud SQL utilizando la función de importación en la consola.",
      "Cargue los datos en Cloud Spanner utilizando la función de importación en la consola."
    ],
    "answer": "Cargue los datos al almacenamiento en la nube utilizando la herramienta de línea de comandos gsutil."
  },
  {
    "question": "Necesitas gestionar varios proyectos de Google Cloud en el menor número de pasos posible. Quieres configurar la interfaz de línea de comandos (CLI) del SDK de Google Cloud para poder gestionarlos fácilmente. ¿Qué debes hacer?",
    "options": [
      "1. Cree una configuración para cada proyecto que necesite administrar. 2. Active la opción correspondiente. configuración cuando trabajas con cada uno de tus proyectos de Google Cloud asignados.",
      "1. Crea una configuración para cada proyecto que necesites administrar. 2. Usa gcloud init para actualizar los valores de configuración cuando necesites trabajar con un proyecto que no sea el predeterminado.",
      "1. Utilice la configuración predeterminada para un proyecto que necesite administrar. 2. Active la configuración adecuada cuando trabaje con cada uno de sus proyectos de Google Cloud asignados.",
      "1. Utilice la configuración predeterminada para un proyecto que necesite administrar. 2. Utilice gcloud init para actualizar los valores de configuración cuando necesite trabajar con un proyecto que no sea el predeterminado."
    ],
    "answer": "1. Cree una configuración para cada proyecto que necesite administrar. 2. Active la opción correspondiente. configuración cuando trabajas con cada uno de tus proyectos de Google Cloud asignados."
  },
  {
    "question": "Su grupo de instancias administradas generó una alerta indicando que la creación de nuevas instancias falló. Debe mantener el número de instancias en ejecución especificado por la plantilla para poder procesar el tráfico de aplicaciones previsto. ¿Qué debe hacer?",
    "options": [
      "Cree una plantilla de instancia que contenga una sintaxis válida que será utilizada por el grupo de instancias. Elimine cualquier disco persistente que tenga el mismo nombre que los nombres de las instancias.",
      "Cree una plantilla de instancia que contenga una sintaxis válida que será utilizada por el grupo de instancias. Verifique que los valores del nombre de la instancia y del nombre del disco persistente no sean iguales en la plantilla.",
      "Verifique que la plantilla de instancia utilizada por el grupo de instancias contenga una sintaxis válida. Elimine cualquier disco persistente con el mismo nombre que los nombres de las instancias. Establezca la propiedad disks.autoDelete en true. en la plantilla de instancia.",
      "Elimine la plantilla de instancia actual y reemplácela por una nueva. Verifique que los valores del nombre de instancia y del nombre del disco persistente no coincidan en la plantilla. Establezca la propiedad disks.autoDelete en true en la plantilla de instancia."
    ],
    "answer": "Cree una plantilla de instancia que contenga una sintaxis válida que será utilizada por el grupo de instancias. Elimine cualquier disco persistente que tenga el mismo nombre que los nombres de las instancias."
  },
  {
    "question": "Tu empresa está migrando de un entorno local a Google Cloud. Tienes varios equipos de desarrollo que utilizan entornos Cassandra como bases de datos backend. Todos necesitan un entorno de desarrollo aislado de otras instancias de Cassandra. Quieres migrar a Google Cloud rápidamente y con un mínimo esfuerzo de soporte. ¿Qué deberías hacer?",
    "options": [
      "1. Crea una guía de instrucciones para instalar Cassandra en Google Cloud. 2. Elabora la guía de instrucciones. accesible para sus desarrolladores.",
      "1. Aconseje a sus desarrolladores que vayan a Cloud Marketplace. 2. Pídales a los desarrolladores que inicien una imagen de Cassandra para su trabajo de desarrollo.",
      "1. Cree una instancia de Cassandra Compute Engine y tome una instantánea de la misma. 2. Utilice la instantánea para crear instancias para sus desarrolladores.",
      "1. Cree una instancia de Cassandra Compute Engine y tome una instantánea de la misma. 2. Suba la instantánea a Cloud Storage y hágala accesible para sus desarrolladores. 3. Genere instrucciones para crear una instancia de Compute Engine a partir de la instantánea, de modo que los desarrolladores puedan hacerlo ellos mismos."
    ],
    "answer": "1. Aconseje a sus desarrolladores que vayan a Cloud Marketplace. 2. Pídales a los desarrolladores que inicien una imagen de Cassandra para su trabajo de desarrollo."
  },
  {
    "question": "Tienes una instancia de Compute Engine que aloja una aplicación de producción. Quieres recibir un correo electrónico si la instancia consume más del 90 % de sus recursos de CPU durante más de 15 minutos. Quieres usar los servicios de Google. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. Crea una cuenta de Gmail de usuario particular. 2. Escribe un script que supervise el uso de la CPU. 3. Cuando el uso de la CPU supere el umbral, haz que ese script envíe un correo electrónico usando la cuenta de Gmail y smtp.gmail.com en el puerto 25 como servidor SMTP.",
      "1. Crea un espacio de trabajo de supervisión en la nube y asocia tu proyecto de Google Cloud Platform (GCP) con él. 2. Crea una política de alertas de supervisión en la nube que utilice el umbral como condición de activación. 3. Configura tu dirección de correo electrónico en el canal de notificaciones.",
      "1. Crea un espacio de trabajo de Cloud Monitoring y asocia tu proyecto de GCP con él. 2. Escribe un script que supervise el uso de la CPU y lo envíe como una métrica personalizada a Cloud Monitoring. 3. Crea una comprobación de disponibilidad para la instancia en Cloud Monitoring.",
      "1. En Cloud Logging, cree una métrica basada en registros para extraer el uso de la CPU utilizando esta expresión regular: Uso de CPU: ([0­9] {1,3})% 2. En Cloud Monitoring, cree una política de alertas basada en esta métrica. 3. Configure su dirección de correo electrónico en el canal de notificaciones."
    ],
    "answer": "1. Crea un espacio de trabajo de supervisión en la nube y asocia tu proyecto de Google Cloud Platform (GCP) con él. 2. Crea una política de alertas de supervisión en la nube que utilice el umbral como condición de activación. 3. Configura tu dirección de correo electrónico en el canal de notificaciones."
  },
  {
    "question": "Tienes una aplicación que usa Cloud Spanner como base de datos backend. El tráfico de la aplicación es muy predecible. Quieres aumentar o disminuir automáticamente el número de nodos de Spanner según el tráfico. ¿Qué deberías hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una tarea programada (cron job) que se ejecute periódicamente para revisar las métricas de Cloud Monitoring y, a continuación, cambie el tamaño de la instancia de Spanner en consecuencia.",
      "Cree una política de alertas de Cloud Monitoring para enviar una alerta a los correos electrónicos de los ingenieros de confiabilidad del sitio (SRE) de guardia cuando la CPU de Cloud Spanner supere el umbral. Los SRE ajustarán los recursos según corresponda.",
      "Crea una política de alertas de Cloud Monitoring para enviar una alerta al correo electrónico de soporte de Google Cloud cuando el uso de CPU de Cloud Spanner supere el umbral establecido. El soporte de Google ajustará los recursos según sea necesario.",
      "Cree una política de alertas de Cloud Monitoring para enviar una alerta a un webhook cuando el uso de CPU de Cloud Spanner supere o esté por debajo del umbral establecido. Cree una función de Cloud que escuche el protocolo HTTP y ajuste el tamaño de los recursos de Spanner según corresponda."
    ],
    "answer": "Cree una política de alertas de Cloud Monitoring para enviar una alerta a un webhook cuando el uso de CPU de Cloud Spanner supere o esté por debajo del umbral establecido. Cree una función de Cloud que escuche el protocolo HTTP y ajuste el tamaño de los recursos de Spanner según corresponda."
  },
  {
    "question": "Tu empresa publica archivos grandes en un servidor web Apache que se ejecuta en una instancia de Compute Engine de el servidor web Apache no es la única aplicación que se ejecuta en el proyecto. Quieres recibir un correo electrónico cuando los costos de la red de salida del servidor superen los 100 dólares durante el mes en curso, según las mediciones de Google Cloud. ¿Qué debes hacer?",
    "options": [
      "Configura una alerta de presupuesto en el proyecto con un importe de 100 dólares, un umbral del 100 % y un tipo de notificación de «correo electrónico».",
      "Configura una alerta de presupuesto en la cuenta de facturación con un importe de 100 dólares, un umbral del 100 % y un tipo de notificación de «correo electrónico».",
      "Exporta los datos de facturación a BigQuery. Crea una función en la nube que utilice BigQuery para sumar los costos de la red de salida de los datos de facturación exportados para el servidor web Apache del mes actual y envíe un correo electrónico si el total supera los 100 dólares. Programa la función en la nube mediante Cloud Scheduler para que se ejecute cada hora.",
      "Utilice el Agente de registro de Cloud para exportar los registros del servidor web Apache a Cloud Logging. Cree una función de Cloud que utilice BigQuery para analizar los datos de registro de respuesta HTTP en Cloud Logging del mes actual y envíe un correo electrónico si el tamaño total de todas las respuestas HTTP, multiplicado por los precios de salida actuales de Google Cloud, supera los 100 dólares. Programe la función de Cloud mediante Cloud Scheduler para que se ejecute cada hora."
    ],
    "answer": "Exporta los datos de facturación a BigQuery. Crea una función en la nube que utilice BigQuery para sumar los costos de la red de salida de los datos de facturación exportados para el servidor web Apache del mes actual y envíe un correo electrónico si el total supera los 100 dólares. Programa la función en la nube mediante Cloud Scheduler para que se ejecute cada hora."
  },
  {
    "question": "Has diseñado una solución en Google Cloud que utiliza varios productos de Google Cloud. Tu empresa te ha pedido que estimes los costos de la solución. Debes proporcionar estimaciones del costo total mensual. ¿Qué debes hacer?",
    "options": [
      "Para cada producto de Google Cloud en la solución, revise los detalles de precios en la página de precios de los productos. Página. Utilice la calculadora de precios para calcular el coste mensual total de cada producto de Google Cloud.",
      "Para cada producto de Google Cloud en la solución, revise los detalles de precios en la página de precios de los productos. página. Crea una hoja de cálculo de Google que resuma los costos mensuales previstos para cada producto.",
      "Implemente la solución en Google Cloud. Deje la solución implementada durante 1 semana. Vaya a la página de Informe de facturación en la consola de Cloud. Multiplique el costo de 1 semana para determinar el costo mensual. costos.",
      "Implemente la solución en Google Cloud. Deje la solución implementada durante una semana. Utilice Cloud Monitoring para determinar la cantidad de recursos implementados y utilizados. Multiplique el costo de una semana para determinar los costos mensuales."
    ],
    "answer": "Para cada producto de Google Cloud en la solución, revise los detalles de precios en la página de precios de los productos. Página. Utilice la calculadora de precios para calcular el coste mensual total de cada producto de Google Cloud."
  },
  {
    "question": "Tienes una aplicación que recibe tráfico TCP cifrado con SSL en el puerto 443. Los clientes de esta aplicación están ubicados en todo el mundo. Quieres minimizar la latencia para los clientes. ¿Qué opción de balanceo de carga deberías usar?",
    "options": [
      "Balanceador de carga HTTPS",
      "Balanceador de carga de red",
      "Balanceador de carga proxy SSL",
      "Balanceador de carga TCP/UDP interno. Agregue una regla de firewall que permita el tráfico entrante desde 0.0.0.0/0 en las instancias de destino."
    ],
    "answer": "Balanceador de carga proxy SSL"
  },
  {
    "question": "Tienes una aplicación en una instancia de Compute Engine de propósito general que está experimentando una limitación excesiva en la lectura del disco en su disco persistente SSD zonal. La aplicación lee principalmente archivos grandes del disco. El tamaño del disco es actualmente de 350 GB. Quieres proporcionar el máximo rendimiento minimizando los costos. ¿Qué deberías hacer?",
    "options": [
      "Aumentar el tamaño del disco a 1 TB.",
      "Aumentar la CPU asignada a la instancia.",
      "Migrar para usar una unidad SSD local en la instancia.",
      "Migrar para usar una unidad SSD regional en la instancia."
    ],
    "answer": "Migrar para usar una unidad SSD local en la instancia."
  },
  {
    "question": "Su clúster Dataproc se ejecuta en una única red de nube privada virtual (VPC) dentro de una única subred con el rango 172.16.20.128/25. No hay direcciones IP privadas disponibles en la red VPC. Desea agregar nuevas máquinas virtuales para que se comuniquen con su clúster utilizando el mínimo número de pasos. ¿Qué debe hacer?",
    "options": [
      "Modifique el rango de subred existente a 172.16.20.0/24.",
      "Cree un nuevo rango de IP secundario en la VPC y configure las máquinas virtuales para que utilicen ese rango.",
      "Cree una nueva red VPC para las máquinas virtuales. Habilite el emparejamiento de VPC entre la red VPC de las máquinas virtuales y la red VPC del clúster Dataproc.",
      "Cree una nueva red VPC para las máquinas virtuales con una subred de 172.32.0.0/16. Habilite el emparejamiento de redes VPC entre la red VPC de Dataproc y la red VPC de las máquinas virtuales. Configure una ruta personalizada. intercambio."
    ],
    "answer": "Modifique el rango de subred existente a 172.16.20.0/24."
  },
  {
    "question": "Usted administra un servicio de App Engine que agrega y visualiza datos de BigQuery. La aplicación se implementa con la cuenta predeterminada de App Engine Service. Los datos que se necesitan visualizar se encuentran en un proyecto diferente administrado por otro equipo. Usted no tiene acceso a este proyecto, pero desea que su aplicación pueda leer datos del conjunto de datos de BigQuery. ¿Qué debe hacer? Discusión sobre el tema 1 de la pregunta 131 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Pídele al otro equipo que asigne a tu cuenta predeterminada de App Engine Service el rol de Usuario de trabajos de BigQuery.",
      "Pídele al otro equipo que otorgue a tu cuenta predeterminada de App Engine Service el rol de Visor de datos de BigQuery.",
      "En Cloud IAM de su proyecto, asegúrese de que la cuenta de servicio predeterminada de App Engine tenga el rol de Visor de datos de BigQuery.",
      "En Cloud IAM de tu proyecto, otorga el rol a una cuenta de servicio recién creada del otro equipo. de usuario de trabajo de BigQuery en su proyecto."
    ],
    "answer": "Pídele al otro equipo que otorgue a tu cuenta predeterminada de App Engine Service el rol de Visor de datos de BigQuery."
  },
  {
    "question": "Necesitas crear una copia de una máquina virtual (VM) personalizada de Compute Engine para facilitar un aumento previsto en el tráfico de aplicaciones debido a una adquisición empresarial. ¿Qué debes hacer?",
    "options": [
      "Crea una instantánea de Compute Engine de tu máquina virtual base. Crea tus imágenes a partir de esa instantánea.",
      "Crea una instantánea de Compute Engine de tu máquina virtual base. Crea tus instancias a partir de esa instantánea.",
      "Cree una imagen personalizada de Compute Engine a partir de una instantánea. Cree sus imágenes a partir de esa imagen.",
      "Cree una imagen personalizada de Compute Engine a partir de una instantánea. Cree sus instancias a partir de esa imagen."
    ],
    "answer": "Cree una imagen personalizada de Compute Engine a partir de una instantánea. Cree sus instancias a partir de esa imagen."
  },
  {
    "question": "Has implementado una aplicación en una única instancia de Compute Engine. La aplicación escribe registros en el disco. Los usuarios comienzan a reportar errores en la aplicación. Quieres diagnosticar el problema. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 133 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Navegue a Registro en la nube y vea los registros de la aplicación.",
      "Conéctese a la consola serie de la instancia y lea los registros de la aplicación.",
      "Configure una comprobación de estado en la instancia y establezca un valor de umbral de estado saludable bajo.",
      "Instale y configure el agente de registro en la nube y vea los registros desde el registro en la nube."
    ],
    "answer": "Instale y configure el agente de registro en la nube y vea los registros desde el registro en la nube."
  },
  {
    "question": "Una aplicación genera informes diarios en una máquina virtual (VM) de Compute Engine. La VM pertenece al proyecto corp­iot­insights. Su equipo trabaja exclusivamente en el proyecto corp­aggregate­reports y necesita una copia de las exportaciones diarias en el bucket corp­ aggregate­reports­storage. Desea configurar el acceso para que los informes diarios de la VM estén disponibles en el bucket corp­ aggregate­reports­storage, minimizando los pasos y siguiendo las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Mueva ambos proyectos a la misma carpeta.",
      "Otorgue a la cuenta de servicio de la máquina virtual el rol de Creador de objetos de almacenamiento en corp­aggregate­reports­ storage.",
      "Cree una red VPC compartida entre ambos proyectos. Asigne a la cuenta de servicio de la máquina virtual el rol de Creador de objetos de almacenamiento en corp­iot­insights.",
      "Hacer público el almacenamiento de informes agregados corporativos y crear una carpeta con un sufijo pseudoaleatorio. Nombre. Comparte la carpeta con el equipo de IoT."
    ],
    "answer": "Otorgue a la cuenta de servicio de la máquina virtual el rol de Creador de objetos de almacenamiento en corp­aggregate­reports­ storage."
  },
  {
    "question": "Desarrollaste una aplicación en tu portátil de desarrollo que utiliza los servicios de Google Cloud. Tu aplicación usa las Credenciales Predeterminadas de la Aplicación para la autenticación y funciona correctamente en tu portátil. Quieres migrar esta aplicación a una máquina virtual (VM) de Compute Engine y configurar la autenticación siguiendo las prácticas recomendadas por Google y con cambios mínimos. ¿Qué debes hacer?",
    "options": [
      "Asigne el acceso apropiado para los servicios de Google a la cuenta de servicio utilizada por la máquina virtual de Compute Engine.",
      "Cree una cuenta de servicio con los permisos de acceso adecuados para los servicios de Google y configure la aplicación para que utilice dicha cuenta.",
      "Almacene las credenciales de las cuentas de servicio con el acceso adecuado para los servicios de Google en un archivo de configuración e implemente este archivo de configuración con su aplicación.",
      "Almacene las credenciales de su cuenta de usuario con el acceso apropiado para los servicios de Google en un archivo de configuración. Archivo, y despliegue este archivo de configuración con su aplicación."
    ],
    "answer": "Asigne el acceso apropiado para los servicios de Google a la cuenta de servicio utilizada por la máquina virtual de Compute Engine."
  },
  {
    "question": "Necesitas crear una instancia de Compute Engine en un proyecto nuevo que aún no existe. ¿Qué debes hacer?",
    "options": [
      "Utilizando el SDK de Cloud, cree un nuevo proyecto, habilite la API de Compute Engine en ese proyecto y, a continuación, cree la instancia especificando su nuevo proyecto.",
      "Habilite la API de Compute Engine en la consola de Cloud, use el SDK de Cloud para crear la instancia y, a continuación, use la bandera ­­project para especificar un nuevo proyecto.",
      "Con Cloud SDK, cree la nueva instancia y utilice la opción ­­project para especificar el nuevo proyecto. Responda \"sí\" cuando Cloud SDK se lo solicite para habilitar la API de Compute Engine.",
      "Habilite la API de Compute Engine en la consola de Cloud. Vaya a la sección Compute Engine de la Utilice la consola para crear una nueva instancia y busque la opción \"Crear en un proyecto nuevo\" en el formulario de creación."
    ],
    "answer": "Utilizando el SDK de Cloud, cree un nuevo proyecto, habilite la API de Compute Engine en ese proyecto y, a continuación, cree la instancia especificando su nuevo proyecto."
  },
  {
    "question": "Su empresa ejecuta un proceso por lotes en un servidor local que tarda alrededor de 30 horas en completarse. Completado. La tarea se ejecuta mensualmente, puede realizarse sin conexión a internet y debe reiniciarse si se interrumpe. Quieres migrar esta carga de trabajo a la nube minimizando los costes. ¿Qué deberías hacer?",
    "options": [
      "Migrar la carga de trabajo a una máquina virtual preemptiva de Compute Engine.",
      "Migrar la carga de trabajo a un clúster de Google Kubernetes Engine con nodos preemptivos.",
      "Migre la carga de trabajo a una máquina virtual de Compute Engine. Inicie y detenga la instancia según sea necesario.",
      "Cree una plantilla de instancia con máquinas virtuales preemptivas activadas. Cree un grupo de instancias administradas a partir de la plantilla y ajuste la utilización de CPU objetivo. Migre la carga de trabajo."
    ],
    "answer": "Migre la carga de trabajo a una máquina virtual de Compute Engine. Inicie y detenga la instancia según sea necesario."
  },
  {
    "question": "Estás desarrollando una nueva aplicación y buscas una instalación de Jenkins para compilar y desplegar tu código fuente. Quieres automatizar la instalación de la forma más rápida y sencilla posible. ¿Qué deberías hacer?",
    "options": [
      "Implementa Jenkins a través de Google Cloud Marketplace.",
      "Cree una nueva instancia de Compute Engine. Ejecute el archivo ejecutable de Jenkins.",
      "Cree un nuevo clúster de Kubernetes Engine. Cree un despliegue para la imagen de Jenkins.",
      "Cree una plantilla de instancia con el ejecutable de Jenkins. Cree un grupo de instancias administradas con esta plantilla."
    ],
    "answer": "Implementa Jenkins a través de Google Cloud Marketplace."
  },
  {
    "question": "Has descargado e instalado la interfaz de línea de comandos (CLI) de gcloud y te has autenticado con tu cuenta de Google. La mayoría de las instancias de Compute Engine de tu proyecto se ejecutan en la zona europe­west1­d. Quieres evitar tener que especificar esta zona con cada comando de la CLI al administrar estas instancias. ¿Qué debes hacer?",
    "options": [
      "Establezca la zona europe­west1­d como zona predeterminada utilizando el subcomando gcloud config.",
      "En la página de Configuración de Compute Engine, en Ubicación predeterminada, establezca la zona en europe—west1­ d.",
      "En el directorio de instalación de la CLI, cree un archivo llamado default.conf que contenga zone=europe\"west1\"d.",
      "Cree una entrada de metadatos en la página de Compute Engine con la clave compute/zone y el valor europe— west1—d."
    ],
    "answer": "Establezca la zona europe­west1­d como zona predeterminada utilizando el subcomando gcloud config."
  },
  {
    "question": "La actividad principal de su empresa es el alquiler de maquinaria de construcción a gran escala. Toda la maquinaria alquilada está equipada con múltiples sensores que envían información sobre eventos cada pocos segundos. Estas señales pueden variar, como el estado del motor, la distancia recorrida, el nivel de combustible, etc. A los clientes se les factura en función del consumo monitorizado por estos sensores. Usted espera un alto rendimiento, de hasta miles de eventos \" por hora por dispositivo, y necesita recuperar datos consistentes en función de la hora del evento. El almacenamiento y la recuperación de señales individuales deben ser atómicos. ¿Qué debería hacer?",
    "options": [
      "Crea un archivo en Cloud Storage por cada dispositivo y agrega los nuevos datos a ese archivo.",
      "Cree un archivo en Cloud Filestore por cada dispositivo y agregue los nuevos datos a ese archivo.",
      "Ingerir los datos en Datastore. Almacenar los datos en un grupo de entidades según el dispositivo.",
      "Ingerir los datos en Cloud Bigtable. Crear una clave de fila basada en la marca de tiempo del evento."
    ],
    "answer": "Ingerir los datos en Cloud Bigtable. Crear una clave de fila basada en la marca de tiempo del evento."
  },
  {
    "question": "Se le solicita configurar la monitorización del rendimiento de las aplicaciones en los proyectos A, B y C de Google Cloud desde una única plataforma. Desea monitorizar la CPU, la memoria y el disco. ¿Qué debe hacer? Discusión sobre el tema 1 de la pregunta 141 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Habilite la API y luego comparta los gráficos de los proyectos A, B y C.",
      "Habilite la API y luego asigne el rol metrics.reader a los proyectos A, B y C.",
      "Habilite la API y luego utilice los paneles predeterminados para ver todos los proyectos en secuencia.",
      "Habilite la API, cree un espacio de trabajo en el proyecto A y, a continuación, añada los proyectos B y C."
    ],
    "answer": "Habilite la API, cree un espacio de trabajo en el proyecto A y, a continuación, añada los proyectos B y C."
  },
  {
    "question": "Has creado varios recursos en múltiples proyectos de Google Cloud. Todos los proyectos están vinculados a diferentes cuentas de facturación. Para calcular mejor los cargos futuros, necesitas una representación visual única de todos los costes incurridos. Quieres incluir los nuevos datos de costes lo antes posible. ¿Qué deberías hacer?",
    "options": [
      "Configure la exportación de datos de facturación a BigQuery y visualice los datos en Data Studio.",
      "Visite la página de la tabla de costos para obtener una exportación en formato CSV y visualizarla utilizando Data Studio.",
      "Complete todos los recursos en la Calculadora de precios para obtener una estimación del costo mensual.",
      "Utilice la vista Informes en la Consola de facturación en la nube para ver la información de costos deseada."
    ],
    "answer": "Configure la exportación de datos de facturación a BigQuery y visualice los datos en Data Studio."
  },
  {
    "question": "Su empresa tiene cargas de trabajo ejecutándose en Compute Engine y en las instalaciones. La nube privada virtual (VPC) de Google Cloud está conectada a su WAN a través de una red privada virtual (VPN). Necesito implementar una nueva instancia de Compute Engine y asegurarme de que no se pueda enrutar tráfico público de Internet hacia ella. ¿Qué debo hacer?",
    "options": [
      "Cree la instancia sin una dirección IP pública.",
      "Crea la instancia con el acceso privado a Google habilitado.",
      "Cree una regla de firewall de denegación total de salida en la red VPC.",
      "Cree una ruta en la VPC para dirigir todo el tráfico a la instancia a través del túnel VPN."
    ],
    "answer": "Cree la instancia sin una dirección IP pública."
  },
  {
    "question": "Tu equipo se encarga del mantenimiento de la infraestructura de tu organización. La infraestructura actual requiere cambios. Debes compartir tus propuestas de cambio con el resto del equipo. Quieres seguir las mejores prácticas recomendadas por Google. ¿Qué debes hacer?",
    "options": [
      "Utilice las plantillas de Deployment Manager para describir los cambios propuestos y guárdelas en un bucket de Cloud Storage.",
      "Utilice las plantillas de Deployment Manager para describir los cambios propuestos y guárdelas en los repositorios de origen en la nube.",
      "Aplique los cambios en un entorno de desarrollo, ejecute gcloud compute instances list y, a continuación, guarde el resultado en un bucket de almacenamiento compartido.",
      "Aplique los cambios en un entorno de desarrollo, ejecute gcloud compute instances list y, a continuación, guarde el resultado en Cloud Source Repositories."
    ],
    "answer": "Utilice las plantillas de Deployment Manager para describir los cambios propuestos y guárdelas en los repositorios de origen en la nube."
  },
  {
    "question": "Tienes una instancia de Compute Engine que aloja una aplicación utilizada entre las 9 a. m. y las 6 p. m. de lunes a viernes. Quieres hacer una copia de seguridad diaria de esta instancia con fines de recuperación ante desastres. Quieres mantener Las copias de seguridad se realizan durante 30 días. Quieres la solución recomendada por Google con la menor carga de gestión y el menor número de servicios. ¿Qué deberías hacer?",
    "options": [
      "1. Actualice los metadatos de sus instancias para agregar el siguiente valor: snapshot—schedule: 0 1 * * * 2. Actualiza los metadatos de tus instancias para agregar el siguiente valor: snapshot—retention: 30",
      "1. En la consola de Cloud, vaya a la página Discos de Compute Engine y seleccione el disco de su instancia. 2. En la sección Programación de instantáneas, seleccione Crear programación y configure los siguientes parámetros: ­ Frecuencia de programación: Diaria ­ Hora de inicio: 1:00 a. m. ­ 2:00 a. m. ­ Eliminar automáticamente las instantáneas después de: 30 días",
      "1. Crea una función en la nube que cree una instantánea del disco de tu instancia. 2. Crea una función en la nube que elimine las instantáneas con más de 30 días de antigüedad. 3. Usa Cloud Scheduler para ejecutar ambas funciones diariamente a la 1:00 a. m.",
      "1. Crea un script bash en la instancia que copie el contenido del disco a Cloud Storage. 2. 1. Crea un script bash en la instancia que elimine los datos con más de 30 días de antigüedad en el bucket de Cloud Storage de respaldo. 2. Configura el crontab de la instancia para que ejecute estos scripts diariamente a la 1:00 a. m."
    ],
    "answer": "1. En la consola de Cloud, vaya a la página Discos de Compute Engine y seleccione el disco de su instancia. 2. En la sección Programación de instantáneas, seleccione Crear programación y configure los siguientes parámetros: ­ Frecuencia de programación: Diaria ­ Hora de inicio: 1:00 a. m. ­ 2:00 a. m. ­ Eliminar automáticamente las instantáneas después de: 30 días"
  },
  {
    "question": "Tu aplicación actual, que se ejecuta en Google Kubernetes Engine (GKE), consta de varios pods que se ejecutan en cuatro nodos GKE n1\"standard\"2. Necesitas implementar pods adicionales que requieran nodos n2\"highmem\"16 sin interrupciones del servicio. ¿Qué debes hacer?",
    "options": [
      "Utilice gcloud container clusters upgrade. Implemente los nuevos servicios.",
      "Cree un nuevo grupo de nodos y especifique el tipo de máquina n2\"highmem16\". Implemente los nuevos pods.",
      "Cree un nuevo clúster con n2 nodos \"highmem16\". Vuelva a implementar los pods y elimine los antiguos. grupo.",
      "Cree un nuevo clúster con nodos n1\"standard2\" y n2\"highmem16\". Vuelva a implementar los pods y elimine el clúster anterior."
    ],
    "answer": "Cree un nuevo grupo de nodos y especifique el tipo de máquina n2\"highmem16\". Implemente los nuevos pods."
  },
  {
    "question": "Tienes una aplicación que usa Cloud Spanner como base de datos para mantener información actualizada sobre el estado de los usuarios. Cloud Bigtable registra todos los eventos generados por los usuarios. Exportas los datos de Cloud Spanner a Cloud Storage durante las copias de seguridad diarias. Uno de tus analistas te pide que combines los datos de Cloud Spanner y CloudBigtable para usuarios específicos. Quieres completar esta solicitud ad hoc de de la forma más eficiente posible. ¿Qué deberías hacer?",
    "options": [
      "Cree un trabajo de flujo de datos que copie datos de Cloud Bigtable y Cloud Storage para usuarios específicos.",
      "Cree un trabajo de flujo de datos que copie datos de Cloud Bigtable y Cloud Spanner para usuarios específicos.",
      "Cree un clúster de Cloud Dataproc que ejecute un trabajo de Spark para extraer datos de Cloud Bigtable y Cloud Storage para usuarios específicos.",
      "Cree dos tablas externas de BigQuery separadas en Cloud Storage y Cloud Bigtable. Utilice la consola de BigQuery para unir estas tablas mediante campos de usuario y aplique los filtros adecuados."
    ],
    "answer": "Cree dos tablas externas de BigQuery separadas en Cloud Storage y Cloud Bigtable. Utilice la consola de BigQuery para unir estas tablas mediante campos de usuario y aplique los filtros adecuados."
  },
  {
    "question": "Estás alojando una aplicación desde máquinas virtuales (VM) de Compute Engine en us\"central1\"a. Desea adaptar su diseño para que soporte el fallo de una única zona de Compute Engine, elimine el tiempo de inactividad y minimice los costes. ¿Qué debería hacer?",
    "options": [
      "ג€ \"Crear recursos de Compute Engine en us\"central1ג€\"b. ג€ \"Equilibrar la carga entre us\"central1ג€\"a y us\"central1ג€\"b.",
      "ג€ \"Cree un grupo de instancias administradas y especifique us\"central1\"a como zona. ג€ \"Configure la comprobación de estado con un intervalo de estado corto.",
      "ג€ \"Crear un balanceador de carga HTTP(S). ג€ \"Crear una o más reglas de reenvío globales para dirigir el tráfico a sus máquinas virtuales.",
      "ג€ \"Realice copias de seguridad periódicas de su aplicación. ג€ \"Cree una alerta de monitoreo en la nube y reciba una notificación si su aplicación deja de estar disponible. ג€ \"Restaure desde las copias de seguridad cuando reciba una notificación."
    ],
    "answer": "ג€ \"Crear recursos de Compute Engine en us\"central1ג€\"b. ג€ \"Equilibrar la carga entre us\"central1ג€\"a y us\"central1ג€\"b."
  },
  {
    "question": "Un compañero te ha asignado un proyecto de Google Cloud Platform para que lo mantengas. Como parte de una revisión de seguridad, quieres comprobar a quién se le ha otorgado el rol de ProjectOwner. ¿Qué debes hacer?",
    "options": [
      "En la consola, verifique qué claves SSH se han almacenado como claves para todo el proyecto.",
      "Navegue hasta Identity­Aware Proxy y verifique los permisos para estos recursos.",
      "Habilite los registros de auditoría en la página de administración de IAM para todos los recursos y valide los resultados.",
      "Utilice el comando gcloud projects get—iam—policy para ver las asignaciones de roles actuales."
    ],
    "answer": "Utilice el comando gcloud projects get—iam—policy para ver las asignaciones de roles actuales."
  },
  {
    "question": "Estás ejecutando varios clústeres de Google Kubernetes Engine nativos de VPC en la misma subred. Las direcciones IP disponibles para los nodos se han agotado y quieres asegurarte de que los clústeres puedan aumentar su número de nodos cuando sea necesario. ¿Qué deberías hacer?",
    "options": [
      "Cree una nueva subred en la misma región que la subred que se está utilizando.",
      "Agregue un rango de direcciones IP de alias a la subred utilizada por los clústeres de GKE.",
      "Cree una nueva VPC y configure el emparejamiento de VPC con la VPC existente.",
      "Amplíe el rango CIDR de la subred correspondiente para el clúster."
    ],
    "answer": "Amplíe el rango CIDR de la subred correspondiente para el clúster."
  },
  {
    "question": "Tienes una carga de trabajo por lotes que se ejecuta todas las noches y utiliza un gran número de máquinas virtuales (VM). Es tolerante a fallos y puede soportar la terminación de algunas VM. El coste actual de las VM es demasiado elevado. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 151 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Realice una prueba utilizando eventos de mantenimiento simulados. Si la prueba es exitosa, utilice máquinas virtuales N1 Standard con capacidad de interrupción al ejecutar trabajos futuros.",
      "Realice una prueba utilizando eventos de mantenimiento simulados. Si la prueba es exitosa, utilice máquinas virtuales N1 Standard para ejecutar trabajos futuros.",
      "Ejecute una prueba utilizando un grupo de instancias administradas. Si la prueba es exitosa, utilice máquinas virtuales N1 Standard en el grupo de instancias administradas al ejecutar trabajos futuros.",
      "Realice una prueba utilizando máquinas virtuales estándar N1 en lugar de N2. Si la prueba es exitosa, utilice máquinas virtuales estándar N1 al ejecutar trabajos futuros."
    ],
    "answer": "Realice una prueba utilizando eventos de mantenimiento simulados. Si la prueba es exitosa, utilice máquinas virtuales N1 Standard con capacidad de interrupción al ejecutar trabajos futuros."
  },
  {
    "question": "Estás trabajando con un usuario para configurar una aplicación en una nueva VPC detrás de un firewall. Al usuario le preocupa la salida de datos. Quieres configurar la menor cantidad de puertos de salida abiertos. ¿Qué deberías hacer?",
    "options": [
      "Configure una regla de baja prioridad (65534) que bloquee toda salida y una regla de alta prioridad (1000) que permita solo los puertos apropiados.",
      "Configure una regla de alta prioridad (1000) que empareje los puertos de entrada y salida.",
      "Configure una regla de alta prioridad (1000) que bloquee toda salida y una regla de baja prioridad (65534) que permita solo los puertos apropiados.",
      "Establezca una regla de alta prioridad (1000) para permitir los puertos apropiados."
    ],
    "answer": "Configure una regla de baja prioridad (65534) que bloquee toda salida y una regla de alta prioridad (1000) que permita solo los puertos apropiados."
  },
  {
    "question": "Su empresa ejecuta sus cargas de trabajo Linux en instancias de Compute Engine. Su empresa trabajará con un nuevo socio de operaciones que no utiliza Google Accounts. Necesita otorgar acceso a las instancias a su socio de operaciones para que pueda mantener las herramientas instaladas. ¿Qué debe hacer?",
    "options": [
      "Habilite Cloud IAP para las instancias de Compute Engine y agregue al socio de operaciones como usuario del túnel de Cloud IAP.",
      "Etiquete todas las instancias con la misma etiqueta de red. Cree una regla de firewall en la VPC para otorgar acceso TCP en el puerto 22 para el tráfico del socio de operaciones a las instancias con la etiqueta de red.",
      "Configure una VPN en la nube entre su VPC de Google Cloud y la red interna del socio de operaciones.",
      "Solicite al socio de operaciones que genere pares de claves SSH y agregue las claves públicas a las instancias de máquinas virtuales."
    ],
    "answer": "Habilite Cloud IAP para las instancias de Compute Engine y agregue al socio de operaciones como usuario del túnel de Cloud IAP."
  },
  {
    "question": "Has creado un fragmento de código que se ejecutará cada vez que se suba un archivo nuevo a un bucket de Cloud Storage. Quieres implementar este fragmento de código. ¿Qué debes hacer?",
    "options": [
      "Utilice App Engine y configure Cloud Scheduler para activar la aplicación mediante Pub/Sub.",
      "Utilice Cloud Functions y configure el bucket como un recurso de activación.",
      "Utilice Google Kubernetes Engine y configure un CronJob para activar la aplicación mediante Pub/Sub.",
      "Utilice Dataflow como un trabajo por lotes y configure el bucket como una fuente de datos."
    ],
    "answer": "Utilice Cloud Functions y configure el bucket como un recurso de activación."
  },
  {
    "question": "Se le ha solicitado que configure la administración del ciclo de vida de los objetos almacenados en depósitos de almacenamiento de los objetos se escriben una vez y se accede a ellos con frecuencia durante 30 días. Después de 30 días, los objetos no se vuelven a leer a menos que haya una necesidad especial. Los objetos deben conservarse durante tres años y usted necesita Minimizar costes. ¿Qué deberías hacer?",
    "options": [
      "Configure una política que utilice el almacenamiento Nearline durante 30 días y luego pase al almacenamiento Archive durante tres años.",
      "Configure una política que utilice el almacenamiento estándar durante 30 días y luego pase al almacenamiento de archivo durante tres años.",
      "Configure una política que utilice el almacenamiento Nearline durante 30 días, luego lo traslade a Coldline durante un año y, finalmente, al almacenamiento Archive durante dos años.",
      "Configure una política que utilice almacenamiento estándar durante 30 días, luego pase a Coldline durante un año y, finalmente, pase a almacenamiento de archivo durante dos años."
    ],
    "answer": "Configure una política que utilice el almacenamiento estándar durante 30 días y luego pase al almacenamiento de archivo durante tres años."
  },
  {
    "question": "Estás almacenando información confidencial en un bucket de Cloud Storage. Por motivos legales, necesitas poder registrar todas las solicitudes que accedan a los datos almacenados. Quieres asegurarte de cumplir con estos requisitos. ¿Qué debes hacer?",
    "options": [
      "Habilite la API de proxy con reconocimiento de identidad en el proyecto.",
      "Analice el bucket utilizando la API de prevención de pérdida de datos.",
      "Permitir que solo una única cuenta de servicio acceda a los datos para leerlos.",
      "Habilitar los registros de auditoría de acceso a datos para la API de almacenamiento en la nube."
    ],
    "answer": "Habilitar los registros de auditoría de acceso a datos para la API de almacenamiento en la nube."
  },
  {
    "question": "Eres el líder de un equipo de 10 desarrolladores. A cada uno se le asignó un proyecto individual de Google Cloud que pueden usar como entorno de pruebas personal para experimentar con diferentes soluciones de Google Cloud. Quieres recibir una notificación si alguno de los desarrolladores gasta más de $500 al mes en su entorno de pruebas. ¿Qué debes hacer?",
    "options": [
      "Cree un presupuesto único para todos los proyectos y configure alertas presupuestarias para dicho presupuesto.",
      "Cree una cuenta de facturación independiente para cada proyecto de entorno de pruebas y habilite las exportaciones de facturación de BigQuery. Crea un panel de control en Data Studio para representar gráficamente el gasto por cuenta de facturación.",
      "Cree un presupuesto por proyecto y configure alertas presupuestarias para todos estos presupuestos.",
      "Cree una única cuenta de facturación para todos los proyectos de entorno de pruebas y habilite las exportaciones de facturación de BigQuery. Crea un panel de control en Data Studio para representar gráficamente el gasto por proyecto."
    ],
    "answer": "Cree un presupuesto por proyecto y configure alertas presupuestarias para todos estos presupuestos."
  },
  {
    "question": "Estás implementando una aplicación de producción en Compute Engine. Quieres evitar que alguien destruya accidentalmente la instancia haciendo clic en el botón equivocado. ¿Qué debes hacer?",
    "options": [
      "Deshabilitar la bandera \"Eliminar el disco de arranque cuando se elimine la instancia\".",
      "Habilitar la protección contra eliminación en la instancia.",
      "Deshabilitar el reinicio automático en la instancia.",
      "Habilitar la preemptividad en la instancia."
    ],
    "answer": "Habilitar la protección contra eliminación en la instancia."
  },
  {
    "question": "Tu empresa utiliza una gran cantidad de servicios de Google Cloud centralizados en un único proyecto. Todos los equipos tienen proyectos específicos para pruebas y desarrollo. El equipo de DevOps necesita acceso a todos los servicios de producción para realizar su trabajo. Quieres evitar que los cambios en los productos de Google Cloud amplíen sus permisos en el futuro. Quieres seguir las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Otorgar a todos los miembros del equipo de DevOps el rol de Editor de Proyecto a nivel de organización.",
      "Otorgar a todos los miembros del equipo de DevOps el rol de Editor de proyecto en el proyecto de producción.",
      "Crea un rol personalizado que combine los permisos necesarios. Asigna el rol personalizado al equipo de DevOps en el proyecto de producción.",
      "Cree un rol personalizado que combine los permisos necesarios. Otorgue al equipo de DevOps el rol personalizado. rol a nivel organizacional."
    ],
    "answer": "Crea un rol personalizado que combine los permisos necesarios. Asigna el rol personalizado al equipo de DevOps en el proyecto de producción."
  },
  {
    "question": "Estás desarrollando una aplicación que procesa archivos de datos subidos desde miles de proveedores de los objetivos principales de la aplicación son la seguridad de los datos y la caducidad de los datos obsoletos. Debe diseñar la aplicación para: * Restringir el acceso para que los proveedores solo puedan acceder a sus propios datos. * Otorgar a los proveedores acceso de escritura a los datos solo durante 30 minutos. * Eliminar los datos con más de 45 días de antigüedad. Dispone de un ciclo de desarrollo muy corto y debe asegurarse de que la aplicación requiera un mantenimiento mínimo. ¿Qué dos estrategias debería utilizar? (Elija dos).",
    "options": [
      "Cree una política de ciclo de vida para eliminar los objetos de Cloud Storage después de 45 días.",
      "Utilice URL firmadas para permitir a los proveedores un acceso limitado durante un tiempo determinado para almacenar sus objetos.",
      "Configure un servidor SFTP para su aplicación y cree un usuario independiente para cada proveedor.",
      "Crea una función en la nube que active un temporizador de 45 días para eliminar los objetos que hayan caducado.",
      "Desarrollar un script que recorra todos los depósitos de Cloud Storage y elimine aquellos que tengan más de 45 días de antigüedad."
    ],
    "answer": "Cree una política de ciclo de vida para eliminar los objetos de Cloud Storage después de 45 días. | Utilice URL firmadas para permitir a los proveedores un acceso limitado durante un tiempo determinado para almacenar sus objetos."
  },
  {
    "question": "Su empresa desea estandarizar la creación y gestión de múltiples recursos de Google Cloud mediante Infraestructura como Código. Su objetivo es minimizar la cantidad de código repetitivo necesario para gestionar el entorno. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 161 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Desarrollar plantillas para el entorno utilizando Cloud Deployment Manager.",
      "Utilice curl en una terminal para enviar una solicitud REST a la API de Google correspondiente para cada individuo. recurso.",
      "Utilice la interfaz de la consola en la nube para aprovisionar y administrar todos los recursos relacionados.",
      "Crea un script bash que contenga todos los pasos necesarios como comandos gcloud."
    ],
    "answer": "Desarrollar plantillas para el entorno utilizando Cloud Deployment Manager."
  },
  {
    "question": "Estás realizando una comprobación de seguridad mensual de tu entorno de Google Cloud y quieres saber quién tiene acceso para ver los datos almacenados en tu proyecto de Google Cloud. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 162 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Habilitar los registros de auditoría para todas las API relacionadas con el almacenamiento de datos.",
      "Revise los permisos de IAM para cualquier rol que permita el acceso a los datos.",
      "Revise la configuración del proxy con reconocimiento de identidad para cada recurso.",
      "Crear un trabajo de prevención de pérdida de datos."
    ],
    "answer": "Revise los permisos de IAM para cualquier rol que permita el acceso a los datos."
  },
  {
    "question": "Su empresa ha adoptado una estrategia de nube híbrida en la que algunas de las aplicaciones están desplegadas de en Google Cloud. Un túnel de red privada virtual (VPN) conecta su nube privada virtual (VPC) en Google Cloud con la red local de su empresa. Múltiples aplicaciones en Google Necesitas conectarte a un servidor de base de datos local en la nube y quieres evitar tener que cambiar la configuración IP en todas tus aplicaciones cuando cambie la IP de la base de datos. ¿Qué deberías hacer?",
    "options": [
      "Configure Cloud NAT para todas las subredes de su VPC que se utilizarán al salir de las instancias de VM.",
      "Cree una zona privada en Cloud DNS y configure las aplicaciones con el nombre DNS.",
      "Configure la IP de la base de datos como metadatos personalizados para cada instancia y consulte los metadatos. servidor.",
      "Consultar el DNS interno de Compute Engine desde las aplicaciones para recuperar la IP de la base de datos."
    ],
    "answer": "Cree una zona privada en Cloud DNS y configure las aplicaciones con el nombre DNS."
  },
  {
    "question": "Has desarrollado una aplicación web en contenedores que dará servicio a tus compañeros durante el horario laboral. Quieres asegurarte de que no se generen costes fuera de ese horario. Acabas de crear un nuevo proyecto en Google Cloud y quieres desplegar la aplicación. ¿Qué debes hacer?",
    "options": [
      "Implemente el contenedor en Cloud Run para Anthos y establezca el número mínimo de instancias en cero.",
      "Implemente el contenedor en Cloud Run (totalmente administrado) y configure el número mínimo de instancias. a cero.",
      "Implemente el contenedor en el entorno flexible de App Engine con escalado automático y establezca el valor min_instances en cero en el archivo app.yaml.",
      "Implemente el contenedor en el entorno flexible de App Engine con escalado manual y establezca el valor. instancias a cero en el archivo app.yaml."
    ],
    "answer": "Implemente el contenedor en Cloud Run (totalmente administrado) y configure el número mínimo de instancias. a cero."
  },
  {
    "question": "Has experimentado con Google Cloud usando tu tarjeta de crédito y has cargado los gastos a tu empresa. Tu empresa quiere simplificar el proceso de facturación e incluir los costos de tus proyectos en su factura mensual. ¿Qué deberías hacer?",
    "options": [
      "Otorgar al equipo financiero el rol de IAM de «Usuario de cuenta de facturación» en la cuenta de facturación vinculada. a su tarjeta de crédito.",
      "Configure la exportación de facturación de BigQuery y otorgue a su departamento financiero acceso IAM para consultar los datos.",
      "Crea una solicitud de soporte con Google Billing Support para pedirles que envíen la factura a tu empresa.",
      "Cambie la cuenta de facturación de sus proyectos a la cuenta de facturación de su empresa."
    ],
    "answer": "Cambie la cuenta de facturación de sus proyectos a la cuenta de facturación de su empresa."
  },
  {
    "question": "Usted está ejecutando un almacén de datos en BigQuery. Una empresa asociada está ofreciendo un motor de recomendaciones basado en los datos de su almacén de datos. La empresa asociada también está ejecutando su aplicación en Google Cloud. Ellos administran los recursos en su propio proyecto, pero necesitan acceso al conjunto de datos de BigQuery en su proyecto. Usted desea proporcionar a la empresa asociada acceso al Conjunto de datos. ¿Qué debes hacer?",
    "options": [
      "Cree una cuenta de servicio en su propio proyecto y otorgue a esta cuenta de servicio acceso a BigQuery en su proyecto.",
      "Crea una cuenta de servicio en tu propio proyecto y solicita al socio que te otorgue esta cuenta de servicio. acceso a BigQuery en su proyecto.",
      "Pídele al socio que cree una cuenta de servicio en su proyecto y que le otorgue a dicha cuenta acceso a BigQuery en su proyecto.",
      "Pídele al socio que cree una cuenta de servicio en su proyecto y que le otorgue acceso a dicha cuenta de servicio al conjunto de datos de BigQuery en tu proyecto."
    ],
    "answer": "Pídele al socio que cree una cuenta de servicio en su proyecto y que le otorgue acceso a dicha cuenta de servicio al conjunto de datos de BigQuery en tu proyecto."
  },
  {
    "question": "Tu aplicación web se ha estado ejecutando correctamente en Cloud Run para Anthos. Quieres evaluar una versión actualizada de la aplicación con un porcentaje específico de tus usuarios de producción (implementación canary). ¿Qué debes hacer?",
    "options": [
      "Cree un nuevo servicio con la nueva versión de la aplicación. Divida el tráfico entre esta versión y la versión que se está ejecutando actualmente.",
      "Crea una nueva revisión con la nueva versión de la aplicación. Divide el tráfico entre esta versión y la versión que se está ejecutando actualmente.",
      "Cree un nuevo servicio con la nueva versión de la aplicación. Agregue un balanceador de carga HTTP delante de ambos servicios.",
      "Crea una nueva revisión con la nueva versión de la aplicación. Agrega un balanceador de carga HTTP delante de ambas revisiones."
    ],
    "answer": "Crea una nueva revisión con la nueva versión de la aplicación. Divide el tráfico entre esta versión y la versión que se está ejecutando actualmente."
  },
  {
    "question": "Tu empresa desarrolló un juego para móviles alojado en Google Cloud. Los jugadores se conectan al juego con sus teléfonos móviles a través de internet. El juego envía paquetes UDP para informar a los servidores sobre las acciones de los jugadores durante las partidas multijugador. El backend del juego puede escalar en varias máquinas virtuales (VM), y quieres exponerlas a través de una única dirección IP. ¿Qué deberías hacer?",
    "options": [
      "Configure un balanceador de carga SSL Proxy delante de los servidores de aplicaciones.",
      "Configure un balanceador de carga UDP interno delante de los servidores de aplicaciones.",
      "Configure un balanceador de carga HTTP(s) externo delante de los servidores de aplicaciones.",
      "Configure un balanceador de carga de red externa delante de los servidores de aplicaciones."
    ],
    "answer": "Configure un balanceador de carga de red externa delante de los servidores de aplicaciones."
  },
  {
    "question": "Trabajas para un hospital que almacena sus imágenes médicas en una sala de datos local. El hospital desea utilizar almacenamiento en la nube para el archivo de estas imágenes. Además, busca un proceso automatizado para subir las nuevas imágenes médicas a la nube. Debes diseñar e implementar una solución. ¿Qué debes hacer?",
    "options": [
      "Cree un tema de Pub/Sub y habilite un activador de Cloud Storage para dicho tema. Cree una aplicación que envíe todas las imágenes médicas al tema de Pub/Sub.",
      "Implemente un trabajo de Dataflow desde la plantilla de lotes, \"Datastore a Cloud Storage\". Programe el trabajo por lotes en el intervalo deseado.",
      "Cree un script que utilice la interfaz de línea de comandos gsutil para sincronizar el almacenamiento local. Con almacenamiento en la nube. Programe el script como una tarea programada (cron job).",
      "En la consola de Cloud, vaya a Almacenamiento en la nube. Cargue las imágenes correspondientes en el bucket adecuado."
    ],
    "answer": "Cree un script que utilice la interfaz de línea de comandos gsutil para sincronizar el almacenamiento local. Con almacenamiento en la nube. Programe el script como una tarea programada (cron job)."
  },
  {
    "question": "Su auditor desea revisar el uso que hace su organización de los datos en Google Cloud. Le interesa especialmente auditar quién accedió a los datos en los buckets de Cloud Storage. Debe facilitarle el acceso a los datos que necesita. ¿Qué debe hacer?",
    "options": [
      "Active los registros de acceso a datos para los buckets que desea auditar y, a continuación, cree una consulta en el visor de registros que filtre por Cloud Storage.",
      "Asigne los permisos adecuados y, a continuación, cree un informe de Data Studio sobre los registros de auditoría de actividad del administrador.",
      "Asigne los permisos adecuados y, a continuación, utilice la monitorización en la nube para revisar las métricas.",
      "Utilice la API de exportación de registros para proporcionar los registros de auditoría de actividad del administrador en el formato que deseen."
    ],
    "answer": "Active los registros de acceso a datos para los buckets que desea auditar y, a continuación, cree una consulta en el visor de registros que filtre por Cloud Storage."
  },
  {
    "question": "Recibiste un archivo JSON que contenía una clave privada de una cuenta de servicio para obtener acceso a Tienes varios recursos en un proyecto de Google Cloud. Descargaste e instalaste el SDK de Cloud y quieres usar esta clave privada para la autenticación y autorización al ejecutar comandos de gcloud. ¿Qué debes hacer?",
    "options": [
      "Utilice el comando gcloud auth login y apúntelo a la clave privada.",
      "Utilice el comando gcloud auth activate­service­account y apúntelo a la clave privada.",
      "Coloque el archivo de clave privada en el directorio de instalación del Cloud SDK y cámbiele el nombre a €.גjson.credentials€ג",
      "Coloque el archivo de clave privada en su directorio personal y cámbiele el nombre a «CREDENCIALES DE LA APLICACIÓN DE GOOGLE»"
    ],
    "answer": "Utilice el comando gcloud auth activate­service­account y apúntelo a la clave privada."
  },
  {
    "question": "En su empresa, trabaja con una base de datos MySQL en la nube. Necesita conservar una copia de la base de datos al final de cada mes durante tres años con fines de auditoría. ¿Qué debería hacer?",
    "options": [
      "Configura una tarea de exportación para el primer día del mes. Escribe el archivo de exportación en un bucket de Cloud Storage de clase Archivo.",
      "Guarda la copia de seguridad automática del primer día de cada mes durante tres años. Almacena el archivo de copia de seguridad en un bucket de Cloud Storage de clase Archivo.",
      "Configure una copia de seguridad bajo demanda para el primer día del mes. Escriba la copia de seguridad en un bucket de Cloud Storage de clase Archivo.",
      "Convierta la copia de seguridad automática del primer día del mes en un archivo de exportación. Escriba el archivo de exportación en un bucket de Cloud Storage de clase Coldline."
    ],
    "answer": "Configura una tarea de exportación para el primer día del mes. Escribe el archivo de exportación en un bucket de Cloud Storage de clase Archivo."
  },
  {
    "question": "Estás supervisando una aplicación y recibes comentarios de los usuarios sobre un error específico que se está produciendo con frecuencia. Observas que el error se debe a que una cuenta de servicio tiene permisos insuficientes. Puedes solucionar el problema, pero quieres recibir una notificación si vuelve a ocurrir. ¿Qué debes hacer?",
    "options": [
      "En el Visor de registros, filtre los registros por gravedad 'Error' y el nombre de la cuenta de servicio.",
      "Cree un destino a BigQuery para exportar todos los registros. Cree un panel de control de Data Studio con los registros exportados.",
      "Cree una métrica personalizada basada en registros para el error específico que se utilizará en una Política de alertas.",
      "Otorgar acceso al propietario del proyecto a la cuenta de servicio."
    ],
    "answer": "Cree una métrica personalizada basada en registros para el error específico que se utilizará en una Política de alertas."
  },
  {
    "question": "Estás desarrollando una aplicación de negociación financiera que se utilizará a nivel global. Los datos se almacenan y consultan mediante una estructura relacional, y los clientes de todo el mundo deben acceder al mismo estado de los datos. La aplicación se implementará en varias regiones para ofrecer la menor latencia posible a los usuarios finales. Debes seleccionar una opción de almacenamiento para los datos de la aplicación que minimice la latencia. ¿Qué deberías hacer?",
    "options": [
      "Utilice Cloud Bigtable para el almacenamiento de datos.",
      "Utilice Cloud SQL para el almacenamiento de datos.",
      "Utilice Cloud Spanner para el almacenamiento de datos.",
      "Utilice Firestore para el almacenamiento de datos."
    ],
    "answer": "Utilice Cloud Spanner para el almacenamiento de datos."
  },
  {
    "question": "Estás a punto de implementar un nuevo sistema de planificación de recursos empresariales (ERP) en Google Cloud. La aplicación almacena toda la base de datos en memoria para un acceso rápido a los datos, y necesitas configurar los recursos más adecuados en Google Cloud para esta aplicación. ¿Qué debes hacer?",
    "options": [
      "Aprovisionar instancias de Compute Engine interrumpibles.",
      "Aprovisionar instancias de Compute Engine con GPU conectadas.",
      "Aprovisionar instancias de Compute Engine con unidades SSD locales conectadas.",
      "Aprovisionar instancias de Compute Engine con el tipo de máquina M1."
    ],
    "answer": "Aprovisionar instancias de Compute Engine con el tipo de máquina M1."
  },
  {
    "question": "Has desarrollado una aplicación compuesta por varios microservicios, cada uno empaquetado en su propia imagen de contenedor Docker. Quieres desplegar la aplicación completa en Google Kubernetes Engine para poder escalar cada microservicio individualmente. ¿Qué deberías hacer?",
    "options": [
      "Cree e implemente una definición de recurso personalizado por cada microservicio.",
      "Crea y despliega un archivo Docker Compose.",
      "Crear e implementar un trabajo por cada microservicio.",
      "Crear e implementar un despliegue por cada microservicio."
    ],
    "answer": "Crear e implementar un despliegue por cada microservicio."
  },
  {
    "question": "En un mismo proyecto, tendrás varias aplicaciones ejecutándose en distintas instancias de Compute Engine. Quieres especificar con mayor precisión la cuenta de servicio que utiliza cada instancia al llamar a las API de Google Cloud. ¿Qué debes hacer?",
    "options": [
      "Al crear las instancias, especifique una cuenta de servicio para cada instancia.",
      "Al crear las instancias, asigne el nombre de cada cuenta de servicio como metadatos de la instancia.",
      "Después de iniciar las instancias, utilice gcloud compute instances update para especificar una cuenta de servicio para cada instancia.",
      "Después de iniciar las instancias, utilice gcloud compute instances update para asignar el nombre de la cuenta de servicio correspondiente como metadatos de la instancia."
    ],
    "answer": "Al crear las instancias, especifique una cuenta de servicio para cada instancia."
  },
  {
    "question": "Estás creando una aplicación que se ejecutará en Google Kubernetes Engine. Has identificado MongoDB como el sistema de base de datos más adecuado para tu aplicación y deseas implementar un entorno MongoDB administrado que ofrezca un acuerdo de nivel de servicio (SLA) de soporte. ¿Qué debes hacer?",
    "options": [
      "Cree un clúster de Cloud Bigtable y utilice la API de HBase.",
      "Implemente MongoDB Atlas desde Google Cloud Marketplace.",
      "Descargue un paquete de instalación de MongoDB y ejecútelo en instancias de Compute Engine.",
      "Descargue un paquete de instalación de MongoDB y ejecútelo en un grupo de instancias administradas."
    ],
    "answer": "Implemente MongoDB Atlas desde Google Cloud Marketplace."
  },
  {
    "question": "Usted está gestionando un proyecto para el departamento de Inteligencia de Negocios (BI) de su empresa. Un pipeline de datos ingiere datos en BigQuery mediante streaming. Desea que los usuarios del departamento de BI puedan ejecutar consultas SQL personalizadas sobre los datos más recientes en BigQuery. ¿Qué debería hacer?",
    "options": [
      "Cree un panel de Data Studio que utilice las tablas de BigQuery relacionadas como origen y otorgue al equipo de BI acceso de visualización al panel de Data Studio.",
      "Cree una cuenta de servicio para el equipo de BI y distribuya una nueva clave privada a cada miembro del equipo. Equipo de BI.",
      "Utilice Cloud Scheduler para programar un trabajo de Dataflow por lotes para copiar los datos de BigQuery al almacén de datos interno del equipo de BI.",
      "Asigne el rol de IAM de Usuario de BigQuery a un Grupo de Google que contenga a los miembros de BI. equipo."
    ],
    "answer": "Asigne el rol de IAM de Usuario de BigQuery a un Grupo de Google que contenga a los miembros de BI. equipo."
  },
  {
    "question": "Su empresa está trasladando toda su carga de trabajo a Compute Engine. Algunos servidores deben ser accesibles a través de Internet, y otros solo deben ser accesibles a través de la red interna. Todos los servidores deben poder comunicarse entre sí a través de puertos y protocolos específicos de la red local actual se basa en una zona desmilitarizada (DMZ) para los servidores públicos y una red de área local (LAN) para los servidores privados. Debe diseñar la infraestructura de red en Google Cloud para que cumpla con estos requisitos. ¿Qué debería hacer? discusión Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. Cree una única VPC con una subred para la DMZ y otra para la LAN. 2. Configure reglas de firewall para permitir el tráfico relevante entre las subredes de la DMZ y la LAN, y otra regla de firewall para permitir el tráfico de entrada público para la DMZ.",
      "1. Cree una única VPC con una subred para la DMZ y otra para la LAN. 2. Configure reglas de firewall para permitir el tráfico relevante entre las subredes de la DMZ y la LAN, y otra regla de firewall para permitir el tráfico de salida público para la DMZ.",
      "1. Cree una VPC con una subred para la DMZ y otra VPC con una subred para la LAN. 2. Configure Se configuraron reglas de firewall para abrir el tráfico relevante entre la DMZ y las subredes LAN, y otra regla de firewall para permitir el tráfico de entrada público a la DMZ.",
      "1. Cree una VPC con una subred para la DMZ y otra VPC con una subred para la LAN. 2. Configure reglas de firewall para permitir el tráfico relevante entre las subredes de la DMZ y la LAN, y otra regla de firewall para permitir el tráfico de salida público para la DMZ."
    ],
    "answer": "1. Cree una única VPC con una subred para la DMZ y otra para la LAN. 2. Configure reglas de firewall para permitir el tráfico relevante entre las subredes de la DMZ y la LAN, y otra regla de firewall para permitir el tráfico de entrada público para la DMZ."
  },
  {
    "question": "Acabas de crear un nuevo proyecto que se utilizará para desplegar una aplicación distribuida globalmente. Utilizarás Cloud Spanner para el almacenamiento de datos. Quieres crear una instancia de Cloud Spanner. Quieres realizar el primer paso para preparar la creación de la instancia. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 181 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Habilitar la API de Cloud Spanner.",
      "Configure su instancia de Cloud Spanner para que sea multirregional.",
      "Cree una nueva red VPC con subredes en todas las regiones deseadas.",
      "Otórgate el rol de IAM de Administrador de Cloud Spanner."
    ],
    "answer": "Habilitar la API de Cloud Spanner."
  },
  {
    "question": "Has creado un nuevo proyecto en Google Cloud a través de la interfaz de línea de comandos (CLI) gcloud y has vinculado una cuenta de facturación. Necesitas crear una nueva instancia de Compute Engine usando la CLI. Es necesario realizar los pasos previos. ¿Qué debes hacer?",
    "options": [
      "Cree un espacio de trabajo de monitorización en la nube.",
      "Cree una red VPC en el proyecto.",
      "Habilitar la API de computación de googleapis.com.",
      "Otórguese el rol de IAM de Administrador de Equipos."
    ],
    "answer": "Habilitar la API de computación de googleapis.com."
  },
  {
    "question": "Su empresa ha desarrollado una nueva aplicación compuesta por varios microservicios. Desea implementarla en Google Kubernetes Engine (GKE) y asegurarse de que el clúster pueda escalar a medida que se implementen más aplicaciones en el futuro. Quiere evitar la intervención manual con cada nueva implementación. ¿Qué debería hacer?",
    "options": [
      "Implemente la aplicación en GKE y agregue un HorizontalPodAutoscaler a la implementación.",
      "Implemente la aplicación en GKE y agregue un VerticalPodAutoscaler a la implementación.",
      "Cree un clúster GKE con el escalado automático habilitado en el grupo de nodos. Establezca un tamaño mínimo y máximo para el grupo de nodos.",
      "Cree un grupo de nodos independiente para cada aplicación e implemente cada aplicación en su grupo de nodos dedicado."
    ],
    "answer": "Cree un clúster GKE con el escalado automático habilitado en el grupo de nodos. Establezca un tamaño mínimo y máximo para el grupo de nodos."
  },
  {
    "question": "Necesitas administrar una aplicación de terceros que se ejecutará en una instancia de Compute Engine. Otras instancias de Compute Engine ya están en funcionamiento con la configuración predeterminada. Los archivos de instalación de la aplicación están alojados en Cloud Storage. Necesitas acceder a estos archivos desde la nueva instancia sin permitir que otras máquinas virtuales (VM) accedan a ellos. ¿Qué debes hacer?",
    "options": [
      "Cree la instancia con la cuenta de servicio predeterminada de Compute Engine. Otorgue a la cuenta de servicio permisos en Cloud Storage.",
      "Cree la instancia con la cuenta de servicio predeterminada de Compute Engine. Agregue metadatos a los objetos en Cloud Storage que coincidan con los metadatos de la nueva instancia.",
      "Cree una nueva cuenta de servicio y asígnela a la nueva instancia. Otorgue a la cuenta de servicio permisos en Cloud Storage.",
      "Cree una nueva cuenta de servicio y asígnela a la nueva instancia. Agregue metadatos a los objetos en Cloud Storage que coincidan con los metadatos de la nueva instancia."
    ],
    "answer": "Cree una nueva cuenta de servicio y asígnela a la nueva instancia. Otorgue a la cuenta de servicio permisos en Cloud Storage."
  },
  {
    "question": "Necesitas configurar un almacenamiento de datos óptimo para los archivos almacenados en Cloud Storage con un coste mínimo. Estos archivos se utilizan en un sistema de análisis crítico que se ejecuta de forma continua. Los usuarios se encuentran en Boston, Massachusetts (Estados Unidos). ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Configure el almacenamiento regional para la región más cercana a los usuarios. Configure una clase de almacenamiento Nearline.",
      "Configure el almacenamiento regional para la región más cercana a los usuarios. Configure una clase de almacenamiento estándar.",
      "Configure el almacenamiento de doble región para la región dual más cercana a los usuarios. Configure una clase de almacenamiento Nearline.",
      "Configure el almacenamiento de doble región para la región dual más cercana a los usuarios. Configure una clase de almacenamiento estándar."
    ],
    "answer": "Configure el almacenamiento regional para la región más cercana a los usuarios. Configure una clase de almacenamiento estándar."
  },
  {
    "question": "Estás desarrollando una nueva aplicación web que se implementará en Google Cloud Platform. Como parte En una etapa temprana de tu ciclo de lanzamiento, quieres probar las actualizaciones de tu aplicación con una pequeña parte del tráfico real de usuarios. La mayoría de los usuarios deberían seguir utilizando una versión estable de tu aplicación. ¿Qué deberías hacer?",
    "options": [
      "Implementa la aplicación en App Engine. Para cada actualización, crea una nueva versión del mismo servicio. Configura la división de tráfico para enviar un pequeño porcentaje del tráfico a la nueva versión.",
      "Implementa la aplicación en App Engine. Para cada actualización, crea un nuevo servicio. Configura la división de tráfico para enviar un pequeño porcentaje del tráfico al nuevo servicio.",
      "Implemente la aplicación en Kubernetes Engine. Para una nueva versión, actualice la implementación para que utilice la nueva versión.",
      "Implemente la aplicación en Kubernetes Engine. Para una nueva versión, cree una nueva implementación. Actualice el servicio para que utilice la nueva implementación."
    ],
    "answer": "Implementa la aplicación en App Engine. Para cada actualización, crea una nueva versión del mismo servicio. Configura la división de tráfico para enviar un pequeño porcentaje del tráfico a la nueva versión."
  },
  {
    "question": "Necesitas agregar un grupo de nuevos usuarios a Cloud Identity. Algunos de los usuarios ya tienen cuentas de Google existentes. Quieres seguir una de las prácticas recomendadas por Google y evitar conflictos. cuentas. ¿Qué debes hacer?",
    "options": [
      "Invitar al usuario a transferir su cuenta existente.",
      "Invite al usuario a utilizar un alias de correo electrónico para resolver el conflicto.",
      "Indique al usuario que debe eliminar su cuenta existente.",
      "Indíquele al usuario que elimine todos los correos electrónicos personales de la cuenta existente."
    ],
    "answer": "Invitar al usuario a transferir su cuenta existente."
  },
  {
    "question": "Necesitas administrar una instancia de Cloud Spanner para obtener el mejor rendimiento de las consultas. Tu instancia en producción se ejecuta en una única región de Google Cloud. Necesitas mejorar el rendimiento en el menor tiempo posible. Quieres seguir las mejores prácticas de Google para la configuración del servicio. ¿Qué debes hacer?",
    "options": [
      "Cree una alerta en Monitoreo en la nube para recibir una alerta cuando el porcentaje de utilización de CPU de alta prioridad alcanza el 45%. Si supera este umbral, añada nodos a su instancia.",
      "Crea una alerta en Cloud Monitoring para que te avise cuando el porcentaje de utilización de CPU de alta prioridad alcance el 45 %. Utiliza las estadísticas de consultas de la base de datos para identificar las consultas que generan un alto consumo de CPU y, a continuación, reescribe esas consultas para optimizar el uso de recursos.",
      "Crea una alerta en Cloud Monitoring para que te avise cuando el porcentaje de utilización de CPU de alta prioridad alcance el 65 %. Si superas este umbral, añade nodos a tu instancia.",
      "Cree una alerta en Monitoreo en la nube para recibir una alerta cuando el porcentaje de utilización de CPU de alta prioridad alcanza el 65%. Utilice las estadísticas de consultas de la base de datos para identificar las consultas que generan un alto consumo de CPU y, a continuación, reescriba esas consultas para optimizar el uso de recursos."
    ],
    "answer": "Crea una alerta en Cloud Monitoring para que te avise cuando el porcentaje de utilización de CPU de alta prioridad alcance el 65 %. Si superas este umbral, añade nodos a tu instancia."
  },
  {
    "question": "Su empresa cuenta con una aplicación interna para la gestión de pedidos transaccionales. Esta aplicación es utilizada exclusivamente por empleados en una única ubicación física. Requiere consistencia fuerte, consultas rápidas y garantías ACID para actualizaciones transaccionales en múltiples tablas. La primera versión de la aplicación está implementada en PostgreSQL y desea migrarla a la nube con cambios mínimos en el código. ¿Qué base de datos es la más adecuada para esta aplicación?",
    "options": [
      "BigQuery",
      "SQL en la nube",
      "Cloud Spanner",
      "Almacén de datos en la nube"
    ],
    "answer": "SQL en la nube"
  },
  {
    "question": "Se le ha asignado el mantenimiento de un clúster de Google Kubernetes Engine (GKE) llamado 'dev' que fue Implementado en Google Cloud. Desea administrar la configuración de GKE mediante la interfaz de línea de comandos (CLI). Acaba de descargar e instalar el SDK de Cloud. Desea asegurarse de que los futuros comandos de la CLI se dirijan por defecto a este clúster específico. ¿Qué debe hacer?",
    "options": [
      "Utilice el comando gcloud config set container/cluster dev.",
      "Utilice el comando gcloud container clusters update dev.",
      "Cree un archivo llamado gke.default en la carpeta ~/.gcloud que contenga el nombre del clúster.",
      "Cree un archivo llamado defaults.json en la carpeta ~/.gcloud que contenga el nombre del clúster."
    ],
    "answer": "Utilice el comando gcloud config set container/cluster dev."
  },
  {
    "question": "El equipo de ventas tiene un proyecto llamado Sales Data Digest con la ID acme­data­digest. Necesitas Configura recursos similares de Google Cloud para el equipo de marketing, pero estos deben organizarse de forma independiente a los del equipo de ventas. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 191 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Otorgar el rol de Editor de Proyecto al equipo de Marketing para acme­data­digest.",
      "Cree un enlace de proyecto en acme­data­digest y luego otorgue el rol de editor de proyecto al departamento de marketing. equipo.",
      "Crea otro proyecto con el ID acme­marketing­data­digest para el equipo de Marketing y despliega allí los recursos.",
      "Crea un nuevo proyecto llamado Marketing Data Digest y usa el ID acme­data­digest. Asigna el rol de Editor de proyecto al equipo de Marketing."
    ],
    "answer": "Crea otro proyecto con el ID acme­marketing­data­digest para el equipo de Marketing y despliega allí los recursos."
  },
  {
    "question": "Has implementado varias instancias de Linux en Compute Engine y planeas agregar más en las próximas semanas. Quieres poder acceder a todas estas instancias a través de tu cliente SSH por internet sin tener que configurar permisos de acceso específicos en las instancias existentes y nuevas. No quieres que las instancias de Compute Engine tengan una IP pública. ¿Qué deberías hacer?",
    "options": [
      "Configure el proxy con reconocimiento de identidad en la nube para recursos HTTPS.",
      "Configurar Cloud Identity­Aware Proxy para recursos SSH y TCP",
      "Cree un par de claves SSH y almacene la clave pública como una clave SSH para todo el proyecto.",
      "Cree un par de claves SSH y almacene la clave privada como una clave SSH para todo el proyecto."
    ],
    "answer": "Configurar Cloud Identity­Aware Proxy para recursos SSH y TCP"
  },
  {
    "question": "Has creado una aplicación empaquetada en una imagen de Docker. Quieres desplegar la imagen de Docker como una carga de trabajo en Google Kubernetes Engine. ¿Qué debes hacer?",
    "options": [
      "Cargue la imagen en Cloud Storage y cree un servicio de Kubernetes que haga referencia a la imagen.",
      "Cargue la imagen en Cloud Storage y cree un despliegue de Kubernetes que haga referencia a la imagen.",
      "Cargue la imagen en Container Registry y cree un servicio de Kubernetes que haga referencia a la imagen.",
      "Cargue la imagen en Container Registry y cree un despliegue de Kubernetes que haga referencia a la imagen."
    ],
    "answer": "Cargue la imagen en Container Registry y cree un despliegue de Kubernetes que haga referencia a la imagen."
  },
  {
    "question": "Estás usando Data Studio para visualizar una tabla de tu almacén de datos, que está basado en BigQuery. Los datos se agregan al almacén de datos durante el día. Por la noche, el resumen diario se recalcula sobrescribiendo la tabla. Acabas de notar que los gráficos en Data Studio no funcionan correctamente y quieres analizar el problema. ¿Qué deberías hacer?",
    "options": [
      "Revise la página de Informes de errores en la Consola de Cloud para encontrar cualquier error.",
      "Utilice la interfaz de BigQuery para revisar el trabajo nocturno y buscar posibles errores.",
      "Utilice Cloud Debugger para averiguar por qué no se actualizaron correctamente los datos.",
      "En Cloud Logging, cree un filtro para su informe de Data Studio."
    ],
    "answer": "Utilice la interfaz de BigQuery para revisar el trabajo nocturno y buscar posibles errores."
  },
  {
    "question": "Te han pedido que configures la facturación para un nuevo cliente de Google Cloud. Tu cliente quiere agrupar recursos que comparten políticas de IAM comunes. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice etiquetas para agrupar recursos que compartan políticas IAM comunes.",
      "Utilice carpetas para agrupar recursos que comparten políticas IAM comunes.",
      "Configure una estructura de cuenta de facturación adecuada para agrupar las políticas de IAM.",
      "Establezca una estructura de nombres de proyecto adecuada para agrupar las políticas de IAM."
    ],
    "answer": "Utilice carpetas para agrupar recursos que comparten políticas IAM comunes."
  },
  {
    "question": "Se le ha solicitado que cree una conectividad de red privada virtual (VPN) robusta entre una nueva nube privada virtual (VPC) y un sitio remoto. Los requisitos clave incluyen enrutamiento dinámico y un sistema compartido. Espacio de direcciones de 10.19.0.1/22 y sin sobreaprovisionamiento de túneles durante un evento de conmutación por error. Usted desea Para configurar una VPN en la nube de alta disponibilidad, siga las prácticas recomendadas por Google. ¿Qué debe hacer?",
    "options": [
      "Utilice una red VPC en modo personalizado, configure rutas estáticas y utilice enrutamiento activo/pasivo.",
      "Utilice una red VPC en modo automático, configure rutas estáticas y utilice enrutamiento activo/activo.",
      "Utilice una red VPC en modo personalizado, utilice rutas BGP (Border Gateway Protocol) de Cloud Router y utilice enrutamiento activo/ pasivo.",
      "Utilice una red VPC en modo automático, utilice rutas BGP (Border Gateway Protocol) de Cloud Router y configure el enrutamiento basado en políticas."
    ],
    "answer": "Utilice una red VPC en modo personalizado, utilice rutas BGP (Border Gateway Protocol) de Cloud Router y utilice enrutamiento activo/ pasivo."
  },
  {
    "question": "Estás ejecutando varios microservicios en un clúster de Kubernetes Engine. Un microservicio renderiza imágenes. El microservicio responsable del renderizado de imágenes requiere una gran cantidad de tiempo de CPU en comparación con la memoria que requiere. Los otros microservicios son cargas de trabajo optimizadas para tipos de máquinas estándar n1. Necesitas optimizar tu clúster para que todas las cargas de trabajo Están utilizando los recursos de la manera más eficiente posible. ¿Qué debería hacer?",
    "options": [
      "Asigne a los pods del microservicio de renderizado de imágenes una prioridad de pod más alta que a los demás microservicios.",
      "Cree un grupo de nodos con nodos de tipo máquina optimizados para computación para el microservicio de renderizado de imágenes. Utilice el grupo de nodos con nodos de tipo máquina de propósito general para los demás microservicios.",
      "Utilice el grupo de nodos con nodos de tipo máquina de propósito general para el microservicio de renderizado de imágenes. Cree un grupo de nodos con nodos de tipo máquina optimizados para computación para los demás microservicios.",
      "Configure la cantidad requerida de CPU y memoria en la especificación de solicitudes de recursos del despliegue del microservicio de renderizado de imágenes. Mantenga las solicitudes de recursos para los demás microservicios en el valor predeterminado."
    ],
    "answer": "Cree un grupo de nodos con nodos de tipo máquina optimizados para computación para el microservicio de renderizado de imágenes. Utilice el grupo de nodos con nodos de tipo máquina de propósito general para los demás microservicios."
  },
  {
    "question": "Tu organización tiene tres proyectos de Google Cloud en funcionamiento. Necesitas facturar al departamento de Marketing únicamente por sus servicios de Google Cloud para una nueva iniciativa dentro de su grupo. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "1. Verifique que se le haya asignado el rol de IAM de Administrador de facturación para el proyecto de Google Cloud de su organización para el departamento de Marketing. 2. Vincule el nuevo proyecto a una cuenta de facturación de Marketing.",
      "1. Verifique que se le haya asignado el rol de IAM de Administrador de facturación para la cuenta de Google Cloud de su organización. 2. Cree un nuevo proyecto de Google Cloud para el departamento de Marketing. 3. Establezca las etiquetas de proyecto de clave­valor predeterminadas en department:marketing para todos los servicios de este proyecto.",
      "1. Verifique que se le haya asignado el rol de IAM de Administrador de la organización para la cuenta de Google Cloud de su organización. 2. Cree un nuevo proyecto de Google Cloud para el departamento de Marketing. 3. Enlace el nuevo proyecto a una cuenta de facturación de marketing.",
      "1. Verifique que se le haya asignado el rol de IAM de Administrador de la organización para la cuenta de Google Cloud de su organización. 2. Cree un nuevo proyecto de Google Cloud para el departamento de Marketing. 3. Establezca las etiquetas de proyecto de clave­valor predeterminadas en department:marketing para todos los servicios de este proyecto."
    ],
    "answer": "1. Verifique que se le haya asignado el rol de IAM de Administrador de facturación para el proyecto de Google Cloud de su organización para el departamento de Marketing. 2. Vincule el nuevo proyecto a una cuenta de facturación de Marketing."
  },
  {
    "question": "Implementaste una aplicación en un grupo de instancias administradas en Compute Engine. La aplicación acepta tráfico del Protocolo de control de transmisión (TCP) en el puerto 389 y requiere que conserves la IP. Dirección del cliente que realiza la solicitud. Desea exponer la aplicación a internet mediante un balanceador de carga. ¿Qué debe hacer?",
    "options": [
      "Exponer la aplicación mediante el uso de un balanceador de carga de red TCP externo.",
      "Exponer la aplicación mediante el uso de un balanceador de carga proxy TCP.",
      "Exponga la aplicación utilizando un balanceador de carga proxy SSL.",
      "Exponer la aplicación mediante el uso de un balanceador de carga de red TCP interno."
    ],
    "answer": "Exponer la aplicación mediante el uso de un balanceador de carga de red TCP externo."
  },
  {
    "question": "Estás desarrollando una aplicación de juegos multijugador que almacenará la información del juego en una base de datos. A medida que aumenta la popularidad de la aplicación, le preocupa ofrecer un rendimiento constante. Debe garantizar un rendimiento óptimo para los usuarios de todo el mundo, sin aumentar la complejidad de la gestión. ¿Qué debería hacer?",
    "options": [
      "Utilice una base de datos Cloud SQL con replicación entre regiones para almacenar estadísticas de juegos en la UE, EE. UU., y las regiones de Asia­Pacífico.",
      "Utilice Cloud Spanner para almacenar los datos de usuario asociados a las estadísticas del juego.",
      "Utilice BigQuery para almacenar las estadísticas del juego con una instancia de Redis en Memorystore al frente para proporcionar consistencia global.",
      "Almacenar las estadísticas del juego en una base de datos Bigtable particionada por nombre de usuario."
    ],
    "answer": "Utilice Cloud Spanner para almacenar los datos de usuario asociados a las estadísticas del juego."
  },
  {
    "question": "Estás desarrollando una aplicación que almacena datos relacionales de usuarios. Usuarios de todo el mundo utilizarán esta aplicación. Tu director de tecnología (CTO) está preocupado por los requisitos de escalabilidad, ya que se desconoce el tamaño de la base de usuarios. Necesitas implementar una solución de base de datos que pueda escalar al ritmo del crecimiento de usuarios con cambios mínimos en la configuración. ¿Qué solución de almacenamiento deberías utilizar? Discusión sobre el tema 1 de la pregunta 201 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "SQL en la nube",
      "Firestore",
      "Cloud Spanner",
      "Mesa grande"
    ],
    "answer": "Cloud Spanner"
  },
  {
    "question": "Tu empresa tiene varios proyectos vinculados a una única cuenta de facturación en Google Cloud. Necesitas visualizar los costes con métricas específicas que se calculen dinámicamente según criterios propios de la empresa. Quieres automatizar el proceso. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 202 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "En la consola de Google Cloud, visualice los costos relacionados con los proyectos en la sección Informes.",
      "En la consola de Google Cloud, visualice los costos relacionados con los proyectos en la sección Desglose de costos.",
      "En la consola de Google Cloud, utilice la función de exportación de la tabla Cost. Cree un panel de Looker Studio sobre la exportación CSV.",
      "Configure la exportación de datos de facturación en la nube a BigQuery para la cuenta de facturación. Cree un panel de Looker Studio sobre la exportación de BigQuery."
    ],
    "answer": "Configure la exportación de datos de facturación en la nube a BigQuery para la cuenta de facturación. Cree un panel de Looker Studio sobre la exportación de BigQuery."
  },
  {
    "question": "Tienes una aplicación que se ejecuta en instancias de máquinas virtuales de Compute Engine en una nube privada virtual (VPC) personalizada. Las políticas de seguridad de tu empresa solo permiten el uso de direcciones IP internas en las instancias de máquinas virtuales y no les permiten conectarse a internet. Necesitas asegurarte de que la aplicación pueda acceder a un archivo alojado en un bucket de Cloud Storage dentro de tu proyecto. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 203 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Habilitar el acceso al servicio privado en el depósito de almacenamiento en la nube.",
      "Agregue storage.googleapis.com a la lista de servicios restringidos en un perímetro de Controles de servicio de VPC. y añade tu proyecto a la lista de proyectos protegidos.",
      "Habilite el acceso privado a Google en la subred dentro de la VPC personalizada.",
      "Implemente una instancia de Cloud NAT y dirija el tráfico a la dirección IP dedicada del bucket de Cloud Storage."
    ],
    "answer": "Habilite el acceso privado a Google en la subred dentro de la VPC personalizada."
  },
  {
    "question": "Su empresa adquirió una startup y ahora está integrando los sistemas informáticos de ambas compañías. La startup tenía un proyecto de producción en Google Cloud. Debe trasladar este proyecto a su organización y asegurarse de que se le facture a ella. Quieres realizar esta tarea con el mínimo esfuerzo. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 204 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice el método projects.move para mover el proyecto a su organización. Actualice la cuenta de facturación del proyecto con la de su organización.",
      "Asegúrese de tener asignado el rol de Administrador de identidades y accesos (IAM) en ambas organizaciones. Vaya al Administrador de recursos en la organización de Google Cloud de la startup y arrastre el proyecto a la organización de su empresa.",
      "Cree un catálogo privado para Google Cloud Marketplace y cargue los recursos del proyecto de producción de la startup en el catálogo. Comparta el catálogo con su organización y despliegue el recursos en el proyecto de su empresa.",
      "Cree una plantilla de infraestructura como código para todos los recursos del proyecto utilizando Terraform, y Implementa esa plantilla en un nuevo proyecto de tu organización. Elimina el proyecto de la organización de Google Cloud de la startup."
    ],
    "answer": "Utilice el método projects.move para mover el proyecto a su organización. Actualice la cuenta de facturación del proyecto con la de su organización."
  },
  {
    "question": "Todos los equipos de desarrollo (dev) de su organización se encuentran en Estados Unidos. Cada equipo de desarrollo tiene su propio proyecto de Google Cloud. Desea restringir el acceso para que cada equipo de desarrollo solo pueda crear recursos en la nube en Estados Unidos. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 205 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Crea una carpeta para contener todos los proyectos de desarrollo. Crea una política de organización para limitar los recursos en ubicaciones de EE. UU.",
      "Crea una organización para contener todos los proyectos de desarrollo. Crea una política de administración de identidades y accesos (IAM) para limitar los recursos en las regiones de EE. UU.",
      "Cree una política de administración de identidades y accesos (IAM) para restringir las ubicaciones de los recursos en el EE. UU. Aplicar la política a todos los proyectos de desarrollo.",
      "Cree una política de administración de identidades y accesos (IAM) para restringir las ubicaciones de los recursos en todos los proyectos de desarrollo. Aplicar la política a todos los roles de desarrollo."
    ],
    "answer": "Crea una carpeta para contener todos los proyectos de desarrollo. Crea una política de organización para limitar los recursos en ubicaciones de EE. UU."
  },
  {
    "question": "Estás configurando Cloud DNS. Quieres crear registros DNS que apunten a home.mydomain.com, mydomain.com y www.mydomain.com. a la dirección IP de su balanceador de carga de Google Cloud. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 206 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un registro CNAME para que mydomain.com apunte al balanceador de carga y cree dos registros A para que WWW y HOME apunten a mydomain.com respectivamente.",
      "Cree un registro CNAME para que mydomain.com apunte al balanceador de carga y cree dos registros AAAA para que WWW y HOME apunten a mydomain.com respectivamente.",
      "Cree un registro A para apuntar mydomain.com al balanceador de carga y cree dos registros CNAME para apuntar WWW y HOME a mydomain.com respectivamente.",
      "Cree un registro A para que mydomain.com apunte al balanceador de carga y cree dos registros NS para que WWW y HOME apunten a mydomain.com respectivamente."
    ],
    "answer": "Cree un registro A para apuntar mydomain.com al balanceador de carga y cree dos registros CNAME para apuntar WWW y HOME a mydomain.com respectivamente."
  },
  {
    "question": "En la VPC predeterminada, dispone de dos subredes (subred­a y subred­b). Sus servidores de base de datos se ejecutan en la subred­a, mientras que sus servidores de aplicaciones y web se ejecutan en la subred­b. Desea configurar una regla de firewall que permita únicamente el tráfico de base de datos desde los servidores de aplicaciones hacia los servidores de base de datos. ¿Qué debe hacer? Discusión sobre el tema 1 de la pregunta 207 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "• Cree las cuentas de servicio sa­app y sa­db.• Asocie la cuenta de servicio sa­app con los servidores de aplicaciones y la cuenta de servicio sa­db con los servidores de bases de datos.• Cree una regla de firewall de entrada para permitir el tráfico de red desde la cuenta de servicio de origen sa­app a la cuenta de servicio de destino sa­db.",
      "• Cree las etiquetas de red app­server y db­server.• Agregue la etiqueta app­server a los servidores de aplicaciones y la etiqueta db­server a los servidores de bases de datos.• Cree una regla de firewall de salida para permitir el tráfico de red desde la etiqueta de red de origen app­server a la etiqueta de red de destino db­server.",
      "• Cree una cuenta de servicio sa­app y una etiqueta de red db­server.• Asocie la cuenta de servicio sa­app con los servidores de aplicaciones y la etiqueta de red db­server con los servidores de bases de datos.• Cree una regla de firewall de entrada para permitir el tráfico de red desde direcciones IP de VPC de origen y dirigirlo a las direcciones IP de la subred­a.",
      "• Cree una etiqueta de red app­server y una cuenta de servicio sa­db.• Agregue la etiqueta a los servidores de aplicaciones y asocie la cuenta de servicio con los servidores de bases de datos.• Cree una regla de firewall de salida para permitir el tráfico de red desde la etiqueta de red de origen app­server hasta la cuenta de servicio de destino sa­db."
    ],
    "answer": "• Cree las cuentas de servicio sa­app y sa­db.• Asocie la cuenta de servicio sa­app con los servidores de aplicaciones y la cuenta de servicio sa­db con los servidores de bases de datos.• Cree una regla de firewall de entrada para permitir el tráfico de red desde la cuenta de servicio de origen sa­app a la cuenta de servicio de destino sa­db."
  },
  {
    "question": "Tu equipo quiere implementar una solución específica de sistema de gestión de contenidos (CMS) en Google Cloud. Necesitas una forma rápida y sencilla de implementar e instalar la solución. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 208 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Busca la solución CMS en Google Cloud Marketplace. Usa gcloud CLI para implementar la solución.",
      "Busque la solución CMS en Google Cloud Marketplace. Implemente la solución directamente desde Mercado de la nube.",
      "Busca la solución CMS en Google Cloud Marketplace. Usa Terraform y el ID de Cloud Marketplace para implementar la solución con los parámetros adecuados.",
      "Utilice la guía de instalación del proveedor del CMS. Realice la instalación a través de su sistema de gestión de configuración."
    ],
    "answer": "Busque la solución CMS en Google Cloud Marketplace. Implemente la solución directamente desde Mercado de la nube."
  },
  {
    "question": "Trabajas para una startup que se registró oficialmente como empresa hace 6 meses. A medida que crece tu base de clientes, aumenta tu uso de Google Cloud. Quieres permitir que todos los ingenieros creen nuevos proyectos sin pedirles la información de su tarjeta de crédito. ¿Qué deberías hacer?",
    "options": [
      "Cree una cuenta de facturación, asóciele un método de pago y otorgue a todos los creadores de proyectos permiso para asociar esa cuenta de facturación con sus proyectos.",
      "Otorgar a todos los ingenieros permiso para crear sus propias cuentas de facturación para cada nuevo proyecto.",
      "Solicitar facturación mensual y que el departamento de finanzas emita una única factura para el proyecto. equipo.",
      "Cree una cuenta de facturación, asóciela con una orden de compra mensual y envíe la orden de compra a Google Cloud."
    ],
    "answer": "Cree una cuenta de facturación, asóciele un método de pago y otorgue a todos los creadores de proyectos permiso para asociar esa cuenta de facturación con sus proyectos."
  },
  {
    "question": "Tu servidor de integración y entrega continua (CI/CD) no puede ejecutar acciones de Google Cloud en un proyecto específico debido a problemas de permisos. Debes validar si la cuenta de servicio utilizada tiene los roles adecuados en dicho proyecto. ¿Qué debes hacer?",
    "options": [
      "Abra la consola de Google Cloud y compruebe los roles de Identity and Access Management (IAM) asignados a la cuenta de servicio en el proyecto o heredados de los niveles de carpeta u organización.",
      "Abra la consola de Google Cloud y revise las políticas de la organización.",
      "Abra la consola de Google Cloud y ejecute una consulta para determinar qué recursos utiliza este servicio. La cuenta puede acceder.",
      "Abra la consola de Google Cloud y ejecute una consulta de los registros de auditoría para encontrar errores de permiso denegado para esta cuenta de servicio."
    ],
    "answer": "Abra la consola de Google Cloud y compruebe los roles de Identity and Access Management (IAM) asignados a la cuenta de servicio en el proyecto o heredados de los niveles de carpeta u organización."
  },
  {
    "question": "Tu equipo utiliza instancias Linux en Google Cloud. Debes asegurarte de que tu equipo inicie sesión en estas instancias de la forma más segura y rentable posible. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 211 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Asigne una IP pública a las instancias y permita las conexiones entrantes desde Internet en el puerto 22 para SSH.",
      "Utilice el comando gcloud compute ssh con la bandera ­­tunnel­through­iap. Permita el tráfico entrante desde el rango de IP 35.235.240.0/20 en el puerto 22.",
      "Utilice una herramienta de terceros para proporcionar acceso remoto a las instancias.",
      "Cree un servidor bastión con acceso público a Internet. Cree el túnel SSH a la instancia a través del servidor bastión."
    ],
    "answer": "Utilice el comando gcloud compute ssh con la bandera ­­tunnel­through­iap. Permita el tráfico entrante desde el rango de IP 35.235.240.0/20 en el puerto 22."
  },
  {
    "question": "Un miembro externo de tu equipo necesita acceso de lista a las imágenes y discos de uno de tus proyectos. Quieres seguir las prácticas recomendadas por Google al otorgarle los permisos necesarios. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 212 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un rol personalizado y agregue todos los permisos necesarios de compute.disks.list y compute.images.list como includedPermissions. Asigne el rol personalizado al usuario a nivel de proyecto.",
      "Cree un rol personalizado basado en el rol de Usuario de imagen de cómputo. Agregue compute.disks.list al campo includedPermissions. Asigne el rol personalizado al usuario a nivel de proyecto.",
      "Cree un rol personalizado basado en el rol de Administrador de almacenamiento de computación. Excluya los permisos innecesarios del rol personalizado. Asigne el rol personalizado al usuario a nivel de proyecto.",
      "Otorgar el rol de Administrador de Almacenamiento de Computación a nivel de proyecto."
    ],
    "answer": "Cree un rol personalizado y agregue todos los permisos necesarios de compute.disks.list y compute.images.list como includedPermissions. Asigne el rol personalizado al usuario a nivel de proyecto."
  },
  {
    "question": "Estás ejecutando una aplicación web en Cloud Run para varios cientos de usuarios. Algunos de ellos se quejan de que la página inicial tarda mucho más en cargar que las siguientes. Quieres seguir las recomendaciones de Google para solucionar este problema. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 213 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Establezca el número mínimo de instancias para su servicio Cloud Run en 3.",
      "Establezca el número de concurrencia en 1 para su servicio Cloud Run.",
      "Establezca el número máximo de instancias para su servicio Cloud Run en 100.",
      "Actualice su aplicación web para usar el protocolo HTTP/2 en lugar de HTTP/1.1."
    ],
    "answer": "Establezca el número mínimo de instancias para su servicio Cloud Run en 3."
  },
  {
    "question": "Estás creando un lago de datos en Google Cloud para tu aplicación de Internet de las Cosas (IoT). Esta aplicación cuenta con millones de sensores que transmiten constantemente datos estructurados y no estructurados a tu servidor en la nube. Quieres crear una arquitectura altamente disponible y resiliente basada en las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Transmitir datos a Pub/Sub y usar Dataflow para enviar datos a Cloud Storage.",
      "Transmitir datos a Pub/Sub y usar el Servicio de Transferencia de Almacenamiento para enviar datos a BigQuery.",
      "Transmitir datos a Dataflow y usar Dataprep de Trifacta para enviar datos a Bigtable.",
      "Transmitir datos a Dataflow y usar el Servicio de Transferencia de Almacenamiento para enviar datos a BigQuery."
    ],
    "answer": "Transmitir datos a Pub/Sub y usar Dataflow para enviar datos a Cloud Storage."
  },
  {
    "question": "Te estás quedando sin direcciones IP internas primarias en una subred de una VPC en modo personalizado. La subred tiene el rango de IP 10.0.0.0/20, y las direcciones IP son utilizadas principalmente por máquinas virtuales del proyecto. Necesitas proporcionar más direcciones IP para las máquinas virtuales. ¿Qué debes hacer?",
    "options": [
      "Agregue un rango de IP secundario 10.1.0.0/20 a la subred.",
      "Cambie el rango de IP de la subred de 10.0.0.0/20 a 10.0.0.0/18.",
      "Cambie el rango de IP de la subred de 10.0.0.0/20 a 10.0.0.0/22.",
      "Convertir el rango de direcciones IP de la subred de IPv4 a IPv6."
    ],
    "answer": "Cambie el rango de IP de la subred de 10.0.0.0/20 a 10.0.0.0/18."
  },
  {
    "question": "Su empresa exige que todos los desarrolladores tengan los mismos permisos, independientemente del proyecto de Google Cloud en el que trabajen. La política de seguridad de su empresa también restringe los permisos de desarrollador a Compute Engine, Cloud Functions y Cloud SQL. Desea implementar la política de seguridad con el mínimo esfuerzo. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 216 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "• Cree un rol personalizado con permisos de Compute Engine, Cloud Functions y Cloud SQL en un proyecto dentro de la organización de Google Cloud.• Copie el rol en todos los proyectos creados dentro de la organización con el comando gcloud iam roles copy.• Asigne el rol a los desarrolladores en esos proyectos.",
      "• Agregue a todos los desarrolladores a un grupo de Google en Google Groups para Workspace.• Asigne el predefinido Rol de administrador de computación para el grupo de Google a nivel de la organización de Google Cloud.",
      "• Agregue a todos los desarrolladores a un grupo de Google en Cloud Identity.• Asigne roles predefinidos para permisos de Compute Engine, Cloud Functions y Cloud SQL al grupo de Google para cada proyecto en la organización de Google Cloud.",
      "• Agregue a todos los desarrolladores a un grupo de Google en Cloud Identity.• Cree un rol personalizado con permisos de Compute Engine, Cloud Functions y Cloud SQL a nivel de organización de Google Cloud.• Asigne el rol personalizado al grupo de Google."
    ],
    "answer": "• Agregue a todos los desarrolladores a un grupo de Google en Cloud Identity.• Cree un rol personalizado con permisos de Compute Engine, Cloud Functions y Cloud SQL a nivel de organización de Google Cloud.• Asigne el rol personalizado al grupo de Google."
  },
  {
    "question": "Trabajas para un hospital que almacena sus imágenes médicas en una sala de datos local. El hospital desea utilizar almacenamiento en la nube para el archivo de estas imágenes. Además, busca un proceso automatizado para subir las nuevas imágenes médicas a la nube. Debes diseñar e implementar una solución. ¿Qué debes hacer?",
    "options": [
      "Cree un tema de Pub/Sub y habilite un activador de Cloud Storage para dicho tema. Cree una aplicación que envíe todas las imágenes médicas al tema de Pub/Sub.",
      "Cree un script que utilice el comando gcloud storage para sincronizar el almacenamiento local con Cloud Storage. Programe el script como una tarea cron.",
      "Cree un tema de Pub/Sub y una función de Cloud conectada a dicho tema que escriba datos en Cloud Storage. Cree una aplicación que envíe todas las imágenes médicas al tema de Pub/Sub.",
      "En la consola de Google Cloud, vaya a Almacenamiento en la nube. Cargue las imágenes relevantes en la ubicación correspondiente. balde."
    ],
    "answer": "Cree un script que utilice el comando gcloud storage para sincronizar el almacenamiento local con Cloud Storage. Programe el script como una tarea cron."
  },
  {
    "question": "Su empresa cuenta con una aplicación interna para la gestión de pedidos transaccionales. Esta aplicación es utilizada exclusivamente por empleados en una única ubicación física. Requiere consistencia fuerte, consultas rápidas y garantías ACID para actualizaciones transaccionales en múltiples tablas. La primera versión de la aplicación está implementada en PostgreSQL y desea migrarla a la nube con cambios mínimos en el código. ¿Qué base de datos es la más adecuada para esta aplicación? Discusión sobre el tema 1 de la pregunta 218 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Mesa grande",
      "BigQuery",
      "SQL en la nube",
      "Firestore"
    ],
    "answer": "SQL en la nube"
  },
  {
    "question": "Su empresa ejecuta un proceso por lotes en un servidor local que tarda aproximadamente 30 horas en completarse. La tarea se ejecuta mensualmente, puede realizarse sin conexión a internet y debe reiniciarse si se interrumpe. Quieres migrar esta carga de trabajo a la nube minimizando los costes. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 219 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una plantilla de instancia con máquinas virtuales Spot activadas. Cree un grupo de instancias administradas a partir de la plantilla y ajuste la utilización de CPU objetivo. Migre la carga de trabajo.",
      "Migre la carga de trabajo a una máquina virtual de Compute Engine. Inicie y detenga la instancia según sea necesario.",
      "Migrar la carga de trabajo a un clúster de Google Kubernetes Engine con nodos Spot.",
      "Migrar la carga de trabajo a una máquina virtual Spot de Compute Engine."
    ],
    "answer": "Migre la carga de trabajo a una máquina virtual de Compute Engine. Inicie y detenga la instancia según sea necesario."
  },
  {
    "question": "Está planeando migrar las siguientes soluciones de gestión de datos locales a Google Cloud: • Un clúster MySQL para su base de datos principal • Apache Kafka para su plataforma de transmisión de eventos • Una base de datos Cloud SQL para PostgreSQL para sus necesidades de análisis e informes. Desea implementar soluciones recomendadas por Google para la migración. Debe asegurarse de que las nuevas soluciones proporcionen escalabilidad global y requieran una gestión operativa y de infraestructura mínima. ¿Qué debe hacer?",
    "options": [
      "Migrar de MySQL a Cloud SQL, de Kafka a Pub/Sub y de Cloud SQL para PostgreSQL a BigQuery.",
      "Migrar de MySQL a Cloud Spanner, de Kafka a Pub/Sub y de Cloud SQL para PostgreSQL a BigQuery.",
      "Migrar de MySQL a Cloud Spanner, de Kafka a Memorystore y de Cloud SQL para PostgreSQL a Cloud SQL.",
      "Migrar de MySQL a Cloud SQL, de Kafka a Memorystore y de Cloud SQL para PostgreSQL a Cloud SQL."
    ],
    "answer": "Migrar de MySQL a Cloud Spanner, de Kafka a Pub/Sub y de Cloud SQL para PostgreSQL a BigQuery."
  },
  {
    "question": "Durante una auditoría reciente de sus recursos de Google Cloud existentes, descubrió varios usuarios con direcciones de correo electrónico fuera de su dominio de Google Workspace. Desea asegurarse de que sus recursos Solo se comparten con usuarios cuyas direcciones de correo electrónico coinciden con tu dominio. Debes eliminar a los usuarios que no coinciden y evitar tener que auditar tus recursos para identificarlos. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 221 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Crea una tarea en Cloud Scheduler para escanear periódicamente tus proyectos y eliminar los usuarios que no coincidan.",
      "Crea una tarea en Cloud Scheduler para escanear periódicamente tus recursos y eliminar los usuarios que no coincidan.",
      "Establezca una restricción de política organizacional para limitar las identidades por dominio y eliminar automáticamente a los usuarios que no coincidan.",
      "Establecer una restricción de política organizacional para limitar las identidades por dominio y, a continuación, eliminar retroactivamente los usuarios que no coinciden."
    ],
    "answer": "Establecer una restricción de política organizacional para limitar las identidades por dominio y, a continuación, eliminar retroactivamente los usuarios que no coinciden."
  },
  {
    "question": "Tu aplicación se ejecuta en Google Cloud en un grupo de instancias administradas (MIG). Observas errores en Cloud Logging que indican que uno de los procesos de una máquina virtual no responde. Quieres reemplazar esta máquina virtual en el MIG rápidamente. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 222 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice el comando gcloud compute instances update con una acción REFRESH para la máquina virtual.",
      "Utilice el comando gcloud compute instance­groups managed recreate­instances para recrear la máquina virtual.",
      "Seleccione MIG desde la consola de Compute Engine y, en el menú, seleccione Reemplazar máquinas virtuales.",
      "Actualizar y aplicar la plantilla de instancia del MIG."
    ],
    "answer": "Utilice el comando gcloud compute instance­groups managed recreate­instances para recrear la máquina virtual."
  },
  {
    "question": "¿Quieres eliminar permanentemente un tema de Pub/Sub administrado por Config Connector en tu proyecto de Google Cloud? ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 223 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice kubectl para crear la etiqueta deleted­by­cnrm y cambiar su valor a true para el tema. recurso.",
      "Utilice kubectl para eliminar el recurso del tema.",
      "Utilice la CLI de gcloud para eliminar el tema.",
      "Utilice la CLI de gcloud para actualizar la etiqueta del tema managed­by­cnrm a false."
    ],
    "answer": "Utilice kubectl para eliminar el recurso del tema."
  },
  {
    "question": "Su empresa utiliza Google Workspace para gestionar las cuentas de sus empleados. Se prevé que la plantilla aumente de 100 a 1000 empleados en dos años. La mayoría de los empleados necesitarán acceso a la cuenta de Google Cloud de su empresa. Los sistemas y procesos deberán soportar este crecimiento exponencial sin que se produzca una degradación del rendimiento, una complejidad innecesaria ni problemas de seguridad. ¿Qué debería hacer?",
    "options": [
      "Migrar los usuarios a Active Directory. Conectar el sistema de Recursos Humanos a Active Directory. Activar Google Cloud Directory Sync (GCDS) para Cloud Identity. Activar la federación de identidades desde Cloud Identity a Active Directory.",
      "Organice a los usuarios de Cloud Identity en grupos. Implemente la autenticación multifactor en Cloud Identity.",
      "Habilitar la federación de identidades entre Cloud Identity y Google Workspace. Implementar la autenticación multifactor. autenticación para delegación en todo el dominio.",
      "Utilice un servicio de proveedor de identidad de terceros mediante federación. Sincronice los usuarios de Google Workplace con el proveedor de terceros en tiempo real."
    ],
    "answer": "Organice a los usuarios de Cloud Identity en grupos. Implemente la autenticación multifactor en Cloud Identity."
  },
  {
    "question": "Desea alojar su software de codificación de video en Compute Engine. Su base de usuarios está creciendo rápidamente y los usuarios necesitan poder codificar sus videos en cualquier momento sin interrupciones ni limitaciones de CPU. Debe asegurarse de que su solución de codificación tenga alta disponibilidad y desea seguir Prácticas recomendadas por Google para automatizar operaciones. ¿Qué deberías hacer?",
    "options": [
      "Implemente su solución en varias instancias independientes de Compute Engine y aumente el número de instancias existentes cuando la utilización de la CPU en Cloud Monitoring alcance un cierto valor. límite.",
      "Implemente su solución en varias instancias independientes de Compute Engine y reemplace las instancias existentes con instancias de alto rendimiento de CPU cuando la utilización de CPU en Cloud Monitoring alcance un determinado umbral.",
      "Implemente su solución en un grupo de instancias y aumente el número de instancias disponibles siempre que observe una alta utilización de la CPU en la monitorización de la nube.",
      "Implemente su solución en un grupo de instancias y configure el escalado automático en función de la utilización de la CPU."
    ],
    "answer": "Implemente su solución en un grupo de instancias y configure el escalado automático en función de la utilización de la CPU."
  },
  {
    "question": "Tu grupo de instancias administradas generó una alerta indicando que la creación de nuevas instancias falló. Debes solucionar este problema. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 226 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una plantilla de instancia que contenga una sintaxis válida que será utilizada por el grupo de instancias. Elimine cualquier disco persistente que tenga el mismo nombre que los nombres de las instancias.",
      "Cree una plantilla de instancia que contenga una sintaxis válida que será utilizada por el grupo de instancias. Verifique que los valores del nombre de la instancia y del nombre del disco persistente no sean iguales en la plantilla.",
      "Verifique que la plantilla de instancia utilizada por el grupo de instancias contenga una sintaxis válida. Elimine cualquier disco persistente con el mismo nombre que los nombres de las instancias. Establezca la propiedad disks.autoDelete en true. en la plantilla de instancia.",
      "Elimine la plantilla de instancia actual y reemplácela por una nueva. Verifique que los valores del nombre de instancia y del nombre del disco persistente no coincidan en la plantilla. Establezca la propiedad disks.autoDelete en true en la plantilla de instancia."
    ],
    "answer": "Cree una plantilla de instancia que contenga una sintaxis válida que será utilizada por el grupo de instancias. Elimine cualquier disco persistente que tenga el mismo nombre que los nombres de las instancias."
  },
  {
    "question": "Has creado una aplicación empaquetada en una imagen de Docker. Quieres desplegar la imagen de Docker como una carga de trabajo en Google Kubernetes Engine. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 227 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cargue la imagen en Cloud Storage y cree un servicio de Kubernetes que haga referencia a la imagen.",
      "Cargue la imagen en Cloud Storage y cree un despliegue de Kubernetes que haga referencia a la imagen.",
      "Cargue la imagen en el Registro de artefactos y cree un servicio de Kubernetes que haga referencia a la imagen.",
      "Cargue la imagen en el Registro de artefactos y cree un despliegue de Kubernetes que haga referencia a la imagen."
    ],
    "answer": "Cargue la imagen en el Registro de artefactos y cree un despliegue de Kubernetes que haga referencia a la imagen."
  },
  {
    "question": "Estás usando Looker Studio para visualizar una tabla de tu almacén de datos, que está basado en BigQuery. Los datos se añaden al almacén durante el día. Por la noche, el resumen diario se recalcula sobrescribiendo la tabla. Acabas de notar que los gráficos en Looker Studio no funcionan correctamente y quieres analizar el problema. ¿Qué deberías hacer?",
    "options": [
      "En Cloud Logging, cree un filtro para su informe de Looker Studio.",
      "Utilice la herramienta de línea de comandos de código abierto, Snapshot Debugger, para averiguar por qué no se actualizaron correctamente los datos.",
      "Revise la página de Informes de errores en la consola de Google Cloud para encontrar cualquier error.",
      "Utilice la interfaz de BigQuery para revisar el trabajo nocturno y buscar errores."
    ],
    "answer": "Utilice la interfaz de BigQuery para revisar el trabajo nocturno y buscar errores."
  },
  {
    "question": "Tienes una carga de trabajo por lotes que se ejecuta todas las noches y utiliza un gran número de máquinas virtuales (VM). Es tolerante a fallos y puede soportar la terminación de algunas VM. El coste actual de las VM es demasiado elevado. ¿Qué deberías hacer?",
    "options": [
      "Realice una prueba utilizando eventos de mantenimiento simulados. Si la prueba es exitosa, utilice máquinas virtuales Spot N2 Standard al ejecutar trabajos futuros.",
      "Realice una prueba con eventos de mantenimiento simulados. Si la prueba es exitosa, utilice máquinas virtuales N2 Standard para ejecutar trabajos futuros.",
      "Ejecute una prueba utilizando un grupo de instancias administradas. Si la prueba es exitosa, utilice máquinas virtuales N2 Standard en el grupo de instancias administradas al ejecutar trabajos futuros.",
      "Realice una prueba utilizando máquinas virtuales estándar N1 en lugar de N2. Si la prueba es exitosa, utilice máquinas virtuales estándar N1 al ejecutar trabajos futuros."
    ],
    "answer": "Realice una prueba utilizando eventos de mantenimiento simulados. Si la prueba es exitosa, utilice máquinas virtuales Spot N2 Standard al ejecutar trabajos futuros."
  },
  {
    "question": "Usted creó varios recursos en múltiples proyectos de Google Cloud. Todos los proyectos están vinculados a diferentes Cuentas de facturación. Para estimar mejor los cargos futuros, necesita una representación visual única de todos los costos incurridos. Quiere incluir nuevos datos de costos lo antes posible. ¿Qué debería hacer?",
    "options": [
      "Complete todos los recursos en la Calculadora de precios para obtener una estimación del costo mensual.",
      "Utilice la vista Informes en la Consola de facturación en la nube para ver la información de costos deseada.",
      "Visite la página de la tabla de costos para obtener una exportación en formato CSV y visualizarla utilizando Looker Studio.",
      "Configure la exportación de datos de facturación a BigQuery y visualice los datos en Looker Studio."
    ],
    "answer": "Configure la exportación de datos de facturación a BigQuery y visualice los datos en Looker Studio."
  },
  {
    "question": "Tu empresa maneja una gran cantidad de datos no estructurados en diferentes formatos de archivo. Quieres realizar transformaciones ETL en estos datos. Necesitas que estén disponibles en Google Cloud para que un trabajo de Dataflow pueda procesarlos. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 231 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cargue los datos a BigQuery utilizando la herramienta de línea de comandos bq.",
      "Cargue los datos al almacenamiento en la nube utilizando el comando gcloud storage.",
      "Cargue los datos en Cloud SQL utilizando la función de importación en la consola de Google Cloud.",
      "Cargue los datos en Cloud Spanner utilizando la función de importación en la consola de Google Cloud."
    ],
    "answer": "Cargue los datos al almacenamiento en la nube utilizando el comando gcloud storage."
  },
  {
    "question": "Has implementado una aplicación en una única instancia de Compute Engine. La aplicación escribe registros en el disco. Los usuarios comienzan a reportar errores en la aplicación. Quieres diagnosticar el problema. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 232 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Navegue a Registro en la nube y vea los registros de la aplicación.",
      "Configure una comprobación de estado en la instancia y establezca un valor umbral de \"éxitos consecutivos\" para un estado saludable de 1.",
      "Conéctese a la consola serie de la instancia y lea los registros de la aplicación.",
      "Instale y configure el agente de Ops y vea los registros de Cloud Logging."
    ],
    "answer": "Instale y configure el agente de Ops y vea los registros de Cloud Logging."
  },
  {
    "question": "Recientemente recibiste un nuevo proyecto de Google Cloud con una cuenta de facturación asociada donde trabajarás. Necesitas crear instancias, configurar firewalls y almacenar datos en Cloud Storage. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 233 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice el comando gcloud CLI services enable cloudresourcemanager.googleapis.com para habilitar todos los recursos.",
      "Utilice el comando gcloud services enable compute.googleapis.com para habilitar Compute Engine y el comando gcloud services enable storage­api.googleapis.com para habilitar las API de Cloud Storage.",
      "Abra la consola de Google Cloud y habilite todas las API de Google Cloud desde el panel de control de API.",
      "Abra la consola de Google Cloud y ejecute gcloud init ­­project en Cloud Shell."
    ],
    "answer": "Utilice el comando gcloud services enable compute.googleapis.com para habilitar Compute Engine y el comando gcloud services enable storage­api.googleapis.com para habilitar las API de Cloud Storage."
  },
  {
    "question": "Tu equipo de desarrollo de aplicaciones ha creado imágenes Docker para una aplicación que se implementará en Google Cloud. Tu equipo no desea gestionar la infraestructura asociada a esta aplicación. Necesitas asegurarte de que la aplicación pueda escalar automáticamente a medida que gane popularidad. ¿Qué deberías hacer?",
    "options": [
      "Cree una plantilla de instancia con la imagen del contenedor e implemente un grupo de instancias administradas con escalado automático.",
      "Cargue las imágenes de Docker en el Registro de artefactos y despliegue la aplicación en Google Kubernetes Engine utilizando el modo estándar.",
      "Cargue las imágenes de Docker en Cloud Storage e implemente la aplicación en Google Kubernetes Engine utilizando el modo estándar.",
      "Cargue las imágenes de Docker en Artifact Registry e implemente la aplicación en Cloud Run."
    ],
    "answer": "Cargue las imágenes de Docker en Artifact Registry e implemente la aplicación en Cloud Run."
  },
  {
    "question": "Estás migrando una aplicación crítica para tu negocio desde tu centro de datos local a Google Cloud. Como parte de tu estrategia de alta disponibilidad, quieres asegurarte de que los datos que utiliza la aplicación estén disponibles de inmediato si se produce un fallo de zona. ¿Qué deberías hacer?",
    "options": [
      "Almacene los datos de la aplicación en un disco persistente zonal. Cree una programación de instantáneas para el disco. Si se produce una interrupción, cree un nuevo disco a partir de la instantánea más reciente y adjúntelo a una nueva máquina virtual en otra zona.",
      "Almacene los datos de la aplicación en un disco persistente zonal. Si se produce una interrupción, cree una instancia en otra zona con este disco conectado.",
      "Almacene los datos de la aplicación en un disco persistente regional. Cree una programación de instantáneas para el disco. Si Si se produce una interrupción del servicio, cree un nuevo disco a partir de la instantánea más reciente y adjúntelo a una nueva máquina virtual en otra zona.",
      "Almacene los datos de la aplicación en un disco persistente regional. Si se produce una interrupción del servicio, cree una instancia en otra zona con este disco conectado."
    ],
    "answer": "Almacene los datos de la aplicación en un disco persistente regional. Si se produce una interrupción del servicio, cree una instancia en otra zona con este disco conectado."
  },
  {
    "question": "El equipo de DevOps de tu organización necesita control total de los recursos de Compute Engine en tu proyecto de desarrollo. Sin embargo, no debería tener permiso para crear ni actualizar ningún otro recurso del proyecto. Quieres seguir las recomendaciones de Google para configurar los permisos del equipo de DevOps. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 236 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Otorgar el rol básico roles/viewer y el rol predefinido roles/compute.admin a DevOps. grupo.",
      "Cree una política de IAM y otorgue todos los permisos compute.instanceAdmin.* a la política. Asocie la política al grupo DevOps.",
      "Cree un rol personalizado a nivel de carpeta y otorgue todos los permisos compute.instanceAdmin.* a dicho rol. Otorgue el rol personalizado al grupo DevOps.",
      "Otorgar el rol básico roles/editor al grupo DevOps."
    ],
    "answer": "Otorgar el rol básico roles/viewer y el rol predefinido roles/compute.admin a DevOps. grupo."
  },
  {
    "question": "Tu equipo está gestionando una aplicación de comercio electrónico local. La aplicación contiene un conjunto complejo de microservicios escritos en Python, y cada microservicio se ejecuta en contenedores Docker de las configuraciones se inyectan mediante variables de entorno. Necesitas implementar tu configuración actual. Aplicación a una solución en la nube sin servidor de Google Cloud. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 237 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice su canalización de CI/CD existente. Utilice las imágenes de Docker generadas e impleméntelas en Cloud Run. Actualice las configuraciones y los puntos finales necesarios.",
      "Utilice su canalización de integración y entrega continua (CI/CD) existente. Utilice las imágenes Docker generadas e impleméntelas en Cloud Functions. Utilice la misma configuración que en su entorno local.",
      "Utilice el código fuente existente e implemente cada servicio como una función de Cloud independiente. Actualice las configuraciones y los puntos finales necesarios.",
      "Utilice su código fuente existente e implemente cada servicio como una ejecución de Cloud independiente. Utilice las mismas configuraciones que en las instalaciones."
    ],
    "answer": "Utilice su canalización de CI/CD existente. Utilice las imágenes de Docker generadas e impleméntelas en Cloud Run. Actualice las configuraciones y los puntos finales necesarios."
  },
  {
    "question": "Estás ejecutando varios microservicios en un clúster de Kubernetes Engine. Uno de ellos renderiza imágenes y consume una gran cantidad de tiempo de CPU en comparación con la memoria que requiere. Los demás microservicios son cargas de trabajo optimizadas para máquinas de tipo n2­standard. Necesitas optimizar tu clúster para que todas las cargas de trabajo utilicen los recursos de la forma más eficiente posible. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 238 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Asigne a los pods del microservicio de renderizado de imágenes una prioridad de pod más alta que a los demás microservicios.",
      "Cree un grupo de nodos con nodos de tipo máquina optimizados para computación para el microservicio de renderizado de imágenes. Utilice el grupo de nodos con nodos de tipo máquina de propósito general para los demás microservicios.",
      "Utilice el grupo de nodos con nodos de tipo máquina de propósito general para el microservicio de renderizado de imágenes. Cree un grupo de nodos con nodos de tipo máquina optimizados para computación para los demás microservicios.",
      "Configure la cantidad requerida de CPU y memoria en la especificación de solicitudes de recursos del despliegue del microservicio de renderizado de imágenes. Mantenga las solicitudes de recursos para los demás microservicios en el valor predeterminado."
    ],
    "answer": "Cree un grupo de nodos con nodos de tipo máquina optimizados para computación para el microservicio de renderizado de imágenes. Utilice el grupo de nodos con nodos de tipo máquina de propósito general para los demás microservicios."
  },
  {
    "question": "Formas parte de un equipo que ha desarrollado una nueva aplicación que necesita implementarse en Kubernetes. La aplicación de producción es fundamental para el negocio y debe optimizarse para garantizar su fiabilidad. Necesitas configurar un clúster de Kubernetes y quieres seguir las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Cree un clúster de GKE Autopilot. Inscriba el clúster en el canal de lanzamiento rápido.",
      "Cree un clúster de GKE Autopilot. Inscriba el clúster en el canal de lanzamiento estable.",
      "Cree un clúster estándar GKE zonal. Inscriba el clúster en el canal de lanzamiento estable.",
      "Cree un clúster estándar regional de GKE. Inscriba el clúster en el canal de lanzamiento rápido."
    ],
    "answer": "Cree un clúster de GKE Autopilot. Inscriba el clúster en el canal de lanzamiento estable."
  },
  {
    "question": "Eres responsable de una aplicación web en Compute Engine. Quieres que tu equipo de soporte reciba una notificación automática si los usuarios experimentan una latencia elevada durante al menos 5 minutos. Necesitas una solución recomendada por Google sin coste de desarrollo. ¿Qué debes hacer?",
    "options": [
      "Exporte las métricas de Cloud Monitoring a BigQuery y utilice un panel de Looker Studio para supervisar la latencia de su aplicación web.",
      "Cree una política de alerta para enviar una notificación cuando la latencia de respuesta HTTP exceda el umbral especificado.",
      "Implementar un servicio de App Engine que invoque la API de Cloud Monitoring y envíe una notificación en caso de anomalías.",
      "Utilice el panel de control de Cloud Monitoring para observar la latencia y tomar las medidas necesarias cuando la latencia de respuesta supere el umbral especificado."
    ],
    "answer": "Cree una política de alerta para enviar una notificación cuando la latencia de respuesta HTTP exceda el umbral especificado."
  },
  {
    "question": "Tienes un conjunto de binarios de análisis de datos locales que procesa archivos de datos en memoria durante aproximadamente 45 minutos cada medianoche. El tamaño de esos archivos de datos oscila entre 1 gigabyte y 16 gigabytes. Tú Quiero migrar esta aplicación a Google Cloud con el mínimo esfuerzo y coste. ¿Qué debo hacer? Discusión sobre el tema 1 de la pregunta 241 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un contenedor para el conjunto de binarios. Use Cloud Scheduler para iniciar un trabajo de Cloud Run para el contenedor.",
      "Cree un contenedor para el conjunto de binarios. Implemente el contenedor en Google Kubernetes Engine (GKE) y utilice el programador de Kubernetes para iniciar la aplicación.",
      "Sube el código a Cloud Functions. Usa Cloud Scheduler para iniciar la aplicación.",
      "Migrar a una máquina virtual en Compute Engine. Utilizar una programación de instancias para iniciar y detener la instancia."
    ],
    "answer": "Migrar a una máquina virtual en Compute Engine. Utilizar una programación de instancias para iniciar y detener la instancia."
  },
  {
    "question": "Usted utilizó el comando gcloud container clusters para crear dos clústeres de Google Cloud Kubernetes (GKE): prod­cluster y dev­cluster. • prod­cluster es un clúster estándar. • dev­cluster es un clúster de piloto automático. Cuando ejecuta el comando kubectl get nodes, solo ve los nodos de prod­cluster. ¿Qué comandos debería ejecutar para verificar el estado de los nodos de dev­cluster? Discusión sobre el tema 1 de la pregunta 242 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "gcloud container clusters get­credentials dev­clusterkubectl get nodes",
      "gcloud container clusters update ­generate­password dev­cluster kubectl get nodes",
      "kubectl config set­context dev­clusterkubectl cluster­info",
      "kubectl config set­credentials dev­clusterkubectl cluster­info"
    ],
    "answer": "gcloud container clusters get­credentials dev­clusterkubectl get nodes"
  },
  {
    "question": "Recientemente descubriste que tus desarrolladores están usando muchas claves de cuenta de servicio durante su proceso de desarrollo. Mientras trabajas en una mejora a largo plazo, necesitas implementar rápidamente Un proceso para implementar credenciales de cuentas de servicio de corta duración en su empresa. Usted tiene los siguientes requisitos: • Todas las cuentas de servicio que requieren una clave deben crearse en un proyecto centralizado llamado pj­sa. • Las claves de las cuentas de servicio solo deben ser válidas por un día. Necesita una solución recomendada por Google que minimice los costos. ¿Qué debería hacer?",
    "options": [
      "Implementar un trabajo de Cloud Run para rotar periódicamente todas las claves de cuenta de servicio en pj­sa. Aplicar una política de la organización para denegar la creación de claves de cuenta de servicio, con una excepción para pj­sa.",
      "Implementar un CronJob de Kubernetes para rotar periódicamente todas las claves de las cuentas de servicio. Deshabilitar la vinculación de cuentas de servicio a recursos en todos los proyectos, con excepción de pj­sa.",
      "Aplicar una restricción de política de la organización que permita que la duración de las claves de las cuentas de servicio sea de 24 horas. Aplicar una restricción de política de la organización que deniegue la creación de claves de cuenta de servicio con una excepción en pj­sa.",
      "Aplicar una restricción de política de organización DENY durante la vigencia de las claves de cuenta de servicio durante 24 horas. Deshabilitar la vinculación de cuentas de servicio a recursos en todos los proyectos, con la excepción de pj­sa."
    ],
    "answer": "Aplicar una restricción de política de la organización que permita que la duración de las claves de las cuentas de servicio sea de 24 horas. Aplicar una restricción de política de la organización que deniegue la creación de claves de cuenta de servicio con una excepción en pj­sa."
  },
  {
    "question": "Su empresa está ejecutando una aplicación web de tres niveles en máquinas virtuales que utilizan una base de datos MySQL. Necesita crear un costo total estimado de infraestructura en la nube para ejecutar esta aplicación en Instancias de Google Cloud y Cloud SQL. ¿Qué debes hacer?",
    "options": [
      "Crea una hoja de cálculo de Google con varias combinaciones de recursos de Google Cloud. En una hoja aparte, importa los precios actuales de Google Cloud y úsalos para los cálculos dentro de las fórmulas.",
      "Utilice la calculadora de precios de Google Cloud y seleccione la plantilla de Operaciones en la nube para definir su aplicación web con el mayor detalle posible.",
      "Implemente una arquitectura similar en Google Cloud y realice una prueba de carga razonable a menor escala. Verifique la información de facturación y calcule los costos estimados en función de la carga real que su sistema suele manejar.",
      "Utilice la Calculadora de precios de Google Cloud para determinar el costo de cada recurso de Google Cloud que prevé utilizar. Use instancias de tamaño similar para el servidor web y utilice sus máquinas locales actuales como referencia para Cloud SQL."
    ],
    "answer": "Utilice la Calculadora de precios de Google Cloud para determinar el costo de cada recurso de Google Cloud que prevé utilizar. Use instancias de tamaño similar para el servidor web y utilice sus máquinas locales actuales como referencia para Cloud SQL."
  },
  {
    "question": "Tienes una instancia de Bigtable que consta de tres nodos que almacenan información de identificación personal. Información de identificación personal (PII). Debe registrar todas las operaciones de lectura o escritura, incluidas las lecturas de metadatos o configuración de esta tabla de base de datos, en el sistema de gestión de información y eventos de seguridad (SIEM) de su empresa. ¿Qué debe hacer?",
    "options": [
      "• Navegue a Monitoreo en la nube en la consola de Google Cloud y cree un trabajo de monitoreo personalizado para la instancia de Bigtable para rastrear todos los cambios.• Cree una alerta usando puntos finales de webhook, con el punto final SIEM como receptor.",
      "• Navegue a la página Registros de auditoría en la consola de Google Cloud y habilite los registros de escritura de administrador para la instancia de Bigtable.• Cree una instancia de Cloud Functions para exportar registros de Cloud Logging a su SIEM.",
      "• Navegue a la página Registros de auditoría en la consola de Google Cloud y habilite los registros de lectura de datos, escritura de datos y lectura de administrador para la instancia de Bigtable.• Cree un tema Pub/Sub como destino de sumidero de Cloud Logging y agregue su SIEM como suscriptor del tema.",
      "• Instale el agente de operaciones en la instancia de Bigtable durante la configuración.• Cree una cuenta de servicio con permisos de lectura para la instancia de Bigtable.• Cree un trabajo de Dataflow personalizado con esta cuenta de servicio para exportar registros al sistema SIEM de la empresa."
    ],
    "answer": "• Navegue a la página Registros de auditoría en la consola de Google Cloud y habilite los registros de lectura de datos, escritura de datos y lectura de administrador para la instancia de Bigtable.• Cree un tema Pub/Sub como destino de sumidero de Cloud Logging y agregue su SIEM como suscriptor del tema."
  },
  {
    "question": "Desea configurar un clúster de Google Kubernetes Engine. Se requiere la verificación de la identidad e integridad de los nodos del clúster, y estos no pueden ser accesibles desde internet. Desea reducir el costo operativo de la administración del clúster y seguir las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Implementar un clúster de piloto automático privado.",
      "Implementar un clúster de piloto automático público.",
      "Implemente un clúster público estándar y habilite los nodos protegidos.",
      "Implemente un clúster privado estándar y habilite los nodos protegidos."
    ],
    "answer": "Implementar un clúster de piloto automático privado."
  },
  {
    "question": "Su empresa desea migrar sus cargas de trabajo locales a Google Cloud. Las cargas de trabajo locales actuales consisten en: • Una aplicación web Flask • Una API de backend • Un trabajo en segundo plano programado de larga duración para ETL e informes. Necesita mantener bajos los costos operativos. Desea Siga las prácticas recomendadas por Google para migrar estas cargas de trabajo a soluciones sin servidor en Google Cloud. ¿Qué debe hacer? discusión 247 Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Migre la aplicación web a App Engine y la API de backend a Cloud Run. Utilice Cloud Tasks. para ejecutar su trabajo en segundo plano en Compute Engine.",
      "Migrar la aplicación web a App Engine y la API de backend a Cloud Run. Usar Cloud Tasks. para ejecutar tu trabajo en segundo plano en Cloud Run.",
      "Ejecuta la aplicación web en un bucket de Cloud Storage y la API de backend en Cloud Run. Usa Cloud Tasks para ejecutar tu trabajo en segundo plano en Cloud Run.",
      "Ejecuta la aplicación web en un bucket de Cloud Storage y la API de backend en Cloud Run. Usa Cloud Tasks para ejecutar tu trabajo en segundo plano en Compute Engine."
    ],
    "answer": "Migrar la aplicación web a App Engine y la API de backend a Cloud Run. Usar Cloud Tasks. para ejecutar tu trabajo en segundo plano en Cloud Run."
  },
  {
    "question": "Su empresa está migrando su canalización de integración y entrega continua (CI/CD) a instancias de Compute Engine. Esta canalización gestionará toda la infraestructura en la nube mediante código. ¿Cómo puede garantizar que la canalización cuente con los permisos adecuados, al tiempo que su sistema cumple con las mejores prácticas de seguridad?",
    "options": [
      "• Asocie una única cuenta de servicio a las instancias de computación.• Agregue derechos mínimos al servicio cuenta.• Permitir que la cuenta de servicio suplante la identidad de un usuario de Cloud Identity con permisos elevados para crear, actualizar o eliminar recursos.",
      "• Agregue un paso para la aprobación humana a la canalización de CI/CD antes de la ejecución del aprovisionamiento de infraestructura.• Utilice la cuenta IAM de aprobaciones humanas para el aprovisionamiento.",
      "• Asocie una única cuenta de servicio a las instancias de computación.• Agregue todos los permisos de Identity and Access Management (IAM) necesarios a esta cuenta de servicio para crear, actualizar o eliminar recursos.",
      "• Cree varias cuentas de servicio, una para cada canalización con los permisos mínimos de Identity and Access Management (IAM) adecuados.• Utilice un servicio de administrador de secretos para almacenar los archivos de clave de las cuentas de servicio.• Permita que la canalización de CI/CD solicite los secretos adecuados durante la ejecución de la canalización."
    ],
    "answer": "• Cree varias cuentas de servicio, una para cada canalización con los permisos mínimos de Identity and Access Management (IAM) adecuados.• Utilice un servicio de administrador de secretos para almacenar los archivos de clave de las cuentas de servicio.• Permita que la canalización de CI/CD solicite los secretos adecuados durante la ejecución de la canalización."
  },
  {
    "question": "Tu aplicación almacena archivos en Cloud Storage mediante la clase de almacenamiento estándar. La aplicación solo necesita acceder a los archivos creados en los últimos 30 días. Quieres ahorrar automáticamente en los costos de los archivos a los que la aplicación ya no accede. ¿Qué deberías hacer?",
    "options": [
      "Cree un ciclo de vida de objeto en el depósito de almacenamiento para cambiar la clase de almacenamiento a Almacenamiento de archivo para los objetos con una antigüedad superior a 30 días.",
      "Crea una tarea programada (cron job) en Cloud Scheduler para llamar a una instancia de Cloud Functions todos los días y eliminar los archivos con más de 30 días de antigüedad.",
      "Cree una política de retención en el depósito de almacenamiento de 30 días y bloquee el depósito utilizando un bloqueo de política de retención.",
      "Habilite el control de versiones de objetos en el depósito de almacenamiento y agregue reglas de ciclo de vida para que las versiones no actuales caduquen después de 30 días."
    ],
    "answer": "Cree un ciclo de vida de objeto en el depósito de almacenamiento para cambiar la clase de almacenamiento a Almacenamiento de archivo para los objetos con una antigüedad superior a 30 días."
  },
  {
    "question": "Tu gerente te pide que implementes una carga de trabajo en un clúster de Kubernetes. No estás seguro de los requisitos de recursos de la carga de trabajo ni de cómo podrían variar los requisitos según los patrones de uso. Dependencias externas u otros factores. Necesitas una solución que ofrezca recomendaciones rentables sobre los requisitos de CPU y memoria, y que permita que la carga de trabajo funcione de forma consistente en cualquier situación. Quieres seguir las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Configure el escalador automático de pods horizontal para disponibilidad y configure el escalador automático de clúster para sugerencias.",
      "Configure el escalador automático de pods horizontal para la disponibilidad y configure las recomendaciones del escalador automático de pods vertical para las sugerencias.",
      "Configure las recomendaciones del escalador automático de pods vertical para la disponibilidad y configure el escalador automático de clúster para las sugerencias.",
      "Configure las recomendaciones del escalador automático de pods vertical para la disponibilidad y configure el escalador automático de pods horizontal para las sugerencias."
    ],
    "answer": "Configure el escalador automático de pods horizontal para la disponibilidad y configure las recomendaciones del escalador automático de pods vertical para las sugerencias."
  },
  {
    "question": "Necesitas migrar los documentos de factura almacenados localmente a Cloud Storage. Los documentos tienen los siguientes requisitos de almacenamiento: • Los documentos deben conservarse durante cinco años. • Se deben almacenar hasta cinco revisiones del mismo documento de factura para permitir correcciones. • Los documentos con más de 365 días de antigüedad deben trasladarse a niveles de almacenamiento de menor costo. Quieres seguir las prácticas recomendadas por Google para minimizar tus costos operativos y de desarrollo. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 251 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Habilite las políticas de retención en el bucket y use Cloud Scheduler para invocar una Cloud Function para Mueva o elimine sus documentos en función de sus metadatos.",
      "Habilite las políticas de retención en el bucket, utilice reglas de ciclo de vida para cambiar las clases de almacenamiento de los objetos, establezca el número de versiones y elimine los archivos antiguos.",
      "Habilite el control de versiones de objetos en el bucket y utilice Cloud Scheduler para invocar una instancia de Cloud Functions que mueva o elimine sus documentos en función de sus metadatos.",
      "Habilite el control de versiones de objetos en el bucket, utilice condiciones de ciclo de vida para cambiar la clase de almacenamiento de los objetos, establezca el número de versiones y elimine los archivos antiguos."
    ],
    "answer": "Habilite el control de versiones de objetos en el bucket, utilice condiciones de ciclo de vida para cambiar la clase de almacenamiento de los objetos, establezca el número de versiones y elimine los archivos antiguos."
  },
  {
    "question": "Instalaste la CLI de Google Cloud en tu estación de trabajo y configuraste el proxy. Sin embargo, Te preocupa que tus credenciales de proxy queden registradas en los registros de la CLI de gcloud. Quieres evitar que se registren. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 252 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Configure el nombre de usuario y la contraseña usando gcloud config set proxy/username y gcloud config Configurar comandos de proxy/contraseña.",
      "Codifique el nombre de usuario y la contraseña con codificación sha256 y guárdelos en un archivo de texto. Utilice el nombre del archivo como valor en el comando gcloud config set core/custom_ca_certs_file.",
      "Proporcione valores para CLOUDSDK_PROXY_USERNAME y CLOUDSDK_PROXY_PASSWORD en el archivo de configuración de la herramienta CLI de gcloud.",
      "Configure las propiedades CLOUDSDK_PROXY_USERNAME y CLOUDSDK_PROXY_PASSWORD utilizando variables de entorno en su herramienta de línea de comandos."
    ],
    "answer": "Configure las propiedades CLOUDSDK_PROXY_USERNAME y CLOUDSDK_PROXY_PASSWORD utilizando variables de entorno en su herramienta de línea de comandos."
  },
  {
    "question": "Su empresa desarrolló una aplicación para implementarla en Google Kubernetes Engine. Algunas partes de la aplicación no toleran fallos y pueden experimentar periodos de inactividad. Otras partes son críticas y deben estar siempre disponibles. Necesita configurar un clúster de Google Kubernetes Engine optimizando los costes. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 253 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un clúster con un único grupo de nodos utilizando máquinas virtuales estándar. Etiquete las implementaciones tolerantes a fallos como spot_true.",
      "Cree un clúster con un único grupo de nodos utilizando máquinas virtuales Spot. Etiquete los despliegues críticos como spot_false.",
      "Cree un clúster con un grupo de nodos de máquinas virtuales Spot y un grupo de nodos utilizando máquinas virtuales estándar. Implemente las implementaciones críticas en el grupo de nodos de máquinas virtuales Spot y las implementaciones tolerantes a fallos en el grupo de nodos mediante el uso de máquinas virtuales estándar.",
      "Cree un clúster con un grupo de nodos de máquinas virtuales Spot y un grupo de nodos utilizando máquinas virtuales estándar. Implemente las implementaciones críticas en el grupo de nodos mediante el uso de máquinas virtuales estándar y las implementaciones tolerantes a fallos en el grupo de nodos de máquinas virtuales Spot."
    ],
    "answer": "Cree un clúster con un grupo de nodos de máquinas virtuales Spot y un grupo de nodos utilizando máquinas virtuales estándar. Implemente las implementaciones críticas en el grupo de nodos mediante el uso de máquinas virtuales estándar y las implementaciones tolerantes a fallos en el grupo de nodos de máquinas virtuales Spot."
  },
  {
    "question": "Necesitas implementar una aplicación en Google Cloud utilizando tecnología sin servidor. Quieres probar una nueva versión de la aplicación con un pequeño porcentaje del tráfico de producción. ¿Qué debes hacer?",
    "options": [
      "Implemente la aplicación en Cloud Run. Utilice despliegues graduales para la división del tráfico.",
      "Implemente la aplicación en Google Kubernetes Engine. Utilice Anthos Service Mash para la división del tráfico.",
      "Implemente la aplicación en Cloud Functions. Especifique el número de versión en el nombre de la función.",
      "Implementa la aplicación en App Engine. Para cada nueva versión, crea un nuevo servicio."
    ],
    "answer": "Implemente la aplicación en Cloud Run. Utilice despliegues graduales para la división del tráfico."
  },
  {
    "question": "La política de gestión de vulnerabilidades de seguridad de su empresa exige que un miembro del equipo de seguridad tenga visibilidad sobre las vulnerabilidades y otros metadatos del sistema operativo para una instancia específica de Compute Engine. Esta instancia de Compute Engine aloja una aplicación crítica en tu proyecto de Google Cloud. Debes implementar la política de gestión de vulnerabilidades de seguridad de tu empresa. ¿Qué debes hacer?",
    "options": [
      "• Asegúrese de que el agente de operaciones esté instalado en la instancia de Compute Engine.• Cree una métrica personalizada en el panel de control de Cloud Monitoring.• Proporcione al miembro del equipo de seguridad acceso a este panel de control.",
      "• Asegúrese de que el agente de operaciones esté instalado en la instancia de Compute Engine.• Otorgue al miembro del equipo de seguridad el permiso roles/osconfig.inventoryViewer.",
      "• Asegúrese de que el agente de configuración del sistema operativo esté instalado en la instancia de Compute Engine.• Otorgue al miembro del equipo de seguridad el permiso roles/osconfig.vulnerabilityReportViewer.",
      "• Asegúrese de que el agente de configuración del sistema operativo esté instalado en la instancia de Compute Engine.• Cree un receptor de registro para el conjunto de datos de BigQuery.• Proporcione al miembro del equipo de seguridad acceso a este conjunto de datos."
    ],
    "answer": "• Asegúrese de que el agente de configuración del sistema operativo esté instalado en la instancia de Compute Engine.• Otorgue al miembro del equipo de seguridad el permiso roles/osconfig.vulnerabilityReportViewer."
  },
  {
    "question": "Desea permitir que su equipo de desarrollo implemente nuevas funciones en un servicio de Cloud Run existente de en producción. Para minimizar el riesgo asociado a una nueva revisión, desea reducir el número de clientes que podrían verse afectados por una interrupción sin generar costos de desarrollo u operativos para sus clientes. Desea seguir las prácticas recomendadas por Google para la gestión de revisiones de un servicio. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 256 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Pida a sus clientes que vuelvan a intentar acceder a su servicio con un retroceso exponencial para mitigar cualquier problema potencial después de que se implemente la nueva versión.",
      "Implemente gradualmente la nueva revisión y divida el tráfico de clientes entre las revisiones para permitir la reversión en caso de que ocurra algún problema.",
      "Dirija todo el tráfico de clientes a la nueva revisión y revierta a una revisión anterior si observa algún problema en producción.",
      "Implemente su aplicación en un segundo servicio de Cloud Run y pida a sus clientes que utilicen ese segundo servicio."
    ],
    "answer": "Implemente gradualmente la nueva revisión y divida el tráfico de clientes entre las revisiones para permitir la reversión en caso de que ocurra algún problema."
  },
  {
    "question": "Has implementado una aplicación en una instancia de Compute Engine. Un consultor externo necesita acceder a la instancia basada en Linux. El consultor está conectado a tu red corporativa mediante una conexión VPN, pero no tiene una cuenta de Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 257 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Indique al consultor externo que utilice la herramienta de línea de comandos gcloud compute ssh mediante Identity­ Aware Proxy para acceder a la instancia.",
      "Indique al consultor externo que utilice la herramienta de línea de comandos gcloud compute ssh, accediendo a ella mediante la dirección IP pública de la instancia.",
      "Indique al consultor externo que genere un par de claves SSH y solicítele la clave pública. Añada usted mismo la clave pública a la instancia y permita que el consultor acceda a ella mediante SSH con su clave privada.",
      "Instruir al consultor externo para que genere un par de claves SSH y solicitar la clave privada al consultor. consultor. Agregue usted mismo la clave privada a la instancia y permita que el consultor acceda a la instancia. a través de SSH con su clave pública."
    ],
    "answer": "Indique al consultor externo que genere un par de claves SSH y solicítele la clave pública. Añada usted mismo la clave pública a la instancia y permita que el consultor acceda a ella mediante SSH con su clave privada."
  },
  {
    "question": "Después de un incidente de seguridad reciente, su empresa emergente quiere comprender mejor lo que está sucediendo en Entorno de Google Cloud. Necesitas supervisar cambios inesperados en el firewall y la creación de instancias. Tu empresa prefiere soluciones sencillas. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 258 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un receptor de registros para reenviar los registros de auditoría de la nube, filtrados por firewalls e instancias de computación, al almacenamiento en la nube. Utilice BigQuery para analizar periódicamente los eventos de registro en el depósito de almacenamiento.",
      "Utilice los filtros de Cloud Logging para crear métricas basadas en registros para las acciones del firewall y de la instancia. Supervise los cambios y configure alertas adecuadas.",
      "Instale Kibana en una instancia de computación. Cree un receptor de registros para reenviar los registros de auditoría de la nube filtrados por firewalls e instancias de computación a Pub/Sub. Dirija los mensajes al tema de Pub/Sub para enviarlos a la instancia de Kibana. Analice los registros en Kibana en tiempo real.",
      "Active el registro de reglas del firewall de Google Cloud y configure alertas para cualquier inserción, actualización o eliminación. eventos."
    ],
    "answer": "Utilice los filtros de Cloud Logging para crear métricas basadas en registros para las acciones del firewall y de la instancia. Supervise los cambios y configure alertas adecuadas."
  },
  {
    "question": "Estás configurando cuentas de servicio para una aplicación que abarca varios proyectos. Las máquinas virtuales (VM) que se ejecutan en el proyecto web­applications necesitan acceso a los conjuntos de datos de BigQuery en el proyecto crm­ databases. Quieres seguir las prácticas recomendadas por Google para otorgar acceso a la cuenta de servicio en el proyecto web­applications. ¿Qué debes hacer?",
    "options": [
      "Otorgar al \"propietario del proyecto\" para las aplicaciones web los roles apropiados para las bases de datos de CRM.",
      "Otorgar el rol de \"propietario del proyecto\" a las bases de datos CRM y al proyecto de aplicaciones web.",
      "Otorgar el rol de \"propietario del proyecto\" a crm­databases y el rol roles/bigquery.dataViewer a web­applications.",
      "Otorgar el rol roles/bigquery.dataViewer a las bases de datos de CRM y los roles apropiados a las aplicaciones web."
    ],
    "answer": "Otorgar el rol roles/bigquery.dataViewer a las bases de datos de CRM y los roles apropiados a las aplicaciones web."
  },
  {
    "question": "Su clúster Dataproc se ejecuta en una única red de nube privada virtual (VPC) dentro de una única subred con el rango 172.16.20.128/25. No hay direcciones IP privadas disponibles en la subred. Desea agregar nuevas máquinas virtuales para que se comuniquen con su clúster utilizando el mínimo número de pasos. ¿Qué debe hacer?",
    "options": [
      "Modifique el rango de subred existente a 172.16.20.0/24.",
      "Cree un nuevo rango de IP secundario en la VPC y configure las máquinas virtuales para que utilicen ese rango.",
      "Cree una nueva red VPC para las máquinas virtuales. Habilite el emparejamiento de VPC entre la red VPC de las máquinas virtuales y la red VPC del clúster Dataproc.",
      "Cree una nueva red VPC para las máquinas virtuales con una subred de 172.32.0.0/16. Habilite el emparejamiento de redes VPC entre la red VPC de Dataproc y la red VPC de las máquinas virtuales. Configure una ruta personalizada. intercambio."
    ],
    "answer": "Modifique el rango de subred existente a 172.16.20.0/24."
  },
  {
    "question": "Estás desarrollando un servicio de backend para una plataforma de comercio electrónico que almacenará datos de transacciones de clientes móviles y web. Tras el lanzamiento de la plataforma, se prevé un gran volumen de transacciones globales. Tu equipo comercial necesita ejecutar consultas SQL para analizar los datos. Debes crear un almacén de datos altamente disponible y escalable para la plataforma. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 261 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una instancia de Cloud Spanner multirregión con un esquema optimizado.",
      "Cree una base de datos Firestore multirregión con consultas de agregación habilitadas.",
      "Crear una base de datos Cloud SQL para PostgreSQL multirregión con índices optimizados.",
      "Crear un conjunto de datos BigQuery multirregional con tablas optimizadas."
    ],
    "answer": "Cree una instancia de Cloud Spanner multirregión con un esquema optimizado."
  },
  {
    "question": "Usted es responsable de gestionar el acceso a todos los usuarios de Google Cloud de su organización. Su empresa adquirió recientemente una startup que cuenta con su propia organización de Google Cloud. Debe asegurarse de que sus ingenieros de confiabilidad del sitio (SRE) tengan los mismos permisos de proyecto en la organización de la startup que en la suya. ¿Qué debe hacer?",
    "options": [
      "En la consola de Google Cloud de su organización, seleccione Crear rol a partir de la selección y elija como destino la organización de la empresa emergente.",
      "En la consola de Google Cloud de la empresa emergente, seleccione Crear rol a partir de la selección y elija como origen la organización de Google Cloud de la empresa emergente.",
      "Utilice el comando gcloud iam roles copy y proporcione el ID de organización de la organización de Google Cloud de la empresa emergente como destino.",
      "Utilice el comando gcloud iam roles copy y proporcione los ID de proyecto de todos los proyectos en la organización de la empresa emergente como destino."
    ],
    "answer": "Utilice el comando gcloud iam roles copy y proporcione el ID de organización de la organización de Google Cloud de la empresa emergente como destino."
  },
  {
    "question": "Necesitas extraer texto de archivos de audio mediante la API de conversión de voz a texto. Los archivos de audio se almacenan en un bucket de Cloud Storage. Debes implementar una solución de computación sin servidor totalmente administrada que requiera autenticación y cumpla con las prácticas recomendadas por Google. Quieres automatizar la llamada a la API enviando cada archivo a la API a medida que llega al bucket. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 263 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree un entorno estándar de App Engine que se active mediante eventos de un bucket de Cloud Storage para enviar el URI del archivo a la API de conversión de voz a texto de Google.",
      "Ejecutar un trabajo de Kubernetes para escanear el bucket periódicamente en busca de archivos entrantes y llamar a la función de conversión de voz a texto. API para cada archivo sin procesar.",
      "Ejecutar un script de Python mediante una tarea programada de Linux en Compute Engine para escanear el bucket periódicamente en busca de archivos entrantes y llamar a la API de conversión de voz a texto para cada archivo no procesado.",
      "Cree una función de Cloud que se active mediante eventos de un bucket de Cloud Storage para enviar la URI del archivo a la API de conversión de voz a texto de Google."
    ],
    "answer": "Cree una función de Cloud que se active mediante eventos de un bucket de Cloud Storage para enviar la URI del archivo a la API de conversión de voz a texto de Google."
  },
  {
    "question": "Tu cliente quiere que crees un sitio web seguro con escalado automático basado en la instancia de computación. Carga de CPU. Desea mejorar el rendimiento almacenando contenido estático en Cloud Storage. ¿Qué recursos se necesitan para distribuir el tráfico de usuarios?",
    "options": [
      "Un balanceador de carga HTTP(S) externo con un certificado SSL administrado para distribuir la carga y un mapa de URL para dirigir las solicitudes de contenido estático al backend de Cloud Storage.",
      "Un balanceador de carga de red externo que apunta a las instancias de backend para distribuir la carga de manera uniforme. Los servidores web reenviarán la solicitud al almacenamiento en la nube según sea necesario.",
      "Un balanceador de carga HTTP(S) interno junto con un proxy con reconocimiento de identidad para permitir solo tráfico HTTPS.",
      "Un balanceador de carga HTTP(S) externo para distribuir la carga y un mapa de URL para dirigir las solicitudes de contenido estático al backend de Cloud Storage. Instale los certificados HTTPS en la instancia."
    ],
    "answer": "Un balanceador de carga HTTP(S) externo con un certificado SSL administrado para distribuir la carga y un mapa de URL para dirigir las solicitudes de contenido estático al backend de Cloud Storage."
  },
  {
    "question": "La actividad principal de su empresa es el alquiler de maquinaria de construcción a gran escala. Toda la maquinaria alquilada está equipada con múltiples sensores que envían información sobre eventos cada pocos segundos. Estas señales pueden variar, como el estado del motor, la distancia recorrida, el nivel de combustible, etc. A los clientes se les factura en función del consumo monitorizado por estos sensores. Usted espera un alto rendimiento (hasta miles de eventos por hora por dispositivo) y necesita recuperar datos consistentes según la hora del evento. El almacenamiento y la recuperación de señales individuales deben ser atómicos. ¿Qué debería hacer?",
    "options": [
      "Crea archivos en el almacenamiento en la nube a medida que llegan los datos.",
      "Cree un archivo en Filestore por cada dispositivo y agregue nuevos datos a ese archivo.",
      "Ingerir los datos en Cloud SQL. Utilizar varias réplicas de lectura para igualar el rendimiento.",
      "Ingerir los datos en Bigtable. Crear una clave de fila basada en la marca de tiempo del evento."
    ],
    "answer": "Ingerir los datos en Bigtable. Crear una clave de fila basada en la marca de tiempo del evento."
  },
  {
    "question": "Acabas de instalar la CLI de Google Cloud en tu nuevo portátil corporativo. Necesitas listar los elementos existentes. instancias de tu empresa en Google Cloud. ¿Qué debes hacer antes de ejecutar gcloud compute? ¿Comando para listar instancias? (Elija dos). Discusión sobre el tema 1 de la pregunta 266 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Ejecute gcloud auth login, ingrese sus credenciales de inicio de sesión en la ventana de diálogo y pegue el token de inicio de sesión recibido en la CLI de gcloud.",
      "Crea una cuenta de servicio de Google Cloud y descarga la clave de la cuenta de servicio. Coloca el archivo de clave. en una carpeta de tu máquina donde gcloud CLI pueda encontrarlo.",
      "Descargue la clave de su cuenta de usuario de Cloud Identity. Coloque el archivo de clave en una carpeta de su máquina donde gcloud CLI pueda encontrarlo.",
      "Ejecute gcloud config set compute/zone $my_zone para establecer la zona predeterminada para la CLI de gcloud.",
      "Ejecute gcloud config set project $my_project para establecer el proyecto predeterminado para la CLI de gcloud."
    ],
    "answer": "Ejecute gcloud auth login, ingrese sus credenciales de inicio de sesión en la ventana de diálogo y pegue el token de inicio de sesión recibido en la CLI de gcloud. | Ejecute gcloud config set project $my_project para establecer el proyecto predeterminado para la CLI de gcloud."
  },
  {
    "question": "Está planeando migrar sus datos locales a Google Cloud. Los datos incluyen: • 200 TB de archivos de vídeo en almacenamiento SAN • Datos de almacén de datos almacenados en Amazon Redshift • 20 GB de archivos PNG almacenados en un bucket de S3. Necesita cargar los archivos de vídeo en un bucket de Cloud Storage, transferir los datos del almacén de datos a BigQuery y cargar los archivos PNG en un segundo bucket de Cloud Storage. Debes seguir las prácticas recomendadas por Google y evitar escribir cualquier código para la migración. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 267 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice gcloud storage para los archivos de vídeo, Dataflow para los datos del almacén de datos y Storage Transfer Service para los archivos PNG.",
      "Utilice Transfer Appliance para los vídeos, BigQuery Data Transfer Service para los datos del almacén de datos y Storage Transfer Service para los archivos PNG.",
      "Utilice Storage Transfer Service para los archivos de vídeo, BigQuery Data Transfer Service para los datos del almacén de datos y Storage Transfer Service para los archivos PNG.",
      "Utilice Cloud Data Fusion para los archivos de vídeo, Dataflow para los datos del almacén de datos y Storage Transfer Service para los archivos PNG."
    ],
    "answer": "Utilice Transfer Appliance para los vídeos, BigQuery Data Transfer Service para los datos del almacén de datos y Storage Transfer Service para los archivos PNG."
  },
  {
    "question": "Desea implementar una nueva aplicación en contenedores en Google Cloud mediante un manifiesto de Kubernetes. Quiere tener control total sobre la implementación en Kubernetes y, al mismo tiempo, minimizar la configuración de la infraestructura. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 268 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Implemente la aplicación en GKE Autopilot.",
      "Implemente la aplicación en Cloud Run.",
      "Implemente la aplicación en GKE Standard.",
      "Implementar la aplicación en Cloud Functions."
    ],
    "answer": "Implemente la aplicación en GKE Autopilot."
  },
  {
    "question": "Tu equipo está desarrollando un sitio web que gestiona los votos de una gran cantidad de usuarios. Los votos llegarán a diferentes ritmos. Quieres optimizar el almacenamiento y el procesamiento de los votos. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 269 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Guarda los votos recibidos en Firestore. Usa Cloud Scheduler para activar una instancia de Cloud Functions. procesar periódicamente los votos.",
      "Utilice una instancia dedicada para procesar los votos entrantes. Envíe los votos directamente a esta instancia.",
      "Guarda los votos recibidos en un archivo JSON en Cloud Storage. Procesa los votos en lotes al final del día.",
      "Guarda los votos recibidos en Pub/Sub. Usa el tema de Pub/Sub para activar una instancia de Cloud Functions que procese los votos."
    ],
    "answer": "Guarda los votos recibidos en Pub/Sub. Usa el tema de Pub/Sub para activar una instancia de Cloud Functions que procese los votos."
  },
  {
    "question": "Estás implementando una aplicación en Google Cloud que requiere una base de datos relacional para su almacenamiento de para cumplir con las políticas de seguridad de su empresa, su aplicación debe conectarse a la base de datos mediante una conexión cifrada y autenticada que requiera una gestión mínima y se integre con la gestión de identidades y accesos (IAM). ¿Qué debe hacer?",
    "options": [
      "Implemente una base de datos Cloud SQL con el modo SSL configurado solo para cifrado, configure los certificados de cliente SSL/TLS y configure un usuario y una contraseña para la base de datos.",
      "Implemente una base de datos Cloud SQL con el modo SSL configurado para que solo esté cifrado, configure los certificados de cliente SSL/TLS y configure la autenticación de la base de datos IAM.",
      "Implemente una base de datos Cloud SQL y configure la autenticación de la base de datos IAM. Acceda a la base de datos a través del proxy de autenticación de Cloud SQL.",
      "Implemente una base de datos Cloud SQL y configure un usuario y una contraseña para la base de datos. Acceda a la base de datos a través del proxy de autenticación de Cloud SQL."
    ],
    "answer": "Implemente una base de datos Cloud SQL y configure la autenticación de la base de datos IAM. Acceda a la base de datos a través del proxy de autenticación de Cloud SQL."
  },
  {
    "question": "Tienes dos proyectos de Google Cloud: proyecto­a con VPC vpc­a (10.0.0.0/16) y proyecto­b con VPC vpc­b (10.8.0.0/16). Tu aplicación frontend reside en vpc­a y los servicios de API backend están implementados en vpc­b. Necesitas habilitar la comunicación entre estos proyectos de Google Cloud de manera eficiente y rentable. También quieres seguir las prácticas recomendadas por Google. ¿Qué deberías hacer? ¿tú haces? Discusión sobre el tema 1 de la pregunta 271 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una conexión OpenVPN entre vpc­a y vpc­b.",
      "Cree un emparejamiento de red VPC entre vpc­a y vpc­b.",
      "Configure un Cloud Router en vpc­a y otro Cloud Router en vpc­b.",
      "Configure una conexión de interconexión en la nube entre vpc­a y vpc­b."
    ],
    "answer": "Cree un emparejamiento de red VPC entre vpc­a y vpc­b."
  },
  {
    "question": "Su empresa ejecuta una carga de trabajo crítica en una única instancia de máquina virtual de Compute Engine. Las políticas de recuperación ante desastres de su empresa exigen que realice copias de seguridad diarias de todos los datos del disco de la instancia. Estas copias de seguridad deben conservarse durante 7 días. Debe configurar una solución de copia de seguridad que cumpla con las políticas de seguridad de su empresa y que requiera una configuración mínima. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 272 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Configure la instancia para que utilice la replicación asíncrona de disco persistente.",
      "Configure instantáneas de disco persistentes programadas diariamente con un período de retención de 7 días.",
      "Configure Cloud Scheduler para que active una función de Cloud cada día que cree una nueva imagen de máquina y elimine las imágenes de máquina que tengan más de 7 días de antigüedad.",
      "Configure un script bash usando gsutil para que se ejecute diariamente mediante una tarea programada (cron job). Copie los archivos del disco a un bucket de Cloud Storage con la clase de almacenamiento de archivo y una regla de ciclo de vida de objetos para eliminar los objetos después de 7 días."
    ],
    "answer": "Configure instantáneas de disco persistentes programadas diariamente con un período de retención de 7 días."
  },
  {
    "question": "Su empresa requiere que los productos de Google Cloud se creen con una configuración específica para cumplir con las políticas de seguridad de su empresa. Necesita implementar un mecanismo que permita ¿Qué deben hacer los ingenieros de software de su empresa para implementar y actualizar los productos de Google Cloud de forma preconfigurada y aprobada? Discusión sobre el tema 1 de la pregunta 273 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Crear paquetes Java que utilicen las bibliotecas cliente de Google Cloud para Java para configurar Google Productos en la nube. Almacena y comparte los paquetes en un repositorio de código fuente.",
      "Crea scripts bash que utilicen la interfaz de línea de comandos de Google Cloud para configurar los productos de Google Cloud. Almacena y comparte los scripts bash en un repositorio de código fuente.",
      "Utilice las API de Google Cloud mediante curl para configurar los productos de Google Cloud. Almacene y comparta los comandos curl en un repositorio de código fuente.",
      "Crear módulos de Terraform que utilicen el proveedor de Terraform de Google Cloud para configurar Google Productos en la nube. Almacena y comparte los módulos en un repositorio de código fuente."
    ],
    "answer": "Crear módulos de Terraform que utilicen el proveedor de Terraform de Google Cloud para configurar Google Productos en la nube. Almacena y comparte los módulos en un repositorio de código fuente."
  },
  {
    "question": "Eres administrador de una organización de Google Cloud. Debes configurar políticas de organización y puntos de acceso a registros en proyectos de Google Cloud que los usuarios no puedan eliminar para cumplir con las políticas de seguridad de tu empresa. Estas políticas varían según el departamento. Cada departamento de la empresa tiene asignado un usuario con el rol de Propietario del Proyecto. ¿Qué debería hacer?",
    "options": [
      "Utilice una convención de nomenclatura estándar para los proyectos que incluya el nombre del departamento. Configure las políticas de la organización y los receptores de registros en los proyectos.",
      "Utilice una convención de nomenclatura estándar para los proyectos que incluya el nombre del departamento. Configure tanto las políticas de la organización como los receptores de registros en los proyectos.",
      "Organice los proyectos en carpetas para cada departamento. Configure tanto las políticas de organización como los receptores de registros en las carpetas.",
      "Organice los proyectos en carpetas para cada departamento. Configure las políticas de la organización y los registros de eventos en las carpetas."
    ],
    "answer": "Organice los proyectos en carpetas para cada departamento. Configure tanto las políticas de organización como los receptores de registros en las carpetas."
  },
  {
    "question": "Estás implementando una aplicación web con Compute Engine. Creaste un grupo de instancias administradas (MIG) para alojar la aplicación. Quieres seguir las prácticas recomendadas por Google para implementar una solución segura y de alta disponibilidad. ¿Qué debes hacer?",
    "options": [
      "Utilice el balanceo de carga de proxy SSL para el MIG y un registro A en su zona privada DNS con la dirección IP del balanceador de carga.",
      "Utilice el balanceo de carga de proxy SSL para el MIG y un registro CNAME en su zona pública DNS con la dirección IP del balanceador de carga.",
      "Utilice el balanceo de carga HTTP(S) para el MIG y un registro CNAME en su zona privada DNS con la dirección IP del balanceador de carga.",
      "Utilice el balanceo de carga HTTP(S) para el MIG y un registro A en su zona pública DNS con la dirección IP del balanceador de carga."
    ],
    "answer": "Utilice el balanceo de carga HTTP(S) para el MIG y un registro A en su zona pública DNS con la dirección IP del balanceador de carga."
  },
  {
    "question": "Tienes varios cientos de aplicaciones de microservicios ejecutándose en Google Kubernetes Engine (GKE). clúster. Cada microservicio es un despliegue con límites de recursos configurados para cada contenedor en el despliegue. Ha observado que los límites de recursos para memoria y CPU no están configurados adecuadamente de para muchos de los microservicios, es necesario asegurarse de que cada uno tenga límites adecuados de memoria y CPU. ¿Qué se debe hacer? Discusión sobre el tema 1 de la pregunta 276 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Configure un escalador automático de pods vertical para cada microservicio.",
      "Modifique el tipo de máquina del grupo de nodos del clúster y elija un tipo de máquina con más memoria y CPU.",
      "Configure un escalador automático de pods horizontal para cada microservicio.",
      "Configurar el escalado automático del clúster de GKE."
    ],
    "answer": "Configure un escalador automático de pods vertical para cada microservicio."
  },
  {
    "question": "Tu empresa utiliza BigQuery para almacenar y analizar datos. Al enviar tu consulta a BigQuery, esta falla con un error de cuota excedida. Necesitas diagnosticar la causa del error. ¿Qué debes hacer? (Elige dos opciones). Discusión sobre el tema 1 de la pregunta 277 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice el motor de BI de BigQuery para analizar el problema.",
      "Utilice las vistas INFORMATION_SCHEMA para analizar el problema subyacente.",
      "Configure Cloud Trace para analizar el problema.",
      "Busque errores en los registros de auditoría de la nube para analizar el problema.",
      "Consulte los errores en la monitorización de la nube para analizar el problema."
    ],
    "answer": "Utilice las vistas INFORMATION_SCHEMA para analizar el problema subyacente. | Busque errores en los registros de auditoría de la nube para analizar el problema."
  },
  {
    "question": "Tu equipo ha desarrollado una aplicación sin estado que requiere ejecutarse directamente en máquinas virtuales. Se espera que la aplicación reciba un volumen de tráfico variable y necesita escalar automáticamente. Debes implementarla. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 278 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Implemente la aplicación en un grupo de instancias administradas y configure el escalado automático.",
      "Implemente la aplicación en un clúster de Kubernetes Engine y configure el escalado automático del grupo de nodos.",
      "Implemente la aplicación en Cloud Functions y configure el número máximo de instancias.",
      "Implemente la aplicación en Cloud Run y configure el escalado automático."
    ],
    "answer": "Implemente la aplicación en un grupo de instancias administradas y configure el escalado automático."
  },
  {
    "question": "Tu aplicación web está alojada en Cloud Run y necesita consultar una base de datos Cloud SQL. Cada mañana, durante un pico de tráfico, observas errores de cuota de API en los registros de Cloud SQL. El proyecto ya ha alcanzado la cuota máxima de API. Quieres realizar un cambio de configuración para solucionar el problema. ¿Qué deberías hacer?",
    "options": [
      "Modificar el número mínimo de instancias de Cloud Run.",
      "Utilice la división de tráfico.",
      "Modificar el número máximo de instancias de Cloud Run.",
      "Establezca una variable de entorno para el número mínimo de solicitudes concurrentes de la aplicación."
    ],
    "answer": "Modificar el número mínimo de instancias de Cloud Run."
  },
  {
    "question": "Necesitas implementar una única aplicación web sin estado con una interfaz web y múltiples puntos de acceso. Por motivos de seguridad, la aplicación web debe ser accesible desde una dirección IP interna de la VPC privada y la red local de su empresa. Además, necesita actualizar la aplicación web varias veces al día con un mínimo esfuerzo y desea gestionar una infraestructura en la nube mínima. ¿Qué debería hacer?",
    "options": [
      "Implemente la aplicación web en la edición estándar de Google Kubernetes Engine con un ingress interno.",
      "Implemente la aplicación web en Cloud Run con el acceso privado de Google configurado.",
      "Implemente la aplicación web en Cloud Run con Private Service Connect configurado.",
      "Implemente la aplicación web en GKE Autopilot con el acceso privado de Google configurado."
    ],
    "answer": "Implemente la aplicación web en Cloud Run con Private Service Connect configurado."
  },
  {
    "question": "Utilizas Cloud Logging para capturar los registros de la aplicación. Ahora necesitas usar SQL para analizar dichos registros y quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 281 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Desarrollar consultas SQL utilizando Gemini para Google Cloud.",
      "Habilite Log Analytics para el bucket de registros y cree un conjunto de datos vinculado en BigQuery.",
      "Cree un esquema para el depósito de almacenamiento y ejecute consultas SQL para los datos que contiene.",
      "Exporte los registros a un depósito de almacenamiento y cree una vista externa en BigQuery."
    ],
    "answer": "Habilite Log Analytics para el bucket de registros y cree un conjunto de datos vinculado en BigQuery."
  },
  {
    "question": "Necesitas implementar una aplicación de software de terceros en una única instancia de máquina virtual de Compute Engine de la aplicación requiere acceso al disco de lectura y escritura a máxima velocidad para la base de datos interna. Debe asegurarse de que la instancia se recupere en caso de fallo. ¿Qué debe hacer? Discusión sobre el tema 1 de la pregunta 282 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una plantilla de instancia. Establezca el tipo de disco como un disco persistente SSD. Inicie la plantilla de instancia como parte de un grupo de instancias administradas con estado.",
      "Cree una plantilla de instancia. Establezca el tipo de disco como un disco persistente SSD. Inicie la instancia. plantilla como parte de un grupo de instancias administradas sin estado.",
      "Cree una plantilla de instancia. Establezca el tipo de disco en Hyperdisk Extreme. Inicie la plantilla de instancia como parte de un grupo de instancias administradas con estado.",
      "Cree una plantilla de instancia. Establezca el tipo de disco en Hyperdisk Extreme. Inicie la plantilla de instancia como parte de un grupo de instancias administradas sin estado."
    ],
    "answer": "Cree una plantilla de instancia. Establezca el tipo de disco en Hyperdisk Extreme. Inicie la plantilla de instancia como parte de un grupo de instancias administradas con estado."
  },
  {
    "question": "Tienes una instancia de máquina virtual ejecutándose en una VPC con subredes de pila única. Necesitas asegurarte de que la instancia de máquina virtual tenga una dirección IP fija para que otros servicios alojados en la misma VPC puedan comunicarse con ella. Quieres seguir las prácticas recomendadas por Google y minimizar los costos. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 283 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Promover la dirección IP existente de la máquina virtual para que se convierta en una dirección IP externa estática.",
      "Promover la dirección IP existente de la máquina virtual para que se convierta en una dirección IP interna estática.",
      "Reserve una nueva dirección IPv6 externa estática y asigne la nueva dirección IP a la máquina virtual.",
      "Reserve una nueva dirección IP externa estática y asigne la nueva dirección IP a la máquina virtual."
    ],
    "answer": "Promover la dirección IP existente de la máquina virtual para que se convierta en una dirección IP interna estática."
  },
  {
    "question": "Tu aplicación de vista previa, implementada en un clúster de Google Kubernetes Engine (GKE) de zona única en us­central1, ha ganado popularidad. Ahora estás listo para que la aplicación esté disponible para el público en general. Es necesario implementar la aplicación en producción garantizando una alta disponibilidad y resiliencia. También querrás seguir las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Utilice el comando gcloud container clusters create con las opciones ­­enable­multi­networking y ­­enable­autoscaling para crear un clúster zonal de autoescalado e implementar la aplicación en él.",
      "Utilice el comando gcloud container clusters create­auto para crear un clúster de Autopilot e implementar la aplicación en él.",
      "Utilice el comando gcloud container clusters update con la opción ­­region us­central1 para actualizar el clúster y desplegar la aplicación en él.",
      "Utilice el comando gcloud container clusters update con la opción ­­node­locations us­central1­ a,us­central1­b para actualizar el clúster y desplegar la aplicación en los nodos."
    ],
    "answer": "Utilice el comando gcloud container clusters create­auto para crear un clúster de Autopilot e implementar la aplicación en él."
  },
  {
    "question": "Estás desarrollando una aplicación que se implementará en Google Cloud. La aplicación utilizará una cuenta de servicio para recuperar datos de BigQuery. Antes de implementarla, quieres probar los permisos de esta cuenta de servicio desde tu equipo local para asegurarte de que no haya problemas de autenticación. Quieres garantizar que utilizas el método más seguro, siguiendo las prácticas recomendadas por Google. ¿Qué deberías hacer?",
    "options": [
      "Genere una clave de cuenta de servicio y configure la CLI de gcloud para que utilice esta clave. Realice una solicitud relevante a BigQuery a través de la CLI de gcloud para probar el acceso.",
      "Otorgue a la cuenta de servicio el rol de IAM de administrador de BigQuery para garantizar que la cuenta de servicio tenga todos los accesos necesarios.",
      "Configure la CLI de gcloud para usar la suplantación de cuenta de servicio. Realice una solicitud relevante a BigQuery a través de la CLI de gcloud para probar el acceso.",
      "Configure la CLI de gcloud con las credenciales predeterminadas de la aplicación utilizando su cuenta de usuario. Realice una solicitud relevante a BigQuery a través de la CLI de gcloud para probar el acceso."
    ],
    "answer": "Configure la CLI de gcloud para usar la suplantación de cuenta de servicio. Realice una solicitud relevante a BigQuery a través de la CLI de gcloud para probar el acceso."
  },
  {
    "question": "Tu organización está migrando a Google Cloud. Quieres que solo los usuarios con una cuenta de Google emitida por la empresa tengan acceso a Google Cloud. Cuentas para acceder a tu entorno de Google Cloud. Debes asegurarte de que los usuarios del mismo departamento solo puedan acceder a los recursos de su propio departamento. Quieres minimizar los costos operativos siguiendo las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 286 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Asigne usuarios a los grupos de Google correspondientes y otorgue acceso a los recursos en la nube mediante roles de Identity and Access Management (IAM). Identifique y elimine periódicamente las cuentas de Google que no pertenezcan a la empresa.",
      "Asigne a los usuarios a los grupos de Google correspondientes y otorgue acceso a los recursos en la nube mediante roles de Identity and Access Management (IAM). Utilice las políticas de la organización para bloquear los correos electrónicos que no provengan de la empresa.",
      "Cree una carpeta para cada departamento en Resource Manager. Otorgue a los usuarios de cada departamento el permiso correspondiente. Rol de administrador de carpeta en la carpeta de su departamento.",
      "Cree una carpeta para cada departamento en Resource Manager. Asigne a todos los usuarios de la empresa el rol de Administrador de carpetas a nivel de organización."
    ],
    "answer": "Asigne a los usuarios a los grupos de Google correspondientes y otorgue acceso a los recursos en la nube mediante roles de Identity and Access Management (IAM). Utilice las políticas de la organización para bloquear los correos electrónicos que no provengan de la empresa."
  },
  {
    "question": "Estás implementando una aplicación en Cloud Run. Tu aplicación requiere el uso de una API que Se ejecuta en Google Kubernetes Engine (GKE). Debes asegurarte de que tu servicio Cloud Run pueda acceder de forma privada a la API en GKE y seguir las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 287 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Implemente un recurso de entrada en el clúster de GKE para exponer la API a internet. Use Cloud Armor para filtrar las direcciones IP que pueden conectarse a la API. En el servicio Cloud Run, configure la aplicación para que obtenga su dirección IP pública y actualice la política de Cloud Armor al iniciarse para permitir que esta dirección IP llame a la API en los puertos 80 y 443.",
      "Cree una regla de firewall de entrada en la VPC para permitir conexiones desde 0.0.0.0/0 en los puertos 80 y 443.",
      "Cree una regla de firewall de salida en la VPC para permitir conexiones a 0.0.0.0/ en los puertos 80 y 443.",
      "Implemente un Application Load Balancer interno para exponer la API en GKE a la VPC. Configurar DNS en la nube con la dirección IP del balanceador de carga de aplicaciones interno. Implemente un conector de acceso a VPC sin servidor para permitir que el servicio Cloud Run llame a la API a través del FQDN en el DNS en la nube."
    ],
    "answer": "Implemente un Application Load Balancer interno para exponer la API en GKE a la VPC. Configurar DNS en la nube con la dirección IP del balanceador de carga de aplicaciones interno. Implemente un conector de acceso a VPC sin servidor para permitir que el servicio Cloud Run llame a la API a través del FQDN en el DNS en la nube."
  },
  {
    "question": "Su empresa utiliza una estrategia multi­nube que incluye Google Cloud. Desea centralizar los registros de aplicaciones en una herramienta de software como servicio (SaaS) de terceros de todos los entornos. Necesita integrar los registros originados por Cloud Logging y desea asegurarse de que la exportación se realice con El menor retraso posible. ¿Qué deberías hacer?",
    "options": [
      "Cree un receptor de Cloud Logging y configure BigQuery como destino. Configure la herramienta SaaS. para consultar BigQuery y recuperar los registros.",
      "Cree un receptor de Cloud Logging y configure Pub/Sub como destino. Configure la herramienta SaaS para que se suscriba al tema de Pub/Sub y recupere los registros.",
      "Cree un receptor de registro en la nube y configure Cloud Storage como destino. Configure el SaaS. Herramienta para leer el bucket de Cloud Storage y recuperar los registros.",
      "Utilice una tarea programada (cron job) de Cloud Scheduler para activar una función de Cloud que consulte Cloud Logging y envíe los registros a la herramienta SaaS."
    ],
    "answer": "Cree un receptor de Cloud Logging y configure Pub/Sub como destino. Configure la herramienta SaaS para que se suscriba al tema de Pub/Sub y recupere los registros."
  },
  {
    "question": "Estás planeando migrar una base de datos y una aplicación de backend a un clúster estándar de Google Kubernetes Engine (GKE). Necesitas evitar la pérdida de datos y asegurarte de que haya suficientes nodos disponibles para tu aplicación de backend según las necesidades de tus cargas de trabajo. Quieres seguir las prácticas recomendadas por Google y minimizar el trabajo manual. ¿Qué deberías hacer?",
    "options": [
      "Ejecute su base de datos como un StatefulSet. Configure el escalado automático del clúster para gestionar los cambios en las demandas de sus cargas de trabajo.",
      "Ejecute su base de datos como un único Pod. Ejecute el comando de redimensionamiento cuando observe cambios en las demandas de sus cargas de trabajo.",
      "Ejecute su base de datos como un DaemonSet. Ejecute el comando de redimensionamiento cuando observe cambios en las demandas de sus cargas de trabajo.",
      "Ejecute su base de datos como un despliegue. Configure el escalado automático del clúster para gestionar los cambios en las demandas de sus cargas de trabajo."
    ],
    "answer": "Ejecute su base de datos como un StatefulSet. Configure el escalado automático del clúster para gestionar los cambios en las demandas de sus cargas de trabajo."
  },
  {
    "question": "Usted es el administrador de la organización para los recursos de Google Cloud de su empresa de la empresa tiene normas de cumplimiento estrictas que exigen que se le notifique sobre cualquier modificación de archivos y documentos alojados en el almacenamiento en la nube. En un incidente reciente, uno de sus compañeros de equipo modificó archivos sin que usted recibiera ninguna notificación, lo que provocó fallos en otros procesos de producción. Debe asegurarse de recibir notificaciones sobre todos los cambios en archivos y documentos en el almacenamiento en la nube, minimizando al mismo tiempo la carga administrativa. ¿Qué debería hacer?",
    "options": [
      "Consulte los registros de auditoría de Cloud para todos los archivos de Cloud Storage en el Explorador de registros. Filtre por registros de actividad del administrador.",
      "Habilite el control de versiones de objetos de Cloud Storage en su bucket. Configure las notificaciones de Pub/Sub para sus buckets de Cloud Storage.",
      "Habilite el control de versiones en el bucket de Cloud Storage. Configure un script personalizado que escanee las versiones de los objetos de Cloud Storage que se modifican y alerte al administrador mediante dicho script.",
      "Configure las notificaciones de cambio de objetos en los buckets de Cloud Storage. Envíe los eventos a Pub/Sub."
    ],
    "answer": "Habilite el control de versiones de objetos de Cloud Storage en su bucket. Configure las notificaciones de Pub/Sub para sus buckets de Cloud Storage."
  },
  {
    "question": "Su empresa desea almacenar facturas y otros documentos financieros en Google Cloud. Necesita encontrar una solución gestionada por Google para almacenar esta información. Debe asegurarse de que los documentos se conserven durante tres años. Los analistas de su empresa necesitan acceso frecuente a las facturas de los últimos seis meses. Transcurrido este plazo, las facturas deben archivarse únicamente con fines de auditoría. Desea minimizar los costos y seguir las prácticas recomendadas por Google. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 291 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice Cloud Storage con Object Lifecycle Management para cambiar la clase de almacenamiento de objetos a Coldline después de seis meses.",
      "Utilice Cloud Storage con Object Lifecycle Management para cambiar la clase de almacenamiento de objetos a Estándar después de seis meses.",
      "Almacene sus documentos en Filestore y, después de seis meses, trasládelos a Cloud Storage con la clase de almacenamiento de objetos configurada como Coldline.",
      "Almacene sus documentos en Filestore y, después de seis meses, trasládelos a Cloud Storage con la clase de almacenamiento de objetos configurada como Estándar."
    ],
    "answer": "Utilice Cloud Storage con Object Lifecycle Management para cambiar la clase de almacenamiento de objetos a Coldline después de seis meses."
  },
  {
    "question": "Estás planeando migrar tus cargas de trabajo en contenedores a Google Kubernetes Engine (GKE). Debe determinar qué opción de GKE utilizar. Su solución debe tener alta disponibilidad, tiempo de inactividad mínimo y la capacidad de aplicar rápidamente actualizaciones de seguridad a sus nodos. También desea Pagar únicamente por los recursos informáticos que utilizan tus cargas de trabajo, sin gestionar nodos. Quieres seguir las prácticas recomendadas por Google y minimizar los costes operativos. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 292 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Configure un generador de polvo GKE regional estándar.",
      "Configure un generador de polvo GKE zonal estándar.",
      "Configure un clúster GKE multizonal estándar.",
      "Configurar un clúster de Autopilot GKE."
    ],
    "answer": "Configurar un clúster de Autopilot GKE."
  },
  {
    "question": "Su empresa almacena datos de múltiples fuentes que tienen diferentes requisitos de almacenamiento de datos. Estos datos incluyen: 1. Datos de clientes estructurados y leídos con consultas complejas. 2. Datos de registro históricos de gran volumen y acceso poco frecuente. 3. Datos de sensores en tiempo real con escrituras de alta velocidad, que deben estar disponibles para el análisis pero pueden tolerar cierta pérdida de datos. Debe diseñar la solución de almacenamiento más rentable que cumpla con todos los requisitos de almacenamiento de datos. ¿Deberías hacerlo?",
    "options": [
      "Utilice Firestore para los datos de los clientes, Cloud Storage (Nearline) para los registros históricos y Bigtable para los datos de los sensores.",
      "Utilice Cloud SQL para los datos de los clientes, Cloud Storage (Coldline) para los registros históricos y BigQuery para los datos de los sensores.",
      "Utilice Cloud SQL para los datos de los clientes. Almacenamiento en la nube (archivo) para los registros históricos y Bigtable para los datos de los sensores.",
      "Utilice Spanner para todos los datos."
    ],
    "answer": "Utilice Cloud SQL para los datos de los clientes. Almacenamiento en la nube (archivo) para los registros históricos y Bigtable para los datos de los sensores."
  },
  {
    "question": "Trabajas para una empresa de servicios financieros que opera como corredor de bolsa. Tu empresa es Está planeando migrar a Google Cloud. Necesita planificar el diseño de la red en Google Cloud. Su diseño debe: • Minimizar la latencia entre todos los sistemas de producción. • Minimizar los costos relacionados con su Entorno de desarrollo. ¿Qué debes hacer?",
    "options": [
      "Cree una VPC en el Nivel Estándar y otra en el Nivel Premium. Implemente cargas de trabajo de producción en el Nivel Estándar y las cargas de trabajo de desarrollo en el Nivel Premium.",
      "Cree una VPC en el nivel estándar y otra en el nivel premium. Implemente las cargas de trabajo de desarrollo en el nivel estándar y las cargas de trabajo de producción en el nivel premium.",
      "Cree una VPC en el nivel Premium e implemente cargas de trabajo tanto de producción como de desarrollo en esta VPC.",
      "Cree una VPC en el nivel estándar e implemente cargas de trabajo tanto de producción como de desarrollo en esta VPC."
    ],
    "answer": "Cree una VPC en el nivel estándar y otra en el nivel premium. Implemente las cargas de trabajo de desarrollo en el nivel estándar y las cargas de trabajo de producción en el nivel premium."
  },
  {
    "question": "Usted administra un conjunto de instancias de Compute Engine Linux en un proyecto de Google Cloud. El equipo de ingeniería de su empresa necesita acceso SSH a todas las instancias para realizar tareas de mantenimiento rutinarias. Debe administrar el acceso SSH para el equipo de ingeniería y minimizar los costos operativos cuando los ingenieros se incorporan o abandonan el equipo. ¿Qué debería hacer?",
    "options": [
      "Cree un único par de claves SSH que compartirán todos los miembros del equipo de ingeniería. Agregue el SSH público. clave para los metadatos del proyecto.",
      "Cree un par de claves SSH para cada ingeniero del equipo y agregue la clave SSH pública a los metadatos de las instancias correspondientes.",
      "Crea un grupo de Google para todos los miembros del equipo de ingeniería y asígnales el rol de IAM de Compute Viewer. Gestiona la pertenencia al grupo cuando los ingenieros se unan o abandonen el equipo.",
      "Crea un grupo de Google para todos los miembros del equipo de ingeniería y configura el inicio de sesión del sistema operativo para este grupo en el proyecto. Gestionar la pertenencia al grupo cuando los ingenieros se unen o abandonan el equipo."
    ],
    "answer": "Crea un grupo de Google para todos los miembros del equipo de ingeniería y configura el inicio de sesión del sistema operativo para este grupo en el proyecto. Gestionar la pertenencia al grupo cuando los ingenieros se unen o abandonan el equipo."
  },
  {
    "question": "Su empresa sufrió recientemente una interrupción del servicio que provocó que varios trabajos de Dataflow se bloquearan, lo que resultó en un tiempo de inactividad significativo en las aplicaciones posteriores y una pérdida de ingresos. Lograron resolver el problema identificando y corrigiendo un error en el código. Necesitan diseñar una solución que requiera un mínimo esfuerzo de gestión para identificar cuándo se bloquean los trabajos en el futuro y así evitar que este problema se repita. ¿Qué deberían hacer?",
    "options": [
      "Actualice las configuraciones de los trabajos de Dataflow para enviar mensajes a un tema de Pub/Sub cuando haya retrasos. Configure un trabajo de Dataflow de respaldo para procesar los trabajos retrasados. Use Cloud Tasks para activar una alerta cuando se envíen mensajes al tema de Pub/Sub.",
      "Configure alertas de Cloud Monitoring en la métrica de actualización de datos para que los trabajos de Dataflow reciban una notificación cuando se alcance un determinado umbral.",
      "Configure la función de informes de errores para identificar los rastros de pila que indiquen ralentizaciones en los trabajos de Dataflow. Configure alertas basadas en estas entradas de registro.",
      "Utilice el panel de control de estado del servicio personalizado para identificar problemas con los trabajos de Dataflow en todas las regiones."
    ],
    "answer": "Configure alertas de Cloud Monitoring en la métrica de actualización de datos para que los trabajos de Dataflow reciban una notificación cuando se alcance un determinado umbral."
  },
  {
    "question": "Su empresa está modernizando sus aplicaciones y refactorizándolas para convertirlas en microservicios en contenedores. Es necesario implementar la infraestructura en Google Cloud para que los equipos puedan implementar sus aplicaciones de las aplicaciones no pueden hacerse públicas. Desea minimizar los gastos generales de gestión y operación. ¿Qué debería hacer?",
    "options": [
      "Aprovisionar un clúster de Google Kubernetes Engine (GKE) Autopilot.",
      "Aprovisionar un conjunto de instancias de Compute Engine e instalar Kubernetes.",
      "Aprovisionar un clúster regional estándar de Google Kubernetes Engine (GKE).",
      "Aprovisionar un clúster zonal estándar de Google Kubernetes Engine (GKE)."
    ],
    "answer": "Aprovisionar un clúster de Google Kubernetes Engine (GKE) Autopilot."
  },
  {
    "question": "Tienes una aplicación ejecutándose dentro de una instancia de Compute Engine. Quieres proporcionar a la aplicación acceso seguro a un conjunto de datos de BigQuery. Debes asegurarte de que las credenciales solo sean válidas durante un corto período de tiempo y que tu aplicación solo tenga acceso al BigQuery previsto. Conjunto de datos. Desea seguir las prácticas recomendadas por Google y minimizar sus costos operativos. ¿Qué deberías hacer?",
    "options": [
      "Adjunte una nueva cuenta de servicio a la instancia cada hora y otorgue a la cuenta de servicio el rol IAM de Visor de datos de BigQuery en el proyecto.",
      "Asocie una cuenta de servicio personalizada a la instancia y otorgue a la cuenta de servicio los permisos de BigQuery Data. Rol de IAM de visor en el conjunto de datos.",
      "Adjunte una nueva cuenta de servicio a la instancia cada hora y otorgue a la cuenta de servicio el rol IAM de BigQuery Data Viewer en el conjunto de datos.",
      "Asocie una cuenta de servicio personalizada a la instancia y otorgue a la cuenta de servicio los permisos de BigQuery Data. Rol de IAM del espectador en el proyecto."
    ],
    "answer": "Asocie una cuenta de servicio personalizada a la instancia y otorgue a la cuenta de servicio los permisos de BigQuery Data. Rol de IAM de visor en el conjunto de datos."
  },
  {
    "question": "Tienes una aplicación que actualmente procesa transacciones mediante un grupo de instancias de máquinas virtuales gestionadas. Necesitas migrarla para que sea sin servidor y escalable. Quieres implementar un sistema de procesamiento de transacciones asíncrono, minimizando la sobrecarga de gestión. ¿Qué deberías hacer?",
    "options": [
      "Instale Kafka en instancias de máquinas virtuales para confirmar las transacciones entrantes. Utilice Cloud Run para procesarlas. actas.",
      "Utilice Pub/Sub para confirmar las transacciones entrantes. Utilice instancias de VM para procesar las transacciones.",
      "Utilice Pub/Sub para confirmar las transacciones entrantes. Utilice Cloud Run para procesar las transacciones.",
      "Instale Kafka en las instancias de máquinas virtuales para confirmar las transacciones entrantes. Utilice las instancias de máquinas virtuales para procesar las transacciones."
    ],
    "answer": "Utilice Pub/Sub para confirmar las transacciones entrantes. Utilice Cloud Run para procesar las transacciones."
  },
  {
    "question": "Su empresa cuenta con numerosas aplicaciones heredadas de terceros que dependen de un servidor NFS compartido para compartir archivos entre ellas. Desea modernizar el servidor NFS mediante un servicio gestionado de Google Cloud. Necesita seleccionar la solución que requiera la menor cantidad de cambios en la aplicación. ¿Qué debería hacer? discusión Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una instancia de Compute Engine y configure un servidor NFS en la instancia. Dirija todos los puntos de montaje NFS a la instancia de Compute Engine.",
      "Implemente una instancia de Filestore. Reemplace todos los montajes NFS con un montaje de Filestore.",
      "Configurar Firestore. Configurar todas las aplicaciones para que utilicen Firestore en lugar del servidor NFS.",
      "Cree un bucket de Cloud Storage. Configure todas las aplicaciones para que utilicen las bibliotecas cliente de Cloud Storage en lugar del servidor NFS."
    ],
    "answer": "Implemente una instancia de Filestore. Reemplace todos los montajes NFS con un montaje de Filestore."
  },
  {
    "question": "Su empresa busca una solución escalable para conservar y explorar los registros de aplicaciones alojados en Compute Engine. Debe poder analizar sus registros con consultas SQL y desea poder Para crear gráficos que permitan identificar patrones y tendencias en tus registros a lo largo del tiempo, y para seguir las prácticas recomendadas por Google y minimizar tus costos operativos, ¿qué deberías hacer? Discusión sobre el tema 1 de la pregunta 301 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice un script personalizado para enviar los registros de su aplicación a BigQuery para su análisis.",
      "Ingeste los registros de su aplicación en Cloud Logging mediante Ops Agent y explore sus registros en Explorador de registros.",
      "Incorpore los registros de su aplicación a Cloud Logging mediante Ops Agent y explore sus registros con Log Analytics.",
      "Utilice un script personalizado para enviar los registros de su aplicación a Cloud SQL para su análisis."
    ],
    "answer": "Incorpore los registros de su aplicación a Cloud Logging mediante Ops Agent y explore sus registros con Log Analytics."
  },
  {
    "question": "Estás implementando una aplicación en Google Kubernetes Engine (GKE). La aplicación necesita realizar llamadas a la API de un bucket privado de Cloud Storage. Debes configurar los Pods de tu aplicación para que se autentiquen en la API de Cloud Storage, pero la política de tu organización impide el uso de claves de cuenta de servicio. Quieres seguir las prácticas recomendadas por Google. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 302 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree el clúster de GKE con Workload Identity Federation. Configure la cuenta de servicio de nodo predeterminada para acceder al bucket. Implemente la aplicación en el clúster para que pueda usar los permisos de la cuenta de servicio de nodo. Use Identity and Access Management (IAM) para otorgar acceso a la cuenta de servicio al bucket.",
      "Cree el clúster de GKE con Workload Identity Federation. Cree una cuenta de servicio de Google y una cuenta de servicio de Kubernetes, y configure ambas para usar Workload Identity Federation. Asocie la cuenta de servicio de Kubernetes a los pods de la aplicación y configure la cuenta de servicio de Google para acceder al bucket con Identity and Access Management (IAM).",
      "Cree el clúster de GKE e implemente la aplicación. Solicite una excepción de seguridad para crear una clave de cuenta de servicio de Google. Establezca la política de organización constraints/iam.serviceAccountKeyExpiryHours en 24 horas.",
      "Cree el clúster de GKE e implemente la aplicación. Solicite una excepción de seguridad para crear una clave de cuenta de servicio de Google. Establezca la política de organización constraints/iam.serviceAccountKeyExpiryHours en 8 horas."
    ],
    "answer": "Cree el clúster de GKE con Workload Identity Federation. Cree una cuenta de servicio de Google y una cuenta de servicio de Kubernetes, y configure ambas para usar Workload Identity Federation. Asocie la cuenta de servicio de Kubernetes a los pods de la aplicación y configure la cuenta de servicio de Google para acceder al bucket con Identity and Access Management (IAM)."
  },
  {
    "question": "Los desarrolladores de su empresa utilizan una automatización que usted creó recientemente para aprovisionar máquinas virtuales Linux en Compute Engine dentro de un proyecto de Google Cloud y realizar diversas tareas. Necesita administrar el ciclo de vida de las cuentas Linux y el acceso de estos usuarios. Desea seguir las prácticas recomendadas por Google para simplificar la administración de accesos y minimizar los costos operativos. ¿Qué debería hacer?",
    "options": [
      "Habilite el inicio de sesión del sistema operativo para todas las máquinas virtuales. Utilice roles de IAM para otorgar permisos de usuario.",
      "Exija a sus desarrolladores que creen claves SSH públicas. Escriba scripts de inicio personalizados para actualizar los permisos de usuario.",
      "Exija a sus desarrolladores que creen claves SSH públicas. Asigne al propietario de la clave pública el rol de administrador (root). usuario.",
      "Habilitar el inicio de sesión del sistema operativo para todas las máquinas virtuales. Escribir scripts de inicio personalizados para actualizar los permisos de usuario."
    ],
    "answer": "Habilite el inicio de sesión del sistema operativo para todas las máquinas virtuales. Utilice roles de IAM para otorgar permisos de usuario."
  },
  {
    "question": "Usted está gestionando la configuración de seguridad de la organización de Google Cloud de su empresa. El equipo de Operaciones necesita permisos específicos tanto en un clúster de Google Kubernetes Engine (GKE) como en Una instancia de Cloud SQL. Existen dos roles de Identity and Access Management (IAM) predefinidos que contienen un subconjunto de los permisos que necesita el equipo. Debe configurar los permisos de IAM necesarios para este equipo siguiendo las prácticas recomendadas por Google. ¿Qué debe hacer?",
    "options": [
      "Cree un rol de IAM personalizado que combine los permisos de los dos roles predefinidos relevantes.",
      "Otorgar al equipo los dos roles de IAM predefinidos.",
      "Cree un rol de IAM personalizado que incluya únicamente los permisos necesarios de los roles predefinidos.",
      "Otorgar al equipo los roles de IAM de Administrador de Kubernetes Engine y Administrador de Cloud SQL."
    ],
    "answer": "Cree un rol de IAM personalizado que incluya únicamente los permisos necesarios de los roles predefinidos."
  },
  {
    "question": "Su organización ha decidido implementar todas sus cargas de trabajo de computación en Kubernetes en Google Cloud y otros dos proveedores de nube. Desea crear una solución de infraestructura como código para automatizar el proceso de aprovisionamiento de todos los recursos en la nube. ¿Qué debería hacer?",
    "options": [
      "Cree la solución utilizando Config Connector y aprovisione los recursos.",
      "Construya la solución utilizando Terraform y aprovisione los recursos.",
      "Construir la solución utilizando Python y los SDK de la nube de todos los proveedores para aprovisionar la recursos.",
      "Construya la solución utilizando manifiestos YAML y aprovisione los recursos."
    ],
    "answer": "Construya la solución utilizando Terraform y aprovisione los recursos."
  },
  {
    "question": "Planeas implementar una aplicación en Google Cloud. Tu aplicación procesa eventos asíncronos de los servicios de Google y debe ser accesible desde internet. Necesitas definir cómo implementarla. Quieres seguir un proceso estandarizado y minimizar los costos de desarrollo. Además, quieres evitar costos cuando tus cargas de trabajo no estén en uso. ¿Qué deberías hacer?",
    "options": [
      "Implemente su código en GKE. Utilice Pub/Sub para la entrega de eventos.",
      "Implemente su código en Compute Engine. Utilice Pub/Sub para la entrega de eventos.",
      "Implementa tu código en GKE. Usa Eventarc para la entrega de eventos.",
      "Implementa tu código en Cloud Run. Usa Eventarc para la entrega de eventos."
    ],
    "answer": "Implementa tu código en Cloud Run. Usa Eventarc para la entrega de eventos."
  },
  {
    "question": "Su empresa está migrando sus cargas de trabajo a Google Cloud debido a la expiración de un contrato de centro de datos de el entorno local y Google Cloud no están conectados. Ha decidido adoptar un enfoque de migración directa (lift­and­shift) y planea modernizar las cargas de trabajo en un proyecto futuro. Varias aplicaciones antiguas se conectan entre sí mediante direcciones IP internas codificadas. Desea migrar estas cargas de trabajo rápidamente sin modificar el código de la aplicación. Además, desea mantener toda la funcionalidad. ¿Qué debería hacer?",
    "options": [
      "Migre primero su servidor DNS. Configure Cloud DNS con una zona de reenvío a su servidor DNS migrado. Luego, migre todas las demás cargas de trabajo con direcciones IP internas efímeras.",
      "Cree una VPC con rangos CIDR que no se superpongan con los de su red local. Al migrar cargas de trabajo individuales, asigne a cada una una nueva dirección IP interna estática.",
      "Cree una VPC con los mismos rangos CIDR que su red local. Al migrar cargas de trabajo individuales, asigne a cada carga de trabajo la misma dirección IP interna estática.",
      "Migre todas las cargas de trabajo a una única subred de VPC. Configure Cloud NAT para la subred y asigne manualmente una dirección IP estática a la puerta de enlace de Cloud NAT."
    ],
    "answer": "Cree una VPC con los mismos rangos CIDR que su red local. Al migrar cargas de trabajo individuales, asigne a cada carga de trabajo la misma dirección IP interna estática."
  },
  {
    "question": "Estás migrando los recursos informáticos locales de tu empresa a Google Cloud. Necesitas implementar trabajos de procesamiento por lotes que se ejecutan todas las noches. Los trabajos requieren una cantidad significativa de CPU y memoria para varias horas, pero tolera interrupciones. Debe asegurarse de que la implementación sea rentable. ¿Qué deberías hacer?",
    "options": [
      "Utilice la serie de máquinas M1 en Compute Engine.",
      "Contenerice los trabajos de procesamiento por lotes e impleméntelos en Compute Engine.",
      "Utilice máquinas virtuales Spot en Compute Engine.",
      "Utilice tipos de máquinas personalizados en Compute Engine."
    ],
    "answer": "Utilice máquinas virtuales Spot en Compute Engine."
  },
  {
    "question": "Su empresa cuenta con una plataforma de redes sociales en rápido crecimiento y una base de usuarios ubicada principalmente en Norteamérica. Debido a la creciente demanda, su base de datos PostgreSQL local, alojada en el centro de datos de su sede central en Estados Unidos, ya no satisface sus necesidades. Necesita encontrar una solución de base de datos en la nube que ofrezca escalabilidad automática, soporte multirregional para futuras expansiones y baja latencia. ¿Qué debería hacer?",
    "options": [
      "Utiliza BigQuery.",
      "Utilice una llave inglesa.",
      "Utilice Cloud SQL para PostgreSQL.",
      "Utiliza Bigtable."
    ],
    "answer": "Utilice una llave inglesa."
  },
  {
    "question": "Estás migrando tu carga de trabajo local a Google Cloud. Tu empresa está implementando su configuración de facturación en la nube y necesita acceso a un desglose detallado de sus costos de Google Cloud. Debes asegurarte de que los conjuntos de datos de facturación en la nube estén disponibles en BigQuery para poder realizar un análisis detallado de los costos. ¿Qué debes hacer?",
    "options": [
      "Habilite la exportación de datos de Cloud Billing a BigQuery cuando cree una cuenta de Cloud Billing.",
      "Habilite la facturación en la nube en el proyecto y vincule una cuenta de facturación en la nube. Luego, vea los datos de facturación. tabla en el conjunto de datos de BigQuery.",
      "Cree una cuenta de facturación en la nube. Habilite la API del servicio de transferencia de datos de BigQuery para exportar datos de precios.",
      "Habilite la API de BigQuery y asegúrese de que esté seleccionado el rol de IAM de usuario de BigQuery. Cambie el conjunto de datos de BigQuery para seleccionar una ubicación de datos."
    ],
    "answer": "Habilite la exportación de datos de Cloud Billing a BigQuery cuando cree una cuenta de Cloud Billing."
  },
  {
    "question": "El departamento de contabilidad de su empresa necesita ejecutar una carga de trabajo por lotes durante la noche todos los días. Debe implementar una solución que minimice el costo de ejecutar esta carga de trabajo y reintente automáticamente el proceso. Si falla una ejecución, se produce un error en el lote. ¿Qué debe hacer? Discusión sobre el tema 1 de la pregunta 311 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Desarrollar una aplicación que ejecute la carga de trabajo por lotes y desplegar la aplicación como una aplicación de Google. CronJob del motor Kubernetes (GKE).",
      "Desarrolle una aplicación web que escuche las solicitudes entrantes e implemente la aplicación como un servicio de Cloud Run. Utilice Cloud Scheduler para llamar al punto final HTTP.",
      "Desarrolle una aplicación que ejecute la carga de trabajo por lotes e implemente la aplicación como un trabajo de Cloud Run. Utilice Cloud Scheduler para activar el trabajo.",
      "Desarrolle una aplicación web que escuche las solicitudes entrantes y despliegue la aplicación como un despliegue de Google Kubernetes Engine (GKE). Utilice Cloud Scheduler para llamar al punto final HTTP."
    ],
    "answer": "Desarrolle una aplicación que ejecute la carga de trabajo por lotes e implemente la aplicación como un trabajo de Cloud Run. Utilice Cloud Scheduler para activar el trabajo."
  },
  {
    "question": "Necesitas migrar varias bases de datos PostgreSQL desde tu centro de datos local a Google Cloud. Quieres mejorar significativamente el rendimiento de tus bases de datos minimizando los cambios en el esquema de datos y el código de la aplicación. Prevés superar los 150 TB de datos por región geográfica. Quieres seguir las prácticas recomendadas por Google y minimizar los costos operativos. ¿Qué deberías hacer?",
    "options": [
      "Migre sus datos a AlloyDB.",
      "Migre sus datos a Spanner.",
      "Migra tus datos a Firebase.",
      "Migre sus datos a Bigtable."
    ],
    "answer": "Migre sus datos a AlloyDB."
  },
  {
    "question": "El equipo de aprendizaje automático de su empresa necesita una plataforma escalable y flexible para optimizar modelos de lenguaje complejos que utilizan un gran volumen de datos propios en Google Cloud. Su tarea consiste en desarrollar una solución para este equipo. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 313 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice Dataflow como plataforma para ejecutar las tareas de ajuste fino.",
      "Utilice un grupo de instancias administradas de Compute Engine como plataforma para implementar Jupyter Notebooks y ejecutar trabajos de ajuste fino.",
      "Utilice Cloud Run y la GPU como plataforma para ejecutar las tareas de ajuste fino.",
      "Utilice Google Kubernetes Engine (GKE) y aceleradores de hardware como plataforma para ejecutar las tareas de ajuste fino."
    ],
    "answer": "Utilice Google Kubernetes Engine (GKE) y aceleradores de hardware como plataforma para ejecutar las tareas de ajuste fino."
  },
  {
    "question": "Recientemente, has detectado un problema con la actualización progresiva en Google Kubernetes Engine (GKE). Ahora necesitas revertir una actualización progresiva. ¿Qué debes hacer?",
    "options": [
      "Eliminar la implementación.",
      "Utilice el comando kubectl rollout restart para revertir el despliegue.",
      "Utilice el comando kubectl rollout undo.",
      "Reduzca manualmente el tamaño de los nuevos Pods y aumente el tamaño de los Pods antiguos."
    ],
    "answer": "Utilice el comando kubectl rollout undo."
  },
  {
    "question": "Estás implementando una aplicación en Google Kubernetes Engine (GKE) que necesita llamar a un servicio externo. API de terceros. Necesitas proporcionar al proveedor de la API externa una lista de direcciones IP para que su firewall permita el tráfico desde tu aplicación. Quieres seguir las prácticas recomendadas por Google y evitar cualquier riesgo de interrupción del tráfico a la API debido a cambios en las direcciones IP. ¿Qué debes hacer?",
    "options": [
      "Configure su clúster GKE con un nodo y establezca que dicho nodo tenga una dirección IP externa estática. Asegúrese de que el escalador automático del clúster GKE esté desactivado. Envíe la dirección IP externa del nodo al proveedor. debe añadirse a la lista de permitidos.",
      "Configure su clúster GKE con nodos privados. Configure una instancia Cloud NAT con direcciones IP estáticas. Proporcione estas direcciones IP al proveedor para que las agregue a la lista de permitidos.",
      "Configure su clúster GKE con nodos privados. Configure una instancia Cloud NAT con direcciones IP dinámicas. Proporcione estas direcciones IP al proveedor para que las agregue a la lista de permitidos.",
      "Configure su clúster GKE con nodos públicos. Escriba una función de Cloud Functions que obtenga las direcciones IP públicas de cada nodo del clúster y active la función para que se ejecute diariamente con Cloud Scheduler. Envíe la lista al proveedor por correo electrónico todos los días."
    ],
    "answer": "Configure su clúster GKE con nodos privados. Configure una instancia Cloud NAT con direcciones IP estáticas. Proporcione estas direcciones IP al proveedor para que las agregue a la lista de permitidos."
  },
  {
    "question": "Estás planeando migrar el sitio web de tu empresa y un trabajo en segundo plano asíncrono específico a Google Cloud. Tu sitio web contiene solo contenido HTML estático. El trabajo en segundo plano se inicia a través de un punto final HTTP y genera facturas mensuales para tus clientes. Tu sitio web debe estar disponible en varias ubicaciones geográficas y requiere escalado automático. Quieres no tener costos. Cuando sus cargas de trabajo no estén en uso y siga las prácticas recomendadas, ¿qué debería hacer? Discusión sobre el tema 1 de la pregunta 316 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Traslade su sitio web a Google Kubernetes Engine (GKE) y traslade su trabajo en segundo plano a Funciones en la nube.",
      "Traslada tanto tu sitio web como el proceso en segundo plano a Compute Engine.",
      "Traslada tanto tu sitio web como el proceso en segundo plano a Cloud Run.",
      "Traslada tu sitio web a Google Kubernetes Engine (GKE) y traslada tu trabajo en segundo plano a Compute Engine."
    ],
    "answer": "Traslada tanto tu sitio web como el proceso en segundo plano a Cloud Run."
  },
  {
    "question": "Su empresa desea brindar a los ingenieros acceso para explorar Google Cloud libremente en un entorno de pruebas. El presupuesto total para pruebas en toda la organización es de $1000. Debe asegurarse de que los ingenieros reciban una notificación cuando el presupuesto esté por agotarse. Desea automatizar su solución al máximo. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 317 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Cree una cuenta de facturación en la nube independiente para todos los proyectos de prueba. Vincule una tarjeta de crédito con un límite de $1,000 a esta cuenta de facturación. Asegúrese de que todos los proyectos de prueba estén vinculados a esta nueva cuenta de facturación en la nube. cuenta.",
      "Crea una carpeta de Google Cloud y asegúrate de que todos los proyectos de sandbox se encuentren dentro de esa carpeta. Crea una alerta de presupuesto de 1000 $ y aplícala a la carpeta. Configura una alerta por correo electrónico para los administradores de facturación y los usuarios cuando se alcance el 90 % del presupuesto.",
      "Crea una plantilla de correo electrónico que recuerde a los usuarios revisar periódicamente sus gastos en Google Cloud. Crea una función de Cloud Functions que envíe el correo electrónico a todos los responsables del proyecto. Crea una tarea diaria en Cloud Scheduler que active la función de Cloud Functions. Implementa esta solución en cada entorno de pruebas (sandbox).",
      "Configure la exportación de datos de facturación a un conjunto de datos de BigQuery en la cuenta de facturación en la nube. Cree un panel de control para todos los costos relacionados con los experimentos de sandbox. Comparta el panel de control con todos los ingenieros."
    ],
    "answer": "Crea una carpeta de Google Cloud y asegúrate de que todos los proyectos de sandbox se encuentren dentro de esa carpeta. Crea una alerta de presupuesto de 1000 $ y aplícala a la carpeta. Configura una alerta por correo electrónico para los administradores de facturación y los usuarios cuando se alcance el 90 % del presupuesto."
  },
  {
    "question": "Está planeando migrar sus máquinas virtuales locales a Google Cloud. Necesita configurar una zona de aterrizaje en Google Cloud antes de migrar las máquinas virtuales. Debe asegurarse de que todas las máquinas virtuales de su entorno de producción puedan comunicarse entre sí mediante direcciones IP privadas. Debe permitir que todas las máquinas virtuales de su organización de Google Cloud acepten conexiones en puertos TCP específicos. Desea seguir las prácticas recomendadas por Google y minimizar sus costos operativos. ¿Qué debería hacer?",
    "options": [
      "Cree VPC individuales para cada proyecto de Google Cloud. Interconecte todas las VPC. Aplique las políticas de la organización a nivel de organización.",
      "Cree VPC individuales para cada proyecto de Google Cloud. Interconecte todas las VPC. Aplique políticas de firewall jerárquicas a nivel de organización.",
      "Cree un proyecto VPC anfitrión con cada proyecto de producción como su proyecto de servicio. Aplique la organización políticas a nivel organizacional.",
      "Cree un proyecto VPC anfitrión con cada proyecto de producción como su proyecto de servicio. Aplique políticas de firewall jerárquicas a nivel de organización."
    ],
    "answer": "Cree un proyecto VPC anfitrión con cada proyecto de producción como su proyecto de servicio. Aplique políticas de firewall jerárquicas a nivel de organización."
  },
  {
    "question": "Ayudas a diferentes equipos de ingeniería a implementar su infraestructura en Google Cloud. Tu empresa ha definido ciertas prácticas necesarias para todas las cargas de trabajo. Debes proporcionarles una solución que les permita implementar su infraestructura de forma independiente, sin tener que conocer todos los detalles de implementación de las prácticas requeridas por la empresa. ¿Qué debes hacer?",
    "options": [
      "Configure las políticas de la organización para hacer cumplir las prácticas requeridas por su empresa. Pida a los equipos que Aprovisionan su infraestructura mediante la consola de Google Cloud.",
      "Cree una cuenta de servicio por equipo y asígnele el rol de Editor de proyecto. Pida a los equipos que aprovisionen su infraestructura a través de la CLI de Google Cloud (gcloud CL), suplantando la identidad de su cuenta de servicio dedicada.",
      "Escriba módulos de Terraform para cada componente que cumplan con las prácticas requeridas por la empresa y pida a los equipos que implementen su infraestructura a través de estos módulos.",
      "Proporcione capacitación a todos los equipos de ingeniería con los que trabaje para que comprendan las prácticas requeridas por la empresa. Permita que los equipos de ingeniería configuren la infraestructura para satisfacer mejor sus necesidades."
    ],
    "answer": "Escriba módulos de Terraform para cada componente que cumplan con las prácticas requeridas por la empresa y pida a los equipos que implementen su infraestructura a través de estos módulos."
  },
  {
    "question": "Usted administra una aplicación implementada en Cloud Run. El equipo de desarrollo ha lanzado una nueva versión. Desea implementarla y redirigir el tráfico a esta nueva versión. Para garantizar que el tráfico se gestione sin tiempo de inicio, debe asegurarse de que haya dos instancias inactivas disponibles para el tráfico entrante antes de ajustar el flujo de tráfico. Además, desea minimizar la carga administrativa. ¿Qué debería hacer?",
    "options": [
      "Asegúrese de que la casilla de verificación \"Servir esta revisión inmediatamente\" esté desmarcada al implementar la nueva revisión. Antes de modificar las reglas de tráfico, utilice una herramienta de simulación de tráfico para enviar carga a la nueva revisión.",
      "Configure el escalado automático del servicio y establezca el número mínimo de instancias en 2.",
      "Configure el escalado automático de revisiones para la nueva revisión y establezca el número mínimo de instancias en 2.",
      "Configure el escalado automático de revisiones para la revisión existente y establezca el número mínimo de instancias en 2."
    ],
    "answer": "Configure el escalado automático de revisiones para la nueva revisión y establezca el número mínimo de instancias en 2."
  },
  {
    "question": "Usted administra una aplicación con estado implementada en Google Kubernetes Engine (GKE) que solo puede tener una réplica. Recientemente descubrió que la aplicación se vuelve inestable en los momentos de mayor actividad. Has detectado que la aplicación necesita más CPU de la que se ha configurado en el manifiesto durante las horas pico. Quieres que Kubernetes asigne a la aplicación suficientes recursos de CPU durante estas horas pico, garantizando al mismo tiempo la eficiencia de costes durante los periodos de menor actividad. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 321 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Habilitar el aprovisionamiento automático de nodos en el clúster GKE.",
      "Configure un escalador automático de pods vertical en el despliegue.",
      "Configure un escalador automático de pods horizontal en el despliegue.",
      "Habilitar el escalado automático del clúster en el clúster GKE."
    ],
    "answer": "Configure un escalador automático de pods vertical en el despliegue."
  },
  {
    "question": "Su empresa ejecuta diversas aplicaciones y cargas de trabajo en Google Cloud, y usted es responsable de la gestión de los costos de la nube. Necesita encontrar una solución que le permita realizar un análisis detallado de los costos. Además, debe poder visualizar los datos de costos de múltiples maneras en el mismo panel de control. ¿Qué debería hacer?",
    "options": [
      "Utilice el informe de desglose de costos con los filtros disponibles de Cloud Billing para visualizar los datos.",
      "Habilite la exportación de facturación en la nube a BigQuery y utilice Looker Studio para visualizar los datos.",
      "Ejecuta consultas en Cloud Monitoring. Crea paneles para visualizar las métricas de facturación.",
      "Habilite la exportación de métricas de Cloud Monitoring a BigQuery y utilice Looker para visualizar los datos."
    ],
    "answer": "Habilite la exportación de facturación en la nube a BigQuery y utilice Looker Studio para visualizar los datos."
  },
  {
    "question": "Su empresa de medios digitales almacena una gran cantidad de archivos de video en sus instalaciones. Cada archivo de video tiene un tamaño que oscila entre 100 MB y 100 GB. Actualmente, almacena 150 TB de datos de video en su red local, sin espacio para expansión. Necesita migrar todos los archivos de video a los que se accede con poca frecuencia de los archivos con más de un año de antigüedad se almacenan en la nube para garantizar que el almacenamiento local siga disponible para los archivos nuevos. También es necesario minimizar los costos y controlar el uso del ancho de banda. ¿Qué se debe hacer? Discusión sobre el tema 1 de la pregunta 323 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice el Servicio de transferencia de almacenamiento para mover los datos desde los sistemas de almacenamiento de archivos locales seleccionados a un depósito de Cloud Storage.",
      "Utilice Transfer Appliance para solicitar un dispositivo. Cargue los datos localmente y envíe el dispositivo de vuelta a Google para su ingesta en Cloud Storage.",
      "Configure una conexión de Cloud Interconnect entre la red local y Google Cloud. Establezca un punto final privado para acceder a Filestore. Transfiera los datos del sistema de archivos de red (NFS) existente a Filestore.",
      "Cree un bucket de Cloud Storage. Establezca un rol de Identity and Access Management (IAM) con permisos de escritura para el bucket. Utilice la herramienta gsutil para copiar archivos directamente a través de la red a Cloud Storage."
    ],
    "answer": "Utilice el Servicio de transferencia de almacenamiento para mover los datos desde los sistemas de almacenamiento de archivos locales seleccionados a un depósito de Cloud Storage."
  },
  {
    "question": "Estás implementando un estándar corporativo para controlar el acceso SSH a tus proyectos de Google Cloud. Quieres simplificar la gestión del acceso SSH a tus instancias de Compute Engine, manteniendo el cumplimiento de las auditorías y eliminando la mayor cantidad posible de pasos manuales. ¿Qué deberías hacer?",
    "options": [
      "Configure una cuenta de servicio para agregar claves SSH para todas las máquinas virtuales.",
      "Configure las claves SSH de metadatos para gestionar el acceso sudo a las instancias.",
      "Habilite el inicio de sesión del sistema operativo mediante una política de organización para cada proyecto de Google Cloud.",
      "Habilitar el inicio de sesión del sistema operativo con autenticación de dos factores para el dominio."
    ],
    "answer": "Habilite el inicio de sesión del sistema operativo mediante una política de organización para cada proyecto de Google Cloud."
  },
  {
    "question": "Estás desarrollando una aplicación de Internet de las Cosas (IoT) que captura datos de sensores de múltiples dispositivos ya configurados. Necesitas identificar el producto de almacenamiento de datos global que tu empresa debería usar para guardar estos datos. Debes asegurarte de que la solución de almacenamiento que elijas cumpla con tus requisitos de latencia inferior a un milisegundo. ¿Qué debes hacer? discusión) Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Almacene los datos de IoT en Spanner. Utilice cachés para acelerar el proceso y evitar latencias.",
      "Almacene los datos de IoT en Bigtable.",
      "Capturar datos de IoT en conjuntos de datos de BigQuery.",
      "Almacenar los datos de IoT en almacenamiento en la nube. Implementar el almacenamiento en caché mediante una CDN en la nube."
    ],
    "answer": "Almacene los datos de IoT en Bigtable."
  },
  {
    "question": "Tu empresa utiliza Pub/Sub para cargas de trabajo basadas en eventos. Tienes una suscripción llamada email­updates asociada al tema new­orders. Necesitas recuperar y confirmar los mensajes en espera de esta suscripción. ¿Qué debes hacer? Discusión sobre el tema 1 de la pregunta 326 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Utilice el comando gcloud pubsub subscriptions seek email­updates.",
      "Utilice el comando gcloud pubsub topics describe new­orders.",
      "Utilice el comando gcloud pubsub subscriptions pull email­updates ­­auto­ack.",
      "Utilice el comando gcloud pubsub topics list­subscriptions new­orders ­­filter=\"email­updates\"."
    ],
    "answer": "Utilice el comando gcloud pubsub subscriptions pull email­updates ­­auto­ack."
  },
  {
    "question": "Necesitas crear y administrar cuentas de servicio para tus cargas de trabajo que se ejecutan en Google Cloud. Quieres seguir las prácticas recomendadas por Google. ¿Qué deberías hacer? (Elige dos opciones).",
    "options": [
      "Cree la menor cantidad posible de cuentas de servicio.",
      "Elimine inmediatamente cualquier cuenta de servicio que no utilice.",
      "Crear cuentas de servicio con un único propósito.",
      "Gestionar las cuentas de servicio como recursos.",
      "Utilice nombres aleatorios para las cuentas de servicio."
    ],
    "answer": "Crear cuentas de servicio con un único propósito. | Gestionar las cuentas de servicio como recursos."
  },
  {
    "question": "Su empresa desea migrar sus datos de una base de datos relacional local a Google Cloud. Su base de datos actual ya no puede escalar al ritmo del crecimiento de sus usuarios, y usted prevé que el número de usuarios crecerá rápidamente. Necesita elegir una base de datos relacional que le permita escalar globalmente minimizando sus esfuerzos de gestión y administración. También desea para seguir las prácticas recomendadas por Google. ¿Qué debes hacer?",
    "options": [
      "Utilice Cloud SQL.",
      "Utilice una llave inglesa.",
      "Usa Firestore.",
      "Utilizar BigQuery."
    ],
    "answer": "Utilice una llave inglesa."
  },
  {
    "question": "Eres el administrador de sistemas de Google Cloud de tu organización. El usuario A informa que recibió un error al intentar acceder a la base de datos Cloud SQL en su proyecto de Google Cloud, mientras que el usuario B puede acceder a ella sin problemas. Debes solucionar el problema del usuario A siguiendo las prácticas recomendadas por Google. ¿Qué debes hacer primero?",
    "options": [
      "Confirme que las reglas del firewall de red no estén bloqueando el tráfico para el Usuario A.",
      "Verifique que el Usuario A tenga asignado el rol de Propietario del proyecto de Gestión de identidades y accesos (IAM).",
      "Revise los cambios de configuración recientes que puedan haber causado modificaciones no deseadas en los permisos.",
      "Revise el mensaje de error que recibió el Usuario A."
    ],
    "answer": "Revise el mensaje de error que recibió el Usuario A."
  },
  {
    "question": "Usted administra una red VPC en Google Cloud con una subred que se está acercando rápidamente a su capacidad de direcciones IP privadas. Usted espera que el número de instancias de máquinas virtuales de Compute Engine en la misma región sea Duplicar en una semana. Necesitas implementar una solución recomendada por Google que minimice los costos operativos y no requiera tiempo de inactividad. ¿Qué debes hacer?",
    "options": [
      "Cree una segunda VPC con el mismo rango de IP de subred y conecte esta VPC a la VPC existente mediante el emparejamiento de redes VPC.",
      "Elimine la subred existente y cree una nueva subred con el doble del rango de IP disponible.",
      "Permita que el tráfico adicional del rango esperado de direcciones IP privadas llegue a sus máquinas virtuales configurando reglas de firewall.",
      "Utilice la herramienta CLI de Google Cloud para ampliar el rango de IP principal de su subred."
    ],
    "answer": "Utilice la herramienta CLI de Google Cloud para ampliar el rango de IP principal de su subred."
  },
  {
    "question": "Has desarrollado una aplicación web que gestiona el tráfico para un evento local y esperas un tráfico impredecible. Has empaquetado la aplicación en un contenedor y ahora quieres desplegarla. Aplicación en Google Cloud. También quieres minimizar los costes. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 331 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Implemente la aplicación web como un trabajo de Cloud Run.",
      "Implemente la aplicación web en Google Kubernetes Engine en modo estándar.",
      "Implemente la aplicación web como un servicio de Cloud Run.",
      "Implemente la aplicación web en Google Kubernetes Engine en modo Autopilot."
    ],
    "answer": "Implemente la aplicación web como un servicio de Cloud Run."
  },
  {
    "question": "Tu sitio web está alojado en Compute Engine. El número de usuarios globales que lo visitan crece rápidamente. Necesitas minimizar la latencia y dar soporte al crecimiento de usuarios en diversas regiones geográficas. Además, quieres seguir las prácticas recomendadas por Google y minimizar los costes operativos. ¿Cuáles dos acciones deberías realizar? (Elige dos).",
    "options": [
      "Utilice un balanceador de carga de aplicaciones externo en modo regional.",
      "Implemente sus máquinas virtuales en varias regiones de Google Cloud cercanas a la ubicación geográfica de sus usuarios.",
      "Utilice un balanceador de carga de red.",
      "Utilice un balanceador de carga de aplicaciones externo en modo global.",
      "Implemente todas sus máquinas virtuales en una única región de Google Cloud con el rango CIDR más amplio disponible."
    ],
    "answer": "Implemente sus máquinas virtuales en varias regiones de Google Cloud cercanas a la ubicación geográfica de sus usuarios. | Utilice un balanceador de carga de aplicaciones externo en modo global."
  },
  {
    "question": "Estás escribiendo un script de shell que incluye algunos comandos de la CLI de gcloud para acceder a recursos de Google Cloud. Quieres probar el script en tu entorno de desarrollo local con una cuenta de servicio de la forma más segura posible. ¿Qué deberías hacer? Discusión sobre el tema 1 de la pregunta 333 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Genere un token de identificación para la cuenta de servicio. Utilice el token con los comandos de la CLI de gcloud.",
      "Habilite la suplantación de identidad de la cuenta de servicio y utilice el comando gcloud config set para usarla de forma predeterminada.",
      "Descargue el archivo de clave de la cuenta de servicio y guárdelo en una ubicación segura. Establezca la variable de entorno GOOGLE_APPLICATION_CREDENTIALS con el archivo de clave.",
      "Descargue el archivo de clave de la cuenta de servicio y úselo para generar un token de acceso. Use el token con los comandos de la CLI de gcloud."
    ],
    "answer": "Habilite la suplantación de identidad de la cuenta de servicio y utilice el comando gcloud config set para usarla de forma predeterminada."
  },
  {
    "question": "Su empresa opera en el Espacio Económico Europeo (EEE) y adoptará Google Cloud para sus cargas de trabajo. Actualmente, los proyectos están organizados en distintas carpetas. Debe asegurarse de que todos los recursos que se implementen utilicen ubicaciones de Google Cloud dentro del EEE mediante la restricción de ubicaciones de recursos del Servicio de Políticas de la Organización. ¿Qué debe hacer?",
    "options": [
      "Configure la política a nivel de carpeta y agregue todas las ubicaciones permitidas a la política.",
      "Configure la política a nivel de organización y agregue todas las ubicaciones permitidas a la política.",
      "Configure la política a nivel de carpeta y agregue todas las ubicaciones no permitidas a la política.",
      "Configure la política a nivel de organización y agregue todas las ubicaciones no permitidas a la política."
    ],
    "answer": "Configure la política a nivel de organización y agregue todas las ubicaciones permitidas a la política."
  },
  {
    "question": "Está implementando una aplicación grande de múltiples niveles con más de 1000 direcciones IP en un proyecto de Google Cloud que necesita estar aislada de forma segura. La aplicación incluye: 1. nivel web con servidores frontend para tráfico público, 2. nivel de aplicación con servidores que ejecutan la lógica central de la aplicación que solo necesitan acceso desde el nivel web, y 3. nivel de base de datos con servidores de base de datos que solo necesitan acceso desde el nivel de aplicación. Desea minimizar el costo, la complejidad y la sobrecarga administrativa en la Arquitectura de red. ¿Qué deberías hacer?",
    "options": [
      "Cree una VPC compartida /24 con subredes separadas para cada nivel. Utilice reglas de firewall que hagan referencia a etiquetas de red para controlar el tráfico.",
      "Cree una VPC personalizada /16 con tres subredes. Coloque cada nivel en su propia subred y utilice reglas de firewall que hagan referencia a subredes IP para controlar el tráfico.",
      "Implemente cada nivel en un VP de modo personalizado separado /16 Use VPC Network Peering para conectar de forma segura cada VP de modo personalizado Administre las reglas del firewall individualmente en cada VPC.",
      "Implemente cada nivel en una VPC /24 utilizando etiquetas de red para identificar las instancias. Implemente reglas de firewall para una segmentación de red granular."
    ],
    "answer": "Cree una VPC personalizada /16 con tres subredes. Coloque cada nivel en su propia subred y utilice reglas de firewall que hagan referencia a subredes IP para controlar el tráfico."
  },
  {
    "question": "Tu empresa está supervisando de cerca sus gastos en la nube. Debes permitir que diferentes equipos supervisen sus costos de Google Cloud. Debes asegurarte de que los miembros del equipo reciban notificaciones cuando sus gastos en la nube alcancen ciertos umbrales y darles la capacidad de crear paneles de control de para obtener información adicional con datos de facturación detallados. Desea seguir las prácticas recomendadas por Google y minimizar los costos de ingeniería. ¿Qué debería hacer? Discusión sobre el tema 1 de la pregunta 336 del examen de Ingeniero Asociado en la Nube Pregunta real del examen de Ingeniero asociado de la nube de Google",
    "options": [
      "Implementar Grafana en Compute Engine. Crear un panel para cada equipo que utilice los datos de La API de facturación en la nube. Pida a cada equipo que cree sus propias alertas en Cloud Monitoring.",
      "Configura alertas para cada equipo según los umbrales requeridos. Crea un script de shell para leer datos de la API de facturación en la nube y enviar los resultados a BigQuery. Otorga acceso a BigQuery a los miembros del equipo.",
      "Implementa Grafana en Compute Engine. Crea un panel para cada equipo que utilice los datos de la API de presupuesto de facturación en la nube. Solicita a cada equipo que cree sus propias alertas en Grafana.",
      "Configurar alertas para cada equipo según los umbrales requeridos. Configurar la exportación de datos de facturación a BigQuery. Otorgar acceso a BigQuery a los miembros del equipo."
    ],
    "answer": "Configurar alertas para cada equipo según los umbrales requeridos. Configurar la exportación de datos de facturación a BigQuery. Otorgar acceso a BigQuery a los miembros del equipo."
  },
  {
    "question": "Su empresa planea migrar su base de datos PostgreSQL local a Google Cloud. Las cargas de trabajo son exigentes y requieren un rendimiento transaccional y analítico rápido. Necesita seleccionar un servicio de base de datos totalmente administrado en Google Cloud. Su solución también debe ser capaz de replicar y optimizar la capa de almacenamiento de forma síncrona. ¿Qué debería hacer?",
    "options": [
      "Migre la base de datos a Cloud SQL para PostgreSQL utilizando el Servicio de migración de bases de datos.",
      "Utilice el cliente psql instalado en una instancia de Compute Engine. Conéctese a la instancia de Cloud SQL para realizar la migración de la base de datos.",
      "Migre la base de datos a AlloyDB para PostgreSQL utilizando el Servicio de Migración de Bases de Datos.",
      "Cree una instancia de Compute Engine. Instale y configure PostgreSQL en la instancia y migre la base de datos."
    ],
    "answer": "Migre la base de datos a AlloyDB para PostgreSQL utilizando el Servicio de Migración de Bases de Datos."
  }
]
let questions2 = [
  {
    "question": "You are developing an application that will be deployed on Google Cloud. The application will use a service account to retrieve data from BigQuery. Before you deploy your application, you want to test the permissions of this service account from your local machine to ensure there will be no authentication issues. You want to ensure that you use the most secure method while following Google-recommended practices. What should you do?",
    "options": [
      "Generate a service account key, and configure the gcloud CLI to use this key. Issue a relevant BigQuery request through the gdoud CLI to test the access.",
      "Grant the service account the BigQuery Administrator IAM role to ensure the service account has all required access.",
      "Configure the gcloud CLI to use service account impersonation. Issue a relevant BigQuery request through the gcloud CLI to test the access.",
      "Configure the gcloud CLI with Application Default Credentials using your user account. Issue a relevant BigQuery request through the gcloud CLI to test the access."
    ],
    "answer": "Configure the gcloud CLI to use service account impersonation. Issue a relevant BigQuery request through the gcloud CLI to test the access."
  },
  {
    "question": "Your organization is migrating to Google Cloud. You want only users with company-issued Google accounts to access your Google Cloud environment. You must ensure that users of the same department can only access resources within their own department. You want to minimize operational costs while following Google-recommended practices. What should you do?",
    "options": [
      "Assign users to the relevant Google Groups, and provide access to cloud resources through Identity and Access Management (IAM) roles. Periodically identify and remove non-company issued Google accounts.",
      "Assign users to the relevant Google Groups, and provide access to cloud resources through Identity and Access Management (IAM) roles. Use organization policies to block non-company issued emails.",
      "Create a folder for each department in Resource Manager. Grant the users of each department the Folder Admin role on the folder of their department.",
      "Create a folder for each department in Resource Manager. Grant all company users the Folder Admin role on the organization level."
    ],
    "answer": "Assign users to the relevant Google Groups, and provide access to cloud resources through Identity and Access Management (IAM) roles. Use organization policies to block non-company issued emails."
  },
  {
    "question": "You are deploying an application to Cloud Run. Your application requires the use of an API that runs on Google Kubernetes Engine (GKE). You need to ensure that your Cloud Run service can privately reach the API on GKE, and you want to follow Google-recommended practices. What should you do?",
    "options": [
      "Deploy an ingress resource on the GKE cluster to expose the API to the internet. Use Cloud Armor to filter for IP addresses that can connect to the API. On the Cloud Run service, configure the application to fetch its public IP address and update the Cloud Armor policy on startup to allow this IP address to call the API on ports 80 and 443.",
      "Create an ingress firewall rule on the VPC to allow connections from 0.0.0.0/0 on ports 80 and 443.",
      "Create an egress firewall rule on the VPC to allow connections to 0.0.0.0/ on ports 80 and 443.",
      "Deploy an internal Application Load Balancer to expose the API on GKE to the VPC. Configure Cloud DNS with the IP address of the internal Application Load Balancer. Deploy a Serverless VPC Access connector to allow the Cloud Run service to call the API through the FQDN on Cloud DNS."
    ],
    "answer": "Deploy an internal Application Load Balancer to expose the API on GKE to the VPC. Configure Cloud DNS with the IP address of the internal Application Load Balancer. Deploy a Serverless VPC Access connector to allow the Cloud Run service to call the API through the FQDN on Cloud DNS."
  },
  {
    "question": "Your company uses a multi-cloud strategy that includes Google Cloud. You want to centralize application logs in a third-party software-as-a-service (SaaS) tool from all environments. You need to integrate logs originating from Cloud Logging, and you want to ensure the export occurs with the least amount of delay possible. What should you do?",
    "options": [
      "Create a Cloud Logging sink and configure BigQuery as the destination. Configure the SaaS tool to query BigQuery to retrieve the logs.",
      "Create a Cloud Logging sink and configure Pub/Sub as the destination. Configure the SaaS tool to subscribe to the Pub/Sub topic to retrieve the logs.",
      "Create a Cloud Logging sink and configure Cloud Storage as the destination. Configure the SaaS tool to read the Cloud Storage bucket to retrieve the logs.",
      "Use a Cloud Scheduler cron job to trigger a Cloud Function that queries Cloud Logging and sends the logs to the SaaS tool."
    ],
    "answer": "Create a Cloud Logging sink and configure Pub/Sub as the destination. Configure the SaaS tool to subscribe to the Pub/Sub topic to retrieve the logs."
  },
  {
    "question": "You are planning to migrate a database and a backend application to a Standard Google Kubernetes Engine (GKE) cluster. You need to prevent data loss and make sure there are enough nodes available for your backend application based on the demands of your workloads. You want to follow Google-recommended practices and minimize the amount of manual work required. What should you do?",
    "options": [
      "Run your database as a StatefulSet. Configure cluster autoscaling to handle changes in the demands of your workloads.",
      "Run your database as a single Pod. Run the resize command when you notice changes in the demands of your workloads.",
      "Run your database as a DaemonSet. Run the resize command when you notice changes in the demands of your workloads.",
      "Run your database as a Deployment. Configure cluster autoscaling to handle changes in the demands of your workloads."
    ],
    "answer": "Run your database as a StatefulSet. Configure cluster autoscaling to handle changes in the demands of your workloads."
  },
  {
    "question": "You are the Organization Administrator for your company's Google Cloud resources. Your company has strict compliance rules that require you to be notified about any modifications to files and documents hosted on Cloud Storage. In a recent incident, one of your team members was able to modify files and you did not receive any notifications, causing other production jobs to fail. You must ensure that you receive notifications for all changes to files and documents in Cloud Storage while minimizing management overhead. What should you do?",
    "options": [
      "View Cloud Audit logs for all Cloud Storage files in Logs Explorer. Filter by Admin Activity logs.",
      "Enable Cloud Storage object versioning on your bucket. Configure Pub/Sub notifications for your Cloud Storage buckets.",
      "Enable versioning on the Cloud Storage bucket. Set up a custom script that scans versions of Cloud Storage objects being modified and alert the admin by using the script.",
      "Configure Object change notifications on the Cloud Storage buckets. Send the events to Pub/Sub."
    ],
    "answer": "Enable Cloud Storage object versioning on your bucket. Configure Pub/Sub notifications for your Cloud Storage buckets."
  },
  {
    "question": "Your company would like to store invoices and other financial documents in Google Cloud. You need to identify a Google-managed solution to store this information for your company. You must ensure that the documents are kept for a duration of three years. Your company’s analysts need frequent access to invoices from the past six months. After six months, invoices should be archived for audit purposes only. You want to minimize costs and follow Google-recommended practices. What should you do?",
    "options": [
      "Use Cloud Storage with Object Lifecycle Management to change the object storage class to Coldline after six months.",
      "Use Cloud Storage with Object Lifecycle Management to change the object storage class to Standard after six months.",
      "Store your documents on Filestore, and move the documents to Cloud Storage with object storage class set to Coldline after six months.",
      "Store your documents on Filestore, and move the documents to Cloud Storage with object storage class set to Standard after six months."
    ],
    "answer": "Use Cloud Storage with Object Lifecycle Management to change the object storage class to Coldline after six months."
  },
  {
    "question": "You are planning to migrate your containerized workloads to Google Kubernetes Engine (GKE). You need to determine which GKE option to use. Your solution must have high availability, minimal downtime, and the ability to promptly apply security updates to your nodes. You also want to pay only for the compute resources that your workloads use without managing nodes. You want to follow Google-recommended practices and minimize operational costs. What should you do?",
    "options": [
      "Configure a Standard regional GKE duster.",
      "Configure a Standard zonal GKE duster.",
      "Configure a Standard multi-zonal GKE cluster.",
      "Configure an Autopilot GKE cluster."
    ],
    "answer": "Configure an Autopilot GKE cluster."
  },
  {
    "question": "Your company stores data from multiple sources that have different data storage requirements. These data include:1. Customer data that is structured and read with complex queries2. Historical log data that is large in volume and accessed infrequently3. Real-time sensor data with high-velocity writes, which needs to be available for analysis but can tolerate some data lossYou need to design the most cost-effective storage solution that fulfills all data storage requirements. What should you do?",
    "options": [
      "Use Firestore for customer data, Cloud Storage (Nearline) for historical logs, and Bigtable for sensor data.",
      "Use Cloud SQL for customer data. Cloud Storage (Coldline) for historical logs, and BigQuery for sensor data.",
      "Use Cloud SQL for customer data. Cloud Storage (Archive) for historical logs, and Bigtable for sensor data.",
      "Use Spanner for all data."
    ],
    "answer": "Use Cloud SQL for customer data. Cloud Storage (Archive) for historical logs, and Bigtable for sensor data."
  },
  {
    "question": "You work for a financial services company that operates as a stock market broker. Your company is planning to migrate to Google Cloud. You need to plan the network design in Google Cloud. Your design must:• Minimize the latency between all production systems.• Minimize costs related to your development environment.What should you do?",
    "options": [
      "Create a VPC in the Standard Tier and one in the Premium Tier. Deploy production workloads in the Standard Tier and development workloads in the Premium Tier.",
      "Create a VPC in the Standard Tier and one in the Premium Tier. Deploy development workloads in the Standard Tier and production workloads in the Premium Tier.",
      "Create a VPC in the Premium Tier, and deploy both production and development workloads on this VPC.",
      "Create a VPC in the Standard Tier, and deploy both production and development workloads on this VPC."
    ],
    "answer": "Create a VPC in the Standard Tier and one in the Premium Tier. Deploy development workloads in the Standard Tier and production workloads in the Premium Tier."
  },
  {
    "question": "You are managing a fleet of Compute Engine Linux instances in a Google Cloud project. Your company's engineering team requires SSH access to all instances to perform routine maintenance tasks. You need to manage the SSH access for the engineering team, and you want to minimize operational overhead when engineers join or leave the team. What should you do?",
    "options": [
      "Create a single SSH key pair to be shared by all engineering team members. Add the public SSH key to project metadata.",
      "Create an SSH key pair for each engineer on the team, and add the public SSH key to the metadata of the relevant instances.",
      "Create a Google Group for all engineering team members, and grant them the Compute Viewer IAM role. Manage group membership when engineers join or leave the team.",
      "Create a Google Group for all engineering team members, and set up OS Login for this group on the project. Manage group membership when engineers join or leave the team."
    ],
    "answer": "Create a Google Group for all engineering team members, and set up OS Login for this group on the project. Manage group membership when engineers join or leave the team."
  },
  {
    "question": "Your company was recently impacted by a service disruption that caused multiple Dataflow jobs to get stuck, resulting in significant downtime in downstream applications and revenue loss. You were able to resolve the issue by identifying and fixing an error you found in the code. You need to design a solution with minimal management effort to identify when jobs are stuck in the future to ensure that this issue does not occur again. What should you do?",
    "options": [
      "Update the Dataflow job configurations to send messages to a Pub/Sub topic when there are delays. Configure a backup Dataflow job to process jobs that are delayed. Use Cloud Tasks to trigger an alert when messages are pushed to the Pub/Sub topic.",
      "Set up Cloud Monitoring alerts on the data freshness metric for the Dataflow jobs to receive a notification when a certain threshold is reached.",
      "Set up Error Reporting to identify stack traces that indicate slowdowns in Dataflow jobs. Set up alerts based on these log entries.",
      "Use the Personalized Service Health dashboard to identify issues with Dataflow jobs across regions."
    ],
    "answer": "Set up Cloud Monitoring alerts on the data freshness metric for the Dataflow jobs to receive a notification when a certain threshold is reached."
  },
  {
    "question": "Your company is modernizing its applications and refactoring them to containerized microservices. You need to deploy the infrastructure on Google Cloud so that teams can deploy their applications. The applications cannot be exposed publicly. You want to minimize management and operational overhead. What should you do?",
    "options": [
      "Provision a Google Kubernetes Engine (GKE) Autopilot cluster.",
      "Provision a fleet of Compute Engine instances and install Kubernetes.",
      "Provision a Standard regional Google Kubernetes Engine (GKE) cluster.",
      "Provision a Standard zonal Google Kubernetes Engine (GKE) cluster."
    ],
    "answer": "Provision a Google Kubernetes Engine (GKE) Autopilot cluster."
  },
  {
    "question": "You have an application running inside a Compute Engine instance. You want to provide the application with secure access to a BigQuery dataset. You must ensure that credentials are only valid for a short period of time, and your application will only have access to the intended BigQuery dataset. You want to follow Google-recommended practices and minimize your operational costs. What should you do?",
    "options": [
      "Attach a new service account to the instance every hour, and grant the service account the BigQuery Data Viewer IAM role on the project.",
      "Attach a custom service account to the instance, and grant the service account the BigQuery Data Viewer IAM role on the dataset.",
      "Attach a new service account to the instance every hour, and grant the service account the BigQuery Data Viewer IAM role on the dataset.",
      "Attach a custom service account to the instance, and grant the service account the BigQuery Data Viewer IAM role on the project."
    ],
    "answer": "Attach a custom service account to the instance, and grant the service account the BigQuery Data Viewer IAM role on the dataset."
  },
  {
    "question": "You have an application that is currently processing transactions by using a group of managed VM instances. You need to migrate the application so that it is serverless and scalable. You want to implement an asynchronous transaction processing system, while minimizing management overhead. What should you do?",
    "options": [
      "Install Kafka on VM instances to acknowledge incoming transactions. Use Cloud Run to process transactions.",
      "Use Pub/Sub to acknowledge incoming transactions. Use VM instances to process transactions.",
      "Use Pub/Sub to acknowledge incoming transactions. Use Cloud Run to process transactions.",
      "Install Kafka on VM instances to acknowledge incoming transactions. Use VM instances to process transactions."
    ],
    "answer": "Use Pub/Sub to acknowledge incoming transactions. Use Cloud Run to process transactions."
  },
  {
    "question": "Your company has many legacy third-party applications that rely on a shared NFS server for file sharing between these workloads. You want to modernize the NFS server by using a Google Cloud managed service. You need to select the solution that requires the least amount of change to the application. What should you do?",
    "options": [
      "Create a Compute Engine instance and configure an NFS server on the instance. Point all NFS mounts to the Compute Engine instance.",
      "Deploy a Filestore instance. Replace all NFS mounts with a Filestore mount.",
      "Configure Firestore. Configure all applications to use Firestore instead of the NFS server.",
      "Create a Cloud Storage bucket. Configure all applications to use Cloud Storage client libraries instead of the NFS server."
    ],
    "answer": "Deploy a Filestore instance. Replace all NFS mounts with a Filestore mount."
  },
  {
    "question": "Your company is seeking a scalable solution to retain and explore application logs hosted on Compute Engine. You must be able to analyze your logs with SQL queries, and you want to be able to create charts to identify patterns and trends in your logs over time. You want to follow Google-recommended practices and minimize your operational costs. What should you do?",
    "options": [
      "Use a custom script to push your application logs to BigQuery for exploration.",
      "Ingest your application logs to Cloud Logging by using Ops Agent, and explore your logs in Logs Explorer.",
      "Ingest your application logs to Cloud Logging by using Ops Agent, and explore your logs with Log Analytics.",
      "Use a custom script to push your application logs to Cloud SQL for exploration."
    ],
    "answer": "Ingest your application logs to Cloud Logging by using Ops Agent, and explore your logs with Log Analytics."
  },
  {
    "question": "You are deploying an application to Google Kubernetes Engine (GKE). The application needs to make API calls to a private Cloud Storage bucket. You need to configure your application Pods to authenticate to the Cloud Storage API, but your organization policy prevents the usage of service account keys. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "Create the GKE cluster with Workload Identity Federation. Configure the default node service account to access the bucket. Deploy the application into the cluster so the application can use the node service account permissions. Use Identity and Access Management (IAM) to grant the service account access to the bucket.",
      "Create the GKE cluster with Workload Identity Federation. Create a Google service account and a Kubernetes ServiceAccount, and configure both service accounts to use Workload Identity Federation. Attach the Kubernetes ServiceAccount to the application Pods and configure the Google service account to access the bucket with Identity and Access Management (IAM).",
      "Create the GKE cluster and deploy the application. Request a security exception to create a Google service account key. Set the constraints/iam.serviceAccountKeyExpiryHours organization policy to 24 hours.",
      "Create the GKE cluster and deploy the application. Request a security exception to create a Google service account key. Set the constraints/iam.serviceAccountKeyExpiryHours organization policy to 8 hours."
    ],
    "answer": "Create the GKE cluster with Workload Identity Federation. Create a Google service account and a Kubernetes ServiceAccount, and configure both service accounts to use Workload Identity Federation. Attach the Kubernetes ServiceAccount to the application Pods and configure the Google service account to access the bucket with Identity and Access Management (IAM)."
  },
  {
    "question": "Your company's developers use an automation that you recently built to provision Linux VMs in Compute Engine within a Google Cloud project to perform various tasks. You need to manage the Linux account lifecycle and access for these users. You want to follow Google-recommended practices to simplify access management while minimizing operational costs. What should you do?",
    "options": [
      "Enable OS Login for all VMs. Use IAM roles to grant user permissions.",
      "Require your developers to create public SSH keys. Write custom startup scripts to update user permissions.",
      "Require your developers to create public SSH keys. Make the owner of the public key the root user.",
      "Enable OS Login for all VMs. Write custom startup scripts to update user permissions."
    ],
    "answer": "Enable OS Login for all VMs. Use IAM roles to grant user permissions."
  },
  {
    "question": "You are managing the security configuration of your company’s Google Cloud organization. The Operations team needs specific permissions on both a Google Kubernetes Engine (GKE) cluster and a Cloud SQL instance. Two predefined Identity and Access Management (IAM) roles exist that contain a subset of the permissions needed by the team. You need to configure the necessary IAM permissions for this team while following Google-recommended practices. What should you do?",
    "options": [
      "Create a custom IAM role that combines the permissions from the two relevant predefined roles.",
      "Grant the team the two predefined IAM roles.",
      "Create a custom IAM role that includes only the required permissions from the predefined roles.",
      "Grant the team the IAM roles of Kubernetes Engine Admin and Cloud SQL Admin."
    ],
    "answer": "Create a custom IAM role that includes only the required permissions from the predefined roles."
  },
  {
    "question": "Your organization has decided to deploy all its compute workloads to Kubernetes on Google Cloud and two other cloud providers. You want to build an Infrastructure-as-code solution to automate the provisioning process for all cloud resources. What should you do?",
    "options": [
      "Build the solution by using Config Connector, and provision the resources.",
      "Build the solution by using Terraform, and provision the resources.",
      "Build solution by using Python and the cloud SDKs from all providers to provision the resources.",
      "Build the solution by using YAML manifests, and provision the resources."
    ],
    "answer": "Build the solution by using Terraform, and provision the resources."
  },
  {
    "question": "You are planning to deploy an application to Google Cloud. Your application processes asynchronous events from Google services and must be accessible from the public Internet. You need to identify how to deploy your application. You want to follow a standardized process while minimizing development costs. You also want to have no costs when your workloads are not in use. What should you do?",
    "options": [
      "Deploy your code to GKE. Use Pub/Sub for event delivery.",
      "Deploy your code to Compute Engine. Use Pub/Sub for event delivery.",
      "Deploy your code to GKE. Use Eventarc for event delivery.",
      "Deploy your code to Cloud Run. Use Eventarc for event delivery."
    ],
    "answer": "Deploy your code to Cloud Run. Use Eventarc for event delivery."
  },
  {
    "question": "Your company is migrating its workloads to Google Cloud due to an expiring data center contract. The on-premises environment and Google Cloud are not connected. You have decided to follow a lift-and-shift approach, and you plan to modernize the workloads in a future project. Several old applications connect to each other through hard-coded internal IP addresses. You want to migrate these workloads quickly without modifying the application code. You also want to maintain all functionality. What should you do?",
    "options": [
      "Migrate your DNS server first. Configure Cloud DNS with a forwarding zone to your migrated DNS server. Then migrate all other workloads with ephemeral internal IP addresses.",
      "Create a VPC with non-overlapping CIDR ranges compared to your on-premises network. When migrating individual workloads, assign each workload a new static internal IP address.",
      "Create a VPC with the same CIDR ranges as your on-premises network. When migrating individual workloads, assign each workload the same static internal IP address.",
      "Migrate all workloads to a single VPC subnet. Configure Cloud NAT for the subnet and manually assign a static IP address to the Cloud NAT gateway."
    ],
    "answer": "Create a VPC with the same CIDR ranges as your on-premises network. When migrating individual workloads, assign each workload the same static internal IP address."
  },
  {
    "question": "You are migrating your company’s on-premises compute resources to Google Cloud. You need to deploy batch processing jobs that run every night. The jobs require significant CPU and memory for several hours but can tolerate interruptions. You must ensure that the deployment is cost-effective. What should you do?",
    "options": [
      "Use the M1 machine series on Compute Engine.",
      "Containerize the batch processing jobs and deploy them on Compute Engine.",
      "Use Spot VMs on Compute Engine.",
      "Use custom machine types on Compute Engine."
    ],
    "answer": "Use Spot VMs on Compute Engine."
  },
  {
    "question": "Your company has a rapidly growing social media platform and a user base primarily located in North America. Due to increasing demand, your current on-premises PostgreSQL database, hosted in your United States headquarters data center, no longer meets your needs. You need to identify a cloud-based database solution that offers automatic scaling, multi-region support for future expansion, and maintains low latency. What should you do?",
    "options": [
      "Use BigQuery.",
      "Use Spanner.",
      "Use Cloud SQL for PostgreSQL.",
      "Use Bigtable."
    ],
    "answer": "Use Spanner."
  },
  {
    "question": "You are migrating your on-premises workload to Google Cloud. Your company is implementing its Cloud Billing configuration and requires access to a granular breakdown of its Google Cloud costs. You need to ensure that the Cloud Billing datasets are available in BigQuery so you can conduct a detailed analysis of costs. What should you do?",
    "options": [
      "Enable Cloud Billing data export to BigQuery when you create a Cloud Billing account.",
      "Enable Cloud Billing on the project, and link a Cloud Billing account. Then view the billing data table in the BigQuery dataset.",
      "Create a Cloud Billing account. Enable the BigQuery Data Transfer Service API to export pricing data.",
      "Enable the BigQuery API, and ensure that the BigQuery User IAM role is selected. Change the BigQuery dataset to select a data location."
    ],
    "answer": "Enable Cloud Billing data export to BigQuery when you create a Cloud Billing account."
  },
  {
    "question": "Your company's accounting department needs to run an overnight batch workload every day. You must implement a solution that minimizes the cost to run this workload and automatically retries the batch if an execution fails. What should you do?",
    "options": [
      "Develop an application that runs the batch workload, and deploy the application as a Google Kubernetes Engine (GKE) CronJob.",
      "Develop a web application that listens for incoming requests, and deploy the application as a Cloud Run service. Use Cloud Scheduler to call the HTTP endpoint.",
      "Develop an application that runs the batch workload, and deploy the application as a Cloud Run job. Use Cloud Scheduler to trigger the job.",
      "Develop a web application that listens for incoming requests, and deploy the application as a Google Kubernetes Engine (GKE) Deployment. Use Cloud Scheduler to call the HTTP endpoint."
    ],
    "answer": "Develop an application that runs the batch workload, and deploy the application as a Cloud Run job. Use Cloud Scheduler to trigger the job."
  },
  {
    "question": "You need to migrate multiple PostgreSQL databases from your on-premises data center to Google Cloud. You want to significantly improve the performance of your databases while minimizing changes to your data schema and application code. You expect to exceed 150 TB of data per geographical region. You want to follow Google-recommended practices and minimize your operational costs. What should you do?",
    "options": [
      "Migrate your data to AlloyDB.",
      "Migrate your data to Spanner.",
      "Migrate your data to Firebase.",
      "Migrate your data to Bigtable."
    ],
    "answer": "Migrate your data to AlloyDB."
  },
  {
    "question": "Your company's machine learning team requires a scalable and flexible platform to fine-tune large language models utilizing a large volume of proprietary data on Google Cloud. You are tasked with building a solution for this team. What should you do?",
    "options": [
      "Use Dataflow as a platform to run the fine-tuning jobs",
      "Use a Compute Engine managed instance group as a platform to deploy Jupyter Notebooks and run fine-tuning jobs.",
      "Use Cloud Run and GPU as a platform to run the fine-tuning jobs.",
      "Use Google Kubernetes Engine (GKE) and hardware accelerators as a platform to run the fine-tuning jobs."
    ],
    "answer": "Use Google Kubernetes Engine (GKE) and hardware accelerators as a platform to run the fine-tuning jobs."
  },
  {
    "question": "You recently discovered an issue with your rolling update in Google Kubernetes Engine (GKE). You now need to roll back a rolling update. What should you do?",
    "options": [
      "Delete the deployment.",
      "Use the kubectl rollout restart command to revert the deployment.",
      "Use the kubectl rollout undo command.",
      "Manually scale down the new Pods and scale up the old Pods."
    ],
    "answer": "Use the kubectl rollout undo command."
  },
  {
    "question": "You are deploying an application to Google Kubernetes Engine (GKE) that needs to call an external third-party API. You need to provide the external API vendor with a list of IP addresses for their firewall to allow traffic from your application. You want to follow Google-recommended practices and avoid any risk of interrupting traffic to the API due to IP address changes. What should you do?",
    "options": [
      "Configure your GKE cluster with one node, and set the node to have a static external IP address. Ensure that the GKE cluster autoscaler is off. Send the external IP address of the node to the vendor to be added to the allowlist.",
      "Configure your GKE cluster with private nodes. Configure a Cloud NAT instance with static IP addresses. Provide these IP addresses to the vendor to be added to the allowlist.",
      "Configure your GKE cluster with private nodes. Configure a Cloud NAT instance with dynamic IP addresses. Provide these IP addresses to the vendor to be added to the allowlist.",
      "Configure your GKE cluster with public nodes. Write a Cloud Function that pulls the public IP addresses of each node in the cluster, Trigger the function to run every day with Cloud Scheduler. Send the list to the vendor by email every day."
    ],
    "answer": "Configure your GKE cluster with private nodes. Configure a Cloud NAT instance with static IP addresses. Provide these IP addresses to the vendor to be added to the allowlist."
  },
  {
    "question": "You are planning to move your company's website and a specific asynchronous background job to Google Cloud. Your website contains only static HTML content. The background job is started through an HTTP endpoint and generates monthly invoices for your customers. Your website needs to be available in multiple geographic locations and requires autoscaling. You want to have no costs when your workloads are not in use and follow recommended practices. What should you do?",
    "options": [
      "Move your website to Google Kubernetes Engine (GKE), and move your background job to Cloud Functions.",
      "Move both your website and background job to Compute Engine.",
      "Move both your website and background job to Cloud Run.",
      "Move your website to Google Kubernetes Engine (GKE), and move your background job to Compute Engine."
    ],
    "answer": "Move both your website and background job to Cloud Run."
  },
  {
    "question": "Your company wants to provide engineers with access to explore Google Cloud freely in a sandbox environment. The total budget for testing across your organization is $1,000. You need to ensure that engineers are notified when the budget is about to be reached. You want to automate your solution as much as possible. What should you do?",
    "options": [
      "Create a separate Cloud Billing account for all sandbox projects. Link a credit card with a limit of $1,000 to this billing account. Ensure all sandbox projects are linked to this new Cloud Billing account.",
      "Create a Google Cloud Folder and ensure that all sandbox projects are located under that Folder. Create a Budget Alert for $1,000 and scope it to the Folder. Configure an email alert to billing administrators and users once the budget is 90% reached.",
      "Create an email template reminding people to regularly check their Google Cloud spend. Create a Cloud Function that sends the email to all the project owners. Create a daily job in Cloud Scheduler that triggers the Cloud Function. Deploy this solution for each sandbox.",
      "Configure a billing data export to a BigQuery dataset on the Cloud Billing account. Create a dashboard for all costs related to the sandbox experiments. Share the dashboard with all engineers."
    ],
    "answer": "Create a Google Cloud Folder and ensure that all sandbox projects are located under that Folder. Create a Budget Alert for $1,000 and scope it to the Folder. Configure an email alert to billing administrators and users once the budget is 90% reached."
  },
  {
    "question": "You are planning to migrate your on-premises VMs to Google Cloud. You need to set up a landing zone in Google Cloud before migrating the VMs. You must ensure that all VM in your production environment can communicate with each other through private IP addresses. You need to allow all VMs in your Google Cloud organization to accept connections on specific TCP ports. You want to follow Google-recommended practices, and you need to minimize your operational costs. What should you do?",
    "options": [
      "Create individual VPCs per Google Cloud project. Peer all he VPC together. Apply organization policies on the organization level.",
      "Create individual VPCs for each Google Cloud project. Peer ail ne VPCs together. Apply hierarchical firewall policies on the organization level.",
      "Create a host VPC project with each production project as its service project. Apply organization policies on the organization level.",
      "Create a host VPC project with each production project as its service project. Apply hierarchical firewall policies on the organization level."
    ],
    "answer": "Create a host VPC project with each production project as its service project. Apply hierarchical firewall policies on the organization level."
  },
  {
    "question": "You assist different engineering teams in deploying their infrastructure on Google Cloud. Your company has defined certain practices required for all workloads. You need to provide the engineering teams with a solution that enables teams to deploy their infrastructure independently without having to know all implementation details of the company’s required practices. What should you do?",
    "options": [
      "Configure organization policies to enforce your company's required practices. Ask the teams to provision their infrastructure by using the Google Cloud console.",
      "Create a service account per team, and grant the service account the Project Editor role. Ask the teams to provision their infrastructure through the Google Cloud CLI (gcloud CL), while impersonating their dedicated service account.",
      "Write Terraform modules for each component that are compliant with the company's required practices, and ask teams to implement their infrastructure through these modules.",
      "Provide training for all engineering teams you work with to understand the company’s required practices. Allow the engineering teams to provision the infrastructure to best meet their needs."
    ],
    "answer": "Write Terraform modules for each component that are compliant with the company's required practices, and ask teams to implement their infrastructure through these modules."
  },
  {
    "question": "You ate managing an application deployed on Cloud Run. The development team has released a new version of the application. You want to deploy and redirect traffic to this new version of the application. To ensure traffic to the new version of the application is served with no startup time, you want to ensure that there are two idle instances available for incoming traffic before adjusting the traffic flow. You also want to minimize administrative overhead. What should you do?",
    "options": [
      "Ensure the checkbox “Serve this revision immediately” is unchecked when deploying the new revision. Before changing the traffic rules, use a traffic simulation tool to send load to the new revision.",
      "Configure service autoscaling and set the minimum number of instances to 2.",
      "Configure revision autoscaling for the new revision and set the minimum number of instances to 2.",
      "Configure revision autoscaling for the existing revision and set the minimum number of instances to 2."
    ],
    "answer": "Configure revision autoscaling for the new revision and set the minimum number of instances to 2."
  },
  {
    "question": "You are managing a stateful application deployed on Google Kubernetes Engine (GKE) that can only have one replica. You recently discovered that the application becomes unstable at peak times. You have identified that the application needs more CPU than what has been configured in the manifest at these peak times. You want Kubernetes to allocate the application sufficient CPU resources during these peak times, while ensuring cost efficiency during off-peak periods. What should you do?",
    "options": [
      "Enable node auto-provisioning on the GKE cluster.",
      "Configure a Vertical Pod Autoscaler on the Deployment.",
      "Configure a Horizontal Pod Autoscaler on the Deployment.",
      "Enable cluster autoscaling on the GKE cluster."
    ],
    "answer": "Configure a Vertical Pod Autoscaler on the Deployment."
  },
  {
    "question": "Your company runs a variety of applications and workloads on Google Cloud, and you are responsible for managing cloud costs. You need to identify a solution that enables you to perform detailed cost analysis. You also must be able to visualize the cost data in multiple ways on the same dashboard. What should you do?",
    "options": [
      "Use the cost breakdown report with the available filters from Cloud Billing to visualize the data.",
      "Enable the Cloud Billing export to BigQuery, and use Looker Studio to visualize the data.",
      "Run queries in Cloud Monitoring. Create dashboards to visualize the billing metrics.",
      "Enable Cloud Monitoring metrics export to BigQuery, and use Looker to visualize the data."
    ],
    "answer": "Enable the Cloud Billing export to BigQuery, and use Looker Studio to visualize the data."
  },
  {
    "question": "Your digital media company stores a large number of video files on-premises. Each video file ranges from 100 MB to 100 GB. You are currently storing 150 TB of video data in your on-premises network, with no room for expansion. You need to migrate all infrequently accessed video files older than one year to Cloud Storage to ensure that on-premises storage remains available for new files. You must also minimize costs and control bandwidth usage. What should you do?",
    "options": [
      "Use Storage Transfer Service to move the data from the selected on-premises file storage systems to a Cloud Storage bucket.",
      "Use Transfer Appliance to request an appliance. Load the data locally, and ship the appliance back to Google for ingestion into Cloud Storage.",
      "Set up a Cloud Interconnect connection between the on-premises network and Google Cloud. Establish a private endpoint for Filestore access. Transfer the data from the existing Network File System (NFS) to Filestore.",
      "Create a Cloud Storage bucket. Establish an Identity and Access Management (IAM) role with write permissions to the bucket. Use the gsutil tool to directly copy files over the network to Cloud Storage."
    ],
    "answer": "Use Storage Transfer Service to move the data from the selected on-premises file storage systems to a Cloud Storage bucket."
  },
  {
    "question": "You are implementing a company-wide standard to control SSH access for your Google Cloud projects. You want to simplify SSH access management to your Compute Engine instances while maintaining audit compliance and eliminating as many manual steps as possible. What should you do?",
    "options": [
      "Configure a service account to add SSH keys for all VMs.",
      "Configure metadata SSH keys to manage sudo access to instances.",
      "Enable OS Login by using an organization policy for each Google Cloud project.",
      "Enable OS Login with two-factor authentication for the domain."
    ],
    "answer": "Enable OS Login by using an organization policy for each Google Cloud project."
  },
  {
    "question": "You are developing an internet of things (IoT) application that captures sensor data from multiple devices that have already been set up. You need to identify the global data storage product your company should use to store this data. You must ensure that the storage solution you choose meets your requirements of sub-millisecond latency. What should you do?",
    "options": [
      "Store the IoT data in Spanner. Use caches to speed up the process and avoid latencies.",
      "Store the IoT data in Bigtable.",
      "Capture IoT data in BigQuery datasets.",
      "Store the IoT data in Cloud Storage. Implement caching by using Cloud CDN."
    ],
    "answer": "Store the IoT data in Bigtable."
  },
  {
    "question": "Your company uses Pub/Sub for event-driven workloads. You have a subscription named email-updates attached to the new-orders topic. You need to fetch and acknowledge waiting messages from this subscription. What should you do?",
    "options": [
      "Use the gcloud pubsub subscriptions seek email-updates command.",
      "Use the gcloud pubsub topics describe new-orders command.",
      "Use the gcloud pubsub subscriptions pull email-updates --auto-ack command.",
      "Use the gcloud pubsub topics list-subscriptions new-orders --filter=\"email-updates\" command."
    ],
    "answer": "Use the gcloud pubsub subscriptions pull email-updates --auto-ack command."
  },
  {
    "question": "You need to create and manage service accounts for your workloads running on Google Cloud. You want to follow Google-recommended practices. What should you do? (Choose two.)",
    "options": [
      "Create as few service accounts as possible.",
      "Delete any unused service accounts immediately.",
      "Create single-purpose service accounts.",
      "Manage service accounts as resources.",
      "Use random names for the service accounts."
    ],
    "answer": "Create single-purpose service accounts. | Manage service accounts as resources."
  },
  {
    "question": "Your company wants to migrate your data from an on-premises relational database to Google Cloud. Your current database can no longer scale with respect to the growth of your users, and you expect the number of users to rapidly grow. You need to choose a relational database that allows you to globally scale while minimizing your management and administration efforts. You also want to follow Google-recommended practices. What should you do?",
    "options": [
      "Use Cloud SQL.",
      "Use Spanner.",
      "Use Firestore.",
      "Use BigQuery."
    ],
    "answer": "Use Spanner."
  },
  {
    "question": "You are the Google Cloud systems administrator for your organization. User A reports that they received an error when attempting to access the Cloud SQL database in their Google Cloud project, while User B can access the database. You need to troubleshoot the issue for User A, while following Google-recommended practices. What should you do first?",
    "options": [
      "Confirm that network firewall rules are not blocking traffic for User A.",
      "Verify that User A has the Identity and Access Management (IAM) Project Owner role assigned.",
      "Review recent configuration changes that may have caused unintended modifications to permissions.",
      "Review the error message that User A received."
    ],
    "answer": "Review the error message that User A received."
  },
  {
    "question": "You manage a VPC network in Google Cloud with a subnet that is rapidly approaching its private IP address capacity. You expect the number of Compute Engine VM instances in the same region to double within a week. You need to implement a Google-recommended solution that minimizes operational costs and does not require downtime. What should you do?",
    "options": [
      "Create a second VPC with the same subnet IP range, and connect this VPC to the existing VPC by using VPC Network Peering.",
      "Delete the existing subnet, and create a new subnet with double the IP range available.",
      "Permit additional traffic from the expected range of private IP addresses to reach your VMs by configuring firewall rules.",
      "Use the Google Cloud CLI tool to expand the primary IP range of your subnet."
    ],
    "answer": "Use the Google Cloud CLI tool to expand the primary IP range of your subnet."
  },
  {
    "question": "You have developed a web application that serves traffic for a local event and are expecting unpredictable traffic. You have containerized the application, and you now want to deploy the application on Google Cloud. You also want to minimize costs. What should you do?",
    "options": [
      "Deploy the web application as a Cloud Run job.",
      "Deploy the web application on Google Kubernetes Engine in Standard mode.",
      "Deploy the web application as a Cloud Run service.",
      "Deploy the web application on Google Kubernetes Engine in Autopilot mode."
    ],
    "answer": "Deploy the web application as a Cloud Run service."
  },
  {
    "question": "You host your website on Compute Engine. The number of global users visiting your website is rapidly expanding. You need to minimize latency and support user growth in multiple geographical regions. You also want to follow Google-recommended practices and minimize operational costs. Which two actions should you take? (Choose two.)",
    "options": [
      "Use an external Application Load Balancer in Regional mode.",
      "Deploy your VMs in multiple Google Cloud regions closest to your user's geographical locations.",
      "Use a Network Load Balancer.",
      "Use an external Application Load Balancer in Global mode.",
      "Deploy all of your VMs in a single Google Cloud region with the largest available CIDR range."
    ],
    "answer": "Deploy your VMs in multiple Google Cloud regions closest to your user's geographical locations. | Use an external Application Load Balancer in Global mode."
  },
  {
    "question": "You are writing a shell script that includes a few gcloud CLI commands to access some Google Cloud resources. You want to test the script in your local development environment with a service account in the most secure way. What should you do?",
    "options": [
      "Generate an ID token for the service account. Use the token with the gcloud CLI commands.",
      "Enable service account impersonation, and use the gcloud config set command to use it by default.",
      "Download the service account key file and save it in a secure location. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the key file.",
      "Download the service account key file, and use it to generate an access token. Use the token with the gcloud CLI commands."
    ],
    "answer": "Enable service account impersonation, and use the gcloud config set command to use it by default."
  },
  {
    "question": "Your company is active in the European Economic Area (EEA), and will adopt Google Cloud for its workloads. Projects are currently structured within different folders. You need to ensure any resources that will be deployed are using Google Cloud locations within the EEA by using the Organization Policy Service resource locations constraint. What should you do?",
    "options": [
      "Configure the policy at the folder level, and add all allowed locations to the policy.",
      "Configure the policy at the organization level, and add all allowed locations to the policy.",
      "Configure the policy at the folder level, and add all disallowed locations to the policy.",
      "Configure the policy at the organization level, and add all disallowed locations to the policy."
    ],
    "answer": "Configure the policy at the organization level, and add all allowed locations to the policy."
  },
  {
    "question": "You are deploying a large, multi-tiered application with more than 1,000 IP addresses in a Google Cloud project that needs to be securely isolated. The application includes the:1. web tier with frontend servers for public traffic,2. application tier with servers running core application logic that only need access from the web tier, and3. database tier with database servers that only need access from the application tier.You want to minimize cost, complexity, and administrative overhead in the network architecture. What should you do?",
    "options": [
      "Create a /24 Shared VPC with separate subnets for each tier. Use firewall rules that reference network tags to control traffic.",
      "Create one custom mode /16 VPC with three subnets. Place each tier in its own subnet and use firewall rules that reference IP subnets to control traffic.",
      "Deploy each tier into a separate custom mode /16 VPUse VPC Network Peering to securely connect each custom mode VPManage firewall rules individually in each VPC.",
      "Deploy each tier in a /24 VPC by using network tags to identify instances. Implement firewall rules for fine-grained network segmentation."
    ],
    "answer": "Create one custom mode /16 VPC with three subnets. Place each tier in its own subnet and use firewall rules that reference IP subnets to control traffic."
  },
  {
    "question": "Your company is closely monitoring their cloud spend. You need to allow different teams to monitor their Google Cloud costs. You must ensure that team members receive notifications when their cloud spend reaches certain thresholds and give team members the ability to create dashboards for additional insights with detailed billing data. You want to follow Google-recommended practices and minimize engineering costs. What should you do?",
    "options": [
      "Deploy Grafana to Compute Engine. Create a dashboard for each team that uses the data from the Cloud Billing API. Ask each team to create their own alerts in Cloud Monitoring.",
      "Set up alerts for each team based on required thresholds. Create a shell script to read data from the Cloud Billing API, and push the results to BigQuery. Grant team members access to BigQuery.",
      "Deploy Grafana to Compute Engine. Create a dashboard for each team that uses the data from the Cloud Billing Budget API. Ask each team to create their own alerts in Grafana.",
      "Set up alerts for each team based on required thresholds. Set up billing exports to BigQuery. Grant team members access to BigQuery."
    ],
    "answer": "Set up alerts for each team based on required thresholds. Set up billing exports to BigQuery. Grant team members access to BigQuery."
  },
  {
    "question": "Your company plans to migrate its on-premises PostgreSQL database to Google Cloud. The workloads are demanding, requiring fast transactional and analytical performance. You need to select a fully managed database service on Google Cloud. Your solution must also be able to synchronously replicate and optimize the storage layer. What should you do?",
    "options": [
      "Migrate the database to Cloud SQL for PostgreSQL by using Database Migration Service.",
      "Use the psql client installed on a Compute Engine instance. Connect to the Cloud SQL instance to perform the database migration.",
      "Migrate the database to AlloyDB for PostgreSQL by using Database Migration Service.",
      "Create a Compute Engine instance. Install and configure PostgreSQL on the instance, and migrate the database."
    ],
    "answer": "Migrate the database to AlloyDB for PostgreSQL by using Database Migration Service."
  }
]


function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function normalizeOptionText(text){
    if(text === null || text === undefined) return "";
    return String(text).replace(/\s+/g, " ").trim();
}

function getCorrectAnswers(q){
    return q.answer.split(" | ").map(a => normalizeOptionText(a));
}

function getRequiredSelectionCount(q){
    return getCorrectAnswers(q).length;
}

function isMultiAnswerQuestion(q){
    return getRequiredSelectionCount(q) > 1;
}

function isCorrectOption(option, q){
    return getCorrectAnswers(q).includes(normalizeOptionText(option));
}

function normalizeSelection(selection){
    if(!selection) return [];
    return Array.isArray(selection) ? selection : [selection];
}

function isQuestionFullyCorrect(selection, q){
    const selected = normalizeSelection(selection).map(normalizeOptionText).sort();
    const correct = [...getCorrectAnswers(q)].sort();
    if(selected.length !== correct.length) return false;
    return selected.every((value, index) => value === correct[index]);
}

function getSelectedOptions(div){
    return [...div.querySelectorAll(".option.selected")].map(opt => opt.innerText);
}

function revealPracticeResult(div, q, selected){
    div.classList.add("locked");
    div.querySelectorAll(".option").forEach(opt => {
        opt.style.pointerEvents = "none";
    });

    const correct = isQuestionFullyCorrect(selected, q);

    div.querySelectorAll(".option").forEach(opt => {
        opt.classList.remove("selected");

        const text = opt.innerText;
        const isSelected = selected.includes(text);

        if(isSelected){
            opt.classList.add(isCorrectOption(text, q) ? "correct" : "wrong");
        }else if(!correct && isCorrectOption(text, q)){
            opt.classList.add("correct");
        }
    });

    let feedback = document.createElement("div");
    feedback.innerHTML = `<br>✅ Correct Answer: ${q.answer.replaceAll(" | ", "<br>")}`;
    div.appendChild(feedback);
}

function placeCurrentExamNextButton(target){
    const nextBtn = document.getElementById("nextBtn");
    if(!target){
        document.getElementById("nextBtn-home").appendChild(nextBtn);
        return;
    }
    target.appendChild(nextBtn);
}

function resetSharedUI(){
    clearInterval(timer);
    document.getElementById("timer").innerHTML = "";
    document.getElementById("finishBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    placeCurrentExamNextButton(null);
    document.getElementById("result").innerHTML = "";
    currentExamMode = false;
}

function startPractice(){
    resetSharedUI();
    examMode = false;
    loadQuestions(shuffle([...questions]));
}

function startExam(){
    resetSharedUI();

    examMode = true;
    score = 0;
    examAnswers = {};

    examQuestions = shuffle([...questions]).slice(0,60);

    startTimer();

    document.getElementById("finishBtn").style.display = "block";

    loadQuestions(examQuestions);
}

function startTimer(){

    clearInterval(timer);

    timeLeft = 7200;

    timer = setInterval(() => {

        let hours = Math.floor(timeLeft / 3600);
        let minutes = Math.floor((timeLeft % 3600) / 60);
        let seconds = timeLeft % 60;

        document.getElementById("timer").innerHTML =
            `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;

        timeLeft--;

        if(timeLeft < 0){
            finishExam();
        }

    },1000);
}

function loadQuestions(data){

    const container = document.getElementById("quiz-container");

    container.innerHTML = "";

    data.forEach((q,index)=>{

        let div = document.createElement("div");

        div.className = "question";

        let options = shuffle([...q.options]);

        div.innerHTML = `
            <h3>${index+1}. ${q.question}</h3>
        `;

        options.forEach(option=>{

            let btn = document.createElement("div");

            btn.className = "option";

            btn.innerText = option;

            btn.onclick = ()=>{

                const requiredCount = getRequiredSelectionCount(q);

                if(examMode){
                    if(requiredCount > 1){
                        const current = normalizeSelection(examAnswers[index]);

                        if(btn.classList.contains("selected")){
                            btn.classList.remove("selected");
                            examAnswers[index] = current.filter(value => value !== option);
                            return;
                        }

                        if(current.length >= requiredCount) return;

                        btn.classList.add("selected");
                        examAnswers[index] = [...current, option];
                        return;
                    }

                    div.querySelectorAll(".option").forEach(opt => {
                        opt.classList.remove("selected");
                    });
                    btn.classList.add("selected");
                    examAnswers[index] = option;
                    return;
                }

                if(div.classList.contains("locked")) return;

                if(requiredCount > 1){
                    if(btn.classList.contains("selected")){
                        btn.classList.remove("selected");
                        return;
                    }

                    btn.classList.add("selected");
                    const selected = getSelectedOptions(div);

                    if(selected.length < requiredCount) return;

                    revealPracticeResult(div, q, selected);
                    return;
                }

                revealPracticeResult(div, q, [option]);

            };

            div.appendChild(btn);

        });

        container.appendChild(div);

    });
}

function revealExamResults(){

    const questionDivs = document.querySelectorAll("#quiz-container .question");

    questionDivs.forEach((div, index) => {

        const q = examQuestions[index];
        const selected = normalizeSelection(examAnswers[index]);
        const answeredCorrectly = isQuestionFullyCorrect(selected, q);
        const hasSelection = selected.length > 0;

        div.querySelectorAll(".option").forEach(opt => {

            opt.style.pointerEvents = "none";
            opt.classList.remove("selected");

            const text = opt.innerText;
            const isSelected = selected.includes(text);

            if(isSelected){
                opt.classList.add(isCorrectOption(text, q) ? "correct" : "wrong");
            }else if(hasSelection && !answeredCorrectly && isCorrectOption(text, q)){
                opt.classList.add("correct");
            }

        });

    });
}

function finishExam(){

    clearInterval(timer);

    score = examQuestions.reduce((total, q, index) => {
        return total + (isQuestionFullyCorrect(examAnswers[index], q) ? 1 : 0);
    }, 0);

    revealExamResults();

    document.getElementById("finishBtn").style.display = "none";

    let percent = ((score / 60) * 100).toFixed(2);

    document.getElementById("result").innerHTML = `
        <h2>Exam Finished</h2>
        <p>Score: ${score}/60</p>
        <p>${percent}%</p>
    `;
}

function startCurrentExam(){
    resetSharedUI();
    examMode = false;
    currentExamMode = true;
    currentExamIndex = 0;
    currentExamRevealed = false;
    currentExamAnswers = {};
    currentExamQuestions = shuffle([...questions2]);

    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("quiz-container").innerHTML = "";

    renderCurrentQuestion();
}

function getCurrentExamSelection(){
    const div = document.getElementById("current-question");
    if(!div) return [];
    return [...div.querySelectorAll(".option.selected-border")].map(opt => opt.dataset.option);
}

function handleCurrentOptionClick(btn, option, q, requiredCount){
    if(currentExamRevealed) return;

    const div = document.getElementById("current-question");

    if(requiredCount > 1){
        if(btn.classList.contains("selected-border")){
            btn.classList.remove("selected-border");
            return;
        }

        const selectedCount = div.querySelectorAll(".option.selected-border").length;
        if(selectedCount >= requiredCount) return;

        btn.classList.add("selected-border");
        return;
    }

    div.querySelectorAll(".option").forEach(opt => {
        opt.classList.remove("selected-border");
    });
    btn.classList.add("selected-border");
}

function revealCurrentQuestionResult(){
    const q = currentExamQuestions[currentExamIndex];
    const selected = getCurrentExamSelection();
    const requiredCount = getRequiredSelectionCount(q);
    const stored = requiredCount > 1 ? selected : (selected[0] ?? null);

    currentExamAnswers[currentExamIndex] = stored;

    const fullyCorrect = isQuestionFullyCorrect(stored, q);
    const div = document.getElementById("current-question");

    const normalizedSelected = selected.map(normalizeOptionText);

    div.querySelectorAll(".option").forEach(opt => {
        opt.style.pointerEvents = "none";
        opt.classList.remove("selected-border", "border-correct", "border-wrong");

        const text = normalizeOptionText(opt.dataset.option);
        const isSelected = normalizedSelected.includes(text);

        if(isSelected){
            opt.classList.add(isCorrectOption(text, q) ? "border-correct" : "border-wrong");
        }else if(!fullyCorrect && isCorrectOption(text, q)){
            opt.classList.add("border-correct");
        }
    });

    const feedback = document.getElementById("current-feedback");
    feedback.innerHTML =
        `<div class="feedback-box"><strong>Respuesta correcta:</strong><br>${q.answer.replaceAll(" | ", "<br>")}</div>`;

    let revealNav = document.getElementById("current-exam-actions-reveal");
    if(!revealNav){
        revealNav = document.createElement("div");
        revealNav.id = "current-exam-actions-reveal";
        revealNav.className = "current-exam-actions";
        feedback.parentNode.insertBefore(revealNav, feedback);
    }
    placeCurrentExamNextButton(revealNav);
}

function renderCurrentQuestion(){
    const container = document.getElementById("quiz-container");
    const q = currentExamQuestions[currentExamIndex];
    const total = currentExamQuestions.length;
    const requiredCount = getRequiredSelectionCount(q);

    placeCurrentExamNextButton(null);
    container.innerHTML = "";

    const div = document.createElement("div");
    div.className = "question current-exam-question";
    div.id = "current-question";

    const multiHint = requiredCount > 1
        ? `<p class="hint">Selecciona ${requiredCount} opciones (puedes deseleccionar)</p>`
        : "";

    div.innerHTML = `
        <p class="progress">Pregunta ${currentExamIndex + 1} de ${total}</p>
        <h3>${q.question}</h3>
        ${multiHint}
        <div id="current-options"></div>
        <div id="current-exam-actions" class="current-exam-actions"></div>
        <div id="current-feedback"></div>
    `;

    const optionsContainer = div.querySelector("#current-options");
    const options = shuffle([...q.options]);

    options.forEach(option => {
        const btn = document.createElement("div");
        btn.className = "option";
        btn.dataset.option = option;
        btn.innerText = option;
        btn.onclick = () => handleCurrentOptionClick(btn, option, q, requiredCount);
        optionsContainer.appendChild(btn);
    });

    container.appendChild(div);

    placeCurrentExamNextButton(div.querySelector("#current-exam-actions"));
    document.getElementById("nextBtn").style.display = "block";
}

function finishCurrentExam(){
    const total = currentExamQuestions.length;
    const finalScore = currentExamQuestions.reduce((totalPoints, q, index) => {
        return totalPoints + (isQuestionFullyCorrect(currentExamAnswers[index], q) ? 1 : 0);
    }, 0);
    const percent = total ? ((finalScore / total) * 100).toFixed(2) : "0.00";

    currentExamMode = false;
    placeCurrentExamNextButton(null);
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("quiz-container").innerHTML = "";
    document.getElementById("result").innerHTML = `
        <h2>Examen Actual - Finalizado</h2>
        <p>Respondiste bien: ${finalScore}/${total}</p>
        <p>${percent}%</p>
    `;
}

function handleCurrentExamNext(){
    if(!currentExamMode) return;

    if(!currentExamRevealed){
        revealCurrentQuestionResult();
        currentExamRevealed = true;
        return;
    }

    if(currentExamIndex >= currentExamQuestions.length - 1){
        finishCurrentExam();
        return;
    }

    currentExamIndex++;
    currentExamRevealed = false;
    renderCurrentQuestion();
}