import { Accordion, AccordionItem } from "@/components/accordion";
import { css } from "../../../styled-system/css";
import { fetchData } from "@/graphql/fetch-data";
import { ACCORDION_ITEMS_QUERY } from "@/graphql/queries/accordion-items";

export default async function FaqPage() {
  const response = await fetchData(ACCORDION_ITEMS_QUERY);

  const data = response.accordionCollection.items[0];

  return (
    <div className={css({ w: "25rem", margin: "0 auto" })}>
      <h1
        className={css({
          fontSize: "1.5rem",
          fontWeight: "bold",
          mb: "xl",
        })}
      >
        {data.title}
      </h1>
      <Accordion>
        {data.accordionItemsCollection.items.map(
          (accordionItem: any, index: number) => (
            <AccordionItem
              key={index}
              id={index.toString()}
              title={accordionItem.name}
            >
              {accordionItem.text}
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
}
