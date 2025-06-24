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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!model) {
            resultadoDiv.innerText = "Espera a que el modelo cargue.";
            return;
        }

        // 2. Recolectar datos del formulario
        const age = parseInt(document.getElementById('age').value);
        const monthlyIncome = parseInt(document.getElementById('monthlyIncome').value);
        const totalWorkingYears = parseInt(document.getElementById('totalWorkingYears').value);
        const yearsAtCompany = parseInt(document.getElementById('yearsAtCompany').value);
        const businessTravel = document.getElementById('businessTravel').value;
        const jobRole = document.getElementById('jobRole').value;
        const overTime = document.getElementById('overTime').value;

        // 3. Crear el tensor de entrada (¡CLAVE!)
        // El orden DEBE COINCIDIR con el resultado de `list(X.columns)` en Python.
        // Ejemplo de orden (verifica el tuyo):
        // ['Age', 'MonthlyIncome', 'TotalWorkingYears', 'YearsAtCompany', 
        //  'BusinessTravel_Travel_Frequently', 'BusinessTravel_Travel_Rarely', 
        //  'JobRole_Human Resources', ..., 'JobRole_Sales Representative', 'OverTime_Yes']

        const inputData = [
            // Variables numéricas
            age,
            monthlyIncome,
            totalWorkingYears,
            yearsAtCompany,

            // One-hot para JobRole (8 columnas)
            jobRole === 'Human Resources' ? 1 : 0,
            jobRole === 'Laboratory Technician' ? 1 : 0,
            jobRole === 'Manager' ? 1 : 0,
            jobRole === 'Manufacturing Director' ? 1 : 0,
            jobRole === 'Research Director' ? 1 : 0,
            jobRole === 'Research Scientist' ? 1 : 0,
            jobRole === 'Sales Executive' ? 1 : 0,
            jobRole === 'Sales Representative' ? 1 : 0,
            
            // One-hot para BusinessTravel (2 columnas)
            businessTravel === 'Travel_Frequently' ? 1 : 0,
            businessTravel === 'Travel_Rarely' ? 1 : 0,
            
            // One-hot para OverTime (1 columna)
            overTime === 'Yes' ? 1 : 0
        ];

        // Crear el tensor 2D que el modelo espera [1, num_features]
        const tensorInput = tf.tensor2d([inputData]);

        // 4. Realizar la predicción
        const prediction = model.predict(tensorInput);
        const probability = prediction.dataSync()[0];

        // 5. Mostrar el resultado
        const percentage = (probability * 100).toFixed(2);
        let message = (probability > 0.5) 
            ? "Riesgo alto de rotación" 
            : "Probabilidad baja de salida";
        
        resultadoDiv.innerHTML = `${message} <br> Probabilidad: ${percentage}%`;
    });
});