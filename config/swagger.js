const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for Task Management System',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5500',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            },
            role: {
              type: 'string',
              enum: ['admin', 'user']
            },
            avatar: {
              type: 'string'
            }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            status: {
              type: 'string',
              enum: ['todo', 'in-progress', 'in-review', 'completed']
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high']
            },
            dueDate: {
              type: 'string',
              format: 'date-time'
            },
            assigneeId: {
              type: 'string',
              format: 'uuid'
            },
            projectId: {
              type: 'string',
              format: 'uuid'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            status: {
              type: 'string',
              enum: ['active', 'completed', 'on-hold']
            },
            progress: {
              type: 'number',
              minimum: 0,
              maximum: 100
            },
            startDate: {
              type: 'string',
              format: 'date-time'
            },
            endDate: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            content: {
              type: 'string'
            },
            userId: {
              type: 'string',
              format: 'uuid'
            },
            taskId: {
              type: 'string',
              format: 'uuid'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Attachment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            name: {
              type: 'string'
            },
            url: {
              type: 'string'
            },
            type: {
              type: 'string'
            },
            size: {
              type: 'number'
            },
            taskId: {
              type: 'string',
              format: 'uuid'
            },
            uploadedBy: {
              type: 'string',
              format: 'uuid'
            }
          }
        },
        Event: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            startDate: {
              type: 'string',
              format: 'date-time'
            },
            endDate: {
              type: 'string',
              format: 'date-time'
            },
            type: {
              type: 'string',
              enum: ['meeting', 'deadline', 'reminder']
            },
            location: {
              type: 'string'
            },
            createdBy: {
              type: 'string',
              format: 'uuid'
            }
          }
        },
        Team: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            members: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        Analytics: {
          type: 'object',
          properties: {
            tasksByStatus: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['todo', 'in-progress', 'in-review', 'completed']
                  },
                  count: {
                    type: 'number'
                  }
                }
              }
            },
            tasksByPriority: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  priority: {
                    type: 'string',
                    enum: ['low', 'medium', 'high']
                  },
                  count: {
                    type: 'number'
                  }
                }
              }
            },
            projectProgress: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  projectId: {
                    type: 'string',
                    format: 'uuid'
                  },
                  name: {
                    type: 'string'
                  },
                  progress: {
                    type: 'number'
                  }
                }
              }
            },
            teamPerformance: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  userId: {
                    type: 'string',
                    format: 'uuid'
                  },
                  name: {
                    type: 'string'
                  },
                  tasksCompleted: {
                    type: 'number'
                  },
                  onTimeDelivery: {
                    type: 'number'
                  }
                }
              }
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

module.exports = swaggerJsdoc(options); 