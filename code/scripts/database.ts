// scripts/database.ts

export const searchItems = (
  query: string,
  callback: (items: any[]) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM Items WHERE name LIKE ? OR category LIKE ?`,
      [`%${query}%`, `%${query}%`],
      (_, { rows }) => {
        callback(rows._array);
      },
      (_, error) => {
        console.error("Error executing search query", error);
        return false;
      }
    );
  });
};
