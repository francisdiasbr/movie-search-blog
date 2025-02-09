export const parseDate = (dateString: string) => {
  if (!dateString) return new Date();
  try {
    const [day, month, year] = dateString.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) {
      return new Date();
    }
    return date;
  } catch {
    return new Date();
  }
};

export const formatDate = (date: Date | string) => {
  try {
    if (typeof date === 'string') {
      // Se já estiver no formato DD/MM/YYYY, retorna direto
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        return date;
      }
      // Caso contrário, tenta converter
      return parseDate(date).toLocaleDateString('pt-BR');
    }
    
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleDateString('pt-BR');
    }
    
    return new Date().toLocaleDateString('pt-BR');
  } catch {
    return new Date().toLocaleDateString('pt-BR');
  }
};
