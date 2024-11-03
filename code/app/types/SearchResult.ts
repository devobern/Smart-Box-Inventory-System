// types.ts

import {Item} from "./item";
import {box} from "./box";

export type SearchResult = (Item & { type: "item" }) | (box & { type: "box" });
