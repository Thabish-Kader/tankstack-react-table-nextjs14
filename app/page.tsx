import { Modal } from "@/components/Modal";
import { Table } from "@/components/Table";
import { filterPersonData } from "@/utils/helpers";
import Image from "next/image";

async function getData() {
  const res = await fetch("https://assets.alippo.com/catalog/static/data.json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  // Filter out based on null values
  const updatedData: Person[] = filterPersonData(data);

  return updatedData as Person[];
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="mt-10">
      <Table data={data} />
    </main>
  );
}
