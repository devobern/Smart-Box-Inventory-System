export type Item = {
    id: bigint;                 // Unique id
    name: string;               // Name for each item
    category: string;           // Category of the item, e.g., "Clothing", "Electronics"
    boxId: string;              // Identifier for the box storing this item
    description?: string;       // Optional detailed description about the item
    quantity?: number;          // Number of identical items -> FOR FUTURE IMPLEMENTATION
    photoUrl?: string;          // URL to a photo of the item -> FOR FUTURE IMPLEMENTATION
    dateAdded?: Date;           // Date the item was added -> FOR FUTURE IMPLEMENTATION
    tags?: string[];            // Tags to facilitate searching and filtering -> FOR FUTURE IMPLEMENTATION
    lastUpdated?: Date;         // Date when the item information was last updated -> FOR FUTURE IMPLEMENTATION
};
