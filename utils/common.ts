
export function getRandomInt(min: number, max: number){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function negOrPos(num: number){
    const random = getRandomInt(0, 1)
    if(random == 0){
        return num;
    } else {
        return -num
    }
}

export function middleMan(func: any){
    func();
}