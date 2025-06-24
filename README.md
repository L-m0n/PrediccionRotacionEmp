# Proyecto: Predicción de Rotación de Empleados

Este proyecto consiste en el desarrollo de una aplicación web para predecir la probabilidad de que un empleado abandone la empresa. La herramienta está diseñada para ser utilizada por gerentes de Recursos Humanos, directores de operaciones o analistas organizacionales para identificar de manera proactiva a los empleados en riesgo y tomar medidas de retención.

## 1. Explicación del Problema

La rotación de personal (o "employee churn") es un desafío constante para las empresas, implicando altos costos en reclutamiento, capacitación y pérdida de talento. El objetivo de este proyecto es mitigar este problema mediante un modelo predictivo que analiza las características de un empleado para calcular su probabilidad de salida.

El modelo se basa en el dataset "HR Employee Attrition" de IBM, disponible en Kaggle.

## 2. Cómo fue Entrenado el Modelo

El modelo predictivo es una red neuronal binaria  desarrollada en Python con TensorFlow/Keras y exportada a TensorFlow.js para su uso en el navegador. A continuación se detalla el proceso.

### 2.1. Preprocesamiento de Datos

Para asegurar que el modelo fuera relevante para la aplicación web, se realizó una selección de características basada en las entradas del formulario, utilizando un subconjunto de las "Variables más relevantes":

* `Age` (Edad) 
* `MonthlyIncome` (Ingreso mensual) 
* `JobRole` (Cargo actual) 
* `TotalWorkingYears` (Años totales de experiencia) 
* `YearsAtCompany` (Años en la empresa) 
* `OverTime` (¿Hace horas extra?) 
* `BusinessTravel` (Frecuencia de viajes) 

Las variables categóricas como `JobRole`, `OverTime` y `BusinessTravel`  fueron convertidas a formato numérico mediante la técnica de **one-hot encoding** , la cual crea una nueva columna binaria para cada categoría.

Finalmente, los datos fueron divididos en dos conjuntos:
* **80% para entrenamiento** 
* **20% para prueba y evaluación** 

### 2.2. Arquitectura de la Red Neuronal

Se implementó un modelo secuencial con la siguiente estructura:

1.  **Capa de Entrada**: Del tipo `Dense` con **64 neuronas** y una función de activación **'relu'**. La forma de entrada (`input_shape`) corresponde al número de características después del preprocesamiento.
2.  **Capa Oculta**: Del tipo `Dense` con **32 neuronas** y función de activación **'relu'**.
3.  **Capa de Salida**: Del tipo `Dense` con **1 neurona** y una función de activación **'sigmoid'**. Esta configuración es ideal para problemas de clasificación binaria, ya que la salida es una probabilidad entre 0 y 1.

### 2.3. Compilación y Entrenamiento

El modelo fue compilado con los siguientes parámetros:

* **Optimizador**: `adam` 
* **Función de Pérdida**: `binary_crossentropy` (adecuada para clasificación binaria) 
* **Métrica de Evaluación**: `accuracy` 

El entrenamiento se llevó a cabo con los siguientes hiperparámetros:

* **Épocas**: 50 
* **Tamaño de Lote (Batch Size)**: 16 
* **División de Validación**: 10% (`validation_split=0.1`) de los datos de entrenamiento se usaron para validar el modelo en cada época.

## 3. Capturas de la App

A continuación se muestran capturas de la aplicación web en funcionamiento.

**Formulario de Entrada:**
*Para agregar tu imagen, toma una captura de pantalla de tu aplicación, guárdala en la misma carpeta del proyecto (ej: `captura-formulario.png`) y reemplaza la siguiente línea:*
`![Formulario para ingresar datos del empleado](ruta/a/tu/captura-formulario.png)`

**Resultado de la Predicción:**
*Haz lo mismo con una captura del resultado de una predicción (ej: `captura-resultado.png`):*
`![Resultado de la predicción mostrando el riesgo y la probabilidad](ruta/a/tu/captura-resultado.png)`

## 4. Conclusiones

*Aquí debes escribir tus reflexiones. Te doy algunas ideas para empezar:*

Se desarrolló exitosamente una aplicación web funcional que permite predecir la probabilidad de rotación de un empleado utilizando un modelo de red neuronal. La exactitud final obtenida en el conjunto de datos de prueba fue de **[Aquí pones el valor de 'accuracy' que te salió en Colab, por ejemplo: 87.5%]**.

Este proyecto demuestra la viabilidad de utilizar herramientas de machine learning para resolver problemas prácticos de Recursos Humanos. Aunque el modelo actual es robusto, existen áreas de mejora potencial, como la inclusión de más variables predictivas (siempre que puedan obtenerse fácilmente), el reentrenamiento periódico con datos nuevos de la empresa y la implementación de un dashboard más complejo para visualizar tendencias de rotación a lo largo del tiempo.

La herramienta, en su estado actual, ya es un recurso valioso para la toma de decisiones estratégicas de retención de talento.