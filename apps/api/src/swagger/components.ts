const components = {
  components: {
    securitySchemes: {
      jwt: {
         description: "",
         type: "apiKey",
         name: "x-identity-token",
         in: "header"
      }
  },
    schemas: {
      Error: {
        type: "object",
        properties: {
          msg: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },

        },
      },
      page:  {
        name: "page",
        type: "number",
        required: true,
        in: "query",
      },
      limit: {
        name: "limit",
        type: "number",
        required: true,
        in: "query",
      },
      getToken: {
        name: "x-identity-token",
        type: "string",
        required: true,
        in: "header",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaWRAZ21haWwuY29tIiwibW9iaWxlIjoiOTQyMTYxNDY3NyIsIm5hbWUiOm51bGwsInVzZXJOYW1lIjoic2lkIiwicHJvZmlsZVBob3RvIjpudWxsLCJwYXNzd29yZENoYW5nZWRPbiI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMy0wMS0xN1QxMjowMDo1NS4wMDBaIiwiZ2VuZGVyIjpudWxsLCJkb2IiOm51bGwsIlVzZXJPcyI6W3sib3MiOiJpb3MifV0sImlhdCI6MTY3Mzk1NzAzMSwiZXhwIjoxNjc0MDAwMjMxfQ.7yOREZsqanQrkis5hAz1i9YnJEbqBWdfSPniGq5_EvI"
      }
    },
  },
};

export default components