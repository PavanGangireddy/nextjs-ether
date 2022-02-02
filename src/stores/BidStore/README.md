- Actions
  | FetchBidsByAddressRequestAction
  | FetchBidsByAddressSuccessAction
  | FetchBidsByAddressFailureAction
  | FetchBidsByNFTRequestAction
  | FetchBidsByNFTSuccessAction
  | FetchBidsByNFTFailureAction
  | PlaceBidRequestAction
  | PlaceBidFailureAction
  | PlaceBidSuccessAction
  | AcceptBidRequestAction
  | AcceptBidFailureAction
  | AcceptBidSuccessAction
  | CancelBidRequestAction
  | CancelBidFailureAction
  | CancelBidSuccessAction
- Bid Models
- Bid
- BidFilters
- BidSortby

- Sample Models

```
export declare type Bid = {
    id: string;
    bidAddress: string;
    bidder: string;
    seller: string;
    price: string;
    fingerprint: string;
    status: ListingStatus;
    blockchainId: string;
    blockNumber: string;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    contractAddress: string;
    tokenId: string;
    network: Network;
    chainId: ChainId;
};
export declare enum BidSortBy {
    RECENTLY_OFFERED = "recently_offered",
    RECENTLY_UPDATED = "recently_updated",
    MOST_EXPENSIVE = "most_expensive"
}
export declare type BidFilters = {
    first?: number;
    skip?: number;
    sortBy?: BidSortBy;
    bidAddress?: string;
    bidder?: string;
    seller?: string;
    contractAddress?: string;
    tokenId?: string;
    status?: ListingStatus;
    network?: Network;
};
```
