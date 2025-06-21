// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const resultadoDiv = document.getElementById('resultado');
    let model;

    // 1. Cargar el modelo de TensorFlow.js
    async function loadModel() {
        console.log("Cargando modelo...");
        model = await tf.loadGraphModel('model_tfjs/model.json');
        console.log("Modelo cargado exitosamente.");
    }
    loadModel();

    // 2. Escuchar el evento de envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar que la página se recargue

        if (!model) {
            resultadoDiv.innerText = "El modelo aún no está cargado. Por favor, espere.";
            return;
        }

        // 3. Recolectar y preprocesar los datos del formulario
        // ¡Esta parte es CRÍTICA! Debes simular el one-hot encoding que hiciste en Python.
        // El tensor de entrada debe tener el mismo número de características que el modelo espera.
        // Imprime X_train.columns en Python para ver el orden exacto.
        // A continuación, un ejemplo basado en las columnas más comunes:
        
        // Datos numéricos
        const age = parseInt(document.getElementById('age').value);
        const monthlyIncome = parseInt(document.getElementById('monthlyIncome').value);
        const totalWorkingYears = parseInt(document.getElementById('totalWorkingYears').value);
        const yearsAtCompany = parseInt(document.getElementById('yearsAtCompany').value);

        // Datos categóricos (one-hot encoding manual)
        const businessTravel = document.getElementById('businessTravel').value;
        const jobRole = document.getElementById('jobRole').value;
        const overTime = document.getElementById('overTime').value;

        // Crear un array con los valores en el orden correcto (EJEMPLO)
        // Este array debe tener 47 columnas, como en el modelo de Python.
        // La mayoría serán 0. Solo los valores seleccionados serán 1.
        // ESTA ES UNA REPRESENTACIÓN SIMPLIFICADA Y DEBE AJUSTARSE A TUS COLUMNAS REALES.
        const inputData = [
            age, 10, 1, 1, 1, 1, monthlyIncome, 1, 1, totalWorkingYears, 1, yearsAtCompany, 1, 1, 1, 1, 1,
            // One-hot encoding manual (ejemplo)
            businessTravel === 'Travel_Frequently' ? 1 : 0,
            businessTravel === 'Travel_Rarely' ? 1 : 0,
            // ... otras columnas de Department, EducationField, etc. que son 0 ...
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            jobRole === 'Sales Executive' ? 1 : 0, // Esto es un ejemplo, debes completar todos los roles
            // ... otras columnas de JobRole ...
            overTime === 'Yes' ? 1 : 0
        ];
        
        // Ajusta el tamaño del array (ej: 47)
        // Este es el paso más complejo. Imprime `list(X_train.columns)` en Python.
        // Y crea el tensor con un 1 en la posición correcta para cada variable categórica.
        // Todos los demás valores de esas categorías serán 0.

        // Simulación para fines demostrativos con un tensor de tamaño correcto (47)
        // En una implementación real, debes construir este tensor dinámicamente.
        const tensorInput = tf.tensor2d([Array(47).fill(0)], [1, 47]); // Placeholder - debes llenarlo con datos reales

        // 4. Realizar la predicción
        const prediction = model.predict(tensorInput);
        const probability = prediction.dataSync()[0];

        // 5. Mostrar el resultado 
        const percentage = (probability * 100).toFixed(2);
        let message = "";
        if (probability > 0.5) { // Umbral de decisión (puedes ajustarlo)
            message = `Riesgo alto de rotación`;
        } else {
            message = `Probabilidad baja de salida`;
        }
        
        resultadoDiv.innerHTML = `${message} <br> Probabilidad: ${percentage}%`;
    });
});
