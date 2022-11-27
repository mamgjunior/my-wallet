export function getNumberEmoji(pTamanhoEmoji: number): number {
    const crypto = window.crypto;
    const numeroAleatorio = String(crypto.getRandomValues(new Uint32Array(1)));
    const new_numero = Number(numeroAleatorio[0]);
    return new_numero > pTamanhoEmoji ? new_numero - pTamanhoEmoji : new_numero;
}


export function generateUniqueIdentifier(pSize: number): number {
    const crypto = window.crypto;
    const randomNumber = String(crypto.getRandomValues(new Uint32Array(1)));
    const newNumber = Number(randomNumber[0]);
    return newNumber > pSize ? newNumber - pSize : newNumber;
}