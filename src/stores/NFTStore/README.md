- Actions Which live here
  FetchNFTRequestAction,
  FetchNFTSuccessAction,
  FetchNFTFailureAction,
  FETCH_NFT_REQUEST,
  FETCH_NFT_SUCCESS,
  FETCH_NFT_FAILURE,
  FetchNFTsRequestAction,
  FetchNFTsSuccessAction,
  FetchNFTsFailureAction,
  FETCH_NFTS_REQUEST,
  FETCH_NFTS_SUCCESS,
  FETCH_NFTS_FAILURE,
  TRANSFER_NFT_REQUEST,
  TRANSFER_NFT_FAILURE,
  TRANSFER_NFT_SUCCESS,
  TransferNFTRequestAction,
  TransferNFTSuccessAction,
  TransferNFTFailureAction
- Store

  - nftsList

- Sample NFT Models

```
export declare type NFT = {
    id: string;
    contractAddress: string;
    tokenId: string;
    activeOrderId: string | null;
    owner: string;
    name: string;
    category: NFTCategory;
    image: string;
    url: string;
    issuedId: string | null;
    itemId: string | null;
    data: {
        parcel?: {
            x: string;
            y: string;
            description: string | null;
            estate: {
                tokenId: string;
                name: string;
            } | null;
        };
        estate?: {
            size: number;
            parcels: {
                x: number;
                y: number;
            }[];
            description: string | null;
        };
        wearable?: {
            description: string;
            category: WearableCategory;
            rarity: Rarity;
            bodyShapes: BodyShape[];
            isSmart: boolean;
        };
        ens?: {
            subdomain: string;
        };
    };
    network: Network;
    chainId: ChainId;
    createdAt: number;
    updatedAt: number;
    soldAt: number;
};
export declare type NFTFilters = {
    first?: number;
    skip?: number;
    sortBy?: NFTSortBy;
    category?: NFTCategory;
    owner?: string;
    isOnSale?: boolean;
    search?: string;
    itemRarities?: Rarity[];
    isLand?: boolean;
    isWearableHead?: boolean;
    isWearableAccessory?: boolean;
    isWearableSmart?: boolean;
    wearableCategory?: WearableCategory;
    wearableGenders?: WearableGender[];
    contractAddresses?: string[];
    tokenId?: string;
    itemId?: string;
    network?: Network;
};
export declare enum NFTSortBy {
    NAME = "name",
    NEWEST = "newest",
    RECENTLY_LISTED = "recently_listed",
    RECENTLY_SOLD = "recently_sold",
    CHEAPEST = "cheapest"
}
```
