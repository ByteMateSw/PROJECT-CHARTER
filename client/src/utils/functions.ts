export const dateDifference = (date: Date) => {
    const fecha1 = new Date(date);
    const fecha2 = new Date();
  
    // Calculamos la diferencia en milisegundos
    const diferenciaMilisegundos = fecha2.getTime() - fecha1.getTime();
  
    // Convertimos la diferencia a horas y días
    const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
    const diferenciaDias = Math.floor(diferenciaHoras / 24);
    if(diferenciaDias < 24) {
      if(diferenciaHoras === 1) {
        return {
          time: diferenciaHoras,
          unit: 'hora'
        }
      }
      return {
        time: diferenciaHoras,
        unit: 'horas'
      }
    }
    if (diferenciaDias === 1) {
      return {
        time: diferenciaDias,
        unit: 'dia'
      }
    }
    return {
      time: diferenciaDias,
      unit: 'dias'
    }
  }

  export function validatePhone(telefono: string): boolean {
    if (!telefono) {
      return false; // Teléfono vacío
    }
  
    // Limpiar el teléfono: quitar espacios, guiones, paréntesis y el signo +
    telefono = telefono.replace(/[\s\-\(\)\+]/g, '');
  
    // Expresión regular para validar el formato
    const regex = /^(549?|00549?|54|0054)?(11|[23]\d{2,3})\d{6,8}$/;
  
    if (!regex.test(telefono)) {
      return false; // Formato inválido
    }
  
    //Validaciones adicionales para casos especificos
  
    if(telefono.startsWith("15")){
      return false; // El prefijo 15 no es válido.
    }
  
    if(telefono.startsWith("5415") || telefono.startsWith("005415")){
        return false; // El prefijo 15 no es válido.
    }
  
    if (telefono.startsWith("54915") || telefono.startsWith("0054915")) {
      return false; // El prefijo 15 no es válido.
    }
  
    return true; // Teléfono válido
  }