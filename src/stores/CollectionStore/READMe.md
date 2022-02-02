- Assumption: we shall maintain all our items as Collections in blockchain
- Maintain all collections here
- NFT
  - Wearables
  - LAND
  - NAMES
- Items
  - Wearables
  - LAND
  - NAMES

```
export declare type Collection = {
    urn: string;
    name: string;
    creator: string;
    contractAddress: string;
    isOnSale: boolean;
    size: number;
    createdAt: number;
    updatedAt: number;
    reviewedAt: number;
    network: Network;
    chainId: ChainId;
};
export declare enum CollectionSortBy {
    NEWEST = "newest",
    NAME = "name",
    RECENTLY_REVIEWED = "recently_reviewed",
    SIZE = "size"
}
export declare type CollectionFilters = {
    first?: number;
    skip?: number;
    sortBy?: CollectionSortBy;
    name?: string;
    search?: string;
    creator?: string;
    contractAddress?: string;
    urn?: string;
    isOnSale?: boolean;
    network?: Network;
};
```
