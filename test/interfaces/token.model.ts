import { Network } from "./network.enum"

export default class Token {
    public date: Date;
    public loadInfoTimestamp: number = 0;
    public network: Network;
    public blockNumber: number;
    public pairs: string[];
    public name: string;
    public symbol: string;
    public decimals: number;
    public totalSupply: number;
    public address: string;

    constructor(obj: any = {}) {
        this.network = obj.network || Network.BNB;
        this.blockNumber = obj.blockNumber || 0;
        this.pairs = obj.pairs || [];
        this.address = obj.address || "0x";
        this.date = new Date(obj?.date || new Date());
        this.totalSupply = obj.totalSupply || 0;
        this.symbol = obj.symbol || "-";
        this.name = obj.name || "---";
        this.decimals = obj.decimals || 0;
    }
}
