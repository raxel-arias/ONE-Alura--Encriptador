(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const $encriptar = document.querySelector('#encriptar');
        const $desencriptar = document.querySelector('#desencriptar');
        const $copiar = document.querySelector('#copiar');

        const $seccionSalida = document.querySelector('.seccion-salida');
        const $entrada = document.querySelector('#entrada');
        const $salida = document.querySelector('#salida');

        const $error_entrada = document.querySelector('#error_entrada');
        const $error_salida = document.querySelector('#error_salida');

        const $contadorEntrada = document.querySelector('#contador-entrada');
        const $contadorSalida = document.querySelector('#contador-salida');

        const vocales = {
            a: {
                encrypt_replace: 'ai'
            },
            e: {
                encrypt_replace: 'enter'
            },
            i: {
                encrypt_replace: 'imes'
            },
            o: {
                encrypt_replace: 'ober'
            },
            u: {
                encrypt_replace: 'ufat'
            }
        }
        
        //Regex
        const REGEX_SPECIAL_REPLACE = /[^a-zA-Z0-9 ]/g;
        const REGEX_VOWELS = /[aeiou]/gi;
        const REGEX_ENCRYPTED_VOWELS = /ai|enter|imes|ober|ufat/gi;

        //Encriptar
        $encriptar.onclick = () => {
            if (entradaValidada()) encriptar();
        }

        //Desencriptar
        $desencriptar.onclick = () => {
            if (entradaValidada()) desencriptar();
        }

        //Copiar
        $copiar.onclick = () => {
            if (!$salida.textContent) {
                mostrarError($error_salida, 'No hay nada que copiar!');
                
                return;
            }
            ocultarError($error_salida);

            navigator.clipboard.writeText($salida.textContent);
            limpiarSalida();
        }

        $entrada.addEventListener('input', (ev) => $contadorEntrada.textContent = ev.target.value.length);

        function encriptar() {
            const resultado = $entrada.value.replace(REGEX_VOWELS, matched => vocales[matched].encrypt_replace);
            
            mostrarResultado(resultado);
        }

        function desencriptar() {
            const resultado = $entrada.value.replace(REGEX_ENCRYPTED_VOWELS, matched => matched[0]);
            
            mostrarResultado(resultado);
        }

        function mostrarResultado(resultado) {
            limpiarEntrada();

            $seccionSalida.classList.add('border-focus');

            window.location.href = '#seccion-salida';

            $salida.textContent = resultado;
            $contadorSalida.textContent = $salida.textContent.length;
        }

        function entradaValidada() {
            $entrada.value = $entrada.value.trim().replace(REGEX_SPECIAL_REPLACE, '').toLowerCase();

            if (!$entrada.value) {
                mostrarError($error_entrada, 'Ingrese un texto primero!');
                limpiarEntrada();

                return false;
            }
            ocultarError($error_entrada);
            ocultarError($error_salida);

            return true;
        }

        function limpiarEntrada() {
            $entrada.value = '';
            $contadorEntrada.textContent = '0';
        }

        function limpiarSalida() {
            $seccionSalida.classList.remove('border-focus');

            $salida.textContent = '';
            $contadorSalida.textContent = '0';
        }

        function mostrarError($element, msg) {
            $element.textContent = msg;
        }
    
        function ocultarError($element) {
            $element.textContent = '';
        }
    });
})();