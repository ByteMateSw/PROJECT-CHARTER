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