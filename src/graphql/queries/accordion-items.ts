export const ACCORDION_ITEMS_QUERY = `
  query {
    accordionCollection {
      items {
        title
        accordionItemsCollection {
          items {
            name
            text
          }
        }
      }
    }
  }
`;
