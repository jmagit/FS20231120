const swaggerJsdoc = require('swagger-jsdoc')

const swaggerDefinition = {
    "openapi": "3.0.0",
    "info": {
        "title": "Demos Curso",
        "version": "2.0.0",
        "description": "Ejemplos del curso de node.js",
        "contact": {
            "name": "Javier Martín",
            "url": "https://github.com/jmagit",
            "email": "support@example.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
        },
    },
    "servers": [
        {
            "url": "{protocol}://localhost:{port}/",
            "description": "Servidor local para las pruebas",
            "variables": {
                "protocol": {
                    "enum": [
                        "http",
                        "https"
                    ],
                    "default": "http"
                },
                "port": {
                    "enum": [
                        "4321",
                        "8181"
                    ],
                    "default": "4321"
                },
            }
        }
    ],
    "externalDocs": {
        "description": "Repositorio del proyecto",
        "url": "https://github.com/jmagit/FS20231120"
    },
    "tags": [],
    "paths": {},
    "components": {
        "schemas": {
            "ErrorMessage": {
                "type": "object",
                "title": "Problem Details",
                "description": "Problem Details for HTTP APIs ([RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807))",
                "required": [
                    "type",
                    "status",
                    "title"
                ],
                "properties": {
                    "type": {
                        "type": "string",
                        "description": "URI que identifica el tipo de problema y proporciona documentación legible por humanos para el tipo de problema.",
                    },
                    "title": {
                        "type": "string",
                        "description": "Breve resumen legible por humanos del problema escribe.",
                    },
                    "status": {
                        "type": "integer",
                        "description": "Código de estado HTTP.",
                    },
                    "detail": {
                        "type": "string",
                        "description": "Explicación legible por humanos específica de la ocurrencia concreta del problema.",
                    },
                    "instance": {
                        "type": "string",
                        "description": "URI de referencia que identifica el origen de la ocurrencia del problema.",
                    },
                    "errors": {
                        "type": "array",
                        "description": "Lista de errores de validación",
                        "items": {
                            "type": "object",
                            "minProperties": 1,
                            "additionalProperties": true
                        }
                    },
                    "source": {
                        "type": "string",
                        "description": "En modo depuración, información complementaria sobre el origen del error.",
                    }
                }
            }
        },
        "requestBodies": {},
        "responses": {
            "Created": {
                "description": "Created",
                "headers": {
                    "location": {
                        "description": "URL al elemento recién creado",
                        "schema": { "type": "string", "format": "uri" }
                    }
                }
            },
            "NoContent": {
                "description": "No content",
            },
            "BadRequest": {
                "description": "Invalid data",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorMessage"
                        }
                    }
                }
            },
            "Unauthorized": {
                "description": "Unauthorized",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorMessage"
                        }
                    }
                }
            },
            "Forbidden": {
                "description": "Forbidden",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorMessage"
                        }
                    }
                }
            },
            "NotFound": {
                "description": "Not found",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorMessage"
                        }
                    }
                }
            },
        },
        "parameters": {
            "pagina": {
                "in": "query",
                "name": "_page",
                "description": "Número de página empezando en 0 (primera página).",
                "required": false,
                "schema": {
                    "oneOf": [
                        { "type": "integer", "minimum": 0 },
                        { "type": "string", "enum": ["count", "COUNT"] },
                    ]
                }
            },
            "filas": {
                "in": "query",
                "name": "_rows",
                "description": "Número de filas por página, por defecto 20 si se omite pero aparece el parámetro *_page*.",
                "required": false,
                "schema": {
                    "type": "integer",
                    "minimum": 0
                }
            },
            "ordenar": {
                "in": "query",
                "name": "_sort",
                "description": "Indica la lista de propiedades (separadas por comas) por la que se ordenaran los resultados, en caso de omitirse se utilizará la propiedad que actúa como primary key. Si el nombre de la propiedad está precedido por un guion (signo negativo) la ordenación será descendente.",
                "required": false,
                "allowReserved": true,
                "schema": {
                    "type": "string"
                }
            },
            "buscar": {
                "in": "query",
                "name": "_search",
                "description": "Selecciona todos aquellos que en alguna de sus propiedades contenga el valor proporcionado.",
                "required": false,
                "allowReserved": true,
                "schema": {
                    "type": "string"
                }
            },
            "proyeccion": {
                "in": "query",
                "name": "_projection",
                "description": "Devuelve solo aquellas propiedades de la lista suministrada, los nombres de las propiedades deben ir separadas por comas.",
                "required": false,
                "allowReserved": true,
                "schema": {
                    "type": "string"
                }
            }
        },
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            },
            "cookieAuth": {
                "type": "apiKey",
                "in": "cookie",
                "name": "Authorization"
            }
        },
    },
    // "security": [{ bearerAuth: []}, {cookieAuth: [] }]
}

module.exports.openapiSpecification = swaggerJsdoc({
    swaggerDefinition,
    apis: ['src/routes/*.api.js'], 
});
