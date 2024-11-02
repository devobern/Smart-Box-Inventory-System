import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase;

/**
 * Opens the database connection. If it doesn't exist, it creates a new one.
 */
export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("inventory.db");
  }
  return db;
};

/**
 * Creates basic tables in the database if they don't already exist.
 * Tables: `class`, `box`, and `item`.
 */
export const createTables = async () => {
  const db = await openDatabase();

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS boxGroup (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS location (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS box (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created DATETIME NOT NULL,
            updated DATETIME NOT NULL,
            locationId INTEGER NOT NULL,
            boxGroupId INTEGER,
            FOREIGN KEY(locationId) REFERENCES location(id),
            FOREIGN KEY(boxGroupId) REFERENCES boxGroup(id)
        );
    `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS item (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            img TEXT,
            description TEXT,
            created DATETIME NOT NULL,
            updated DATETIME NOT NULL,
            categoryId INTEGER,
                        boxId INTEGER NOT NULL,
            FOREIGN KEY(categoryId) REFERENCES category(id),
            FOREIGN KEY(boxId) REFERENCES box(id)
        );
    `);
};

/**
 * Inserts a new row in the `boxGroup` table.
 * @param name - The name of the box group.
 * @returns The ID of the inserted row or null if failed.
 */
export const addBoxGroup = async (name: string): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `INSERT INTO boxGroup (name) VALUES ($name)`
  );
  try {
    const result = await statement.executeAsync({ $name: name });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Updates the name of a `boxGroup` based on its ID.
 * @param id - The ID of the box group.
 * @param name - The new name of the box group.
 * @returns The ID of the updated row or null if failed.
 */
export const updateBoxGroup = async (
  id: number,
  name: string
): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `UPDATE boxGroup SET name = $name WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $name: name, $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes a `boxGroup` by its ID.
 * @param id - The ID of the box group to delete.
 * @returns The ID of the deleted row or null if failed.
 */
export const deleteBoxGroup = async (id: number): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `DELETE FROM boxGroup WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves a `boxGroup` row by its ID.
 * @param id - The ID of the box group to retrieve.
 * @returns The box group row as an object or null if not found.
 */
export const getBoxGroup = async (id: number): Promise<object | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `SELECT * FROM boxGroup WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $id: id });
    return (await result.getFirstAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves all rows in the `boxGroup` table.
 * @returns An array of boxGroup objects or null if the table is empty.
 */
export const getBoxGroups = async (): Promise<unknown[] | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`SELECT * FROM boxGroup`);
  try {
    const result = await statement.executeAsync();
    return (await result.getAllAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Inserts a new row in the `location` table.
 * @param name - The name of the location.
 * @returns The ID of the inserted row or null if failed.
 */
export const addLocation = async (name: string): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `INSERT INTO location (name) VALUES ($name)`
  );
  try {
    const result = await statement.executeAsync({ $name: name });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Updates the name of a `location` based on its ID.
 * @param id - The ID of the location.
 * @param name - The new name of the location.
 * @returns The ID of the updated row or null if failed.
 */
export const updateLocation = async (
  id: number,
  name: string
): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `UPDATE location SET name = $name WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $name: name, $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes a `location` by its ID.
 * @param id - The ID of the location to delete.
 * @returns The ID of the deleted row or null if failed.
 */
export const deleteLocation = async (id: number): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `DELETE FROM location WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves a `location` row by its ID.
 * @param id - The ID of the location to retrieve.
 * @returns The location row as an object or null if not found.
 */
export const getLocation = async (id: number): Promise<object | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `SELECT * FROM location WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $id: id });
    return (await result.getFirstAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves all rows in the `location` table.
 * @returns An array of location objects or null if the table is empty.
 */
export const getLocations = async (): Promise<unknown[] | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`SELECT * FROM location`);
  try {
    const result = await statement.executeAsync();
    return (await result.getAllAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Inserts a new row in the `category` table.
 * @param name - The name of the category.
 * @returns The ID of the inserted row or null if failed.
 */
export const addCategory = async (name: string): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `INSERT INTO category (name) VALUES ($name)`
  );
  try {
    const result = await statement.executeAsync({ $name: name });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Updates the name of a `category` based on its ID.
 * @param id - The ID of the category.
 * @param name - The new name of the category.
 * @returns The ID of the updated row or null if failed.
 */
export const updateCategory = async (
  id: number,
  name: string
): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `UPDATE category SET name = $name WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $name: name, $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes a `category` by its ID.
 * @param id - The ID of the category to delete.
 * @returns The ID of the deleted row or null if failed.
 */
export const deleteCategory = async (id: number): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `DELETE FROM category WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves a `category` row by its ID.
 * @param id - The ID of the category to retrieve.
 * @returns The location row as an object or null if not found.
 */
export const getCategory = async (id: number): Promise<object | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `SELECT * FROM category WHERE id = $id`
  );
  try {
    const result = await statement.executeAsync({ $id: id });
    return (await result.getFirstAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves all rows in the `category` table.
 * @returns An array of location objects or null if the table is empty.
 */
export const getCategories = async (): Promise<unknown[] | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`SELECT * FROM category`);
  try {
    const result = await statement.executeAsync();
    return (await result.getAllAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Inserts a new row in the `item` table.
 * @param name - The name of the item.
 * @returns The ID of the inserted row or null if failed.
 */
export const addItem = async (
  name: string,
  quantity: number,
  boxId: number,
  img?: string,
  description?: string,
  categoryId?: number
): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `INSERT INTO item (name, quantity, img, description, created, updated, categoryId, boxId) VALUES ($name, $quantity, $img, $description, $created, $updated, $categoryId, $boxId)`
  );
  try {
    const date = new Date().toISOString();
    // @ts-ignore
    const result = await statement.executeAsync({
      $name: name,
      $quantity: quantity,
      $created: date,
      $updated: date,
      $categoryId: categoryId,
      $boxId: boxId,
      $img: img,
      $description: description,
    });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Updates the name of an `item` based on its ID.
 * @param id - The ID of the item.
 * @param name - The new name of the item.
 * @returns The ID of the updated row or null if failed.
 */
export const updateItem = async (
  id: number,
  name: string,
  quantity: number,
  boxId: number,
  img?: string,
  description?: string,
  categoryId?: number
): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `UPDATE item SET name = $name, quantity = $quantity, updated = $updated, categoryId = $categoryId, boxId = $boxId, img = $img, description = $description WHERE id = $id`
  );
  try {
    const date = new Date().toISOString();
    // @ts-ignore
    const result = await statement.executeAsync({
      $name: name,
      $id: id,
      $quantity: quantity,
      $updated: date,
      $categoryId: categoryId,
      $boxId: boxId,
      $img: img,
      $description: description,
    });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes an `item` by its ID.
 * @param id - The ID of the item to delete.
 * @returns The ID of the deleted row or null if failed.
 */
export const deleteItem = async (id: number): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`DELETE FROM item WHERE id = $id`);
  try {
    const result = await statement.executeAsync({ $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves an `item` row by its ID.
 * @param id - The ID of the item to retrieve.
 * @returns The item row as an object or null if not found.
 */
export const getItem = async (id: number): Promise<object | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`SELECT * FROM item WHERE id = $id`);
  try {
    const result = await statement.executeAsync({ $id: id });
    return (await result.getFirstAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves all rows in the `item` table.
 * @returns An array of item objects or null if the table is empty.
 */
export const getItems = async (): Promise<unknown[] | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`SELECT * FROM item`);
  try {
    const result = await statement.executeAsync();
    return (await result.getAllAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Inserts a new row in the `box` table.
 * @param name - The name of the box.
 * @returns The ID of the inserted row or null if failed.
 */
export const addBox = async (
  name: string,
  locationId: number,
  boxGroupId?: number
): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `INSERT INTO box (name, created, updated, locationId, boxGroupId) VALUES ($name, $created, $updated, $locationId, $boxGroupId)`
  );
  try {
    const date = new Date().toISOString();
    // @ts-ignore
    const result = await statement.executeAsync({
      $name: name,
      $created: date,
      $updated: date,
      $locationId: locationId,
      $boxGroupId: boxGroupId,
    });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Updates the name of a `box` based on its ID.
 * @param id - The ID of the box.
 * @param name - The new name of the box.
 * @returns The ID of the updated row or null if failed.
 */
export const updateBox = async (
  id: number,
  name: string,
  locationId: number,
  boxGroupId?: number
): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `UPDATE box SET name = $name, updated = $updated, locationId = $locationId, boxGroupId = $boxGroupId WHERE id = $id`
  );
  try {
    const date = new Date().toISOString();
    // @ts-ignore
    const result = await statement.executeAsync({
      $id: id,
      $name: name,
      $updated: date,
      $locationId: locationId,
      $boxGroupId: boxGroupId,
    });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes a `box` by its ID.
 * @param id - The ID of the box to delete.
 * @returns The ID of the deleted row or null if failed.
 */
export const deleteBox = async (id: number): Promise<number | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`DELETE FROM box WHERE id = $id`);
  try {
    const result = await statement.executeAsync({ $id: id });
    return result.lastInsertRowId ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves a `box` row by its ID.
 * @param id - The ID of the box to retrieve.
 * @returns The box row as an object or null if not found.
 */
export const getBox = async (id: number): Promise<object | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`SELECT * FROM box WHERE id = $id`);
  try {
    const result = await statement.executeAsync({ $id: id });
    return (await result.getFirstAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Retrieves all rows in the `box` table.
 * @returns An array of box objects or null if the table is empty.
 */
export const getBoxes = async (): Promise<unknown[] | null> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(`SELECT * FROM box`);
  try {
    const result = await statement.executeAsync();
    return (await result.getAllAsync()) ?? null;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Returns the count of items in a box.
 * @param boxId - The ID of the box.
 * @returns The box items count as an object.
 */
export const getBoxItemsCount = async (boxId: number): Promise<unknown> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `SELECT count(id) as count FROM items WHERE boxId = $boxId`
  );
  try {
    const result = await statement.executeAsync({ $boxId: boxId });
    return await result.getFirstAsync();
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Searches for items by name or description that match the given query.
 * @param query - The search query string.
 * @returns An array of items that match the search criteria, or null if no matches are found.
 */
export const searchItems = async (query: string): Promise<unknown[] | null> => {
  // Validate query input
  if (!query) {
    console.error("Query is empty or undefined.");
    return null;
  }

  try {
    const db = await openDatabase();

    // Prepare the SQL statement
    const statement = await db.prepareAsync(`
        SELECT * FROM item
        WHERE name LIKE $query
      `);

    // Execute the query with the parameter
    const result = await statement.executeAsync({ $query: `%${query}%` });
    const items = await result.getAllAsync();

    // Finalize the statement and return the items
    await statement.finalizeAsync();
    return items.length ? items : null;
  } catch (error) {
    console.error("Error executing search query:", error);
    return null;
  }
};

/**
 * The following functions are used to delete all rows in
 * the corresponding tables.
 **/

/**
 * Deletes all rows in the `location` table.
 * @returns A Promise that resolves when all locations have been deleted.
 */
export const deleteAllLocations = async (): Promise<void> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync("DELETE FROM location;");
  try {
    await statement.executeAsync();
    console.log("All locations deleted.");
  } catch (error) {
    console.error("Error deleting all locations:", error);
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes all rows in the `box` table.
 * @returns A Promise that resolves when all boxes have been deleted.
 */
export const deleteAllBoxes = async (): Promise<void> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync("DELETE FROM box;");
  try {
    await statement.executeAsync();
    console.log("All boxes deleted.");
  } catch (error) {
    console.error("Error deleting all boxes:", error);
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes all rows in the `category` table.
 * @returns A Promise that resolves when all categories have been deleted.
 */
export const deleteAllCategories = async (): Promise<void> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync("DELETE FROM category;");
  try {
    await statement.executeAsync();
    console.log("All categories deleted.");
  } catch (error) {
    console.error("Error deleting all categories:", error);
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes all rows in the `item` table.
 * @returns A Promise that resolves when all items have been deleted.
 */
export const deleteAllItems = async (): Promise<void> => {
  const db = await openDatabase();
  const statement = await db.prepareAsync("DELETE FROM item;");
  try {
    await statement.executeAsync();
    console.log("All items deleted.");
  } catch (error) {
    console.error("Error deleting all items:", error);
  } finally {
    await statement.finalizeAsync();
  }
};
