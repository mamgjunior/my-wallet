function adicionaZero(value: string): string {
    return value.length == 1? "0" + value: value;
}

const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);
    const day = (dateFormatted.getDate()).toString();
    const month = (dateFormatted.getMonth() + 1).toString();
    const year = dateFormatted.getFullYear();

    return adicionaZero(day) + "/" + adicionaZero(month) + "/" + String(year);

};

export default formatDate;