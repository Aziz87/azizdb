import Token from "../interfaces/token.model";
import Pair from "../interfaces/pair.model";
import { JDB } from "../../src/jdb";

export default {
    token: new JDB("token", "address", Token),
    pairs: new JDB("pair", "address", Pair)
}