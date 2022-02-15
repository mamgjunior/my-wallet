const formatParametroData = (parametro: string = "ano"): string => {
    const date = new Date();
    
    if (parametro === "dia"){
        return date.getDate().toString()    
    } else if (parametro === "mes"){
        return (date.getMonth() + 1).toString();
    } else {
        return String(date.getFullYear());    
    }
};

export default formatParametroData;