
export default class Pair {
    reserves: number[];
    tokens: string[];
    address: string;
    constructor(obj: any = {}) {
        this.reserves = obj.reserves || [0, 0];
        this.tokens = obj.tokens || [];
        this.address = obj.address || "0x"
    }
}