import {readFileSync, read, readFile} from 'fs';
const separar = (itens: any[], maximo: number): any[] => {
    return itens.reduce((acumulador, item, indice) => {
        const grupo = Math.floor(indice / maximo);
        acumulador[grupo] = [...(acumulador[grupo] || []), item];
        return acumulador;
    }, []);
};

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = WEEK * 4;
const YEAR = MONTH * 12;


export default class MillisecondsParser {
    private defaultLang = JSON.parse(readFileSync(__dirname + '/en.json').toString());
    constructor(
        private language: [string[]] = JSON.parse(readFileSync(__dirname + '/pt-br.json').toString())
    ){};

    public parse(str: string, ignore: string[] = [" e", " and", ",", ".", "-"]) {
        for (const toRemove of ignore)
            str = str.replace(toRemove, "");
        const splited = separar(str.split(' '), 2);
        let total = 0;

        for (const toParse of splited) {
            let base = parseInt(toParse[0]);
            if (base <= 0)
                continue;

            const dateToParse = this.getKey(toParse[1], this.language) ?? this.getKey(toParse[1], this.defaultLang);
            switch (dateToParse) {
                case "year": {
                    base *= YEAR;
                    break;
                }
                case "month": {
                    base *= MONTH;
                    break;
                }
                case "week": {
                    base *= WEEK;
                    break;
                }
                case "day": {
                    base *= DAY;
                    break;
                }
                case "hour": {
                    base *= HOUR;
                    break;
                }
                case "minute": {
                    base *= MINUTE;
                    break;
                }
                case "second": {
                    base *= SECOND;
                    break;
                }
                case "millisecond": {
                    base *= 1;
                    break;
                }
            }
            total += base;
        }
        return total;
    }

    private getKey(str: string, language: [string[]]) {
        for (const key of Object.keys(language)) {
            for (const obj of language[key]) {
                if (obj.match(str))
                    return key;
            }
        }
    }

    private translate(str: string) {
        for (const key of Object.keys(this.language)) {
            for (const obj of this.language[key]) {
                if (obj.match(str))
                    return this.language[key][this.language[key].indexOf(obj)];
            }
        }
    }
}

module.exports = function (language?: [string[]]) { return new MillisecondsParser(language) };
