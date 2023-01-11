# AWS Cron Service Lambda

Una función AWS Lambda que se ejecuta en un horario utilizando CloudWatch Events. Esta función se puede utilizar como punto de partida para crear trabajos cron dentro de AWS.

## Características
- Despliegue automatizado utilizando el Modelo de Aplicación Sin Servidor de AWS (SAM)
- Utiliza AWS Comprehend para realizar tareas de procesamiento del lenguaje natural
- Gatillo de API Gateway para invocar la función Lambda
- Se despliega como una aplicación sin servidor

## Comenzando

1. Clona el repositorio: git clone https://github.com/wilmarcabezas/aws-cron-service-lambda
2. Compila y despliega la aplicación utilizando el AWS SAM CLI. sam build sam deploy --guided
3. Prueba la función Lambda utilizando el punto final de API Gateway. curl <API_GATEWAY_ENDPOINT>/cron

🚀 Desplegado y listo para programar tu trabajo cron en AWS 

## AWS Lambda
[AWS Lambda](https://aws.amazon.com/lambda/) es un servicio de computación sin servidor que ejecuta tu código en respuesta a eventos y administra automáticamente la infraestructura subyacente. Permite construir microservicios y automatizar tareas de back-end sin provisionar o administrar servidores.

## API Gateway
[API Gateway](https://aws.amazon.com/api-gateway/) es un servicio completamente administrado que facilita a los desarrolladores crear, publicar, mantener y supervisar APIs. Se puede utilizar para crear APIs REST que desencadenen funciones AWS Lambda, y también para conectarse a puntos finales HTTP, otros servicios AWS o servicios web públicos.

## Servicio sin servidor
[Servicio sin servidor](https://aws.amazon.com/serverless/) es una forma de construir y ejecutar aplicaciones y servicios sin tener que provisionar, escalar y administrar servidores.
Permite centrarse en el código y la lógica de negocio de su aplicación, mientras el proveedor de la nube (AWS, en este caso) se encarga de los aspectos operativos de la infraestructura. 🚀

## Programación en funciones Lambda
Puede utilizar CloudWatch Events para programar la invocación de una función Lambda en intervalos específicos. Esto se conoce como un _evento programado_, y se puede utilizar para tareas como respaldos regulares, actualizaciones u otras operaciones programadas.
Aquí utilizasamos CloudWatch Events para desencadenar nuestra función Lambda en un horario específico, como se describe en la [documentación de AWS](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduled-events.html)

- Para crear el evento programado:
    Vaya al panel CloudWatch, 
    Seleccione Eventos,
    Luego seleccione Crear regla,
    Como fuente de eventos seleccione Programar,
    Y establezca su horario según desee.

📅 Programe fácilmente su trabajo con CloudWatch Events y Lambda

## Ejemplo serverless.yml

```` yml

service: awscronoservice-demo

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs12.x
  iamRoleStatements:
    - Effect: Allow
      Action: 
        - ses:* 
      Resource: '*'

# Los argumentos específicos en esta expresión son:

# Minutos: */2 significa cada 2 minutos, ya que el asterisco (*) representa cualquier valor posible.
# Horas: * significa cualquier valor, ya que se desea que la función se ejecute cada 2 minutos, independientemente de la hora.
# Día del mes: * significa cualquier valor, ya que se desea que la función se ejecute cada 2 minutos, independientemente del día del mes.
# Mes: * significa cualquier valor, ya que se desea que la función se ejecute cada 2 minutos, independientemente del mes.
# Día de la semana: ? especifica que el día de la semana no importa, para el caso.
# Año: * significa cualquier valor, ya que se desea que la función se ejecute cada 2 minutos, independientemente del año.
# Ten en cuenta que debido a la frecuencia de ejecución y el potencial de alto costo de utilizar esta configuración.
functions:
  ApiDailyFunction:
    handler: lambdas/apiDayly.handler
    events: 
      - schedule: cron(*/2 * * * ? *)
  repeatEmailFunction:
    handler: lambdas/repeatEmail.handler
    events: 
      - schedule: cron(*/5 * * * ? *)

````
