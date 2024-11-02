export type box = {
    id: bigint;                 // Unique ID
    name: string;               // Name for a box
    location: string;           // Location of the box
    description?: string;       // Optional detailed description about the box
    numberOfItems?: number;     // Number of items
    dateAdded?: Date;           // Date the box was added
    tags?: string[];            // Tags to facilitate searching and filtering -> FOR FUTURE IMPLEMENTATION
    lastUpdated?: Date;         // Date when the box information was last updated
};
