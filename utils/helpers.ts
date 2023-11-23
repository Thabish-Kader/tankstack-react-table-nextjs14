/**
 * The function updates the person data by replacing null values with "-" and returns the updated data.
 * @param {Person[] | undefined} data - An array of objects of type Person.
 * @returns an array of updated person data.
 */
export function filterPersonData(data: Person[] | undefined): Person[] {
  if (!data) {
    return [];
  }

  return data.map((item: Person) => {
    const updatedItem: Person = { name: "-", age: 0, city: "-", pinCode: "-" };
    for (const key in item) {
      updatedItem[key] = item[key] !== null ? item[key] : "-";
    }
    return updatedItem;
  });
}
