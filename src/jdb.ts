
import * as fs from "fs";
import * as path from "path";

export class JDB {

    private readonly data: any[] = []
    private readonly indexes: string[] = [];
    private privateKey: string = "id";
    private tableName: string;

    constructor(tableName: string, privateKey: string, itemsType: any) {
        this.tableName = tableName;
        this.privateKey = privateKey;

        const url = path.join(__dirname, `${this.tableName}.json`);
        const defaultJson = `{"keys":[],"data":[]}`;
        if (!fs.existsSync(url)) fs.writeFileSync(url, defaultJson);
        const { keys, data } = JSON.parse(fs.readFileSync(url).toString() || defaultJson);

        for (let item of data) {
            const typedItem = Object.assign(new itemsType(), Object.fromEntries(item.map((x: any, i: number) => [keys[i], x])));
            this.data.push(typedItem);
            this.indexes.push(typedItem[privateKey]);
        }
    }

    /**
     * Insert items
     * Upserting when found duplocate key
     * @param items 
     * @returns return new unique inserted items
     */
    insert(items: any[]): any[] {
        const newItems: any[] = [];
        for (let item of items) {
            const privateKey = item[this.privateKey];
            if (!privateKey) throw new Error(`privateKey ${this.privateKey} is ${privateKey} on ${JSON.stringify(item)}`);
            const index = this.indexes.indexOf(privateKey);
            if (index > -1) {
                this.data.splice(index, 1, item);
            } else {
                this.data.unshift(item);
                this.indexes.unshift(privateKey);
                newItems.push(item);
            }
        }
        this.saveJson();
        return newItems;
    }

    updateOne(item: any, upsert: boolean = true, saveOnlyIfNew: boolean = false) {
        const key: string = item[this.privateKey];
        const index = this.indexes.indexOf(key);
        if (index === -1 && !upsert) return;
        this.data.splice(index, 1, item);
        if (index === -1 || !saveOnlyIfNew) this.saveJson();
    }

    findOne(key: string) {
        const index = this.indexes.indexOf(key);
        if (index === -1) return undefined;
        return this.data[index];
    }

    exist(privateKey: string): boolean {
        return this.indexes.indexOf(privateKey) > -1;
    }

    list<T>(offset: number = 0, limit: number = 100000000) {
        return this.data.slice(offset, offset + limit);
    }

    async saveJson() {
        const url = path.join(__dirname, `${this.tableName}.json`);
        await new Promise((resolve) => {
            const _keys = Object.keys(this.data[0]).sort((a, b) => a === this.privateKey ? -1 : 1);
            const keys = "[\n\t\t" + _keys.map(x => `"${x}"`).join(',\n\t\t') + "\n\t]";
            const data = "[\n\t\t" + this.data.map(x => JSON.stringify(_keys.map(key => x[key]))).join(',\n\t\t') + "\n\t]";
            fs.writeFile(url, `{\n\t"keys":${keys},\n\t"data":${data}\n}`, resolve);
        });
    }
}