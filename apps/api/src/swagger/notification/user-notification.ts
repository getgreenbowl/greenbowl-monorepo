const userNotification = {
  get: {
    tags: ["user-notification"],
    description: "Get user notification",
    operationId: "userNotification",
    security: [
      {
        jwt: [],
      },
    ],
    responses: {
      200: {
        description: "getting user notification",
        content: {
          "application/json": {
            schema: {},
          },
        },
      },
      401: {
        description: "Unauthorized, User",
      },
      400: {
        description: "Not Found",
      },
    },
  },
};

export default userNotification;
