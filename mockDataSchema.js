export const schema = {
  "type": "object",
  "properties": {
		"rooms": {
			"type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
				"type": "object",
				"properties": {
					"name": {
						"type": "string",
						"unique": true,
						"faker": "name.firstName"
					},
					"users": {
							"type": "array",
							"minItems": 3,
							"maxItems": 5,
							"items": {
								"type": "string",
								"unique": true,
								"faker": "name.firstName"
							}
          },
          "songs": {
						"type": "array",
						"minItems": 3,
						"maxItems": 5,
						"items": {
							"type": "object",
							"properties": {
								"name": {
									"type": "string",
									"unique": true
								},
								"length": {
									"type": "integer",
									"minimum": 1,
									"maximum": 5
								},
								"requester": {
									"type": "string",
									"unique": true,
									"faker": "name.firstName"
								}
							},
							"required": ["name", "length", "requester"]
						}
          }
				},
				"required": ["name", "users", "songs"]
			}
		}
	},
  "required": ["rooms"]
};
